import { Request, Response } from "express"
import { OrderService } from "./order.service";
import { ProductModel } from "../products/products.model";

// create order data using post method 


const createOrder = async (req: Request, res: Response) => {
    try {
        const orderData = req.body;

        // Create the order
        const result = await OrderService.createOrders(orderData);

        // Get product details
        const { productId, quantity } = orderData;
        const product = await ProductModel.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found!'
            });
        }

        // Check if product is out of stock
        if (product.inventory.quantity === 0) {
            return res.status(500).json({
                "success": false,
                "message": "Insufficient quantity available in inventory"
            });
        }

        // Update inventory quantity and inStock status
        product.inventory.quantity -= quantity;

        if (product.inventory.quantity <= 0) {
            product.inventory.quantity = 0;
            product.inventory.inStock = false;
        }

        // Save product changes
        await product.save();

        res.status(200).json({
            success: true,
            message: 'Order created successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Order not created"
        });
    }
};

export default createOrder;


const getAllOrders = async (req: Request, res: Response) => {
    try {
        const email = req.query.email;
        const order = await OrderService.getAllOrders(email as string);

        res.status(200).json({
            success: true,
            message: "Orders fetched successfully!",
            data: order
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            massage: "Order not found"
        })
    }
}

export const OrderController = {
    createOrder,
    getAllOrders
}
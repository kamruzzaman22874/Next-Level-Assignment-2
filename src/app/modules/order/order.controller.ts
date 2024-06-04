import { Request, Response } from "express"
import { OrderService } from "./order.service";
import { ProductModel } from "../products/products.model";
import ZodOrderValidationSchema from "./order.validation";
import { OrderModel } from "./order.model";

// create order data using post method 


const createOrder = async (req: Request, res: Response) => {
    try {
        const orderData = req.body;
        const validOrder = ZodOrderValidationSchema.parse(orderData);
        console.log(validOrder)

        // Check if the product exists and is in stock
        const product = await ProductModel.findById(validOrder.productId);
        console.log(product)
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found!",
            });
        }
        if (
            !product.inventory.inStock ||
            validOrder.quantity > product.inventory.quantity
        ) {
            return res.status(400).json({
                success: false,
                message: "Insufficient quantity available in inventory",
            });
        }

        // Update the product quantity
        if (product) {
            product.inventory.quantity -= orderData.quantity;
            if (product.inventory.quantity <= 0) {
                product.inventory.quantity = 0;
                product.inventory.inStock = false;
            }
            await product.save();
        } else {
            throw new Error('Product not found');
        }
        // Create the order
        const createdOrder = await OrderService.createOrders(validOrder);

        return res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: createdOrder,
        });
    } catch (error: unknown) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong!",
            error: error,
        });
    }
};


const getAllOrders = async (req: Request, res: Response) => {
    try {
        const email = req.query.email;
        const order = await OrderService.getAllOrders(email as string);
        if (order.length) {
            return res.status(200).json({
                success: true,
                message: "Orders fetched successfully!",
                data: order
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            })
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            massage: "Order not found"
        })
    }
}

export const OrderController = {
    createOrder,
    getAllOrders
}
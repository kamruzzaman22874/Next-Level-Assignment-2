import { Request, Response } from "express"
import { OrderService } from "./order.service";
import { ProductModel } from "../products/products.model";
import { OrderModel } from "./order.model";


const createOrder = async (req: Request, res: Response) => {
    try {
        const { productId, quantity } = req.body;
        console.log(productId, quantity);

        // if (!productId || !quantity) {
        //     return res.status(400).json({
        //         success: false,
        //         message: 'Please provide productId and quantity!',
        //         data: null
        //     });
        // }

        const product = await ProductModel.findById(productId);
        console.log(product)

        // if (!product) {
        //     return res.status(404).json({
        //         success: false,
        //         message: 'Product not found!',
        //         data: null
        //     });
        // }

        if (product.inventory.quantity < quantity) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient stock!',
                data: null
            });
        }

        // Decrement the product quantity 

        product.inventory.quantity -= quantity;
        product.inventory.inStock = product.inventory.quantity > 0;

        // const updateProduct = await ProductModel.findByIdAndUpdate(
        //     productId, product,
        //     { new: true }
        // )

        const newOrder = new OrderModel({
            productId,
            quantity
        });

        await newOrder.save();

        // const orderData = req.body;
        // const result = await OrderService.createOrders(orderData);
        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: newOrder
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            massage: `${error.message} | something went wrong`
        })
    }
}

const getAllOrders = async (req: Request, res: Response) => {
    try {
        const email = req.query.email;
        const order = await OrderService.getAllOrders(email as string);

        res.status(200).json({
            success: true,
            message: "Orders fetched successfully!",
            data: order
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            massage: `${error.message} | something went wrong`
        })
    }
}

export const OrderController = {
    createOrder,
    getAllOrders
}
import { Request, Response } from "express"
import { OrderService } from "./order.service";
import { ProductModel } from "../products/products.model";
import { OrderModel } from "./order.model";


// const createOrder = async (req: Request, res: Response) => {
//     try {
//         const orderData = req.body;
//         const result = await OrderService.createOrders(orderData);
//         console.log(result)
//         const { productId, quantity } = req.body;

//         const product = await ProductModel.findById({ _id: productId });
//         console.log('product', product)

//         if (product.inventory.quantity = 0) {
//             res.status(500).json({
//                 success: false,
//                 message: "Product already stock out",
//             })
//         }
//         if (product) {
//             product.inventory.quantity -= quantity

//             if (product.inventory.quantity <= 0) {
//                 product.inventory.quantity = 0;
//                 product.inventory.inStock = false;
//             }


//             await product.save();

//         } else {
//             throw new Error('Product not found!')
//         }

//         res.status(200).json({
//             success: true,
//             message: "Order created successfully",
//             data: result
//         })


//     } catch (error: any) {
//         res.status(500).json({
//             success: false,
//             massage: `${error.message} | something went wrong`
//         })
//     }
// }


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
                success: false,
                message: 'Product is out of stock'
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
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: `${error.message} | something went wrong`
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
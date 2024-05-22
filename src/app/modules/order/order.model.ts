import { Schema, model } from "mongoose";
import { TOrder } from "./order.interface";

// make schema 

const orderSchema = new Schema<TOrder>({
    email: { type: String, required: true },
    productId: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }

})

// make model 

export const OrderModel = model<TOrder>("Order", orderSchema);

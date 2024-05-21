import { Schema, model } from "mongoose";
import { Tinventory, Tproducts, Tvariants } from "./products.interface";



const VariantsSchema = new Schema<Tvariants>({
    type: {
        type: String,
        required: true,
    },
    value: { type: String, required: true }

})

const InventorySchema = new Schema<Tinventory>({
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true }
})

const productsSchema = new Schema<Tproducts>({
    id: { type: String },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    tags: { type: [String], required: true },
    variants: { type: [VariantsSchema], required: true },
    inventory: { type: InventorySchema, required: true },

})


export const ProductModel = model<Tproducts>("Products", productsSchema)
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
// make schema
const VariantsSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: true,
    },
    value: { type: String, required: true }
});
const InventorySchema = new mongoose_1.Schema({
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true }
});
const productsSchema = new mongoose_1.Schema({
    id: { type: String },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    tags: { type: [String], required: true },
    variants: { type: [VariantsSchema], required: true },
    inventory: { type: InventorySchema, required: true },
});
// make model 
exports.ProductModel = (0, mongoose_1.model)("Products", productsSchema);

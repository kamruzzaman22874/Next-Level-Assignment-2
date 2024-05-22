"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsValidaitionSchema = void 0;
const zod_1 = require("zod");
// creating a schema validation using zod 
const productVariantsSchema = zod_1.z.object({
    type: zod_1.z.string(),
    value: zod_1.z.string()
});
const productsInventorySchema = zod_1.z.object({
    quantity: zod_1.z.number(),
    inStock: zod_1.z.boolean()
});
exports.productsValidaitionSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    price: zod_1.z.number(),
    category: zod_1.z.string(),
    tags: zod_1.z.array(zod_1.z.string()),
    variants: zod_1.z.array(productVariantsSchema),
    inventory: productsInventorySchema
});

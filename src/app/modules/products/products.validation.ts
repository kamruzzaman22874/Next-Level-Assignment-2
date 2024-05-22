import { z } from "zod";

// creating a schema validation using zod 
const productVariantsSchema = z.object({
    type: z.string(),
    value: z.string()
});

const productsInventorySchema = z.object({
    quantity: z.number(),
    inStock: z.boolean()
});

export const productsValidaitionSchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    description: z.string(),
    price: z.number(),
    category: z.string(),
    tags: z.array(z.string()),
    variants: z.array(productVariantsSchema),
    inventory: productsInventorySchema
});



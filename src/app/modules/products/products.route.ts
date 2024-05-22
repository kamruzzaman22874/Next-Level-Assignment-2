
import express from 'express';
import { ProductsController } from './products.controller';



const router = express.Router();

router.post("/create-product", ProductsController.createProducts)
router.get("/", ProductsController.getAllProducts)
router.get("/:productId", ProductsController.getSingleProduct)
router.put("/:productId", ProductsController.updateProduct)
router.delete("/:productId", ProductsController.deleteProduct)


export const ProductsRoute = router;
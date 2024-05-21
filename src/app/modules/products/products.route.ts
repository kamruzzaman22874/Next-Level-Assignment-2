
import express from 'express';
import { ProductsController } from './products.controller';



const router = express.Router();

router.post("/", ProductsController.createProducts)
router.get("/", ProductsController.getAllProducts)
router.get("/:productId", ProductsController.getSingleProduct)
router.put("/:productId", ProductsController.updateProduct)
router.delete("/:productId", ProductsController.deleteProduct)
router.get("/", ProductsController.productFindWithParams)


export const ProductsRoute = router;
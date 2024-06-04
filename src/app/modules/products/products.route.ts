
import express from 'express';
import { ProductsController } from './products.controller';



const router = express.Router();

// create route 

router.post("/", ProductsController.createProducts)
router.get("/", ProductsController.getAllProducts)
router.get("/:productId", ProductsController.getSingleProduct)
router.put("/:productId", ProductsController.updateProducts)
router.delete("/:productId", ProductsController.deleteProduct)


export const ProductsRoute = router;

import express from 'express';
import { OrderController } from './order.controller';

const router = express.Router();

// make route 

router.post("/create-order", OrderController.createOrder)
router.get("/", OrderController.getAllOrders)


export const OrderRouter = router;
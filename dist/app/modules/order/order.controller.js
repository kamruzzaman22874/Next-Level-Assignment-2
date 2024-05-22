"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const order_service_1 = require("./order.service");
const products_model_1 = require("../products/products.model");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        // Create the order
        const result = yield order_service_1.OrderService.createOrders(orderData);
        // Get product details
        const { productId, quantity } = orderData;
        const product = yield products_model_1.ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found!'
            });
        }
        // Check if product is out of stock
        if (product.inventory.quantity === 0) {
            return res.status(500).json({
                "success": false,
                "message": "Insufficient quantity available in inventory"
            });
        }
        // Update inventory quantity and inStock status
        product.inventory.quantity -= quantity;
        if (product.inventory.quantity <= 0) {
            product.inventory.quantity = 0;
            product.inventory.inStock = false;
        }
        // Save product changes
        yield product.save();
        res.status(200).json({
            success: true,
            message: 'Order created successfully',
            data: result
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Order not found"
        });
    }
});
exports.default = createOrder;
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        const order = yield order_service_1.OrderService.getAllOrders(email);
        res.status(200).json({
            success: true,
            message: "Orders fetched successfully!",
            data: order
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            massage: "Order not found"
        });
    }
});
exports.OrderController = {
    createOrder,
    getAllOrders
};

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const order_service_1 = require("./order.service");
const products_model_1 = require("../products/products.model");
const order_validation_1 = __importDefault(require("./order.validation"));
// create order data using post method 
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        const validOrder = order_validation_1.default.parse(orderData);
        console.log(validOrder);
        // Check if the product exists and is in stock
        const product = yield products_model_1.ProductModel.findById(validOrder.productId);
        console.log(product);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found!",
            });
        }
        if (!product.inventory.inStock ||
            validOrder.quantity > product.inventory.quantity) {
            return res.status(400).json({
                success: false,
                message: "Insufficient quantity available in inventory",
            });
        }
        // Update the product quantity
        if (product) {
            product.inventory.quantity -= orderData.quantity;
            if (product.inventory.quantity <= 0) {
                product.inventory.quantity = 0;
                product.inventory.inStock = false;
            }
            yield product.save();
        }
        else {
            throw new Error('Product not found');
        }
        // Create the order
        const createdOrder = yield order_service_1.OrderService.createOrders(validOrder);
        return res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: createdOrder,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong!",
            error: error,
        });
    }
});
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        const order = yield order_service_1.OrderService.getAllOrders(email);
        if (order.length) {
            return res.status(200).json({
                success: true,
                message: "Orders fetched successfully!",
                data: order
            });
        }
        else {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            massage: "Order not found"
        });
    }
});
exports.OrderController = {
    createOrder,
    getAllOrders
};

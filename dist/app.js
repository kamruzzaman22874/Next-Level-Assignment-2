"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const products_route_1 = require("./app/modules/products/products.route");
const order_route_1 = require("./app/modules/order/order.route");
const app = (0, express_1.default)();
// parser
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// middleware 
app.use("/api/products", products_route_1.ProductsRoute);
app.use("/api/orders", order_route_1.OrderRouter);
app.get('/', (req, res) => {
    res.send("Hello world !!!!");
});
app.get("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found!",
    });
});
// console.log(process.cwd())
exports.default = app;

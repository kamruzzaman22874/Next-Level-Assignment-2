"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsRoute = void 0;
const express_1 = __importDefault(require("express"));
const products_controller_1 = require("./products.controller");
const router = express_1.default.Router();
// create route 
router.post("/", products_controller_1.ProductsController.createProducts);
router.get("/", products_controller_1.ProductsController.getAllProducts);
router.get("/:productId", products_controller_1.ProductsController.getSingleProduct);
router.put("/:productId", products_controller_1.ProductsController.updateProducts);
router.delete("/:productId", products_controller_1.ProductsController.deleteProduct);
exports.ProductsRoute = router;

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
exports.ProductsController = void 0;
const product_service_1 = require("./product.service");
const products_validation_1 = __importDefault(require("./products.validation"));
// create product 
const createProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productsData = req.body;
        // data validation using zod 
        const zodparseData = products_validation_1.default.parse(productsData);
        const result = yield product_service_1.ProductServices.cteateProduct(zodparseData);
        console.log(result);
        res.status(200).json({
            success: true,
            message: "Product created successfully!",
            data: result
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to Create products!',
        });
    }
});
// get all product and implemet search params 
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        const products = yield product_service_1.ProductServices.getAllProduct(searchTerm !== null && searchTerm !== void 0 ? searchTerm : "");
        res.status(200).json({
            success: true,
            message: "Products matching  fetched successfully!",
            data: products
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to search products!',
        });
    }
});
// single product using param id 
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const product = yield product_service_1.ProductServices.getSingleProduct(productId);
        return res.status(200).json({
            success: true,
            message: 'Product fetched successfully',
            data: product
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
        });
    }
});
// update product using put method 
const updateProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const updatedProduct = req.body;
        const product = yield product_service_1.ProductServices.updateProduct(productId, updatedProduct);
        return res.status(200).json({
            success: true,
            message: 'Product updated successfully!',
            data: product
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
        });
    }
});
// delete product using delete method 
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    const deletedProduct = yield product_service_1.ProductServices.deleteProduct(productId);
    if (!deletedProduct) {
        return res.status(404).json({
            success: false,
            message: 'Product not found!'
        });
    }
    res.status(200).json({
        success: true,
        message: "Product deleted successfully!",
        data: null
    });
});
exports.ProductsController = {
    createProducts,
    getAllProducts,
    getSingleProduct,
    updateProducts,
    deleteProduct,
};

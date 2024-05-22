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
exports.ProductServices = void 0;
const products_model_1 = require("./products.model");
// create product using post method 
const cteateProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.ProductModel.create(payload);
    return result;
});
//get all product using get method 
const getAllProduct = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    let query;
    if (searchTerm) {
        query = yield products_model_1.ProductModel.find({
            $or: [
                { name: { $regex: searchTerm, $options: 'i' } },
                { description: { $regex: searchTerm, $options: 'i' } }
            ]
        });
    }
    else {
        const result = yield products_model_1.ProductModel.find();
        return result;
    }
    return query;
});
// get single product using params method 
const getSingleProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.ProductModel.findById(productId);
    return result;
});
// update product using put method 
const updateProduct = (productId, updatedProduct) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.ProductModel.findByIdAndUpdate(productId, updatedProduct, { new: true });
    return result;
});
// delete product using delete method 
const deleteProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedProduct = yield products_model_1.ProductModel.findByIdAndDelete(productId);
    return deletedProduct;
});
exports.ProductServices = {
    cteateProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};

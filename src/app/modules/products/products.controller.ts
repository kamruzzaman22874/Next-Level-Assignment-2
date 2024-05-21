import { Request, Response } from "express"
import { ProductServices } from "./product.service"
import { ProductModel } from "./products.model";

const createProducts = async (req: Request, res: Response) => {
    const productsData = req.body;
    try {
        const result = await ProductServices.cteateProduct(productsData)

        res.status(200).json({
            success: true,
            message: "Product created successfully!",
            data: result
        })
    } catch (error) {
        console.log(error)
    }
}
const getAllProducts = async (req: Request, res: Response) => {
    // const productsData = req.body;
    const products = await ProductServices.getAllProduct()

    if (!products || products.length === 0) {
        return res.status(404).json({
            success: false,
            message: 'No products found!',
            data: []
        });
    }
    try {

        res.status(200).json({
            success: true,
            message: "Products fetched successfully!!",
            data: products
        })
    } catch (error: any) {
        console.error('Error fetching products:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch products!',
            error: error.message
        });
    }
}

const getSingleProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const product = await ProductServices.getSingleProduct(productId)
        return res.status(200).json({
            success: true,
            message: 'Product fetched successfully',
            data: product
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message
        });
    }
}
const updateProduct = async (req: Request, res: Response) => {
    try {
        const productId = req.params.productId;
        const updatedProduct = req.body;
        const product = await ProductServices.updateProduct(productId, updatedProduct);
        return res.status(200).json({
            success: true,
            message: 'Product updated successfully!',
            data: product
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message
        });
    }
}

const deleteProduct = async (req: Request, res: Response) => {
    const productId = req.params.productId;
    const deletedProduct = await ProductServices.deleteProduct(productId);
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
    })
}


const productFindWithParams = async (req: Request, res: Response) => {
    try {
        const searchTerm = req.query.searchTerm;
        const products = await ProductServices.productFindWithParam({
            $or: [
                { name: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search by product name
                { description: { $regex: searchTerm, $options: 'i' } } // Case-insensitive search by product description
            ]
        });
        res.status(200).json({
            success: true,
            message: "Products matching search term 'iphone' fetched successfully!",
            data: products
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Failed to search products!',
            error: error.message
        });
    }
}




export const ProductsController = {
    createProducts,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    productFindWithParams

}
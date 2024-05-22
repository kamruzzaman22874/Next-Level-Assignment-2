import { Request, Response } from "express"
import { ProductServices } from "./product.service"
import { z } from "zod";
import ZodProductValidationSchema from "./products.validation";


// create product 

const createProducts = async (req: Request, res: Response) => {
    try {

        const productsData = req.body;
        // data validation using zod 

        const zodparseData = ZodProductValidationSchema.parse(productsData)

        const result = await ProductServices.cteateProduct(zodparseData)
        console.log(result)

        res.status(200).json({
            success: true,
            message: "Product created successfully!",
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to Create products!',
        });
    }
}

// get all product and implemet search params 


const getAllProducts = async (req: Request, res: Response) => {
    try {
        const searchTerm = req.query.searchTerm as string;
        const products = await ProductServices.getAllProduct(searchTerm ?? "");
        res.status(200).json({
            success: true,
            message: "Products matching  fetched successfully!",
            data: products
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to search products!',
        });
    }
}

// single product using param id 


const getSingleProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const product = await ProductServices.getSingleProduct(productId)
        return res.status(200).json({
            success: true,
            message: 'Product fetched successfully',
            data: product
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
        });
    }
}
// update product using put method 


const updateProducts = async (req: Request, res: Response) => {
    try {
        const productId = req.params.productId;
        const updatedProduct: string = req.body;
        const product = await ProductServices.updateProduct(productId, updatedProduct);
        return res.status(200).json({
            success: true,
            message: 'Product updated successfully!',
            data: product
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
        });
    }
}


// delete product using delete method 

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

export const ProductsController = {
    createProducts,
    getAllProducts,
    getSingleProduct,
    updateProducts,
    deleteProduct,

}
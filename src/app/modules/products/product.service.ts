import { Tproducts } from "./products.interface";
import { ProductModel } from "./products.model";

const cteateProduct = async (payload: Tproducts) => {
    const result = await ProductModel.create(payload)
    return result
}
const getAllProduct = async () => {
    const result = await ProductModel.find()
    return result
}
const getSingleProduct = async (productId: string) => {
    const result = await ProductModel.findById(productId)
    return result
}
const updateProduct = async (productId: string, updateProduct: any) => {
    const result = await ProductModel.findByIdAndUpdate(productId, updateProduct, { new: true })
    return result
}

const deleteProduct = async (productId: string) => {
    const deletedProduct = await ProductModel.findByIdAndDelete(productId);
    return deletedProduct;
}

const productFindWithParam = async (req: Request, res: Response) => {
    const products = await ProductModel.find();
    return products;
}

export const ProductServices = {
    cteateProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    productFindWithParam
}
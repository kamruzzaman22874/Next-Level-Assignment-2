import { Tproducts } from "./products.interface";
import { ProductModel } from "./products.model";

const cteateProduct = async (payload: Tproducts) => {
    const result = await ProductModel.create(payload)
    return result
}


const getAllProduct = async (searchTerm: string) => {
    let query;
    if (searchTerm) {
        query = await ProductModel.find({
            $or: [
                { name: { $regex: searchTerm, $options: 'i' } },
                { description: { $regex: searchTerm, $options: 'i' } }
            ]
        })

    } else {

        const result = await ProductModel.find()
        return result
    }
    return query;
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



export const ProductServices = {
    cteateProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
}
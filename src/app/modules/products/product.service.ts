import { Tproducts } from "./products.interface";
import { ProductModel } from "./products.model";


// create product using post method 

const cteateProduct = async (payload: Tproducts) => {
    const result = await ProductModel.create(payload)
    return result
}

//get all product using get method 
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


// get single product using params method 

const getSingleProduct = async (productId: string) => {
    const result = await ProductModel.findById(productId)
    return result
}

// update product using put method 

const updateProduct = async (productId: string, updatedProduct: any) => {
    const result = await ProductModel.findByIdAndUpdate(productId, updatedProduct, { new: true })
    return result
}

// delete product using delete method 

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
import { OrderModel } from "./order.model"

// create orders using post method 

const createOrders = async (payload: string) => {
    const result = await OrderModel.create(payload);
    return result;
}

// get all product using params method 

const getAllOrders = async (email: string) => {
    const query = email ? { email } : {};
    const result = await OrderModel.find(query);
    return result;

}

export const OrderService = {
    createOrders,
    getAllOrders
}
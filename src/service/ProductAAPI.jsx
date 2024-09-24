import axiosInstance from "./axiosInstance";

export const createProduct = async (dataBody) => {
    try {
        const response = await axiosInstance.post(`products/create.json`, 
            dataBody
        );
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
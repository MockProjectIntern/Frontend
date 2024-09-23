import axiosInstance from "./axiosInstance";

export const getProductList = async (page, size, cookie) =>{
    try{
        const response = await axiosInstance.post(`products/filter.json?page=${page}&size=${size}`, cookie);
        return response.data;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}
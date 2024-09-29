import axiosInstance from "./axiosInstance";
import Cookies from 'js-cookie'
export const createNewGRN = async (data) => {
    try {
        const response = await axiosInstance.post(`/grns/create.json`, data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export const getGRNs = async (page, size, filterName, filterJson,data) => {
    try {
   
        const response = await axiosInstance.post(`/grns/filter.json?page=${page}&size=${size}`,

            data
        ,{
        headers : {
            [filterName]: filterJson, // Thiết lập giá trị của filterName vào header
        }
    }
    );
        return response.data;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

export const getAllByOrder = async (orderId, page, size) => {
    try {
        const response = await axiosInstance.get(`/grns/order-all.json/${orderId}?page=${page}&size=${size}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
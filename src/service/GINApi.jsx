import axiosInstance from "./axiosInstance";
import Cookies from 'js-cookie'
export const createNewGIN = async (data) => {
    try {
        const response = await axiosInstance.post(`/gins/create.json`, data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export const getGINs = async (page, size, filterName, filterJson) => {
    try {
   
        const response = await axiosInstance.post(`/gins/filter.json?page=${page}&size=${size}`,{
            keyword: null,
            status: null,
            created_date_from: null,
            created_date_to: null,
            balanced_date_from: null,
            balanced_date_to: null,
            user_created_ids: null,
            user_balanced_ids: null,
            user_inspection_ids: null
        },{
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


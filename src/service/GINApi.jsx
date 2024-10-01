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


export const getGINs = async (page, size, filterName, filterJson,data) => {
    try {
   
        const response = await axiosInstance.post(`/gins/filter.json?page=${page}&size=${size}`,data,{
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

export const getGINDetail = async (id) => {
    try {
        const response = await axiosInstance.get(`/gins/detail.json/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const exportData = async (mode, bodyJson) => {
    try {
        const response = await axiosInstance.post(`/gins/export-data.json?mode=${mode}`, bodyJson);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
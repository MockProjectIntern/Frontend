import axiosInstance from "./axiosInstance";

export const getListSupplierGroups = async(page, size, bodyJson) =>{
    try{
        const response = await axiosInstance.post(`supplier-groups/all.json?page=${page}&size=${size}`, bodyJson);
        return response.data;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}
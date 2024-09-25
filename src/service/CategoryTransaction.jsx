import axiosInstance from "./axiosInstance";

export const getCategoryTransactionList = async (page, size, name, type) => {
    try {
        const response = await axiosInstance.post(`transaction-categories/all.json?page=${page}&size=${size}`, {
            keyword: name,
            type: type
        },);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
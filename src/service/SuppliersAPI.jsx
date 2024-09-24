import axiosInstance from "./axiosInstance";

<<<<<<< HEAD
export const getSupplierList = async (page, size, filterName, filterJson, bodyJson) => {
    try {
        const response = await axiosInstance.post(`suppliers/filter.json?page=${page}&size=${size}`, {
            // Payload của yêu cầu (body)
            bodyJson
=======
export const getSupplierList = async (page, size, filterName, filterJson) => {
    try {
        const response = await axiosInstance.post(`suppliers/filter.json?page=${page}&size=${size}`, {
            // Payload của yêu cầu (body)
>>>>>>> ec2d3b8f20ac85a30df8583fb2fb2dd57458770c
        }, {
            headers: {
                [filterName]: filterJson // Thiết lập giá trị của filterName vào header
            }
        });
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

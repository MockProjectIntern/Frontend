import axiosInstance from "./axiosInstance";

export const getProductList = async (page, size, filterName, filterJson, bodyJson ) => {
    try {
        const response = await axiosInstance.post(`products/filter.json?page=${page}&size=${size}`, {
            // Payload của yêu cầu (body)
            bodyJson
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
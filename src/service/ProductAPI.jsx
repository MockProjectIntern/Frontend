import axiosInstance from "./axiosInstance";

export const getProductList = async (page, size, filterName, filterJson) => {
    try {
        const response = await axiosInstance.post(`products/filter.json?page=${page}&size=${size}`, {
            // Payload của yêu cầu (body)
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

export const quickGetProductList = async (page, size, keyword) => {
    try {
        const response = await axiosInstance.get(`products/quick-get-list.json?page=${page}&size=${size}&keyword=${keyword}`);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }

}
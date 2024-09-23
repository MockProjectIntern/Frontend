import axiosInstance from "./axiosInstance";

export const getSupplierList = async (page, size, filterName, filterJson) => {
    try {
        const response = await axiosInstance.post(`suppliers/filter.json?page=${page}&size=${size}`, {
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

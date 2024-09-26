import axiosInstance from "./axiosInstance";

export const getSupplierList = async (page, size, filterName, filterJson, bodyJson) => {
    try {
        const response = await axiosInstance.post(`suppliers/filter.json?page=${page}&size=${size}`, {
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

export const getAllSupplierByName = async (page, size, name) => {
    try {
        const response = await axiosInstance.get(`suppliers/list-name.json?page=${page}&size=${size}&name=${name}&keyword=${name}`);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const createSupplier = async (dataBody) => {
    try {
        const response = await axiosInstance.post(`suppliers/create.json`,
            dataBody
        );
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const getAllSupplierGroup = async (page, size, dataBody) => {
    try {
        const response = await axiosInstance.post(`supplier-groups/all.json?page=${page}&size=${size}`, dataBody);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
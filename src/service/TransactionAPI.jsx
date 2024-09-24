import axiosInstance from "./axiosInstance";

export const getListTransaction = async (page, size, sort, sortField, filterName, filterJson, dataFilter) => {
    try {
        const response = await axiosInstance.post(`transactions/filter.json?page=${page}&size=${size}&sort=${sort}&sort_field=${sortField}`, 
            dataFilter, 
            {
                headers: {
                    [filterName]: filterJson 
                }
            }
        );
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

import axiosInstance from "./axiosInstance";

export const loginAccount = async (phone, password) => {
    try {
        const response = await axiosInstance.post(`/users/login.json`, {
            phone,
            password
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const registerAccount = async (full_name, phone, password, role) => {
    try {
        const response = await axiosInstance.post(`/users/register.json`, {
            full_name,
            phone,
            password,
            role
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getInforDetails = async () => {
    try {
        const response = await axiosInstance.get(`/users/detail.json`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const refreshToken = async () => {
    try {
        const response = await axiosInstance.post(`/users/refresh-token.json`,
            {
                refresh_token: localStorage.getItem('refreshToken')
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
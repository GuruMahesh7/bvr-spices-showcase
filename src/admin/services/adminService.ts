import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL || ''}/api`;

const getAuthConfig = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
    return {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo?.token}`,
        },
    };
};

export const adminService = {
    // Dashboard
    getDashboardSummary: async () => {
        const { data } = await axios.get(`${API_URL}/dashboard/summary`, getAuthConfig());
        return data;
    },

    // Products
    getProducts: async () => {
        const { data } = await axios.get(`${API_URL}/products`, getAuthConfig());
        return data;
    },
    createProduct: async () => {
        const { data } = await axios.post(`${API_URL}/products`, {}, getAuthConfig());
        return data;
    },
    updateProduct: async (id: string, product: any) => {
        const { data } = await axios.put(`${API_URL}/products/${id}`, product, getAuthConfig());
        return data;
    },
    deleteProduct: async (id: string) => {
        const { data } = await axios.delete(`${API_URL}/products/${id}`, getAuthConfig());
        return data;
    },
    uploadImage: async (formData: FormData) => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
        const { data } = await axios.post(`${API_URL}/upload`, formData, {
            headers: {
                Authorization: `Bearer ${userInfo?.token}`,
            },
        });
        return data;
    },

    // Orders
    getOrders: async () => {
        const { data } = await axios.get(`${API_URL}/orders`, getAuthConfig());
        return data;
    },
    updateOrderStatus: async (id: string, status: string) => {
        const { data } = await axios.put(`${API_URL}/orders/${id}/status`, { status }, getAuthConfig());
        return data;
    },
    getOrderDetails: async (id: string) => {
        const { data } = await axios.get(`${API_URL}/orders/${id}`, getAuthConfig());
        return data;
    },

    // Users
    getUsers: async () => {
        const { data } = await axios.get(`${API_URL}/users`, getAuthConfig());
        return data;
    },
    updateUser: async (id: string, userData: any) => {
        const { data } = await axios.put(`${API_URL}/users/${id}`, userData, getAuthConfig());
        return data;
    },
    deleteUser: async (id: string) => {
        const { data } = await axios.delete(`${API_URL}/users/${id}`, getAuthConfig());
        return data;
    },
};

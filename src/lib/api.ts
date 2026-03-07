export const API_URL = import.meta.env.VITE_API_URL || '';

export const fetchProducts = async () => {
    const response = await fetch(`${API_URL}/api/products`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const fetchProductById = async (id: string) => {
    const response = await fetch(`${API_URL}/api/products/${id}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

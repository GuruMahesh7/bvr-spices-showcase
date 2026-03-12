import { useAuth } from '@/context/AuthContext';
import { Product, CartItem } from '@/context/CartContext';
import { API_URL } from '@/lib/api';

export const useCartApi = () => {
    const { user } = useAuth();
    const token = user?.token;

    const fetchCart = async () => {
        if (!token) return { cartItems: [] };
        const response = await fetch(`${API_URL}/api/cart`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) throw new Error('Failed to fetch cart');
        return response.json();
    };

    const addToCartApi = async (productId: string, qty: number) => {
        if (!token) return;
        const response = await fetch(`${API_URL}/api/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ productId, qty }),
        });
        if (!response.ok) throw new Error('Failed to add to cart');
        return response.json();
    };

    const removeFromCartApi = async (productId: string) => {
        if (!token) return;
        const response = await fetch(`${API_URL}/api/cart/${productId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) throw new Error('Failed to remove from cart');
        return response.json();
    };

    const clearCartApi = async () => {
        if (!token) return;
        const response = await fetch(`${API_URL}/api/cart`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) throw new Error('Failed to clear cart');
        return response.json();
    };

    return { fetchCart, addToCartApi, removeFromCartApi, clearCartApi };
};

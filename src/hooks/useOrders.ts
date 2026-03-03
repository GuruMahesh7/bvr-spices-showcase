import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';

export interface OrderItem {
    name: string;
    qty: number;
    image: string;
    price: number;
    weight?: string;
    product: string;
}

export interface Order {
    _id: string;
    user: string;
    orderItems: OrderItem[];
    shippingAddress: {
        address: string;
        city: string;
        postalCode: string;
        country: string;
    };
    paymentMethod: string;
    paymentResult?: {
        id: string;
        status: string;
        update_time: string;
        email_address: string;
    };
    itemsPrice: number;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
    isPaid: boolean;
    paidAt?: string;
    isDelivered?: boolean;
    deliveredAt?: string;
    createdAt: string;
}

export const useMyOrders = () => {
    const { user } = useAuth();

    return useQuery<Order[]>({
        queryKey: ['myOrders', user?._id], // Key depends on user ID
        queryFn: async () => {
            if (!user?.token) return [];

            const response = await fetch('/api/orders/myorders', {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }

            return response.json();
        },
        enabled: !!user?.token,
    });
};

import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchProductById } from '@/lib/api';
import { Product } from '@/context/CartContext';

// Mapper to convert backend product format to frontend product format if needed
// Backend: _id, name, price, image, category, description, countInStock, etc.
// Frontend: id, name, price, image, category, description, weight, badge, etc.
const mapProduct = (p: any): Product => ({
    id: p._id,
    name: p.name,
    price: p.price,
    originalPrice: p.price * 1.2, // Mock original price
    image: p.image,
    images: p.images || [p.image],
    category: p.category,
    description: p.description,
    weight: p.weight || '100g',
    variants: p.variants || [],
    countInStock: p.countInStock,
    ingredients: p.ingredients,
    usage: p.usageTips, // Backend uses usageTips
    badge: p.isBestSeller ? 'Bestseller' : undefined,
});

export const useProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const data = await fetchProducts();
            return data.map(mapProduct);
        },
    });
};

export const useProduct = (id: string) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const data = await fetchProductById(id);
            return mapProduct(data);
        },
        enabled: !!id,
    });
};

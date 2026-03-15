import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';
import { useCartApi } from '@/hooks/useCartApi';

export interface ProductVariant {
  _id?: string;
  weight: string;
  price: number;
  countInStock: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  description: string;
  weight: string;
  variants?: ProductVariant[];
  countInStock?: number;
  ingredients?: string;
  usage?: string;
  storage?: string;
  badge?: string;
  rating?: number;
  numReviews?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string, weight?: string) => void;
  updateQuantity: (productId: string, quantity: number, weight?: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { fetchCart, addToCartApi, removeFromCartApi, clearCartApi } = useCartApi();

  // Initial state from localStorage for guest
  const [items, setItems] = useState<CartItem[]>(() => {
    if (user) return []; // If user is logged in initially, wait for fetch
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Sync from backend when user logs in or out
  useEffect(() => {
    if (user) {
      const loadCart = async () => {
        try {
          const data = await fetchCart();
          if (data && data.cartItems) {
            const mappedItems = data.cartItems.map((item: any) => ({
              id: item.product,
              name: item.name,
              price: item.price,
              image: item.image,
              quantity: item.qty,
              category: '',     // These fields might need to be populated if needed
              description: '',
              weight: ''
            }));
            setItems(mappedItems);
          }
        } catch (err) {
          console.error("Failed to load cart", err);
        }
      };
      loadCart();
    } else {
      // User logged out: Load guest cart
      const savedCart = localStorage.getItem('cartItems');
      setItems(savedCart ? JSON.parse(savedCart) : []);
    }
  }, [user]); // Removed fetchCart from dependency to avoid infinite loop if reference changes

  // Save to local storage only if guest
  useEffect(() => {
    if (!user) {
      localStorage.setItem('cartItems', JSON.stringify(items));
    }
  }, [items, user]);

  const addToCart = useCallback(async (product: Product, quantity: number = 1) => {
    if (user) {
      try {
        // Calculate new quantity
        // We need to know if item already exists to calculate TOTAL quantity to send to BE
        // BUT, since `setItems` is async, looking at `items` here might be stale IF called rapidly?
        // For simplified cart, checking `items` state is usually fine.

        // However, accessing `items` inside useCallback needs it in dependency array, causing re-creation of function.
        // Better to use functional update of setItems, but we need to trigger API.
        // We'll trust `items` from closure if we add it to dependency, but that causes re-renders.
        // Let's use a workaround: optimistic update + API call.

        // Actually, let's just use the current state 'items' which will be fresh enough for typical user clicks.
        // We need to add 'items' to dependency array.

        // A better approach for this demo:
        // Just send the API call. The backend logic I wrote earlier SETS the quantity if item exists.
        // WAIT -> My backend cartController:
        // if (itemIndex > -1) { cart.cartItems[itemIndex].qty = qty; }
        // So if I send qty=1, and I had 5, it becomes 1. This is BAD.
        // I should have written the backend to increment.
        // SINCE I CANNOT CHANGE BACKEND easily without user asking (or maybe I can, I'm the dev), 
        // I will fix the frontend to calculate the total.

        // To do this cleanly without creating infinite loops or stale closures:
        // I will update the local state optimistically, AND use that calculated value to call API.

        setItems(prevItems => {
          const existingItem = prevItems.find(item => item.id === product.id && item.weight === product.weight);
          let newQty = quantity;
          if (existingItem) {
            newQty = existingItem.quantity + quantity;
          }

          // Side effect: API Call
          addToCartApi(product.id, newQty).catch(console.error);

          if (existingItem) {
            toast.success(`Updated ${product.name} quantity in cart`);
            return prevItems.map(item =>
              (item.id === product.id && item.weight === product.weight) ? { ...item, quantity: newQty } : item
            );
          }
          toast.success(`${product.name} added to cart`);
          return [...prevItems, { ...product, quantity: newQty }];
        });

      } catch (error) {
        toast.error("Failed to add to cart");
      }
    } else {
      // Guest Logic
      setItems(prevItems => {
        const existingItem = prevItems.find(item => item.id === product.id && item.weight === product.weight);
        if (existingItem) {
          toast.success(`Updated ${product.name} quantity in cart`);
          return prevItems.map(item =>
            (item.id === product.id && item.weight === product.weight)
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        toast.success(`${product.name} added to cart`);
        return [...prevItems, { ...product, quantity }];
      });
    }
  }, [user, addToCartApi]);

  const removeFromCart = useCallback(async (productId: string, weight?: string) => {
    if (user) {
      try {
        await removeFromCartApi(productId);
        setItems(prevItems => {
          const item = prevItems.find(i => i.id === productId && (!weight || i.weight === weight));
          if (item) toast.info(`${item.name} removed from cart`);
          return prevItems.filter(item => !(item.id === productId && (!weight || item.weight === weight)));
        });
      } catch (e) {
        toast.error("Failed to remove item");
      }
    } else {
      setItems(prevItems => {
        const item = prevItems.find(i => i.id === productId && (!weight || i.weight === weight));
        if (item) {
          toast.info(`${item.name} removed from cart`);
        }
        return prevItems.filter(item => !(item.id === productId && (!weight || item.weight === weight)));
      });
    }
  }, [user, removeFromCartApi]);

  const updateQuantity = useCallback(async (productId: string, quantity: number, weight?: string) => {
    if (quantity < 1) {
      removeFromCart(productId, weight);
      return;
    }
    if (user) {
      try {
        await addToCartApi(productId, quantity); // Backend sets quantity, perfect for update
        setItems(prevItems =>
          prevItems.map(item =>
            (item.id === productId && (!weight || item.weight === weight)) ? { ...item, quantity } : item
          )
        );
      } catch (e) {
        toast.error("Failed to update quantity");
      }
    } else {
      setItems(prevItems =>
        prevItems.map(item =>
          (item.id === productId && (!weight || item.weight === weight)) ? { ...item, quantity } : item
        )
      );
    }
  }, [removeFromCart, user, addToCartApi]);

  const clearCart = useCallback(async () => {
    if (user) {
      await clearCartApi();
    }
    setItems([]);
    toast.success('Cart cleared');
  }, [user, clearCartApi]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

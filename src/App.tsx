import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminLayout from "./admin/components/AdminLayout";
import AdminRoute from "./admin/components/AdminRoute";
import Dashboard from "./admin/pages/Dashboard";
import ProductManager from "./admin/pages/ProductManager";
import OrderManager from "./admin/pages/OrderManager";
import UserManager from "./admin/pages/UserManager";
import Reports from "./admin/pages/Reports";
import Settings from "./admin/pages/Settings";
import NotFound from "./pages/NotFound";


const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      {!isAdminRoute && !isAuthPage && <Header />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Routes */}
          <Route element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/products" element={<ProductManager />} />
              <Route path="/admin/orders" element={<OrderManager />} />
              <Route path="/admin/users" element={<UserManager />} />
              <Route path="/admin/reports" element={<Reports />} />
              <Route path="/admin/settings" element={<Settings />} />
            </Route>
          </Route>

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isAdminRoute && !isAuthPage && <Footer />}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster />
          <Sonner position="top-center" />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SubCategory from "./pages/SubCategory";
import Category from "./pages/Category";
import Store from "./pages/Store";
import Profile from "./pages/Profile";
import CartEnhanced from "./pages/CartEnhanced";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import DeliveryTracking from "./pages/DeliveryTracking";
import OrderDetails from "./pages/OrderDetails";
import OrderCancel from "./pages/OrderCancel";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/category/:categoryId" element={<Category />} />
          <Route path="/categories/:categoryId" element={<SubCategory />} />
          <Route
            path="/category/:mainCategory/:subCategory"
            element={<Category />}
          />
          <Route path="/store/:storeId" element={<Store />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<CartEnhanced />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/delivery-tracking" element={<DeliveryTracking />} />
          <Route path="/order-details/:orderId" element={<OrderDetails />} />
          <Route path="/order-cancel/:orderId" element={<OrderCancel />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);

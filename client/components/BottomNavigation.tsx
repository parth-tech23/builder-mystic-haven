import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

export default function BottomNavigation() {
  const location = useLocation();
  const [cartItemsCount, setCartItemsCount] = useState(0);

  // Update cart count when component mounts or location changes
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItemsCount(cart.length);
    };

    updateCartCount();

    // Listen for cart updates
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "cart") {
        updateCartCount();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Also listen for custom cart update events (for same-tab updates)
    const handleCartUpdate = () => updateCartCount();
    window.addEventListener("cartUpdate", handleCartUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartUpdate", handleCartUpdate);
    };
  }, [location]);

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-screen-sm mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          {/* Home */}
          <Link
            to="/"
            className={`flex flex-col items-center justify-center h-14 w-20 px-1 py-2 rounded-xl transition-all duration-300 relative ${
              isActive("/")
                ? "text-white bg-primary shadow-lg scale-105"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <Home
              className={`h-6 w-6 mb-1 ${isActive("/") ? "stroke-2" : ""}`}
            />
            <span
              className={`text-xs ${isActive("/") ? "font-semibold" : "font-medium"}`}
            >
              Home
            </span>
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className={`flex flex-col items-center justify-center h-14 w-20 px-1 py-2 rounded-xl transition-all duration-300 relative ${
              isActive("/cart")
                ? "text-white bg-primary shadow-lg scale-105"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <div className="relative">
              <ShoppingCart
                className={`h-6 w-6 mb-1 ${isActive("/cart") ? "stroke-2" : ""}`}
              />
              {cartItemsCount > 0 && (
                <Badge
                  className="absolute -top-2 -right-2 h-5 w-5 text-xs p-0 flex items-center justify-center bg-red-500 text-white border-2 border-white"
                  variant="destructive"
                >
                  {cartItemsCount > 99 ? "99+" : cartItemsCount}
                </Badge>
              )}
            </div>
            <span
              className={`text-xs ${isActive("/cart") ? "font-semibold" : "font-medium"}`}
            >
              Cart
            </span>
          </Link>

          {/* Profile */}
          <Link
            to="/profile"
            className={`flex flex-col items-center justify-center h-14 w-20 px-1 py-2 rounded-xl transition-all duration-300 relative ${
              isActive("/profile")
                ? "text-white bg-primary shadow-lg scale-105"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <User
              className={`h-6 w-6 mb-1 ${isActive("/profile") ? "stroke-2" : ""}`}
            />
            <span
              className={`text-xs ${isActive("/profile") ? "font-semibold" : "font-medium"}`}
            >
              Profile
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

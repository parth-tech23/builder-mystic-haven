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

  const getActiveStyles = (path: string) => {
    return isActive(path)
      ? "text-primary bg-primary/10 border border-primary/20"
      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50";
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-screen-sm mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          {/* Home */}
          <Link
            to="/"
            className={`flex flex-col items-center justify-center h-12 w-16 px-1 py-2 rounded-lg transition-all duration-200 ${getActiveStyles("/")}`}
          >
            <Home className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Home</span>
            {isActive("/") && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-primary rounded-t-full"></div>
            )}
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className={`flex flex-col items-center justify-center h-12 w-16 px-1 py-2 rounded-lg transition-all duration-200 relative ${getActiveStyles("/cart")}`}
          >
            <div className="relative">
              <ShoppingCart className="h-5 w-5 mb-1" />
              {cartItemsCount > 0 && (
                <Badge
                  className="absolute -top-2 -right-2 h-5 w-5 text-xs p-0 flex items-center justify-center bg-red-500 hover:bg-red-500"
                  variant="destructive"
                >
                  {cartItemsCount > 99 ? "99+" : cartItemsCount}
                </Badge>
              )}
            </div>
            <span className="text-xs font-medium">Cart</span>
            {isActive("/cart") && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-primary rounded-t-full"></div>
            )}
          </Link>

          {/* Profile */}
          <Link
            to="/profile"
            className={`flex flex-col items-center justify-center h-12 w-16 px-1 py-2 rounded-lg transition-all duration-200 relative ${getActiveStyles("/profile")}`}
          >
            <User className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Profile</span>
            {isActive("/profile") && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-primary rounded-t-full"></div>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}

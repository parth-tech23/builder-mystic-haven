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

  const getIconColor = (path: string) => {
    return isActive(path) ? "text-primary" : "text-gray-500";
  };

  const getButtonVariant = (path: string) => {
    return isActive(path) ? "default" : "ghost";
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-screen-sm mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          {/* Home */}
          <Button
            variant={getButtonVariant("/")}
            size="sm"
            asChild
            className={`flex-col h-12 w-16 px-1 ${getIconColor("/")}`}
          >
            <Link to="/">
              <Home className="h-5 w-5 mb-1" />
              <span className="text-xs">Home</span>
            </Link>
          </Button>

          {/* Cart */}
          <Button
            variant={getButtonVariant("/cart")}
            size="sm"
            asChild
            className={`flex-col h-12 w-16 px-1 relative ${getIconColor("/cart")}`}
          >
            <Link to="/cart">
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
              <span className="text-xs">Cart</span>
            </Link>
          </Button>

          {/* Profile */}
          <Button
            variant={getButtonVariant("/profile")}
            size="sm"
            asChild
            className={`flex-col h-12 w-16 px-1 ${getIconColor("/profile")}`}
          >
            <Link to="/profile">
              <User className="h-5 w-5 mb-1" />
              <span className="text-xs">Profile</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

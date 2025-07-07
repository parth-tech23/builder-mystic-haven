import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  storeName: string;
  storeLocation?: string;
  storeDistance?: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  rating: number;
  deliveryTime: string;
  quantity: number;
  addedAt: string;
}

export default function Cart() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  const fromCategory = searchParams.get("from") === "category";
  const fromStore = searchParams.get("from") === "store";
  const mainCategory = searchParams.get("mainCategory");
  const subCategory = searchParams.get("subCategory");
  const storeId = searchParams.get("storeId");

  useEffect(() => {
    // Load cart items from localStorage
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(savedCart);

    // Show payment options if redirected from category or store after adding item
    if (fromCategory || fromStore) {
      setShowPaymentOptions(true);
    }
  }, [fromCategory, fromStore]);

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(itemId);
      return;
    }

    const updatedItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item,
    );
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  const removeItem = (itemId: string) => {
    const updatedItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  const getSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const getTotalSavings = () => {
    return cartItems.reduce((total, item) => {
      if (item.originalPrice) {
        return total + (item.originalPrice - item.price) * item.quantity;
      }
      return total;
    }, 0);
  };

  const continueShopping = () => {
    setShowPaymentOptions(false);
    if (storeId) {
      navigate(`/store/${storeId}`);
    } else if (mainCategory && subCategory) {
      navigate(`/category/${mainCategory}/${subCategory}`);
    } else if (mainCategory) {
      navigate(`/categories/${mainCategory}`);
    } else {
      navigate("/");
    }
  };

  const proceedToPayment = () => {
    navigate("/payment");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Link to="/" className="text-primary hover:text-primary/80">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
                <h1 className="text-xl font-semibold">Shopping Cart</h1>
              </div>
            </div>
          </div>
        </header>

        {/* Empty Cart */}
        <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="text-center">
            <CardContent className="p-8">
              <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-6">
                Start shopping to add items to your cart and compare prices
                across stores.
              </p>
              <Button asChild className="w-full">
                <Link to="/">Start Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-primary hover:text-primary/80">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-xl font-semibold">Shopping Cart</h1>
              <Badge variant="secondary">{cartItems.length} items</Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Payment Options Banner */}
        {showPaymentOptions && (
          <Card className="mb-6 bg-gradient-to-r from-primary to-primary/80 border-0">
            <CardContent className="p-6">
              <div className="text-center text-white">
                <h3 className="text-lg font-semibold mb-3">
                  Item Added to Cart!
                </h3>
                <div className="flex gap-4 justify-center">
                  <Button
                    variant="secondary"
                    onClick={continueShopping}
                    className="min-w-[140px]"
                  >
                    Continue Shopping
                  </Button>
                  <Button
                    variant="outline"
                    onClick={proceedToPayment}
                    className="min-w-[140px] bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    Proceed to Payment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Cart Items</h2>

            {cartItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{item.productImage}</div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {item.productName}
                          </h3>
                          <p className="text-sm text-gray-600">
                            from {item.storeName}
                          </p>
                          {item.storeLocation && (
                            <p className="text-xs text-blue-600">
                              📍 {item.storeLocation}
                              {item.storeDistance && ` • ${item.storeDistance}`}
                            </p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-gray-900">
                            ₹{item.price}
                          </span>
                          {item.originalPrice && (
                            <>
                              <span className="text-sm text-gray-500 line-through">
                                ₹{item.originalPrice}
                              </span>
                              {item.discount && (
                                <Badge variant="secondary" className="text-xs">
                                  {item.discount}
                                </Badge>
                              )}
                            </>
                          )}
                        </div>

                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="font-semibold min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-3 text-sm text-gray-600">
                        <span>Delivery: {item.deliveryTime}</span>
                        <span className="font-semibold text-gray-900">
                          Subtotal: ₹{item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{getSubtotal()}</span>
                </div>

                {getTotalSavings() > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>You saved</span>
                    <span className="font-semibold">₹{getTotalSavings()}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>

                <hr />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{getSubtotal()}</span>
                </div>

                <div className="space-y-3 pt-4">
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={proceedToPayment}
                  >
                    Proceed to Payment
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={continueShopping}
                  >
                    Continue Shopping
                  </Button>
                </div>

                <div className="text-xs text-gray-500 text-center pt-2">
                  ₹1000 refundable deposit required for checkout
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

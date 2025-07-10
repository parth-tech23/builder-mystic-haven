import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
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

interface StoreComparison {
  storeName: string;
  storeLocation: string;
  storeDistance: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  rating: number;
  deliveryTime: string;
  availability: string;
}

// Mock data for price comparison across stores
const productComparisons: { [key: string]: StoreComparison[] } = {
  "milk-1l": [
    {
      storeName: "DMart",
      storeLocation: "Bopal, Ahmedabad",
      storeDistance: "4.2 km",
      price: 58,
      rating: 4.6,
      deliveryTime: "25-30 mins",
      availability: "in-stock",
    },
    {
      storeName: "Zepto",
      storeLocation: "Satellite, Ahmedabad",
      storeDistance: "2.1 km",
      price: 59,
      rating: 4.8,
      deliveryTime: "10-15 mins",
      availability: "in-stock",
    },
    {
      storeName: "Blinkit",
      storeLocation: "Vastrapur, Ahmedabad",
      storeDistance: "1.2 km",
      price: 60,
      originalPrice: 63,
      discount: "5% off",
      rating: 4.9,
      deliveryTime: "8-12 mins",
      availability: "in-stock",
    },
    {
      storeName: "Reliance Fresh",
      storeLocation: "CG Road, Ahmedabad",
      storeDistance: "3.5 km",
      price: 62,
      originalPrice: 65,
      discount: "5% off",
      rating: 4.7,
      deliveryTime: "20-25 mins",
      availability: "in-stock",
    },
    {
      storeName: "Swiggy Instamart",
      storeLocation: "Prahlad Nagar, Ahmedabad",
      storeDistance: "2.8 km",
      price: 61,
      rating: 4.6,
      deliveryTime: "15-25 mins",
      availability: "in-stock",
    },
  ],
  bread: [
    {
      storeName: "Reliance Fresh",
      storeLocation: "CG Road, Ahmedabad",
      storeDistance: "3.5 km",
      price: 38,
      rating: 4.5,
      deliveryTime: "20-25 mins",
      availability: "in-stock",
    },
    {
      storeName: "Blinkit",
      storeLocation: "Vastrapur, Ahmedabad",
      storeDistance: "1.2 km",
      price: 42,
      rating: 4.7,
      deliveryTime: "8-12 mins",
      availability: "in-stock",
    },
    {
      storeName: "Zepto",
      storeLocation: "Satellite, Ahmedabad",
      storeDistance: "2.1 km",
      price: 45,
      rating: 4.6,
      deliveryTime: "10-15 mins",
      availability: "in-stock",
    },
    {
      storeName: "DMart",
      storeLocation: "Bopal, Ahmedabad",
      storeDistance: "4.2 km",
      price: 40,
      rating: 4.4,
      deliveryTime: "25-30 mins",
      availability: "in-stock",
    },
  ],
  "samsung-galaxy-phone": [
    {
      storeName: "Croma",
      storeLocation: "Himalaya Mall, Ahmedabad",
      storeDistance: "6.1 km",
      price: 15499,
      originalPrice: 17999,
      discount: "14% off",
      rating: 4.5,
      deliveryTime: "40-50 mins",
      availability: "in-stock",
    },
    {
      storeName: "Blinkit",
      storeLocation: "Vastrapur, Ahmedabad",
      storeDistance: "1.2 km",
      price: 15999,
      originalPrice: 17999,
      discount: "11% off",
      rating: 4.6,
      deliveryTime: "8-12 mins",
      availability: "in-stock",
    },
    {
      storeName: "Flipkart Quick",
      storeLocation: "Science City, Ahmedabad",
      storeDistance: "5.5 km",
      price: 15699,
      originalPrice: 17999,
      discount: "13% off",
      rating: 4.4,
      deliveryTime: "20-30 mins",
      availability: "in-stock",
    },
  ],
  "red-apples": [
    {
      storeName: "Zepto",
      storeLocation: "Satellite, Ahmedabad",
      storeDistance: "2.1 km",
      price: 168,
      rating: 4.9,
      deliveryTime: "10-15 mins",
      availability: "in-stock",
    },
    {
      storeName: "Blinkit",
      storeLocation: "Vastrapur, Ahmedabad",
      storeDistance: "1.2 km",
      price: 170,
      originalPrice: 185,
      discount: "8% off",
      rating: 4.9,
      deliveryTime: "8-12 mins",
      availability: "in-stock",
    },
    {
      storeName: "Reliance Fresh",
      storeLocation: "CG Road, Ahmedabad",
      storeDistance: "3.5 km",
      price: 180,
      originalPrice: 200,
      discount: "10% off",
      rating: 4.6,
      deliveryTime: "20-25 mins",
      availability: "in-stock",
    },
    {
      storeName: "DMart",
      storeLocation: "Bopal, Ahmedabad",
      storeDistance: "4.2 km",
      price: 165,
      rating: 4.5,
      deliveryTime: "25-30 mins",
      availability: "in-stock",
    },
  ],
};

export default function CartEnhanced() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [showComparisons, setShowComparisons] = useState(true);

  const fromCategory = searchParams.get("from") === "category";
  const fromStore = searchParams.get("from") === "store";
  const mainCategory = searchParams.get("mainCategory");
  const subCategory = searchParams.get("subCategory");
  const storeId = searchParams.get("storeId");

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(savedCart);

    if (fromCategory || fromStore) {
      setShowPaymentOptions(true);
      // Auto-expand price comparisons for newly added items
      if (savedCart.length > 0) {
        const allItemIds = new Set(savedCart.map((item: CartItem) => item.id));
        setExpandedItems(allItemIds);
      }
    }
  }, [fromCategory, fromStore]);

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
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

  const switchStore = (itemId: string, newStore: StoreComparison) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          id: `${item.productId}-${newStore.storeName.toLowerCase()}`,
          storeName: newStore.storeName,
          storeLocation: newStore.storeLocation,
          storeDistance: newStore.storeDistance,
          price: newStore.price,
          originalPrice: newStore.originalPrice,
          discount: newStore.discount,
          rating: newStore.rating,
          deliveryTime: newStore.deliveryTime,
        };
      }
      return item;
    });
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (expandedItems.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const getProductKey = (productName: string) => {
    const name = productName.toLowerCase();
    if (name.includes("milk")) return "milk-1l";
    if (name.includes("bread")) return "bread";
    if (name.includes("samsung") && name.includes("galaxy"))
      return "samsung-galaxy-phone";
    if (name.includes("apple") && name.includes("red")) return "red-apples";
    if (name.includes("apples")) return "red-apples";
    return name.replace(/\s+/g, "-");
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

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {showPaymentOptions && (
          <>
            {/* Price Comparison Alert */}
            {cartItems.length > 0 && (
              <Card className="mb-6 bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">💰</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-orange-800 mb-2">
                        Price Comparison Available!
                      </h4>
                      <p className="text-sm text-orange-700 mb-3">
                        We found the same products at different prices across
                        stores. Check below to potentially save money on your
                        order.
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-orange-600">
                        <span>✓ Compare prices across 8+ stores</span>
                        <span>✓ Switch to better deals instantly</span>
                        <span>✓ Save on delivery with nearby stores</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Cart Items with Price Comparison
            </h2>

            {cartItems.map((item) => {
              const productKey = getProductKey(item.productName);
              const comparisons = productComparisons[productKey] || [];
              const sortedComparisons = comparisons
                .sort((a, b) => a.price - b.price)
                .sort(
                  (a, b) =>
                    parseFloat(a.storeDistance) - parseFloat(b.storeDistance),
                );

              return (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
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
                                📍 {item.storeLocation}{" "}
                                {item.storeDistance &&
                                  ` • ${item.storeDistance}`}
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

                        <div className="flex items-center justify-between mb-3">
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
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
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
                              disabled={item.quantity <= 1}
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

                        {comparisons.length > 0 && (
                          <div className="border-t pt-4">
                            <div className="flex justify-between items-center mb-3">
                              <h4 className="text-sm font-semibold text-gray-700 flex items-center">
                                💰 All Available Options ({comparisons.length}{" "}
                                stores)
                              </h4>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleExpanded(item.id)}
                                className="text-xs"
                              >
                                {expandedItems.has(item.id) ? "Hide" : "Show"}
                              </Button>
                            </div>

                            {/* Always show top 2 comparisons */}
                            <div className="space-y-2 mb-3">
                              {sortedComparisons
                                .slice(0, 2)
                                .map((comparison, index) => (
                                  <div
                                    key={comparison.storeName}
                                    className={`p-3 rounded-lg border ${
                                      comparison.storeName === item.storeName
                                        ? "bg-primary/5 border-primary/20"
                                        : index === 0
                                          ? "bg-green-50 border-green-200"
                                          : "bg-gray-50 border-gray-200"
                                    }`}
                                  >
                                    <div className="flex justify-between items-center">
                                      <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-1">
                                          <span className="font-medium text-sm">
                                            {comparison.storeName}
                                          </span>
                                          {index === 0 &&
                                            comparison.storeName !==
                                              item.storeName && (
                                              <Badge className="bg-green-100 text-green-800 text-xs">
                                                <TrendingDown className="h-3 w-3 mr-1" />
                                                Best Price
                                              </Badge>
                                            )}
                                          {comparison.storeName ===
                                            item.storeName && (
                                            <Badge
                                              variant="outline"
                                              className="text-xs"
                                            >
                                              Current
                                            </Badge>
                                          )}
                                        </div>
                                        <p className="text-xs text-gray-600">
                                          📍 {comparison.storeLocation} •{" "}
                                          {comparison.storeDistance}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                          Delivery: {comparison.deliveryTime}
                                        </p>
                                      </div>
                                      <div className="flex items-center space-x-3">
                                        <div className="text-right">
                                          <p className="font-bold text-sm">
                                            ���{comparison.price}
                                          </p>
                                          {comparison.originalPrice && (
                                            <p className="text-xs text-gray-500 line-through">
                                              ₹{comparison.originalPrice}
                                            </p>
                                          )}
                                          {comparison.price < item.price && (
                                            <p className="text-xs text-green-600 font-medium">
                                              Save ₹
                                              {item.price - comparison.price}
                                            </p>
                                          )}
                                        </div>
                                        {comparison.storeName !==
                                          item.storeName && (
                                          <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() =>
                                              switchStore(item.id, comparison)
                                            }
                                            className="text-xs"
                                          >
                                            Switch
                                          </Button>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                            </div>

                            {expandedItems.has(item.id) &&
                              sortedComparisons.length > 2 && (
                                <div className="space-y-2">
                                  <h4 className="text-sm font-semibold text-gray-700">
                                    All Available Options:
                                  </h4>
                                  {sortedComparisons
                                    .slice(2)
                                    .map((comparison, index) => (
                                      <div
                                        key={comparison.storeName}
                                        className={`p-3 rounded-lg border ${
                                          comparison.storeName ===
                                          item.storeName
                                            ? "bg-primary/5 border-primary/20"
                                            : "bg-gray-50 border-gray-200"
                                        }`}
                                      >
                                        <div className="flex justify-between items-center">
                                          <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-1">
                                              <span className="font-medium text-sm">
                                                {comparison.storeName}
                                              </span>
                                              {index === 0 &&
                                                comparison.storeName !==
                                                  item.storeName && (
                                                  <Badge className="bg-green-100 text-green-800 text-xs">
                                                    <TrendingDown className="h-3 w-3 mr-1" />
                                                    Best Price
                                                  </Badge>
                                                )}
                                              {comparison.storeName ===
                                                item.storeName && (
                                                <Badge
                                                  variant="outline"
                                                  className="text-xs"
                                                >
                                                  Current
                                                </Badge>
                                              )}
                                            </div>
                                            <p className="text-xs text-gray-600">
                                              📍 {comparison.storeLocation} •{" "}
                                              {comparison.storeDistance}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                              Delivery:{" "}
                                              {comparison.deliveryTime}
                                            </p>
                                          </div>
                                          <div className="flex items-center space-x-3">
                                            <div className="text-right">
                                              <p className="font-bold text-sm">
                                                ₹{comparison.price}
                                              </p>
                                              {comparison.originalPrice && (
                                                <p className="text-xs text-gray-500 line-through">
                                                  ₹{comparison.originalPrice}
                                                </p>
                                              )}
                                            </div>
                                            {comparison.storeName !==
                                              item.storeName && (
                                              <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() =>
                                                  switchStore(
                                                    item.id,
                                                    comparison,
                                                  )
                                                }
                                                className="text-xs"
                                              >
                                                Switch
                                              </Button>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                </div>
                              )}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

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

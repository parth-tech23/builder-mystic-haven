import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Star, Plus, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import CartValidationDialog from "@/components/CartValidationDialog";

interface CategoryProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  rating: number;
  reviews: number;
  storeName: string;
  storeLocation: string;
  storeDistance: string;
  deliveryTime: string;
  availability: "in-stock" | "low-stock" | "out-of-stock";
}

export default function Category() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [showCartValidation, setShowCartValidation] = useState(false);
  const [pendingProduct, setPendingProduct] = useState<CategoryProduct | null>(
    null,
  );

  const categoryData = {
    essentials: {
      name: "Essentials",
      icon: "🛒",
      description: "Daily necessities and food items",
    },
    "home-living": {
      name: "Home & Living",
      icon: "🏠",
      description: "Furniture, decor, and household items",
    },
    lifestyle: {
      name: "Lifestyle",
      icon: "✨",
      description: "Fashion, beauty, and lifestyle products",
    },
    electronics: {
      name: "Electronics",
      icon: "📱",
      description: "Gadgets, appliances, and tech products",
    },
    automobile: {
      name: "Automobile",
      icon: "🚗",
      description: "Car accessories and automotive products",
    },
    hospitality: {
      name: "Hospitality",
      icon: "🏨",
      description: "Snacks, beverages, and hospitality items",
    },
    "fitness-sports": {
      name: "Fitness & Sports",
      icon: "🏋️",
      description: "Exercise equipment and sports gear",
    },
  };

  // Sample products aggregated from all stores for the category
  const categoryProducts: CategoryProduct[] = [
    // Sample data - in real app this would come from API
    {
      id: "milk-1l-multiple",
      name: "Fresh Milk 1L",
      image: "🥛",
      price: 58,
      originalPrice: 65,
      discount: "11% off",
      rating: 4.7,
      reviews: 1240,
      storeName: "DMart",
      storeLocation: "Bopal, Ahmedabad",
      storeDistance: "4.2 km",
      deliveryTime: "25-30 mins",
      availability: "in-stock",
    },
    {
      id: "bread-multiple",
      name: "Whole Wheat Bread",
      image: "🍞",
      price: 38,
      originalPrice: 42,
      discount: "10% off",
      rating: 4.5,
      reviews: 890,
      storeName: "Reliance Fresh",
      storeLocation: "CG Road, Ahmedabad",
      storeDistance: "3.5 km",
      deliveryTime: "20-25 mins",
      availability: "in-stock",
    },
    {
      id: "bananas-multiple",
      name: "Fresh Bananas 1kg",
      image: "🍌",
      price: 55,
      originalPrice: 60,
      discount: "8% off",
      rating: 4.8,
      reviews: 640,
      storeName: "Blinkit",
      storeLocation: "Vastrapur, Ahmedabad",
      storeDistance: "1.2 km",
      deliveryTime: "8-12 mins",
      availability: "in-stock",
    },
    {
      id: "rice-multiple",
      name: "Basmati Rice 5kg",
      image: "🍚",
      price: 450,
      originalPrice: 500,
      discount: "10% off",
      rating: 4.6,
      reviews: 280,
      storeName: "Big Basket",
      storeLocation: "Gurukul, Ahmedabad",
      storeDistance: "7.3 km",
      deliveryTime: "45-60 mins",
      availability: "in-stock",
    },
  ];

  const category = categoryData[categoryId as keyof typeof categoryData];

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Category not found
            </h2>
            <Button asChild>
              <Link to="/">Go back to home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const addToCart = (product: CategoryProduct) => {
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if cart has items from different store
    if (existingCart.length > 0) {
      const currentStoreName = existingCart[0].storeName;
      if (currentStoreName !== product.storeName) {
        // Show validation dialog
        setPendingProduct(product);
        setShowCartValidation(true);
        return;
      }
    }

    // If no conflict, add directly
    addProductToCart(product);
  };

  const addProductToCart = (product: CategoryProduct) => {
    // Get existing cart from localStorage (fresh copy)
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Create cart item
    const cartItem = {
      id: `${product.id}-${product.storeName.toLowerCase()}`,
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      storeName: product.storeName,
      storeLocation: product.storeLocation,
      storeDistance: product.storeDistance,
      price: product.price,
      originalPrice: product.originalPrice,
      discount: product.discount,
      rating: product.rating,
      deliveryTime: product.deliveryTime,
      quantity: 1,
      addedAt: new Date().toISOString(),
    };

    // Add to cart
    const updatedCart = [...existingCart, cartItem];
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Navigate to cart
    navigate(`/cart?from=category&categoryId=${categoryId}`);
  };

  const handleClearAndAdd = () => {
    if (pendingProduct) {
      // Clear existing cart
      localStorage.setItem("cart", JSON.stringify([]));
      // Add new product
      addProductToCart(pendingProduct);
      // Close dialog
      setShowCartValidation(false);
      setPendingProduct(null);
    }
  };

  const handleKeepCurrentCart = () => {
    setShowCartValidation(false);
    setPendingProduct(null);
  };

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
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{category.icon}</div>
                <div>
                  <h1 className="text-xl font-semibold">{category.name}</h1>
                  <p className="text-sm text-gray-600">
                    {category.description}
                  </p>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Category Info */}
        <Card className="mb-6 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-4xl mb-3">{category.icon}</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {category.name}
              </h2>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <Badge className="bg-primary/10 text-primary">
                Best prices across all stores
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Available Products
            </h3>
            <p className="text-sm text-gray-600">
              {categoryProducts.length} products from multiple stores
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <Card
                key={product.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{product.image}</div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {product.name}
                    </h4>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-gray-900">
                          ₹{product.price}
                        </span>
                        {product.originalPrice && (
                          <>
                            <span className="text-sm text-gray-500 line-through">
                              ₹{product.originalPrice}
                            </span>
                            {product.discount && (
                              <Badge variant="secondary" className="text-xs">
                                {product.discount}
                              </Badge>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{product.rating}</span>
                        <span>({product.reviews})</span>
                      </div>
                      <Badge
                        variant={
                          product.availability === "in-stock"
                            ? "default"
                            : product.availability === "low-stock"
                              ? "secondary"
                              : "destructive"
                        }
                        className="text-xs"
                      >
                        {product.availability.replace("-", " ")}
                      </Badge>
                    </div>

                    {/* Store Info */}
                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3 text-primary" />
                          <span className="font-medium">
                            {product.storeName}
                          </span>
                        </div>
                        <span className="text-gray-600">
                          {product.storeDistance}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Delivery: {product.deliveryTime}
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    onClick={() => addToCart(product)}
                    disabled={product.availability === "out-of-stock"}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

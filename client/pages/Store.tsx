import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingCart,
  Star,
  Plus,
  MapPin,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface StoreProduct {
  id: string;
  name: string;
  image: string;
  category: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  rating: number;
  reviews: number;
  availability: "in-stock" | "low-stock" | "out-of-stock";
}

interface StoreInfo {
  name: string;
  displayName: string;
  rating: number;
  deliveryTime: string;
  storeLocation: string;
  distance: string;
  type: string;
  discount: string;
  categories: string[];
}

const storeData: { [key: string]: StoreInfo } = {
  blinkit: {
    name: "blinkit",
    displayName: "Blinkit",
    rating: 4.9,
    deliveryTime: "8-12 mins",
    storeLocation: "Vastrapur, Ahmedabad",
    distance: "1.2 km",
    type: "Quick Commerce",
    discount: "15% off on first order",
    categories: ["food", "health"],
  },
  zepto: {
    name: "zepto",
    displayName: "Zepto",
    rating: 4.8,
    deliveryTime: "10-15 mins",
    storeLocation: "Satellite, Ahmedabad",
    distance: "2.1 km",
    type: "Quick Commerce",
    discount: "Free delivery",
    categories: ["food", "health"],
  },
  "reliance-fresh": {
    name: "reliance-fresh",
    displayName: "Reliance Fresh",
    rating: 4.7,
    deliveryTime: "20-25 mins",
    storeLocation: "CG Road, Ahmedabad",
    distance: "3.5 km",
    type: "Supermarket",
    discount: "Up to 20% off",
    categories: ["food", "home"],
  },
  dmart: {
    name: "dmart",
    displayName: "DMart",
    rating: 4.6,
    deliveryTime: "25-30 mins",
    storeLocation: "Bopal, Ahmedabad",
    distance: "4.2 km",
    type: "Hypermarket",
    discount: "Best prices",
    categories: ["food", "home", "clothing"],
  },
};

const storeProducts: { [key: string]: StoreProduct[] } = {
  blinkit: [
    {
      id: "milk-1l-blinkit",
      name: "Fresh Milk 1L",
      image: "🥛",
      category: "Dairy",
      price: 60,
      originalPrice: 63,
      discount: "5% off",
      rating: 4.9,
      reviews: 850,
      availability: "in-stock",
    },
    {
      id: "bread-blinkit",
      name: "Brown Bread 400g",
      image: "🍞",
      category: "Bakery",
      price: 42,
      rating: 4.7,
      reviews: 320,
      availability: "in-stock",
    },
    {
      id: "bananas-blinkit",
      name: "Fresh Bananas 1kg",
      image: "🍌",
      category: "Fruits",
      price: 55,
      originalPrice: 60,
      discount: "8% off",
      rating: 4.8,
      reviews: 640,
      availability: "in-stock",
    },
    {
      id: "eggs-blinkit",
      name: "Farm Fresh Eggs (12 pcs)",
      image: "🥚",
      category: "Dairy",
      price: 84,
      rating: 4.9,
      reviews: 420,
      availability: "low-stock",
    },
  ],
  zepto: [
    {
      id: "milk-1l-zepto",
      name: "Fresh Milk 1L",
      image: "🥛",
      category: "Dairy",
      price: 59,
      rating: 4.8,
      reviews: 920,
      availability: "in-stock",
    },
    {
      id: "apples-zepto",
      name: "Red Apples 1kg",
      image: "🍎",
      category: "Fruits",
      price: 168,
      rating: 4.9,
      reviews: 540,
      availability: "in-stock",
    },
    {
      id: "yogurt-zepto",
      name: "Greek Yogurt 400g",
      image: "🥄",
      category: "Dairy",
      price: 115,
      originalPrice: 125,
      discount: "8% off",
      rating: 4.7,
      reviews: 380,
      availability: "in-stock",
    },
  ],
};

export default function Store() {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const store = storeData[storeId || ""];
  const products = storeProducts[storeId || ""] || [];

  if (!store) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Store not found
            </h2>
            <Button asChild>
              <Link to="/">Go back to home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const addToCart = (product: StoreProduct) => {
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Create cart item
    const cartItem = {
      id: `${product.id}-${store.name}`,
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      storeName: store.displayName,
      storeLocation: store.storeLocation,
      storeDistance: store.distance,
      price: product.price,
      originalPrice: product.originalPrice,
      discount: product.discount,
      rating: product.rating,
      deliveryTime: store.deliveryTime,
      quantity: 1,
      addedAt: new Date().toISOString(),
    };

    // Add to cart
    const updatedCart = [...existingCart, cartItem];
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Navigate to cart
    navigate(`/cart?from=store&storeId=${storeId}`);
  };

  const allCategories = [
    { id: "all", name: "All Products" },
    { id: "essentials", name: "Essentials" },
    { id: "home-lifestyle", name: "Home & Lifestyle" },
    { id: "electronics", name: "Electronics" },
    { id: "automobile", name: "Automobile" },
    { id: "hospitality", name: "Hospitality" },
    { id: "fitness-sports", name: "Fitness & Sports" },
  ];

  const categories = allCategories;

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

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
              <div>
                <h1 className="text-xl font-semibold">{store.displayName}</h1>
                <p className="text-sm text-gray-600">{store.type}</p>
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
        {/* Store Info */}
        <Card className="mb-6 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-gray-900">
                    {store.storeLocation}
                  </p>
                  <p className="text-sm text-gray-600">{store.distance} away</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-gray-900">
                    {store.deliveryTime}
                  </p>
                  <p className="text-sm text-gray-600">Delivery time</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <div>
                  <p className="font-semibold text-gray-900">{store.rating}</p>
                  <p className="text-sm text-gray-600">Store rating</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Badge className="bg-green-100 text-green-800">
                {store.discount}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Category Filter */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Shop by Category
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.id ? "default" : "outline"
                }
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="capitalize"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {allCategories.find((cat) => cat.id === selectedCategory)?.name ||
                "Products"}
            </h3>
            <p className="text-sm text-gray-600">
              {filteredProducts.length} items available
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
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
                    <Badge variant="secondary" className="text-xs">
                      {product.category}
                    </Badge>
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

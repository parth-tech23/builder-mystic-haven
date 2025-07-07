import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingCart,
  Star,
  Plus,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  image: string;
  category: string;
  stores: {
    name: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviews: number;
    availability: "in-stock" | "low-stock" | "out-of-stock";
    deliveryTime: string;
    discount?: string;
  }[];
}

const productData: { [key: string]: Product[] } = {
  dairy: [
    {
      id: "milk-1l",
      name: "Fresh Milk 1L",
      image: "🥛",
      category: "dairy",
      stores: [
        {
          name: "Reliance Fresh",
          price: 62,
          originalPrice: 65,
          rating: 4.8,
          reviews: 1240,
          availability: "in-stock",
          deliveryTime: "25-30 mins",
          discount: "5% off",
        },
        {
          name: "DMart",
          price: 58,
          rating: 4.6,
          reviews: 890,
          availability: "in-stock",
          deliveryTime: "30-35 mins",
        },
        {
          name: "Big Basket",
          price: 64,
          originalPrice: 68,
          rating: 4.7,
          reviews: 2100,
          availability: "in-stock",
          deliveryTime: "45-60 mins",
          discount: "6% off",
        },
      ],
    },
    {
      id: "cheese-200g",
      name: "Cheddar Cheese 200g",
      image: "🧀",
      category: "dairy",
      stores: [
        {
          name: "Reliance Fresh",
          price: 180,
          rating: 4.5,
          reviews: 340,
          availability: "in-stock",
          deliveryTime: "25-30 mins",
        },
        {
          name: "DMart",
          price: 165,
          originalPrice: 175,
          rating: 4.3,
          reviews: 120,
          availability: "low-stock",
          deliveryTime: "30-35 mins",
          discount: "6% off",
        },
        {
          name: "Big Basket",
          price: 190,
          rating: 4.6,
          reviews: 560,
          availability: "in-stock",
          deliveryTime: "45-60 mins",
        },
      ],
    },
    {
      id: "yogurt-400g",
      name: "Greek Yogurt 400g",
      image: "🥄",
      category: "dairy",
      stores: [
        {
          name: "Reliance Fresh",
          price: 120,
          originalPrice: 130,
          rating: 4.7,
          reviews: 680,
          availability: "in-stock",
          deliveryTime: "25-30 mins",
          discount: "8% off",
        },
        {
          name: "DMart",
          price: 115,
          rating: 4.4,
          reviews: 290,
          availability: "in-stock",
          deliveryTime: "30-35 mins",
        },
        {
          name: "Big Basket",
          price: 125,
          rating: 4.8,
          reviews: 920,
          availability: "in-stock",
          deliveryTime: "45-60 mins",
        },
      ],
    },
  ],
  fresh: [
    {
      id: "apples-1kg",
      name: "Red Apples 1kg",
      image: "🍎",
      category: "fresh",
      stores: [
        {
          name: "Reliance Fresh",
          price: 180,
          originalPrice: 200,
          rating: 4.6,
          reviews: 890,
          availability: "in-stock",
          deliveryTime: "25-30 mins",
          discount: "10% off",
        },
        {
          name: "DMart",
          price: 165,
          rating: 4.5,
          reviews: 450,
          availability: "in-stock",
          deliveryTime: "30-35 mins",
        },
        {
          name: "Big Basket",
          price: 175,
          rating: 4.8,
          reviews: 1200,
          availability: "in-stock",
          deliveryTime: "45-60 mins",
        },
      ],
    },
    {
      id: "bananas-1kg",
      name: "Fresh Bananas 1kg",
      image: "🍌",
      category: "fresh",
      stores: [
        {
          name: "Reliance Fresh",
          price: 60,
          rating: 4.4,
          reviews: 320,
          availability: "in-stock",
          deliveryTime: "25-30 mins",
        },
        {
          name: "DMart",
          price: 55,
          originalPrice: 65,
          rating: 4.3,
          reviews: 180,
          availability: "in-stock",
          deliveryTime: "30-35 mins",
          discount: "15% off",
        },
        {
          name: "Big Basket",
          price: 65,
          rating: 4.6,
          reviews: 540,
          availability: "in-stock",
          deliveryTime: "45-60 mins",
        },
      ],
    },
    {
      id: "tomatoes-500g",
      name: "Fresh Tomatoes 500g",
      image: "🍅",
      category: "fresh",
      stores: [
        {
          name: "Reliance Fresh",
          price: 40,
          rating: 4.5,
          reviews: 210,
          availability: "in-stock",
          deliveryTime: "25-30 mins",
        },
        {
          name: "DMart",
          price: 35,
          rating: 4.2,
          reviews: 95,
          availability: "low-stock",
          deliveryTime: "30-35 mins",
        },
        {
          name: "Big Basket",
          price: 45,
          originalPrice: 50,
          rating: 4.7,
          reviews: 380,
          availability: "in-stock",
          deliveryTime: "45-60 mins",
          discount: "10% off",
        },
      ],
    },
  ],
};

// Add similar data for other categories
const getDefaultProducts = (category: string): Product[] => [
  {
    id: `${category}-item-1`,
    name: `Premium ${category} Item`,
    image: "📦",
    category,
    stores: [
      {
        name: "Reliance Fresh",
        price: 150,
        rating: 4.5,
        reviews: 200,
        availability: "in-stock",
        deliveryTime: "25-30 mins",
      },
      {
        name: "DMart",
        price: 140,
        rating: 4.3,
        reviews: 150,
        availability: "in-stock",
        deliveryTime: "30-35 mins",
      },
      {
        name: "Big Basket",
        price: 160,
        rating: 4.6,
        reviews: 300,
        availability: "in-stock",
        deliveryTime: "45-60 mins",
      },
    ],
  },
];

export default function Category() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const addToCart = (product: Product, store: any) => {
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Create cart item
    const cartItem = {
      id: `${product.id}-${store.name}`,
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      storeName: store.name,
      price: store.price,
      originalPrice: store.originalPrice,
      discount: store.discount,
      rating: store.rating,
      deliveryTime: store.deliveryTime,
      quantity: 1,
      addedAt: new Date().toISOString(),
    };

    // Add to cart
    const updatedCart = [...existingCart, cartItem];
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Navigate to cart with payment options
    navigate("/cart?from=category&categoryId=" + categoryId);
  };

  const products =
    productData[categoryId || ""] || getDefaultProducts(categoryId || "");
  const categoryName = categoryId?.replace("-", " & ") || "Products";

  const getBestPrice = (product: Product) => {
    return Math.min(...product.stores.map((store) => store.price));
  };

  const getWorstPrice = (product: Product) => {
    return Math.max(...product.stores.map((store) => store.price));
  };

  const getPriceDifference = (product: Product) => {
    const best = getBestPrice(product);
    const worst = getWorstPrice(product);
    return worst - best;
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
              <h1 className="text-xl font-semibold capitalize">
                {categoryName}
              </h1>
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
        {!selectedProduct ? (
          // Product Grid
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Compare Prices Across Stores
              </h2>
              <p className="text-gray-600">
                Click on any product to see detailed price comparison
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => {
                const bestPrice = getBestPrice(product);
                const priceDiff = getPriceDifference(product);

                return (
                  <Card
                    key={product.id}
                    className="hover:shadow-lg transition-all duration-200 cursor-pointer group"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <CardContent className="p-6">
                      <div className="text-center mb-4">
                        <div className="text-4xl mb-2">{product.image}</div>
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {product.name}
                        </h3>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Best Price:
                          </span>
                          <span className="text-lg font-bold text-primary">
                            ₹{bestPrice}
                          </span>
                        </div>

                        {priceDiff > 0 && (
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">
                              Save up to:
                            </span>
                            <span className="text-sm font-semibold text-green-600">
                              ₹{priceDiff}
                            </span>
                          </div>
                        )}

                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Stores:</span>
                          <span className="text-sm text-gray-900">
                            {product.stores.length} available
                          </span>
                        </div>
                      </div>

                      <Button className="w-full mt-4 group-hover:bg-primary/90">
                        Compare Prices
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ) : (
          // Product Comparison View
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedProduct(null)}
                  className="p-2"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-gray-600">Compare across all stores</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl mb-2">{selectedProduct.image}</div>
              </div>
            </div>

            {/* Price Summary */}
            <Card className="mb-6 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Best Price</p>
                    <p className="text-2xl font-bold text-green-600">
                      ₹{getBestPrice(selectedProduct)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Highest Price</p>
                    <p className="text-2xl font-bold text-red-600">
                      ₹{getWorstPrice(selectedProduct)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">You Save</p>
                    <p className="text-2xl font-bold text-primary">
                      ₹{getPriceDifference(selectedProduct)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Stores</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {selectedProduct.stores.length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Store Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedProduct.stores
                .sort((a, b) => a.price - b.price)
                .map((store, index) => (
                  <Card
                    key={store.name}
                    className={`relative ${
                      index === 0 ? "ring-2 ring-primary border-primary" : ""
                    }`}
                  >
                    {index === 0 && (
                      <Badge className="absolute -top-2 left-4 bg-primary">
                        Best Price
                      </Badge>
                    )}

                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center justify-between">
                        <span>{store.name}</span>
                        {index === 0 ? (
                          <TrendingDown className="h-5 w-5 text-green-600" />
                        ) : index === selectedProduct.stores.length - 1 ? (
                          <TrendingUp className="h-5 w-5 text-red-600" />
                        ) : null}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-gray-900">
                          ₹{store.price}
                        </span>
                        {store.originalPrice && (
                          <div className="text-right">
                            <span className="text-sm text-gray-500 line-through">
                              ₹{store.originalPrice}
                            </span>
                            {store.discount && (
                              <Badge
                                variant="secondary"
                                className="ml-2 text-xs"
                              >
                                {store.discount}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{store.rating}</span>
                          <span className="text-gray-500">
                            ({store.reviews})
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Delivery:</span>
                          <span>{store.deliveryTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Stock:</span>
                          <Badge
                            variant={
                              store.availability === "in-stock"
                                ? "default"
                                : store.availability === "low-stock"
                                  ? "secondary"
                                  : "destructive"
                            }
                            className="text-xs"
                          >
                            {store.availability.replace("-", " ")}
                          </Badge>
                        </div>
                      </div>

                      <Button
                        className="w-full"
                        disabled={store.availability === "out-of-stock"}
                        onClick={() => addToCart(selectedProduct, store)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

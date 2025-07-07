import { Link } from "react-router-dom";
import {
  ShoppingCart,
  User,
  Gift,
  Star,
  UtensilsCrossed,
  Shirt,
  Smartphone,
  Home,
  Gamepad2,
  Car,
  Heart,
  Book,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Index() {
  const categories = [
    {
      id: "food",
      name: "Food & Beverages",
      icon: UtensilsCrossed,
      color: "bg-green-50 text-green-600",
      items: "2500+ items",
      image: "🍽️",
      subcategories: 8,
    },
    {
      id: "clothing",
      name: "Clothing & Fashion",
      icon: Shirt,
      color: "bg-purple-50 text-purple-600",
      items: "1800+ items",
      image: "👕",
      subcategories: 6,
    },
    {
      id: "electronics",
      name: "Electronics",
      icon: Smartphone,
      color: "bg-blue-50 text-blue-600",
      items: "1200+ items",
      image: "📱",
      subcategories: 7,
    },
    {
      id: "home",
      name: "Home & Garden",
      icon: Home,
      color: "bg-orange-50 text-orange-600",
      items: "950+ items",
      image: "🏠",
      subcategories: 5,
    },
    {
      id: "sports",
      name: "Sports & Gaming",
      icon: Gamepad2,
      color: "bg-red-50 text-red-600",
      items: "650+ items",
      image: "🎮",
      subcategories: 4,
    },
    {
      id: "automotive",
      name: "Automotive",
      icon: Car,
      color: "bg-gray-50 text-gray-600",
      items: "420+ items",
      image: "🚗",
      subcategories: 3,
    },
    {
      id: "health",
      name: "Health & Beauty",
      icon: Heart,
      color: "bg-pink-50 text-pink-600",
      items: "800+ items",
      image: "💄",
      subcategories: 4,
    },
    {
      id: "books",
      name: "Books & Media",
      icon: Book,
      color: "bg-indigo-50 text-indigo-600",
      items: "350+ items",
      image: "📚",
      subcategories: 3,
    },
  ];

  // Mock user location - Mumbai, Andheri
  const userLocation = "Mumbai, Andheri";

  const allStores = [
    {
      name: "Blinkit",
      rating: 4.9,
      deliveryTime: "10-15 mins",
      discount: "15% off on first order",
      categories: ["food", "health"],
      locations: ["Mumbai", "Delhi", "Bangalore", "Pune"],
      type: "Quick Commerce",
    },
    {
      name: "Zepto",
      rating: 4.8,
      deliveryTime: "8-12 mins",
      discount: "Free delivery",
      categories: ["food", "health"],
      locations: ["Mumbai", "Delhi", "Bangalore", "Hyderabad"],
      type: "Quick Commerce",
    },
    {
      name: "Reliance Fresh",
      rating: 4.7,
      deliveryTime: "25-30 mins",
      discount: "Up to 20% off",
      categories: ["food", "home"],
      locations: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Pune"],
      type: "Supermarket",
    },
    {
      name: "DMart",
      rating: 4.6,
      deliveryTime: "30-35 mins",
      discount: "Best prices",
      categories: ["food", "home", "clothing"],
      locations: ["Mumbai", "Pune", "Bangalore", "Hyderabad"],
      type: "Hypermarket",
    },
    {
      name: "Croma",
      rating: 4.5,
      deliveryTime: "45-60 mins",
      discount: "Extended warranty",
      categories: ["electronics"],
      locations: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Pune"],
      type: "Electronics Store",
    },
    {
      name: "Big Basket",
      rating: 4.7,
      deliveryTime: "45-60 mins",
      discount: "Free delivery",
      categories: ["food"],
      locations: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad"],
      type: "Online Grocery",
    },
    {
      name: "Swiggy Instamart",
      rating: 4.6,
      deliveryTime: "15-25 mins",
      discount: "10% cashback",
      categories: ["food", "health"],
      locations: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Pune"],
      type: "Quick Commerce",
    },
    {
      name: "Flipkart Quick",
      rating: 4.4,
      deliveryTime: "20-30 mins",
      discount: "Same day delivery",
      categories: ["electronics", "clothing", "home"],
      locations: ["Mumbai", "Delhi", "Bangalore", "Hyderabad"],
      type: "Quick Commerce",
    },
  ];

  // Filter stores based on user location
  const featuredStores = allStores
    .filter((store) =>
      store.locations.some((location) => userLocation.includes(location)),
    )
    .slice(0, 6); // Show top 6 stores

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary">Sharva Mart</h1>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/cart">
                  <ShoppingCart className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/profile">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back!
          </h2>
          <p className="text-gray-600">
            Fresh groceries delivered to your doorstep
          </p>
        </div>

        {/* Deposit Banner */}
        <Card className="mb-8 bg-gradient-to-r from-primary to-primary/80 border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between text-white">
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  Secure Your Shopping
                </h3>
                <p className="text-primary-foreground/90">
                  Pay ₹1000 refundable deposit to unlock better prices
                </p>
              </div>
              <Button variant="secondary" size="sm">
                Pay Deposit
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Referral Banner */}
        <Card className="mb-8 bg-gradient-to-r from-orange-500 to-pink-500 border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-3">
                <Gift className="h-8 w-8" />
                <div>
                  <h3 className="text-lg font-semibold mb-1">Refer & Earn</h3>
                  <p className="text-white/90">
                    Refer 10 friends and earn cashback rewards
                  </p>
                </div>
              </div>
              <Button variant="secondary" size="sm">
                Refer Now
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Featured Stores */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Featured Stores
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredStores.map((store, index) => (
              <Card
                key={index}
                className="hover:shadow-md transition-shadow cursor-pointer"
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900">
                      {store.name}
                    </h4>
                    <Badge variant="secondary" className="text-xs">
                      {store.discount}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{store.rating}</span>
                    </div>
                    <span>{store.deliveryTime}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Shop by Category
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card
                  key={category.id}
                  className="hover:shadow-lg transition-all duration-200 cursor-pointer group hover:scale-105"
                  asChild
                >
                  <Link to={`/categories/${category.id}`}>
                    <CardContent className="p-6 text-center">
                      <div
                        className={`w-16 h-16 mx-auto mb-4 rounded-full ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                      >
                        <IconComponent className="h-8 w-8" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1 text-sm">
                        {category.name}
                      </h4>
                      <p className="text-xs text-gray-500">{category.items}</p>
                      <p className="text-xs text-gray-400">
                        {category.subcategories} categories
                      </p>
                    </CardContent>
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

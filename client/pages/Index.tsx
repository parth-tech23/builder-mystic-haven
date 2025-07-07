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

  // Mock user location - Ahmedabad
  const userLocation = "Ahmedabad";

  const allStores = [
    {
      name: "Blinkit",
      rating: 4.9,
      deliveryTime: "8-12 mins",
      discount: "15% off on first order",
      categories: ["food", "health"],
      locations: ["Ahmedabad", "Mumbai", "Delhi", "Bangalore", "Pune"],
      storeLocation: "Vastrapur, Ahmedabad",
      distance: "1.2 km",
      type: "Quick Commerce",
    },
    {
      name: "Zepto",
      rating: 4.8,
      deliveryTime: "10-15 mins",
      discount: "Free delivery",
      categories: ["food", "health"],
      locations: ["Ahmedabad", "Mumbai", "Delhi", "Bangalore", "Hyderabad"],
      storeLocation: "Satellite, Ahmedabad",
      distance: "2.1 km",
      type: "Quick Commerce",
    },
    {
      name: "Reliance Fresh",
      rating: 4.7,
      deliveryTime: "20-25 mins",
      discount: "Up to 20% off",
      categories: ["food", "home"],
      locations: [
        "Ahmedabad",
        "Mumbai",
        "Delhi",
        "Bangalore",
        "Chennai",
        "Pune",
      ],
      storeLocation: "CG Road, Ahmedabad",
      distance: "3.5 km",
      type: "Supermarket",
    },
    {
      name: "DMart",
      rating: 4.6,
      deliveryTime: "25-30 mins",
      discount: "Best prices",
      categories: ["food", "home", "clothing"],
      locations: ["Ahmedabad", "Mumbai", "Pune", "Bangalore", "Hyderabad"],
      storeLocation: "Bopal, Ahmedabad",
      distance: "4.2 km",
      type: "Hypermarket",
    },
    {
      name: "More Supermarket",
      rating: 4.5,
      deliveryTime: "30-35 mins",
      discount: "Weekly offers",
      categories: ["food", "home"],
      locations: ["Ahmedabad", "Chennai", "Bangalore", "Hyderabad"],
      storeLocation: "Maninagar, Ahmedabad",
      distance: "5.8 km",
      type: "Supermarket",
    },
    {
      name: "Croma",
      rating: 4.5,
      deliveryTime: "40-50 mins",
      discount: "Extended warranty",
      categories: ["electronics"],
      locations: [
        "Ahmedabad",
        "Mumbai",
        "Delhi",
        "Bangalore",
        "Chennai",
        "Pune",
      ],
      storeLocation: "Himalaya Mall, Ahmedabad",
      distance: "6.1 km",
      type: "Electronics Store",
    },
    {
      name: "Big Basket",
      rating: 4.7,
      deliveryTime: "45-60 mins",
      discount: "Free delivery",
      categories: ["food"],
      locations: [
        "Ahmedabad",
        "Mumbai",
        "Delhi",
        "Bangalore",
        "Chennai",
        "Hyderabad",
      ],
      storeLocation: "Gurukul, Ahmedabad",
      distance: "7.3 km",
      type: "Online Grocery",
    },
    {
      name: "Swiggy Instamart",
      rating: 4.6,
      deliveryTime: "15-25 mins",
      discount: "10% cashback",
      categories: ["food", "health"],
      locations: [
        "Ahmedabad",
        "Mumbai",
        "Delhi",
        "Bangalore",
        "Chennai",
        "Pune",
      ],
      storeLocation: "Prahlad Nagar, Ahmedabad",
      distance: "2.8 km",
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
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary">Sharva Mart</h1>
              <Badge variant="outline" className="text-xs">
                📍 {userLocation}
              </Badge>
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
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900">
              Stores Near You
            </h3>
            <Badge variant="outline" className="text-xs">
              📍 {userLocation}
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredStores.map((store, index) => (
              <Card
                key={index}
                className="hover:shadow-md transition-shadow cursor-pointer"
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {store.name}
                      </h4>
                      <p className="text-xs text-gray-500">{store.type}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {store.discount}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{store.rating}</span>
                      </div>
                      <span>{store.deliveryTime}</span>
                    </div>
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
                <Link
                  key={category.id}
                  to={`/categories/${category.id}`}
                  className="block"
                >
                  <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group hover:scale-105">
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
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

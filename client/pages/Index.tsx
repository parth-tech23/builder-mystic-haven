import { Link } from "react-router-dom";
import {
  ShoppingCart,
  User,
  Gift,
  Star,
  Apple,
  Milk,
  Beef,
  Bread,
  Flower2,
  Soup,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Index() {
  const categories = [
    {
      id: "dairy",
      name: "Dairy & Eggs",
      icon: Milk,
      color: "bg-blue-50 text-blue-600",
      items: "150+ items",
      image: "🥛",
    },
    {
      id: "fresh",
      name: "Fresh Produce",
      icon: Apple,
      color: "bg-green-50 text-green-600",
      items: "200+ items",
      image: "🍎",
    },
    {
      id: "meat",
      name: "Meat & Seafood",
      icon: Beef,
      color: "bg-red-50 text-red-600",
      items: "80+ items",
      image: "🥩",
    },
    {
      id: "bakery",
      name: "Bakery",
      icon: Bread,
      color: "bg-orange-50 text-orange-600",
      items: "90+ items",
      image: "🍞",
    },
    {
      id: "flowers",
      name: "Flowers & Plants",
      icon: Flower2,
      color: "bg-pink-50 text-pink-600",
      items: "45+ items",
      image: "🌸",
    },
    {
      id: "frozen",
      name: "Frozen Foods",
      icon: Soup,
      color: "bg-indigo-50 text-indigo-600",
      items: "120+ items",
      image: "🧊",
    },
  ];

  const featuredStores = [
    {
      name: "Reliance Fresh",
      rating: 4.8,
      deliveryTime: "25-30 mins",
      discount: "Up to 20% off",
    },
    {
      name: "DMart",
      rating: 4.6,
      deliveryTime: "30-35 mins",
      discount: "Best prices",
    },
    {
      name: "Big Basket",
      rating: 4.7,
      deliveryTime: "45-60 mins",
      discount: "Free delivery",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary">FreshMart</h1>
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card
                  key={category.id}
                  className="hover:shadow-lg transition-all duration-200 cursor-pointer group hover:scale-105"
                  asChild
                >
                  <Link to={`/category/${category.id}`}>
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
                    </CardContent>
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 grid grid-cols-2 gap-4">
          <Button size="lg" className="h-16" asChild>
            <Link to="/login">
              <User className="h-5 w-5 mr-2" />
              Login / Register
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="h-16" asChild>
            <Link to="/profile">
              <Gift className="h-5 w-5 mr-2" />
              View Rewards
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}

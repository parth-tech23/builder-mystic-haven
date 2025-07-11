import { Link } from "react-router-dom";
import { Gift, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ReferralShare from "@/components/ReferralShare";
import BottomNavigation from "@/components/BottomNavigation";

export default function Index() {
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

  // Show all available stores
  const availableStores = allStores;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center justify-center w-full">
              <h1 className="text-2xl font-bold text-primary">Sharva Mart</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Available Stores
          </h2>
          <p className="text-gray-600">
            Choose from all partner stores on Sharva Mart
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

        {/* Referral Banner with Enhanced Discount Info */}
        <Card className="mb-8 bg-gradient-to-r from-orange-500 to-pink-500 border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-3">
                <Gift className="h-8 w-8" />
                <div>
                  <h3 className="text-lg font-semibold mb-1">
                    Refer & Earn More Discounts
                  </h3>
                  <p className="text-white/90">
                    More referrals = More discount on every purchase
                  </p>
                  <div className="text-xs text-white/80 mt-1">
                    1-5 refs: 2% off • 6-10 refs: 5% off • 11+ refs: 10% off
                  </div>
                </div>
              </div>
              <ReferralShare
                trigger={
                  <Button variant="secondary" size="sm">
                    Refer Now
                  </Button>
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Categories Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Shop by Category
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              {
                id: "essentials",
                name: "Essentials",
                icon: "🛒",
                color: "bg-blue-50 border-blue-200",
              },
              {
                id: "home-living",
                name: "Home & Living",
                icon: "🏠",
                color: "bg-green-50 border-green-200",
              },
              {
                id: "lifestyle",
                name: "Lifestyle",
                icon: "✨",
                color: "bg-purple-50 border-purple-200",
              },
              {
                id: "electronics",
                name: "Electronics",
                icon: "📱",
                color: "bg-orange-50 border-orange-200",
              },
              {
                id: "automobile",
                name: "Automobile",
                icon: "🚗",
                color: "bg-gray-50 border-gray-200",
              },
              {
                id: "hospitality",
                name: "Hospitality",
                icon: "🏨",
                color: "bg-pink-50 border-pink-200",
              },
              {
                id: "fitness-sports",
                name: "Fitness & Sports",
                icon: "🏋️",
                color: "bg-red-50 border-red-200",
              },
            ].map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="block group"
              >
                <Card
                  className={`${category.color} border-2 hover:shadow-md transition-all duration-200 cursor-pointer group-hover:scale-105`}
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl mb-2">{category.icon}</div>
                    <h4 className="text-sm font-semibold text-gray-800">
                      {category.name}
                    </h4>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* All Stores */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableStores.map((store) => (
              <Link
                key={store.name}
                to={`/store/${store.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="block"
              >
                <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-1">
                          {store.name}
                        </h4>
                        <p className="text-sm text-gray-500 mb-1">
                          {store.type}
                        </p>
                        <p className="text-sm text-blue-600">
                          {store.storeLocation}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="text-xs mb-2">
                          {store.discount}
                        </Badge>
                        <p className="text-sm text-green-600 font-bold">
                          {store.distance}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{store.rating}</span>
                        </div>
                        <span className="text-sm text-gray-600">
                          {store.deliveryTime}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {store.categories.map((cat) => (
                        <Badge
                          key={cat}
                          variant="outline"
                          className="text-xs capitalize"
                        >
                          {cat}
                        </Badge>
                      ))}
                    </div>

                    <Button className="w-full group-hover:bg-primary/90">
                      Shop at {store.name}
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

import { Link } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Package,
  CheckCircle,
  Navigation,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";

interface DeliveryStatus {
  step: number;
  status: "completed" | "current" | "pending";
  time: string;
  title: string;
  description: string;
}

export default function DeliveryTracking() {
  const [orderNumber] = useState("FM7X9K2M");
  const [estimatedTime, setEstimatedTime] = useState(18); // minutes
  const [deliveryBoyLocation, setDeliveryBoyLocation] = useState({
    lat: 19.076,
    lng: 72.8777,
  });

  const [userLocation] = useState({
    lat: 19.0825,
    lng: 72.8756,
  });

  const deliveryBoy = {
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    rating: 4.8,
    avatar: "RK",
    vehicleNumber: "MH 01 AB 1234",
  };

  const deliverySteps: DeliveryStatus[] = [
    {
      step: 1,
      status: "completed",
      time: "2:15 PM",
      title: "Order Confirmed",
      description: "Your order has been placed successfully",
    },
    {
      step: 2,
      status: "completed",
      time: "2:25 PM",
      title: "Order Packed",
      description: "Items have been carefully packed and checked",
    },
    {
      step: 3,
      status: "current",
      time: "2:35 PM",
      title: "Out for Delivery",
      description: "Your order is on the way to your location",
    },
    {
      step: 4,
      status: "pending",
      time: "3:00 PM (Est.)",
      title: "Delivered",
      description: "Order will be delivered to your doorstep",
    },
  ];

  useEffect(() => {
    // Simulate delivery boy movement and countdown
    const interval = setInterval(() => {
      setEstimatedTime((prev) => Math.max(0, prev - 1));

      // Simulate delivery boy moving closer
      setDeliveryBoyLocation((prev) => ({
        lat: prev.lat + (userLocation.lat - prev.lat) * 0.02,
        lng: prev.lng + (userLocation.lng - prev.lng) * 0.02,
      }));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [userLocation]);

  const getStatusIcon = (status: DeliveryStatus["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "current":
        return (
          <div className="h-5 w-5 bg-primary rounded-full animate-pulse" />
        );
      default:
        return (
          <div className="h-5 w-5 border-2 border-gray-300 rounded-full" />
        );
    }
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
              <div>
                <h1 className="text-xl font-semibold">Track Delivery</h1>
                <p className="text-sm text-gray-600">Order #{orderNumber}</p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800">
              <Clock className="h-3 w-3 mr-1" />
              {estimatedTime} mins
            </Badge>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card className="h-[400px] lg:h-[500px] overflow-hidden">
              <CardContent className="p-0 h-full relative">
                {/* Simulated Map */}
                <div className="w-full h-full bg-gradient-to-br from-green-100 via-blue-50 to-green-50 relative overflow-hidden">
                  {/* Street lines */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 400 300"
                  >
                    <line
                      x1="0"
                      y1="150"
                      x2="400"
                      y2="150"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                    />
                    <line
                      x1="200"
                      y1="0"
                      x2="200"
                      y2="300"
                      stroke="#e5e7eb"
                      strokeWidth="6"
                    />
                    <line
                      x1="0"
                      y1="100"
                      x2="400"
                      y2="100"
                      stroke="#f3f4f6"
                      strokeWidth="4"
                    />
                    <line
                      x1="0"
                      y1="200"
                      x2="400"
                      y2="200"
                      stroke="#f3f4f6"
                      strokeWidth="4"
                    />
                  </svg>

                  {/* User Location */}
                  <div
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${((userLocation.lng - 72.87) / 0.01) * 100}%`,
                      top: `${((19.085 - userLocation.lat) / 0.01) * 100}%`,
                    }}
                  >
                    <div className="relative">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center animate-ping absolute">
                        <MapPin className="h-4 w-4 text-white" />
                      </div>
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center relative">
                        <MapPin className="h-4 w-4 text-white" />
                      </div>
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs whitespace-nowrap">
                        Your Location
                      </div>
                    </div>
                  </div>

                  {/* Delivery Boy Location */}
                  <div
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${((deliveryBoyLocation.lng - 72.87) / 0.01) * 100}%`,
                      top: `${((19.085 - deliveryBoyLocation.lat) / 0.01) * 100}%`,
                    }}
                  >
                    <div className="relative">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center animate-bounce border-4 border-white shadow-lg">
                        <Package className="h-5 w-5 text-white" />
                      </div>
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs whitespace-nowrap">
                        {deliveryBoy.name}
                      </div>
                    </div>
                  </div>

                  {/* Route Line */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <line
                      x1={`${((deliveryBoyLocation.lng - 72.87) / 0.01) * 100}%`}
                      y1={`${((19.085 - deliveryBoyLocation.lat) / 0.01) * 100}%`}
                      x2={`${((userLocation.lng - 72.87) / 0.01) * 100}%`}
                      y2={`${((19.085 - userLocation.lat) / 0.01) * 100}%`}
                      stroke="#10b981"
                      strokeWidth="3"
                      strokeDasharray="10,5"
                      className="animate-pulse"
                    />
                  </svg>

                  {/* Map Controls */}
                  <div className="absolute top-4 right-4 space-y-2">
                    <Button size="sm" variant="outline" className="bg-white">
                      <Navigation className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Boy Info */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-white">
                        {deliveryBoy.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {deliveryBoy.name}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span>⭐ {deliveryBoy.rating}</span>
                        <span>•</span>
                        <span>{deliveryBoy.vehicleNumber}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Chat
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tracking Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* ETA Card */}
            <Card className="bg-gradient-to-br from-primary to-primary/80 text-white">
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 mx-auto mb-3" />
                <h3 className="text-2xl font-bold mb-1">
                  {estimatedTime} mins
                </h3>
                <p className="text-primary-foreground/90">
                  Estimated delivery time
                </p>
              </CardContent>
            </Card>

            {/* Delivery Status */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deliverySteps.map((step, index) => (
                    <div key={step.step} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getStatusIcon(step.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4
                            className={`font-medium ${
                              step.status === "current"
                                ? "text-primary"
                                : step.status === "completed"
                                  ? "text-green-600"
                                  : "text-gray-500"
                            }`}
                          >
                            {step.title}
                          </h4>
                          <span className="text-xs text-gray-500">
                            {step.time}
                          </span>
                        </div>
                        <p
                          className={`text-sm ${
                            step.status === "pending"
                              ? "text-gray-500"
                              : "text-gray-600"
                          }`}
                        >
                          {step.description}
                        </p>
                      </div>
                      {index < deliverySteps.length - 1 && (
                        <div
                          className={`absolute left-[22px] mt-8 w-0.5 h-6 ${
                            step.status === "completed"
                              ? "bg-green-600"
                              : "bg-gray-300"
                          }`}
                          style={{ marginLeft: "10px" }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Items</span>
                  <span>3 products</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total</span>
                  <span className="font-semibold">₹485</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Delivery</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <hr />
                <div className="flex justify-between font-semibold">
                  <span>Paid</span>
                  <span>₹485</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="space-y-3">
              <Button variant="outline" className="w-full">
                View Order Details
              </Button>
              <Button variant="outline" className="w-full">
                Cancel Order
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  Clock,
  MapPin,
  Phone,
  CreditCard,
  Truck,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  // Mock order data - in real app this would come from API
  const orderData = {
    id: orderId || "FM7X9K2M",
    status: "out-for-delivery",
    placedAt: "2024-01-15T14:15:00Z",
    estimatedDelivery: "2024-01-15T15:30:00Z",
    total: 485,
    items: [
      {
        id: "milk-1l",
        name: "Fresh Milk 1L",
        image: "🥛",
        storeName: "Reliance Fresh",
        price: 62,
        originalPrice: 65,
        quantity: 2,
        discount: "5% off",
      },
      {
        id: "apples-1kg",
        name: "Red Apples 1kg",
        image: "🍎",
        storeName: "DMart",
        price: 165,
        quantity: 1,
      },
      {
        id: "cheese-200g",
        name: "Cheddar Cheese 200g",
        image: "🧀",
        storeName: "Big Basket",
        price: 190,
        quantity: 1,
      },
    ],
    deliveryAddress: {
      name: "John Doe",
      phone: "+91 98765 43210",
      address: "123, Green Valley Apartments, Andheri West, Mumbai - 400058",
    },
    payment: {
      method: "UPI",
      transactionId: "UPI2024011512345",
      amount: 485,
    },
    deliveryBoy: {
      name: "Rajesh Kumar",
      phone: "+91 98765 43210",
      rating: 4.8,
    },
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-blue-100 text-blue-800">Confirmed</Badge>;
      case "packed":
        return <Badge className="bg-orange-100 text-orange-800">Packed</Badge>;
      case "out-for-delivery":
        return <Badge className="bg-primary">Out for Delivery</Badge>;
      case "delivered":
        return <Badge className="bg-green-100 text-green-800">Delivered</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getItemTotal = () => {
    return orderData.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link
                to="/delivery-tracking"
                className="text-primary hover:text-primary/80"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-xl font-semibold">Order Details</h1>
                <p className="text-sm text-gray-600">#{orderData.id}</p>
              </div>
            </div>
            {getStatusBadge(orderData.status)}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Order Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Order Placed</span>
                  <span className="text-sm">
                    {new Date(orderData.placedAt).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Estimated Delivery</span>
                  <span className="text-sm font-semibold text-primary">
                    {new Date(orderData.estimatedDelivery).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Delivery Person</span>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {orderData.deliveryBoy.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      ⭐ {orderData.deliveryBoy.rating}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderData.items.map((item, index) => (
                    <div key={item.id}>
                      <div className="flex items-start space-x-4">
                        <div className="text-3xl">{item.image}</div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {item.name}
                              </h3>
                              <p className="text-sm text-gray-600">
                                from {item.storeName}
                              </p>
                              {item.discount && (
                                <Badge
                                  variant="secondary"
                                  className="text-xs mt-1"
                                >
                                  {item.discount}
                                </Badge>
                              )}
                            </div>
                            <div className="text-right">
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold">
                                  ₹{item.price}
                                </span>
                                {item.originalPrice && (
                                  <span className="text-sm text-gray-500 line-through">
                                    ₹{item.originalPrice}
                                  </span>
                                )}
                                <span className="text-sm text-gray-600">
                                  × {item.quantity}
                                </span>
                              </div>
                              <p className="text-sm font-semibold text-gray-900">
                                ₹{item.price * item.quantity}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {index < orderData.items.length - 1 && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-semibold">
                    {orderData.deliveryAddress.name}
                  </p>
                  <p className="text-gray-600">
                    {orderData.deliveryAddress.address}
                  </p>
                  <p className="text-sm text-gray-600">
                    {orderData.deliveryAddress.phone}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method</span>
                    <span className="font-medium">
                      {orderData.payment.method}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transaction ID</span>
                    <span className="text-sm font-mono">
                      {orderData.payment.transactionId}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount Paid</span>
                    <span className="font-bold text-green-600">
                      ₹{orderData.payment.amount}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary & Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items Total</span>
                  <span>₹{getItemTotal()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes</span>
                  <span>₹0</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Paid</span>
                  <span>₹{orderData.total}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="space-y-3">
              <Button
                className="w-full"
                onClick={() => navigate("/delivery-tracking")}
              >
                <Truck className="h-4 w-4 mr-2" />
                Track Live Delivery
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate(`/order-cancel/${orderData.id}`)}
              >
                Cancel Order
              </Button>

              <Button variant="outline" className="w-full" asChild>
                <a href={`tel:${orderData.deliveryBoy.phone}`}>
                  <Phone className="h-4 w-4 mr-2" />
                  Call Delivery Person
                </a>
              </Button>
            </div>

            {/* Help */}
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-sm text-gray-600 mb-3">
                  Need help with your order?
                </p>
                <Button variant="outline" size="sm">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

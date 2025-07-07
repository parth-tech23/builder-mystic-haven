import { Link } from "react-router-dom";
import { CheckCircle, Package, Clock, Gift, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

export default function PaymentSuccess() {
  const [orderNumber] = useState(
    () => "FM" + Math.random().toString(36).substr(2, 9).toUpperCase(),
  );
  const [estimatedDelivery] = useState(() => {
    const date = new Date();
    date.setHours(date.getHours() + 2); // 2 hours from now
    return date.toLocaleString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  });

  useEffect(() => {
    // Add confetti effect or success analytics here
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-background to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6 animate-pulse">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Successful! 🎉
          </h1>
          <p className="text-gray-600 text-lg">
            Your order has been confirmed and is being prepared
          </p>
        </div>

        {/* Order Details */}
        <Card className="mb-6 shadow-lg">
          <CardHeader className="bg-green-50 border-b">
            <CardTitle className="flex items-center justify-between">
              <span>Order Confirmation</span>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                #{orderNumber}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Order Placed
                </h3>
                <p className="text-sm text-gray-600">
                  Your order has been successfully placed and confirmed
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Estimated Delivery
                </h3>
                <p className="text-sm text-gray-600">
                  Today by {estimatedDelivery}
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Gift className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Rewards Earned
                </h3>
                <p className="text-sm text-gray-600">
                  ₹25 cashback added to wallet
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>What happens next?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                1
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">
                  Order Preparation
                </h4>
                <p className="text-sm text-gray-600">
                  Our team is carefully picking and packing your items
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                2
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Quality Check</h4>
                <p className="text-sm text-gray-600">
                  Every item goes through our quality assurance process
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                3
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">
                  Out for Delivery
                </h4>
                <p className="text-sm text-gray-600">
                  You'll receive a notification when your order is on the way
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Referral Promotion */}
        <Card className="mb-6 bg-gradient-to-r from-orange-500 to-pink-500 border-0">
          <CardContent className="p-6 text-white">
            <div className="flex items-center space-x-4">
              <Gift className="h-8 w-8" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">
                  Refer Friends & Earn More!
                </h3>
                <p className="text-white/90 text-sm">
                  Share FreshMart with friends and earn ₹100 for each successful
                  referral. Get 10 referrals and unlock premium benefits!
                </p>
              </div>
              <Button variant="secondary" size="sm" asChild>
                <Link to="/profile">Refer Now</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button size="lg" className="h-14" asChild>
            <Link to="/delivery-tracking">
              <Package className="h-5 w-5 mr-2" />
              Track Live Delivery
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="h-14" asChild>
            <Link to="/">
              <Home className="h-5 w-5 mr-2" />
              Continue Shopping
            </Link>
          </Button>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-8 space-y-2">
          <p className="text-gray-600">Thank you for choosing FreshMart! 🛒</p>
          <p className="text-sm text-gray-500">
            Order confirmation sent to your registered mobile number
          </p>
        </div>
      </div>
    </div>
  );
}

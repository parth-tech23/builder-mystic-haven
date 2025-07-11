import { Link } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Gift,
  CreditCard,
  LogOut,
  Trophy,
  Coins,
  Percent,
  TrendingUp,
  Package,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import ReferralShare from "@/components/ReferralShare";

export default function Profile() {
  const orderHistory = [
    {
      id: "FM7X9K2M",
      date: "2024-01-15",
      status: "out-for-delivery",
      items: 3,
      total: 485,
      deliveryTime: "3:00 PM (Est.)",
    },
    {
      id: "FM5H8L1P",
      date: "2024-01-10",
      status: "delivered",
      items: 2,
      total: 320,
      deliveryTime: "Delivered",
    },
    {
      id: "FM9K3N7Q",
      date: "2024-01-08",
      status: "delivered",
      items: 5,
      total: 650,
      deliveryTime: "Delivered",
    },
    {
      id: "FM2L6P4R",
      date: "2024-01-05",
      status: "cancelled",
      items: 1,
      total: 180,
      deliveryTime: "Cancelled",
    },
  ];

  const rewardsData = {
    totalCashback: 1250,
    totalDiscounts: 3400,
    totalRewards: 850,
    referralProgress: 3, // current referrals
    totalReferrals: 3,
    currentDiscountTier: "2%", // based on referrals
    nextTierAt: 6,
    nextTierDiscount: "5%",
    recentTransactions: [
      {
        id: 1,
        type: "cashback",
        amount: 25,
        description: "Order #FM7X9K2M cashback",
        date: "2024-01-15",
        status: "credited",
      },
      {
        id: 2,
        type: "discount",
        amount: 150,
        description: "Fresh produce 10% off",
        date: "2024-01-14",
        status: "applied",
      },
      {
        id: 3,
        type: "referral",
        amount: 100,
        description: "Friend referral bonus",
        date: "2024-01-12",
        status: "credited",
      },
      {
        id: 4,
        type: "cashback",
        amount: 35,
        description: "Order #FM5H8L1P cashback",
        date: "2024-01-10",
        status: "credited",
      },
      {
        id: 5,
        type: "discount",
        amount: 200,
        description: "Dairy products 15% off",
        date: "2024-01-08",
        status: "applied",
      },
    ],
  };

  const getOrderStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "out-for-delivery":
        return <Package className="h-4 w-4 text-primary" />;
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-orange-600" />;
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "text-green-600";
      case "out-for-delivery":
        return "text-primary";
      case "cancelled":
        return "text-red-600";
      default:
        return "text-orange-600";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "cashback":
        return <Coins className="h-4 w-4 text-green-600" />;
      case "discount":
        return <Percent className="h-4 w-4 text-blue-600" />;
      case "referral":
        return <Gift className="h-4 w-4 text-purple-600" />;
      default:
        return <Trophy className="h-4 w-4 text-orange-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "cashback":
        return "text-green-600";
      case "discount":
        return "text-blue-600";
      case "referral":
        return "text-purple-600";
      default:
        return "text-orange-600";
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
              <h1 className="text-xl font-semibold">My Profile</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Profile Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Info */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  John Doe
                </h2>
                <p className="text-gray-600">+91 98765 43210</p>
                <p className="text-sm text-primary">Member since Jan 2024</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rewards Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="border-green-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Coins className="h-5 w-5 mr-2 text-green-600" />
                Total Cashback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">
                ₹{rewardsData.totalCashback}
              </p>
              <p className="text-sm text-gray-600">Earned this year</p>
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Percent className="h-5 w-5 mr-2 text-blue-600" />
                Total Discounts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600">
                ₹{rewardsData.totalDiscounts}
              </p>
              <p className="text-sm text-gray-600">Saved on purchases</p>
            </CardContent>
          </Card>

          <Card className="border-purple-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Gift className="h-5 w-5 mr-2 text-purple-600" />
                Referral Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-purple-600">
                ₹{rewardsData.totalRewards}
              </p>
              <p className="text-sm text-gray-600">
                From {rewardsData.referralProgress} referrals
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Referral Progress */}
        <Card className="mb-6 bg-gradient-to-r from-orange-50 to-pink-50 border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-orange-600" />
                Referral Progress
              </span>
              <Badge
                variant="secondary"
                className="bg-orange-100 text-orange-800"
              >
                {rewardsData.referralProgress}/10 friends
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Progress to unlock premium benefits</span>
                <span className="font-semibold">
                  {rewardsData.referralProgress * 10}%
                </span>
              </div>
              <Progress
                value={rewardsData.referralProgress * 10}
                className="h-3"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Next reward at:</p>
                <p className="font-semibold text-orange-600">5 referrals</p>
              </div>
              <div>
                <p className="text-gray-600">Unlock premium at:</p>
                <p className="font-semibold text-orange-600">10 referrals</p>
              </div>
            </div>
            <ReferralShare
              trigger={
                <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                  Refer More Friends
                </Button>
              }
            />
          </CardContent>
        </Card>

        {/* Recent Rewards Activity */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Recent Rewards Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {rewardsData.recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    {getTypeIcon(transaction.type)}
                    <div>
                      <p className="font-medium text-gray-900">
                        {transaction.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-bold text-lg ${getTypeColor(transaction.type)}`}
                    >
                      +₹{transaction.amount}
                    </p>
                    <Badge
                      variant={
                        transaction.status === "credited"
                          ? "default"
                          : "secondary"
                      }
                      className="text-xs"
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Order History */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Order History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orderHistory.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    {getOrderStatusIcon(order.status)}
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-gray-900">
                          Order #{order.id}
                        </p>
                        <Badge
                          variant={
                            order.status === "delivered"
                              ? "default"
                              : order.status === "cancelled"
                                ? "destructive"
                                : "secondary"
                          }
                          className="text-xs"
                        >
                          {order.status.replace("-", " ")}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {new Date(order.date).toLocaleDateString()} •{" "}
                        {order.items} items
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-gray-900">
                      ₹{order.total}
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.deliveryTime}
                    </p>
                    {order.status === "out-for-delivery" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-2"
                        asChild
                      >
                        <Link to="/delivery-tracking">Track Order</Link>
                      </Button>
                    )}
                    {(order.status === "delivered" ||
                      order.status === "cancelled") && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-2"
                        asChild
                      >
                        <Link to={`/order-details/${order.id}`}>
                          View Details
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Wallet & Deposit */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-primary" />
                Wallet Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">
                ₹{rewardsData.totalCashback}
              </p>
              <p className="text-sm text-gray-600">Available for shopping</p>
              <Button variant="outline" size="sm" className="mt-3">
                Add Money
              </Button>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Gift className="h-5 w-5 mr-2 text-primary" />
                Refundable Deposit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">₹1,000</p>
              <p className="text-sm text-green-600">Active & Secure</p>
              <Button variant="outline" size="sm" className="mt-3">
                Refund Deposit
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Coming Soon Features */}
        <Card className="mb-6 opacity-75">
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Order History</span>
              <span className="text-sm text-gray-500">🚧</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Saved Addresses</span>
              <span className="text-sm text-gray-500">🚧</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Payment Methods</span>
              <span className="text-sm text-gray-500">🚧</span>
            </div>
          </CardContent>
        </Card>

        {/* Logout */}
        <Button
          variant="outline"
          className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
          asChild
        >
          <Link to="/login">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Link>
        </Button>
      </main>
    </div>
  );
}

import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CreditCard,
  Smartphone,
  Wallet,
  Shield,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState, useEffect } from "react";

interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  storeName: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  quantity: number;
}

export default function Payment() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [depositPaid, setDepositPaid] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(savedCart);

    // Check if deposit is already paid (simulate with localStorage)
    const depositStatus = localStorage.getItem("depositPaid");
    setDepositPaid(depositStatus === "true");
  }, []);

  const getSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const getTotalSavings = () => {
    return cartItems.reduce((total, item) => {
      if (item.originalPrice) {
        return total + (item.originalPrice - item.price) * item.quantity;
      }
      return total;
    }, 0);
  };

  const handlePayment = async () => {
    if (!depositPaid) {
      alert(
        "Please pay the refundable deposit first to proceed with checkout.",
      );
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // Clear cart
      localStorage.setItem("cart", "[]");
      // Navigate to success page
      navigate("/payment-success");
    }, 3000);
  };

  const handleDepositPayment = async () => {
    setIsProcessing(true);

    // Simulate deposit payment
    setTimeout(() => {
      setIsProcessing(false);
      setDepositPaid(true);
      localStorage.setItem("depositPaid", "true");
    }, 2000);
  };

  const paymentMethods = [
    {
      id: "upi",
      name: "UPI Payment",
      icon: Smartphone,
      description: "Pay using UPI ID or QR code",
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: CreditCard,
      description: "Visa, Mastercard, RuPay",
    },
    {
      id: "wallet",
      name: "Digital Wallet",
      icon: Wallet,
      description: "Paytm, PhonePe, Google Pay",
    },
  ];

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              No items to checkout
            </h2>
            <p className="text-gray-600 mb-6">
              Add items to your cart before proceeding to payment.
            </p>
            <Button asChild>
              <Link to="/">Start Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/cart" className="text-primary hover:text-primary/80">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-xl font-semibold">Secure Payment</h1>
              <Badge variant="secondary" className="bg-green-50 text-green-700">
                <Shield className="h-3 w-3 mr-1" />
                SSL Secured
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Deposit Section */}
            <Card
              className={
                depositPaid
                  ? "border-green-200 bg-green-50"
                  : "border-orange-200 bg-orange-50"
              }
            >
              <CardHeader>
                <CardTitle className="flex items-center">
                  {depositPaid ? (
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  ) : (
                    <Shield className="h-5 w-5 text-orange-600 mr-2" />
                  )}
                  Refundable Deposit
                </CardTitle>
              </CardHeader>
              <CardContent>
                {depositPaid ? (
                  <div className="text-green-700">
                    <p className="font-semibold mb-2">✅ Deposit Paid</p>
                    <p className="text-sm">
                      Your ₹1,000 refundable deposit is active. You can now
                      proceed with your order.
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-orange-700 mb-4">
                      A refundable deposit of ₹1,000 is required to unlock
                      better prices and secure your orders.
                    </p>
                    <Button
                      onClick={handleDepositPayment}
                      disabled={isProcessing}
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      {isProcessing ? "Processing..." : "Pay ₹1,000 Deposit"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Select Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                >
                  {paymentMethods.map((method) => {
                    const IconComponent = method.icon;
                    return (
                      <div
                        key={method.id}
                        className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <RadioGroupItem value={method.id} id={method.id} />
                        <IconComponent className="h-5 w-5 text-gray-600" />
                        <div className="flex-1">
                          <Label
                            htmlFor={method.id}
                            className="font-medium cursor-pointer"
                          >
                            {method.name}
                          </Label>
                          <p className="text-sm text-gray-500">
                            {method.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Payment Details */}
            {paymentMethod === "upi" && (
              <Card>
                <CardHeader>
                  <CardTitle>UPI Payment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="upi">UPI ID</Label>
                    <Input
                      id="upi"
                      placeholder="yourname@upi"
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {paymentMethod === "card" && (
              <Card>
                <CardHeader>
                  <CardTitle>Card Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      className="mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input
                      id="cardName"
                      placeholder="John Doe"
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-start text-sm"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-gray-500">
                          {item.storeName} × {item.quantity}
                        </p>
                      </div>
                      <span className="font-semibold">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <hr />

                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{getSubtotal()}</span>
                </div>

                {getTotalSavings() > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>You saved</span>
                    <span className="font-semibold">₹{getTotalSavings()}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>

                <hr />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{getSubtotal()}</span>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handlePayment}
                  disabled={!depositPaid || isProcessing}
                >
                  {isProcessing
                    ? "Processing Payment..."
                    : `Pay ₹${getSubtotal()}`}
                </Button>

                {!depositPaid && (
                  <p className="text-xs text-red-600 text-center">
                    Please pay the deposit first to proceed
                  </p>
                )}

                <div className="text-xs text-gray-500 text-center space-y-1">
                  <p>Your payment is secured with 256-bit SSL encryption</p>
                  <p>Orders will be delivered within the estimated time</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

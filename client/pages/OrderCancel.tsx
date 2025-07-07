import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, XCircle, RefreshCw, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function OrderCancel() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  const cancellationReasons = [
    "Changed my mind",
    "Found a better deal elsewhere",
    "Delivery time too long",
    "Ordered by mistake",
    "Item no longer needed",
    "Payment issues",
    "Other (specify below)",
  ];

  const handleCancelOrder = async () => {
    if (!selectedReason) {
      alert("Please select a reason for cancellation");
      return;
    }

    if (selectedReason === "Other (specify below)" && !customReason.trim()) {
      alert("Please specify your reason for cancellation");
      return;
    }

    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsCancelled(true);
    }, 2000);
  };

  if (isCancelled) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Order Cancelled Successfully
            </h2>
            <p className="text-gray-600 mb-6">
              Your order #{orderId} has been cancelled. Refund will be processed
              within 3-5 business days.
            </p>

            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg text-left">
                <h3 className="font-semibold text-green-800 mb-2">
                  Refund Details:
                </h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Order amount: ₹485</li>
                  <li>• Refund to: Original payment method</li>
                  <li>• Processing time: 3-5 business days</li>
                  <li>
                    • Refund ID: REF
                    {Math.random().toString(36).substr(2, 8).toUpperCase()}
                  </li>
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" asChild>
                  <Link to="/profile">View Profile</Link>
                </Button>
                <Button asChild>
                  <Link to="/">Continue Shopping</Link>
                </Button>
              </div>
            </div>
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
              <Link
                to={`/order-details/${orderId}`}
                className="text-primary hover:text-primary/80"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-xl font-semibold">Cancel Order</h1>
                <p className="text-sm text-gray-600">#{orderId}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Warning Card */}
        <Card className="mb-6 border-orange-200 bg-orange-50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <XCircle className="h-6 w-6 text-orange-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-orange-800 mb-2">
                  Are you sure you want to cancel this order?
                </h3>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Your order is currently being prepared for delivery</li>
                  <li>• Cancellation may take up to 24 hours to process</li>
                  <li>
                    • Refund will be credited to your original payment method
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cancellation Form */}
        <Card>
          <CardHeader>
            <CardTitle>Reason for Cancellation</CardTitle>
            <p className="text-sm text-gray-600">
              Please help us understand why you're cancelling this order
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup
              value={selectedReason}
              onValueChange={setSelectedReason}
            >
              {cancellationReasons.map((reason) => (
                <div key={reason} className="flex items-center space-x-2">
                  <RadioGroupItem value={reason} id={reason} />
                  <Label htmlFor={reason} className="cursor-pointer">
                    {reason}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {selectedReason === "Other (specify below)" && (
              <div className="space-y-2">
                <Label htmlFor="customReason">Please specify your reason</Label>
                <Textarea
                  id="customReason"
                  placeholder="Tell us more about why you're cancelling..."
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  rows={3}
                />
              </div>
            )}

            <div className="space-y-3 pt-4">
              <Button
                className="w-full"
                size="lg"
                onClick={handleCancelOrder}
                disabled={!selectedReason || isProcessing}
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Processing Cancellation...
                  </>
                ) : (
                  "Cancel Order"
                )}
              </Button>

              <Button
                variant="outline"
                className="w-full"
                size="lg"
                asChild
                disabled={isProcessing}
              >
                <Link to={`/order-details/${orderId}`}>
                  Keep Order & Go Back
                </Link>
              </Button>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                By cancelling, you agree to our cancellation policy. Refunds are
                subject to terms and conditions.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Phone, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length !== 10) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
    }, 1500);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to home or dashboard
      window.location.href = "/";
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-primary hover:text-primary/80 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-primary mb-2">Sharva Mart</h1>
          <p className="text-gray-600">Welcome back to fresh groceries</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              {step === "phone" ? (
                <Phone className="h-8 w-8 text-primary" />
              ) : (
                <Shield className="h-8 w-8 text-primary" />
              )}
            </div>
            <CardTitle className="text-xl">
              {step === "phone" ? "Login or Register" : "Verify OTP"}
            </CardTitle>
            <p className="text-sm text-gray-600">
              {step === "phone"
                ? "Enter your mobile number to continue"
                : `We've sent a 6-digit code to +91 ${phoneNumber}`}
            </p>
          </CardHeader>

          <CardContent>
            {step === "phone" ? (
              <form onSubmit={handleSendOTP} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Mobile Number</Label>
                  <div className="flex">
                    <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-gray-50 text-gray-600">
                      +91
                    </div>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter 10-digit mobile number"
                      value={phoneNumber}
                      onChange={(e) =>
                        setPhoneNumber(e.target.value.replace(/\D/g, ""))
                      }
                      maxLength={10}
                      className="rounded-l-none"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={phoneNumber.length !== 10 || isLoading}
                >
                  {isLoading ? "Sending OTP..." : "Send OTP"}
                </Button>

                <div className="text-center">
                  <p className="text-xs text-gray-500">
                    By continuing, you agree to our Terms of Service and Privacy
                    Policy
                  </p>
                </div>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    maxLength={6}
                    className="text-center text-lg tracking-wider"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={otp.length !== 6 || isLoading}
                >
                  {isLoading ? "Verifying..." : "Verify & Continue"}
                </Button>

                <div className="text-center space-y-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setStep("phone")}
                    className="text-primary"
                  >
                    Change mobile number
                  </Button>
                  <p className="text-xs text-gray-500">
                    Didn't receive OTP?{" "}
                    <button
                      type="button"
                      className="text-primary hover:underline"
                      onClick={() => handleSendOTP}
                    >
                      Resend
                    </button>
                  </p>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mt-8 grid grid-cols-2 gap-4 text-center">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl mb-2">🛡️</div>
            <p className="text-sm font-medium text-gray-700">Secure</p>
            <p className="text-xs text-gray-500">Protected checkout</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl mb-2">🚚</div>
            <p className="text-sm font-medium text-gray-700">Fast Delivery</p>
            <p className="text-xs text-gray-500">Same day delivery</p>
          </div>
        </div>
      </div>
    </div>
  );
}

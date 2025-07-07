import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Copy,
  Share2,
  MessageCircle,
  Mail,
  Users,
  Gift,
  CheckCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface ReferralShareProps {
  trigger: React.ReactNode;
}

export default function ReferralShare({ trigger }: ReferralShareProps) {
  const [copied, setCopied] = useState(false);
  const referralCode = "SHARVA24USER";
  const referralLink = `https://sharvamart.com/join?ref=${referralCode}`;
  const userRewards = 850; // Current rewards earned
  const referralCount = 3; // Friends referred

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareViaWhatsApp = () => {
    const message = `Hey! 👋 Check out Sharva Mart - the best grocery delivery app! 🛒\n\nUse my referral code: ${referralCode}\nOr download directly: ${referralLink}\n\nYou'll get ₹100 off on your first order! 🎉`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const shareViaSMS = () => {
    const message = `Check out Sharva Mart! Use my code ${referralCode} for ₹100 off. Download: ${referralLink}`;
    const smsUrl = `sms:?body=${encodeURIComponent(message)}`;
    window.open(smsUrl, "_blank");
  };

  const shareViaEmail = () => {
    const subject = "Get ₹100 off on Sharva Mart!";
    const body = `Hi there!\n\nI've been using Sharva Mart for grocery delivery and it's amazing! 🛒\n\nYou can get ₹100 off on your first order by using my referral code: ${referralCode}\n\nOr download the app directly: ${referralLink}\n\nEnjoy fresh groceries delivered to your doorstep!\n\nCheers!`;
    const emailUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(emailUrl, "_blank");
  };

  const shareViaGeneric = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join Sharva Mart - Get ₹100 off!",
          text: `Use my referral code ${referralCode} for ₹100 off on Sharva Mart!`,
          url: referralLink,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback to copy link
      copyToClipboard(referralLink);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center space-x-2">
            <Gift className="h-5 w-5 text-primary" />
            <span>Refer & Earn</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Stats */}
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-primary">
                    {referralCount}
                  </p>
                  <p className="text-xs text-gray-600">Friends Referred</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    ₹{userRewards}
                  </p>
                  <p className="text-xs text-gray-600">Total Earned</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Referral Code */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              Your Referral Code
            </p>
            <div className="flex items-center space-x-2">
              <Input
                value={referralCode}
                readOnly
                className="font-mono text-center text-lg font-bold bg-gray-50"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(referralCode)}
                className="flex-shrink-0"
              >
                {copied ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Sharing Options */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">
              Share with your contacts
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-12 flex items-center justify-center space-x-2 bg-green-50 hover:bg-green-100 border-green-200"
                onClick={shareViaWhatsApp}
              >
                <MessageCircle className="h-5 w-5 text-green-600" />
                <span className="text-green-700">WhatsApp</span>
              </Button>

              <Button
                variant="outline"
                className="h-12 flex items-center justify-center space-x-2 bg-blue-50 hover:bg-blue-100 border-blue-200"
                onClick={shareViaSMS}
              >
                <MessageCircle className="h-5 w-5 text-blue-600" />
                <span className="text-blue-700">SMS</span>
              </Button>

              <Button
                variant="outline"
                className="h-12 flex items-center justify-center space-x-2 bg-gray-50 hover:bg-gray-100 border-gray-200"
                onClick={shareViaEmail}
              >
                <Mail className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">Email</span>
              </Button>

              <Button
                variant="outline"
                className="h-12 flex items-center justify-center space-x-2"
                onClick={shareViaGeneric}
              >
                <Share2 className="h-5 w-5" />
                <span>More</span>
              </Button>
            </div>
          </div>

          {/* Referral Link */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              Referral Link
            </p>
            <div className="flex items-center space-x-2">
              <Input
                value={referralLink}
                readOnly
                className="text-xs bg-gray-50"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(referralLink)}
                className="flex-shrink-0"
              >
                {copied ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Referral Benefits */}
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-4">
              <h4 className="font-semibold text-orange-800 mb-2 flex items-center">
                <Users className="h-4 w-4 mr-2" />
                How it works
              </h4>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Your friend gets ₹100 off their first order</li>
                <li>• You earn ₹100 when they complete first purchase</li>
                <li>• Refer 10 friends to unlock premium benefits</li>
                <li>• No limit on referral earnings!</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}

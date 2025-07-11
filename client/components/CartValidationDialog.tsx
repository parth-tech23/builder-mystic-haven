import { AlertTriangle, ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface CartValidationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onClearAndAdd: () => void;
  onCancel: () => void;
  currentStoreName: string;
  newStoreName: string;
  currentCartItemsCount: number;
}

export default function CartValidationDialog({
  isOpen,
  onClose,
  onClearAndAdd,
  onCancel,
  currentStoreName,
  newStoreName,
  currentCartItemsCount,
}: CartValidationDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <span>Different Store Detected</span>
          </DialogTitle>
          <DialogDescription className="text-left space-y-3 pt-2">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-4 w-4 text-primary" />
              <span className="text-sm">
                You have{" "}
                <span className="font-semibold">{currentCartItemsCount}</span>{" "}
                item{currentCartItemsCount > 1 ? "s" : ""} from{" "}
                <Badge variant="outline" className="text-xs">
                  {currentStoreName}
                </Badge>{" "}
                in your cart.
              </span>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-sm text-amber-800">
                <strong>Note:</strong> Orders can only contain items from a
                single store to ensure faster delivery and better service.
              </p>
            </div>

            <div className="text-sm text-gray-600">
              To add items from{" "}
              <Badge variant="outline" className="text-xs">
                {newStoreName}
              </Badge>
              , we need to clear your current cart first.
            </div>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={onCancel}
            className="w-full sm:w-auto"
          >
            <X className="h-4 w-4 mr-2" />
            Keep Current Cart
          </Button>
          <Button
            onClick={onClearAndAdd}
            className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Clear Cart & Add Item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

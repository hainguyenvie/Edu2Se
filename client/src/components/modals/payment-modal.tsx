import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, CheckCircle } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
  roomName: string;
  price: string;
}

export default function PaymentModal({ isOpen, onClose, onPaymentSuccess, roomName, price }: PaymentModalProps) {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, onClose]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white shadow-2xl">
        <CardHeader className="relative text-center">
          <CardTitle className="text-xl font-bold text-gray-900">
            Quét QR để tham gia
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6 text-center">
          {/* Room Info */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-1">{roomName}</h3>
            <p className="text-sm text-gray-600">Phí tham gia phòng học</p>
          </div>

          {/* QR Code */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mx-auto w-48 h-48 flex items-center justify-center">
            <div className="text-6xl font-mono text-black leading-none">
              <div className="grid grid-cols-3 gap-1">
                <div className="w-4 h-4 bg-black"></div>
                <div className="w-4 h-4 bg-white border border-black"></div>
                <div className="w-4 h-4 bg-black"></div>
                <div className="w-4 h-4 bg-white border border-black"></div>
                <div className="w-4 h-4 bg-black"></div>
                <div className="w-4 h-4 bg-white border border-black"></div>
                <div className="w-4 h-4 bg-black"></div>
                <div className="w-4 h-4 bg-white border border-black"></div>
                <div className="w-4 h-4 bg-black"></div>
              </div>
              <div className="grid grid-cols-4 gap-1 mt-1">
                <div className="w-3 h-1 bg-black"></div>
                <div className="w-3 h-1 bg-white"></div>
                <div className="w-3 h-1 bg-black"></div>
                <div className="w-3 h-1 bg-white"></div>
              </div>
              <div className="grid grid-cols-3 gap-1 mt-1">
                <div className="w-4 h-4 bg-black"></div>
                <div className="w-4 h-4 bg-white border border-black"></div>
                <div className="w-4 h-4 bg-black"></div>
              </div>
            </div>
          </div>

          {/* Price and Timer */}
          <div className="space-y-2">
            <div className="text-2xl font-bold text-blue-600">{price} - VN PAY</div>
            <div className="text-sm text-gray-500">
              Thời gian còn lại: <span className="font-mono text-red-600">{formatTime(timeLeft)}</span>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-gray-50 rounded-lg p-4 text-left">
            <p className="text-sm text-gray-700 mb-2">
              <strong>Hướng dẫn thanh toán:</strong>
            </p>
            <ol className="text-sm text-gray-600 space-y-1">
              <li>1. Mở ứng dụng ngân hàng hoặc ví điện tử</li>
              <li>2. Quét mã QR ở trên</li>
              <li>3. Xác nhận thanh toán {price}</li>
              <li>4. Nhấn "Xác nhận đã thanh toán" bên dưới</li>
            </ol>
          </div>

          {/* Confirm Payment Button */}
          <div className="space-y-3">
            <Button
              onClick={handleConfirmPayment}
              disabled={isProcessing}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Đang xác nhận...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Xác nhận đã thanh toán</span>
                </div>
              )}
            </Button>
            
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Hủy
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
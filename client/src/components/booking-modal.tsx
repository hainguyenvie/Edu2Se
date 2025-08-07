import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { type Tutor } from "@shared/schema";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";

interface BookingModalProps {
  tutor: Tutor | null;
  isOpen: boolean;
  onClose: () => void;
}

type BookingStage = 'packages' | 'schedule' | 'confirmation' | 'success';

export default function BookingModal({ tutor, isOpen, onClose }: BookingModalProps) {
  const [stage, setStage] = useState<BookingStage>('packages');
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  if (!tutor) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const packages = [
    { 
      id: 'basic', 
      title: 'Gói khởi động', 
      duration: 'Combo 4 buổi', 
      price: 280000, 
      originalPrice: 320000,
      icon: '🎯' 
    },
    { 
      id: 'advanced', 
      title: 'Gói tăng tốc', 
      duration: 'Combo 8 buổi', 
      price: 520000, 
      originalPrice: 640000,
      icon: '🚀' 
    },
    { 
      id: 'intensive', 
      title: 'Gói vượt đài', 
      duration: 'Combo 12 buổi', 
      price: 720000, 
      originalPrice: 960000,
      icon: '⚡' 
    },
    { 
      id: 'trial', 
      title: '1 buổi trải nghiệm', 
      duration: '', 
      price: 80000, 
      originalPrice: 100000,
      icon: '✨' 
    }
  ];

  const days = ['Hôm nay', 'Ngày mai', 'Thứ 7', 'Chủ nhật', 'Thứ 2', 'Thứ 3'];
  const times = ['9h AM', '10h AM', '11h AM', '12h AM', '1h PM'];

  const handleNext = () => {
    if (stage === 'packages' && selectedPackage) {
      setStage('schedule');
    } else if (stage === 'schedule' && selectedDay && selectedTime) {
      setStage('confirmation');
    } else if (stage === 'confirmation') {
      setStage('success');
    }
  };

  const handleBack = () => {
    if (stage === 'schedule') {
      setStage('packages');
    } else if (stage === 'confirmation') {
      setStage('schedule');
    }
  };

  const handleClose = () => {
    setStage('packages');
    setSelectedPackage('');
    setSelectedDay('');
    setSelectedTime('');
    onClose();
  };

  const renderPackageStage = () => (
    <div className="relative">
      {/* Header with close button */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center ring-4 ring-orange-50">
            <span className="text-2xl">👩‍🏫</span>
          </div>
          <div>
            <h3 className="font-bold text-xl text-gray-900">{tutor.name}</h3>
            <p className="text-sm text-gray-500">Chọn gói học phù hợp</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={handleClose}>
          <X className="h-5 w-5 text-gray-400" />
        </Button>
      </div>

      <div className="p-6">
        <div className="space-y-3 mb-8">
          {packages.map((pkg) => (
            <Card 
              key={pkg.id}
              className={`cursor-pointer transition-all duration-200 border-2 hover:shadow-lg ${
                selectedPackage === pkg.id 
                  ? 'border-green-500 bg-green-50 shadow-lg ring-2 ring-green-100' 
                  : 'border-gray-200 hover:border-green-300'
              }`}
              onClick={() => setSelectedPackage(pkg.id)}
            >
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      selectedPackage === pkg.id 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-100'
                    }`}>
                      <span className="text-xl">{pkg.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">{pkg.title}</h4>
                      <p className="text-sm text-gray-600 font-medium">{pkg.duration}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-red-600 font-bold text-xl">
                      {formatPrice(pkg.price)}đ
                    </div>
                    {pkg.originalPrice && (
                      <div className="text-sm text-gray-400 line-through">
                        {formatPrice(pkg.originalPrice)}đ
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button 
          onClick={handleNext}
          disabled={!selectedPackage}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 text-lg rounded-xl shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          TIẾP TỤC
        </Button>
      </div>
    </div>
  );

  const renderScheduleStage = () => (
    <div className="relative">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handleBack} className="hover:bg-gray-100">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center ring-4 ring-orange-50">
              <span className="text-2xl">👩‍🏫</span>
            </div>
            <div>
              <h3 className="font-bold text-xl text-gray-900">{tutor.name}</h3>
              <p className="text-sm text-green-600 font-semibold">ĐẶT LỊCH</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Day Selection */}
        <div className="mb-8">
          <h4 className="text-lg font-bold text-gray-900 mb-4">Chọn ngày học</h4>
          <div className="grid grid-cols-3 gap-3">
            {days.map((day) => (
              <Button
                key={day}
                variant={selectedDay === day ? "default" : "outline"}
                className={`h-14 text-sm font-medium rounded-xl transition-all duration-200 ${
                  selectedDay === day 
                    ? 'bg-green-500 text-white shadow-lg ring-2 ring-green-200' 
                    : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
                }`}
                onClick={() => setSelectedDay(day)}
              >
                {day}
              </Button>
            ))}
          </div>
        </div>

        {/* Time Selection */}
        <div className="mb-8">
          <h4 className="text-lg font-bold text-gray-900 mb-4">Chọn giờ học</h4>
          <div className="space-y-3">
            {times.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? "default" : "outline"}
                className={`w-full h-14 text-lg font-medium rounded-xl transition-all duration-200 ${
                  selectedTime === time 
                    ? 'bg-green-500 text-white shadow-lg ring-2 ring-green-200' 
                    : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
                }`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>

        <Button 
          onClick={handleNext}
          disabled={!selectedDay || !selectedTime}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 text-lg rounded-xl shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          TIẾP TỤC
        </Button>
      </div>
    </div>
  );

  const renderConfirmationStage = () => {
    const selectedPkg = packages.find(pkg => pkg.id === selectedPackage);
    
    return (
      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={handleBack} className="hover:bg-gray-100">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center ring-4 ring-orange-50">
                <span className="text-2xl">👩‍🏫</span>
              </div>
              <div>
                <h3 className="font-bold text-xl text-gray-900">{tutor.name}</h3>
                <p className="text-sm text-green-600 font-semibold">ĐẶT LỊCH</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Price Display */}
          <div className="text-center mb-8">
            <div className="text-4xl font-black text-red-500 mb-2">
              {selectedPkg ? formatPrice(selectedPkg.price) : '0'}đ
            </div>
            <p className="text-gray-500 font-medium">Tổng số tiền thanh toán</p>
          </div>

          {/* Booking Details */}
          <Card className="mb-6 border-0 bg-gray-50">
            <CardContent className="p-5">
              <div className="space-y-3 text-base">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Ngày:</span>
                  <span className="font-bold text-gray-900">{selectedDay}, 15/07/2025 - 23/08/2025</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Thời gian:</span>
                  <span className="font-bold text-gray-900">{selectedTime} - 22:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Môn học:</span>
                  <span className="font-bold text-gray-900">Toán, Lý</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Combo:</span>
                  <span className="font-bold text-gray-900">{selectedPkg?.title}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Details */}
          <Card className="mb-8 border-0 bg-blue-50">
            <CardContent className="p-5">
              <div className="space-y-3 text-base">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Học phí trả:</span>
                  <span className="font-bold text-gray-900">{selectedPkg ? formatPrice(selectedPkg.price) : '0'}₫</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Gia sư được:</span>
                  <span className="font-bold text-gray-900">75.000₫</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Phí ứng dụng:</span>
                  <span className="font-bold text-gray-900">25.000₫</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* QR Code */}
          <div className="text-center mb-8">
            <div className="w-32 h-32 mx-auto bg-black rounded-2xl flex items-center justify-center mb-3 shadow-lg">
              <div className="w-28 h-28 bg-white rounded-xl grid grid-cols-4 gap-1 p-2">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className={`rounded-sm ${i % 2 === 0 ? 'bg-black' : 'bg-white'}`} />
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-600 font-medium">Mã QR thanh toán</p>
          </div>

          {/* Action Button */}
          <Button 
            onClick={handleNext}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 text-lg rounded-xl shadow-lg mb-4"
          >
            Xác nhận và thanh toán
          </Button>
          
          <Button 
            variant="outline"
            onClick={handleBack}
            className="w-full border-gray-300 text-gray-600 font-medium py-3 rounded-xl"
          >
            Quay lại chỉnh sửa
          </Button>
        </div>
      </div>
    );
  };

  const renderSuccessStage = () => (
    <div className="relative">
      <div className="p-8 text-center">
        {/* Success Icon */}
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-lg ring-4 ring-green-100">
          <Check className="w-12 h-12 text-white" />
        </div>
        
        {/* Success Title */}
        <h3 className="text-2xl font-bold text-green-600 mb-4">Đặt lịch thành công</h3>
        
        {/* Success Message */}
        <div className="bg-green-50 rounded-xl p-6 mb-6">
          <p className="text-gray-700 mb-3 text-lg">
            Buổi học của bạn với gia sư <span className="font-bold text-green-700">{tutor.name}</span> đã được đặt thành công.
          </p>
          <p className="text-green-600 font-semibold text-lg">Vào lúc {selectedTime} ngày {selectedDay}</p>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 rounded-xl p-6 mb-8 text-left">
          <h4 className="font-bold text-gray-900 mb-4 text-center">📋 Chuẩn bị tài liệu:</h4>
          <div className="space-y-3 text-gray-700">
            <p className="flex items-start gap-3">
              <span className="text-green-500 font-bold">•</span>
              <span>Gia sư sẽ liên hệ với bạn trước buổi học 30 phút</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-green-500 font-bold">•</span>
              <span>Xác thực email sẽ được gửi đến địa chỉ email của bạn</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-green-500 font-bold">•</span>
              <span>Chuẩn bị sách vở và câu hỏi cần hỗ trợ</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={handleClose}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 text-lg rounded-xl shadow-lg"
          >
            Trang chủ
          </Button>
          <Button 
            variant="outline"
            className="w-full border-green-300 text-green-600 font-medium py-3 rounded-xl hover:bg-green-50"
          >
            Lịch học của tôi
          </Button>
        </div>
      </div>
    </div>
  );

  const renderStage = () => {
    switch (stage) {
      case 'packages':
        return renderPackageStage();
      case 'schedule':
        return renderScheduleStage();
      case 'confirmation':
        return renderConfirmationStage();
      case 'success':
        return renderSuccessStage();
      default:
        return renderPackageStage();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg mx-auto max-h-[95vh] overflow-y-auto p-0 border-0 shadow-2xl">
        <DialogHeader className="sr-only">
          <DialogTitle>Đặt lịch học</DialogTitle>
        </DialogHeader>
        <div className="bg-white rounded-2xl overflow-hidden">
          {renderStage()}
        </div>
      </DialogContent>
    </Dialog>
  );
}
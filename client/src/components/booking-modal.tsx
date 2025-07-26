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
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
          <span className="text-xl">👩‍🏫</span>
        </div>
        <div>
          <h3 className="font-semibold text-lg">{tutor.name}</h3>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {packages.map((pkg) => (
          <Card 
            key={pkg.id}
            className={`cursor-pointer transition-all border-2 ${
              selectedPackage === pkg.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedPackage(pkg.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg">{pkg.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{pkg.title}</h4>
                    <p className="text-sm text-gray-600">{pkg.duration}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-red-600 font-semibold">
                    {formatPrice(pkg.price)}đ
                  </div>
                  {pkg.originalPrice && (
                    <div className="text-sm text-gray-500 line-through">
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
        className="w-full bg-green-600 hover:bg-green-700 text-white"
      >
        TIẾP TỤC
      </Button>
    </div>
  );

  const renderScheduleStage = () => (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
            <span className="text-xl">👩‍🏫</span>
          </div>
          <div>
            <h3 className="font-semibold text-lg">{tutor.name}</h3>
            <p className="text-sm text-gray-600">ĐẶT LỊCH</p>
          </div>
        </div>
      </div>

      {/* Day Selection */}
      <div className="mb-6">
        <div className="grid grid-cols-6 gap-2">
          {days.map((day) => (
            <Button
              key={day}
              variant={selectedDay === day ? "default" : "outline"}
              className={`h-12 text-sm ${
                selectedDay === day 
                  ? 'bg-blue-600 text-white' 
                  : 'border-gray-300'
              }`}
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </Button>
          ))}
        </div>
      </div>

      {/* Time Selection */}
      <div className="mb-6">
        <div className="space-y-2">
          {times.map((time) => (
            <Button
              key={time}
              variant={selectedTime === time ? "default" : "outline"}
              className={`w-full h-12 ${
                selectedTime === time 
                  ? 'bg-blue-600 text-white' 
                  : 'border-gray-300'
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
        className="w-full bg-green-600 hover:bg-green-700 text-white"
      >
        TIẾP TỤC
      </Button>
    </div>
  );

  const renderConfirmationStage = () => {
    const selectedPkg = packages.find(pkg => pkg.id === selectedPackage);
    
    return (
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-xl">👩‍🏫</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg">{tutor.name}</h3>
              <p className="text-sm text-gray-600">ĐẶT LỊCH</p>
            </div>
          </div>
        </div>

        {/* Price Display */}
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-red-600 mb-2">
            {selectedPkg ? formatPrice(selectedPkg.price) : '0'}đ
          </div>
          <p className="text-sm text-gray-600">Tổng số tiền thanh toán</p>
        </div>

        {/* Booking Details */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Ngày:</span>
                <span className="font-medium">{selectedDay}, 15/07/2025 - 23/08/2025</span>
              </div>
              <div className="flex justify-between">
                <span>Thời gian:</span>
                <span className="font-medium">{selectedTime} - 22:00</span>
              </div>
              <div className="flex justify-between">
                <span>Môn học:</span>
                <span className="font-medium">Toán, Lý</span>
              </div>
              <div className="flex justify-between">
                <span>Combo:</span>
                <span className="font-medium">{selectedPkg?.title}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Details */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Học phí trả:</span>
                <span className="font-medium">{selectedPkg ? formatPrice(selectedPkg.price) : '0'}₫</span>
              </div>
              <div className="flex justify-between">
                <span>Gia sư được:</span>
                <span className="font-medium">75.000₫</span>
              </div>
              <div className="flex justify-between">
                <span>Phí ứng dụng:</span>
                <span className="font-medium">25.000₫</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* QR Code */}
        <div className="text-center mb-6">
          <div className="w-24 h-24 mx-auto bg-black rounded-lg flex items-center justify-center mb-2">
            <div className="w-20 h-20 bg-white rounded grid grid-cols-3 gap-px p-1">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className={`bg-black ${i % 3 === 1 ? 'bg-white' : ''}`} />
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-600">Mã QR thanh toán</p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <Button variant="outline" size="sm" className="text-xs">
            <X className="w-4 h-4 mr-1" />
            Quay lại
          </Button>
          <Button 
            onClick={handleNext}
            className="bg-green-600 hover:bg-green-700 text-white text-xs"
          >
            Thanh toán và đặt lịch ngay
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            Lưu học của tôi
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    );
  };

  const renderSuccessStage = () => (
    <div className="p-6 text-center">
      <h3 className="text-xl font-bold text-green-600 mb-6">Đặt lịch thành công</h3>
      
      <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
        <Check className="w-10 h-10 text-green-600" />
      </div>

      <p className="text-gray-600 mb-2">
        Buổi học của bạn với gia sư <span className="font-semibold">{tutor.name}</span> đã được đặt thành công.
      </p>
      <p className="text-sm text-gray-500 mb-6">Vào lúc {selectedTime} ngày {selectedDay}</p>

      <div className="text-left space-y-2 mb-6">
        <p className="text-sm text-gray-600">• Chuẩn bị tài liệu:</p>
        <p className="text-sm text-gray-600">• Gia sư sẽ liên hệ với bạn trước buổi học 30 phút.*</p>
        <p className="text-sm text-gray-600">• Xác thực là email sẽ được gửi đến địa chỉ email của bạn.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button 
          onClick={handleClose}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Trang chủ
        </Button>
        <Button variant="outline">
          Lịch học của tôi
        </Button>
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
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader className="sr-only">
          <DialogTitle>Đặt lịch học</DialogTitle>
        </DialogHeader>
        {renderStage()}
      </DialogContent>
    </Dialog>
  );
}
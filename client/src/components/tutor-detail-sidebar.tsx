import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type Tutor } from "@shared/schema";
import { Star, X, Clock, BookOpen, Award, MessageCircle, Calendar, MapPin } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

interface TutorDetailSidebarProps {
  tutor: Tutor | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TutorDetailSidebar({ tutor, isOpen, onClose }: TutorDetailSidebarProps) {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [, setLocation] = useLocation();

  if (!tutor) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online':
        return <Badge className="bg-green-500 text-white">ONLINE</Badge>;
      case 'busy':
        return <Badge className="bg-red-500 text-white">BẬN</Badge>;
      default:
        return null;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const timeSlotLabels: { [key: string]: string } = {
    morning: "Sáng",
    afternoon: "Chiều",
    evening: "Tối"
  };

  const handleBookNow = () => {
    console.log('Booking tutor:', tutor.name, 'Time slot:', selectedTimeSlot);
    // TODO: Implement booking functionality
  };

  const handleChat = () => {
    console.log('Starting chat with:', tutor.name);
    // TODO: Implement chat functionality
  };

  const handleViewDetails = () => {
    console.log('Viewing full profile of:', tutor.name);
    setLocation(`/tutor/${tutor.id}`);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:bg-white/20"
            >
              <X className="h-6 w-6" />
            </Button>
            
            <div className="pr-12">
              <h2 className="text-xl font-bold mb-2">{tutor.name}</h2>
              <div className="flex items-center space-x-2 mb-3">
                {getStatusBadge(tutor.status)}
                {tutor.isTopRated && (
                  <Badge className="bg-yellow-500 text-white">TOP RATED</Badge>
                )}
                {tutor.isVerified && (
                  <Badge className="bg-blue-400 text-white">VERIFIED</Badge>
                )}
              </div>
              <p className="text-blue-100 text-sm">
                {tutor.subjects.join(', ')} • {tutor.grades.join(', ')}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Profile Image and Video */}
            <div className="mb-6">
              <div className="relative bg-blue-100 rounded-lg h-48 flex items-center justify-center mb-4">
                <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 border-l-2 border-white transform rotate-45"></div>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg"></div>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center justify-center mb-6">
              <div className="flex text-yellow-400 mr-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.floor(parseFloat(tutor.rating))
                        ? 'fill-current'
                        : ''
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600 text-sm">
                {tutor.rating} ({tutor.reviewCount} đánh giá)
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Clock className="w-6 h-6 mx-auto mb-1 text-blue-500" />
                <div className="text-xs text-gray-600">THỜI GIAN</div>
                <div className="font-semibold text-sm">Linh hoạt</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <BookOpen className="w-6 h-6 mx-auto mb-1 text-green-500" />
                <div className="text-xs text-gray-600">BÀI HỌC</div>
                <div className="font-semibold text-sm">200+</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Award className="w-6 h-6 mx-auto mb-1 text-yellow-500" />
                <div className="text-xs text-gray-600">KN NGHIỆM</div>
                <div className="font-semibold text-sm">5+ năm</div>
              </div>
            </div>

            {/* Time Slots */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Thời gian có sẵn
              </h3>
              <div className="space-y-2">
                {tutor.timeSlots?.map((slot) => (
                  <label key={slot} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="timeSlot"
                      value={slot}
                      checked={selectedTimeSlot === slot}
                      onChange={(e) => setSelectedTimeSlot(e.target.value)}
                      className="text-blue-500"
                    />
                    <span className="text-sm">{timeSlotLabels[slot]}</span>
                    <div className="flex space-x-1 ml-auto">
                      <X className="w-4 h-4 text-green-500" />
                      <X className="w-4 h-4 text-green-500" />
                      <X className="w-4 h-4 text-red-500" />
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Education & Experience */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Thông tin
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Học vấn:</strong> {tutor.education}</p>
                <p><strong>Kinh nghiệm:</strong> {tutor.experience || '5+ năm giảng dạy'}</p>
                <p><strong>Mô tả:</strong> {tutor.description}</p>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6 text-center">
              <div className="text-2xl font-bold text-gray-900">
                {formatPrice(tutor.pricePerHour)}₫
              </div>
              <div className="text-sm text-gray-600">per hour</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 border-t border-gray-200 space-y-3">
            <Button 
              onClick={handleBookNow}
              disabled={!selectedTimeSlot || tutor.status === 'busy'}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3"
            >
              BOOK NOW
            </Button>
            <Button 
              onClick={handleChat}
              variant="outline"
              className="w-full border-blue-500 text-blue-500 hover:bg-blue-50 font-medium py-3"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              CHAT
            </Button>
            <Button 
              onClick={handleViewDetails}
              variant="outline"
              className="w-full border-gray-300 text-gray-600 hover:bg-gray-50 font-medium py-3"
            >
              CHI TIẾT
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
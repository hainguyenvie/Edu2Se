import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, X, Clock, BookOpen, Award, MessageCircle, Calendar, MapPin, GraduationCap, Video, Users, CheckCircle } from "lucide-react";
import { useLocation } from "wouter";
import BookingModal from "@/components/booking-modal";
import { type Tutor } from "@shared/schema";

interface TutorDetailSidebarProps {
  tutor: Tutor | null;
  isOpen: boolean;
  onClose: () => void;
  onStartChat: (tutorName: string) => void;
}

export default function TutorDetailSidebar({ tutor, isOpen, onClose, onStartChat }: TutorDetailSidebarProps) {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [, setLocation] = useLocation();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  if (!tutor) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online':
        return <Badge className="bg-green-500 text-white text-xs px-2 py-1">ONLINE</Badge>;
      case 'busy':
        return <Badge className="bg-red-500 text-white text-xs px-2 py-1">BẬN</Badge>;
      default:
        return null;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const handleBookNow = () => {
    console.log('Booking tutor:', tutor.name, 'Time slot:', selectedTimeSlot);
    setIsBookingModalOpen(true);
  };

  const handleChat = () => {
    console.log('Starting chat with:', tutor.name);
    if (tutor.name) {
      onStartChat(tutor.name);
    }
    onClose();
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
        className={`fixed top-0 right-0 h-full w-[440px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } overflow-hidden`}
      >
        <div className="flex flex-col h-full">
          {/* Enhanced Header with Avatar and Basic Info */}
          <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 px-6 pt-6 pb-8 text-white">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
            
            <div className="flex items-start space-x-4 pr-12">
              {/* Avatar with Status */}
              <div className="relative">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/30">
                  <span className="text-2xl font-bold text-white">
                    {tutor.name.charAt(0)}
                  </span>
                </div>
                {/* Status indicator */}
                {tutor.status === 'online' && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
              
              {/* Basic Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2 flex-wrap">
                  <h2 className="text-xl font-bold text-white truncate">{tutor.name}</h2>
                  {getStatusBadge(tutor.status)}
                  <Badge className="bg-blue-600 text-white flex items-center gap-2 px-3 py-1 rounded-full">
                    <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center">
                      <CheckCircle className="w-2.5 h-2.5 fill-current text-white" />
                    </div>
                    VERIFIED
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-blue-100 mb-3">
                  <span className="flex items-center space-x-1">
                    <GraduationCap className="w-4 h-4" />
                    <span>{tutor.subjects.join(" • ")}</span>
                  </span>
                </div>
                
                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-white font-medium">5.0</span>
                  <span className="text-blue-200 text-sm">(23 đánh giá)</span>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
              <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent rounded-full transform translate-x-8 -translate-y-8"></div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Profile Video/Image Section */}
            <div className="p-6 bg-gray-50">
              <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl h-48 flex items-center justify-center mb-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
                <div className="relative z-10 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-3">
                    <Video className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-gray-700 font-medium">Video giới thiệu</p>
                  <p className="text-gray-500 text-sm">Xem cách thầy dạy</p>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="px-6 pb-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                  <div className="text-xs text-gray-600 mb-1">THỜI GIAN</div>
                  <div className="font-semibold text-sm">Linh hoạt</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                  <BookOpen className="w-6 h-6 mx-auto mb-2 text-green-500" />
                  <div className="text-xs text-gray-600 mb-1">BÀI HỌC</div>
                  <div className="font-semibold text-sm">200+</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                  <Award className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
                  <div className="text-xs text-gray-600 mb-1">KINH NGHIỆM</div>
                  <div className="font-semibold text-sm">5+ năm</div>
                </div>
              </div>

              {/* About Section */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-500" />
                  Giới thiệu
                </h3>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Tôi là giảng viên có 5+ năm kinh nghiệm trong việc dạy Toán và Lý cho học sinh THPT. 
                    Phương pháp dạy của tôi tập trung vào việc giúp học sinh hiểu bản chất vấn đề và 
                    áp dụng kiến thức vào thực tế.
                  </p>
                </div>
              </div>

              {/* Achievements */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Thành tích</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Đã dạy hơn 200 học viên</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">8000+ giờ giảng dạy</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Chứng chỉ sư phạm chuyên nghiệp</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Price and Action Buttons */}
          <div className="border-t border-gray-200 bg-white">
            {/* Price */}
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {formatPrice(tutor.pricePerHour)}₫
                </div>
                <div className="text-sm text-gray-600">mỗi giờ học</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-6 space-y-3">
              <Button 
                onClick={handleBookNow}
                disabled={tutor.status === 'busy'}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Calendar className="w-4 h-4 mr-2" />
                ĐẶT LỊCH NGAY
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  onClick={handleChat}
                  variant="outline"
                  className="border-blue-500 text-blue-500 hover:bg-blue-50 font-medium py-3 rounded-xl transition-all duration-200"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  CHAT
                </Button>
                <Button 
                  onClick={handleViewDetails}
                  variant="outline"
                  className="border-gray-300 text-gray-600 hover:bg-gray-50 font-medium py-3 rounded-xl transition-all duration-200"
                >
                  CHI TIẾT
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal 
        tutor={tutor}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
}
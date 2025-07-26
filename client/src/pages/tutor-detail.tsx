import { useState } from "react";
import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { type Tutor } from "@shared/schema";
import { 
  Star, 
  Heart, 
  Calendar, 
  MessageCircle, 
  Shield, 
  Clock,
  Play,
  Facebook,
  Youtube
} from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/header";
import BookingModal from "@/components/booking-modal";

export default function TutorDetail() {
  const [match, params] = useRoute("/tutor/:id");
  const [isFavorited, setIsFavorited] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  
  const { data: tutor, isLoading } = useQuery<Tutor>({
    queryKey: ['/api/tutors', params?.id],
    enabled: !!params?.id,
  });

  if (!match || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải thông tin gia sư...</p>
        </div>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy gia sư</h2>
          <Link href="/">
            <Button>Quay về trang chủ</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const subjects = [
    { name: "TOÁN", available: true },
    { name: "LÝ", available: true },
    { name: "HÓA", available: false },
    { name: "ÔN THI", available: true },
    { name: "LUYỆN ĐỀ", available: true },
    { name: "HỌ ĐẢP", available: true },
    { name: "TƯ VẤN TÂM SỰ", available: false },
    { name: "LỚP HỌC LIVE", available: false },
  ];

  const achievements = [
    { title: "TIẾU ĐỎI 200 HỌC VIÊN", color: "bg-blue-100 text-blue-800" },
    { title: "ĐÃ DẠY 8000 GIỜ", color: "bg-green-100 text-green-800" },
    { title: "CHỨNG CHỈ SEAL HỘI TIẾU", color: "bg-green-100 text-green-800" },
  ];

  const sidebarItems = [
    { icon: Heart, title: "THEO DÕI", color: "text-red-500" },
    { icon: Calendar, title: "ĐẶT LỊCH", color: "text-blue-500" },
    { icon: MessageCircle, title: "CHAT VỚI THẦY", color: "text-green-500" },
    { icon: Shield, title: "Báo cáo", color: "text-orange-500" },
  ];

  const freeOffers = Array(4).fill({
    title: "FREE 1H học thử 1 tuần",
    icon: "🎯"
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Profile */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              {/* Profile Image */}
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto mb-4 rounded-lg border-2 border-orange-200 bg-orange-50 flex items-center justify-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-2xl">👨‍🏫</span>
                  </div>
                </div>
                
                {/* Rating */}
                <div className="flex justify-center mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(parseFloat(tutor.rating || "0"))
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {formatPrice(tutor.pricePerHour)}₫/1h
                </div>
                <div className="text-sm text-gray-600">MINH TIẾN</div>
              </div>

              {/* Social Links */}
              <div className="flex justify-center space-x-3 mb-6">
                <Button variant="outline" size="icon" className="text-blue-600">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="text-red-600">
                  <Youtube className="h-4 w-4" />
                </Button>
              </div>

              {/* Stats */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Học tập</span>
                  <span className="font-medium">⭐⭐⭐⭐⭐</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Thành tích</span>
                  <span className="font-medium">⭐⭐⭐⭐⭐</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Achievements */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4 text-center">BẢNG THÀNH TÍCH</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => (
                  <Card key={index} className={`p-4 text-center ${achievement.color}`}>
                    <div className="text-sm font-medium">{achievement.title}</div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Subjects */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 text-center">NHẬN DẠY CÁC MÔN SAU</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {subjects.map((subject, index) => (
                  <Button
                    key={index}
                    variant={subject.available ? "default" : "outline"}
                    className={`text-sm ${
                      subject.available 
                        ? "bg-primary text-white" 
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                    disabled={!subject.available}
                  >
                    {subject.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* About */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">THÔNG TIN</h3>
              <Card className="p-6">
                <p className="text-gray-700 leading-relaxed">
                  HỌC SINH LỚP 12 NĂM LỚP, THỊ KHOA TOÁN TỈN!
                  <br />
                  AN TRẠNG THI ĐẠO KHOA TRƯỜNG NHỮNG HỌC THỊ KHÔNG TÂM THƯỜNG.
                </p>
              </Card>
            </div>

            {/* Videos */}
            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Array(3).fill(null).map((_, index) => (
                  <Card key={index} className="p-4">
                    <div className="bg-blue-200 rounded-lg h-32 flex items-center justify-center mb-3">
                      <Play className="h-8 w-8 text-blue-600" />
                    </div>
                    <p className="text-sm text-center font-medium">ẢNH VÀ VIDEO GT</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h3 className="text-lg font-semibold mb-4">ĐÁNH GIÁ</h3>
              <Card className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 text-sm">
                      Tôi đã học bằng thầy day hay và đề hỏu
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Action Buttons */}
            {sidebarItems.map((item, index) => (
              <Button 
                key={index} 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => {
                  if (item.title === "ĐẶT LỊCH") {
                    setIsBookingModalOpen(true);
                  }
                }}
              >
                <item.icon className={`h-5 w-5 mr-3 ${item.color}`} />
                {item.title}
              </Button>
            ))}

            {/* Free Offers */}
            <div className="space-y-3">
              <h4 className="font-semibold text-center">ƯU ĐÃI CỦA MINH TIẾN</h4>
              {freeOffers.map((offer, index) => (
                <Card key={index} className="p-4 border-purple-200 bg-purple-50">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{offer.icon}</span>
                    <div className="text-sm font-medium text-purple-800">
                      {offer.title}
                    </div>
                  </div>
                </Card>
              ))}
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
    </div>
  );
}
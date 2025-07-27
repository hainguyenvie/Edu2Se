import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, Play, Calendar, MessageCircle, Facebook, Youtube } from "lucide-react";
import BookingModal from "@/components/booking-modal";
import { useState } from "react";
import Header from "@/components/header";

type Tutor = {
  id: string;
  name: string;
  subjects: string[];
  price: number;
  rating: number;
  experience: string;
  status: "online" | "offline" | "busy";
  avatar: string;
  about: string;
  education: string;
  achievements: string[];
  schedule: string[];
  reviews: Array<{
    id: string;
    student: string;
    rating: number;
    comment: string;
    date: string;
  }>;
};

// Read-only tutor profile view for browsing other tutors
export default function TutorView() {
  const { id } = useParams();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const { data: tutor, isLoading } = useQuery<Tutor>({
    queryKey: [`/api/tutors/${id}`],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">Đang tải...</div>
        </div>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">Không tìm thấy gia sư</div>
        </div>
      </div>
    );
  }

  // Static data for display purposes
  const achievements = [
    { title: "TIẾU ĐỎI 200 HỌC VIÊN", color: "bg-blue-100 text-blue-800" },
    { title: "CHỨNG CHỈ SEAL HỘI TIẾU", color: "bg-green-100 text-green-800" },
    { title: "ĐÃ DẠY 8000 GIỜ", color: "bg-green-100 text-green-800" }
  ];

  const subjects = [
    { name: "TOÁN", available: true },
    { name: "HỌ ĐẢP", available: true },
    { name: "LÝ", available: true },
    { name: "HÓA", available: false },
    { name: "ÔN THI", available: true },
    { name: "LUYỆN ĐỀ", available: true },
    { name: "TƯ VẤN TÂM SỰ", available: false },
    { name: "LỚP HỌC LIVE", available: false }
  ];

  const offers = [
    { title: "FREE 1H học thử 1 tuần", icon: "🎯" },
    { title: "FREE 1H học thử 1 tuần", icon: "🎯" },
    { title: "FREE 1H học thử 1 tuần", icon: "🎯" }
  ];

  const videos = [
    { id: 1, title: "ẢNH VÀ VIDEO GT" },
    { id: 2, title: "ẢNH VÀ VIDEO GT" },
    { id: 3, title: "ẢNH VÀ VIDEO GT" }
  ];

  const tutorInfo = "HỌC SINH LỚP 12 NĂM LỚP, THỊ KHOA TOÁN TỈN!\nAN TRẠNG THI ĐẠO KHOA TRƯỜNG NHỮNG HỌC THỊ KHÔNG TÂM THƯỜNG.";

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Tutor Info */}
          <div className="lg:col-span-1">
            <Card className="p-6 text-center">
              {/* Avatar and Status */}
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto"></div>
                <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${
                  tutor.status === "online" ? "bg-green-500" : 
                  tutor.status === "busy" ? "bg-yellow-500" : "bg-gray-400"
                }`}></div>
              </div>

              {/* Name and Price */}
              <div className="mb-4">
                <h1 className="text-xl font-bold mb-2">{tutor.name}</h1>
                <div className="text-2xl font-bold text-green-600 mb-2">
                  {(tutor.pricePerHour || 0).toLocaleString()}₫/h
                </div>
                <div className="text-sm text-gray-600">MINH TIẾN</div>
              </div>

              
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Achievements */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-center mb-4">BẢNG THÀNH TÍCH</h2>
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
              <h3 className="text-lg font-semibold text-center mb-4">NHẬN DẠY CÁC MÔN SAU</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {subjects.map((subject, index) => (
                  <Button
                    key={index}
                    variant={subject.available ? "default" : "outline"}
                    className={`text-sm w-full ${
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
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {tutorInfo}
                </p>
              </Card>
            </div>

            {/* Videos */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-center mb-4">ẢNH VÀ VIDEO GT</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {videos.map((video, index) => (
                  <Card key={video.id} className="p-4">
                    <div className="bg-blue-200 rounded-lg h-32 flex items-center justify-center mb-3">
                      <Play className="h-8 w-8 text-blue-600" />
                    </div>
                    <p className="text-sm text-center font-medium">{video.title}</p>
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

          {/* Right Sidebar - Actions */}
          <div className="lg:col-span-1 space-y-4">
            {/* Book Button */}
            <Button 
              className="w-full"
              onClick={() => setIsBookingModalOpen(true)}
            >
              <Calendar className="h-5 w-5 mr-3" />
              ĐẶT LỊCH
            </Button>

            {/* Message Button */}
            <Button variant="outline" className="w-full">
              <MessageCircle className="h-5 w-5 mr-3" />
              NHẮN TIN
            </Button>

            {/* Free Offers */}
            <div className="space-y-3">
              <h4 className="font-semibold text-center">ƯU ĐÃI CỦA MINH TIẾN</h4>
              {offers.map((offer, index) => (
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
        tutor={{
          ...tutor,
          grades: ["10", "11", "12"],
          pricePerHour: tutor.price,
          reviewCount: 0,
          isVerified: true,
          isTopRated: false,
          profileImage: null,
          timeSlots: [],
          createdAt: null
        }}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
}
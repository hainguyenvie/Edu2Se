import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Clock, MessageCircle, Plus } from "lucide-react";
import Header from "@/components/header";
import LoginModal from "@/components/modals/login-modal";
import PaymentModal from "@/components/modals/payment-modal";
import RoomViewModal from "@/components/modals/room-view-modal";

export default function StudyWithMe() {
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showRoomView, setShowRoomView] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Mock data for study rooms
  const studyRooms = [
    {
      id: 1,
      creator: {
        name: "Lê Thị Bình",
        avatar: "👩‍🎓",
        rating: 4.5
      },
      participants: 12,
      maxParticipants: 20,
      bio: "Cùng ôn thi đại học môn Toán. Không gian yên tĩnh, tập trung cao.",
      startTime: "2 giờ trước",
      vibes: ["\"Học tập là chìa khóa của thành công\"", "\"Kiên trì là sức mạnh\"", "\"Mục tiêu rõ ràng, kết quả tốt đẹp\"", "\"Nỗ lực hôm nay, thành công ngày mai\""],
      isLive: true
    },
    {
      id: 2,
      creator: {
        name: "Nguyễn Lan Mai",
        avatar: "👨‍💼",
        rating: 4.8
      },
      participants: 8,
      maxParticipants: 15,
      bio: "Study session cho IELTS Speaking. Practice cùng nhau nhé!",
      startTime: "1 giờ trước",
      vibes: ["\"Thực hành tạo nên hoàn hảo\"", "\"Kiến thức là sức mạnh\"", "\"Ánh sáng của trí tuệ\"", "\"Năng lượng tích cực\""],
      isLive: true
    },
    {
      id: 3,
      creator: {
        name: "Lý Hương",
        avatar: "👩‍🔬",
        rating: 4.3
      },
      participants: 15,
      maxParticipants: 25,
      bio: "Học nhóm Hóa học lớp 12. Giải bài tập và thảo luận công thức.",
      startTime: "3 giờ trước",
      vibes: ["\"Khoa học là chân lý\"", "\"Ghi chép là ghi nhớ\"", "\"Học vấn mở ra tương lai\"", "\"Ý tưởng sáng tạo\""],
      isLive: true
    },
    {
      id: 4,
      creator: {
        name: "Trương Hải Đình",
        avatar: "👨‍🎨",
        rating: 4.6
      },
      participants: 6,
      maxParticipants: 12,
      bio: "Pomodoro session 25/5. Chill study, lo-fi music background.",
      startTime: "30 phút trước",
      vibes: ["\"Âm nhạc nuôi dưỡng tâm hồn\"", "\"Thời gian là vàng bạc\"", "\"Thiên nhiên chữa lành\"", "\"Cà phê và tri thức\""],
      isLive: true
    },
    {
      id: 5,
      creator: {
        name: "Lại Chi",
        avatar: "👩‍💻",
        rating: 4.9
      },
      participants: 18,
      maxParticipants: 30,
      bio: "Coding bootcamp prep. Javascript fundamentals và algorithms.",
      startTime: "45 phút trước",
      vibes: ["\"Code là nghệ thuật\"", "\"Tốc độ và hiệu quả\"", "\"Bay cao với công nghệ\"", "\"Lửa nhiệt huyết\""],
      isLive: true
    },
    {
      id: 6,
      creator: {
        name: "Hoàng Minh Tuấn",
        avatar: "👨‍🎓",
        rating: 4.2
      },
      participants: 9,
      maxParticipants: 20,
      bio: "Silent study room. Chỉ học im lặng, không chat.",
      startTime: "2 giờ trước",
      vibes: ["\"Im lặng là vàng\"", "\"Sách là bạn tốt nhất\"", "\"Thiền định trong học tập\"", "\"Tập trung cao độ\""],
      isLive: true
    },
    {
      id: 7,
      creator: {
        name: "Hoàng Minh Tuấn",
        avatar: "👨‍🎓",
        rating: 4.4
      },
      participants: 22,
      maxParticipants: 25,
      bio: "Late night study grind. Cùng thức khuya ôn bài nhé.",
      startTime: "1 giờ trước",
      vibes: ["\"Đêm khuya là thời gian của sự sáng tạo\"", "\"Sức mạnh ý chí\"", "\"Tri thức không ngủ\"", "\"Cà phê đêm\""],
      isLive: true
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating) 
            ? "text-yellow-400 fill-current" 
            : index < rating 
            ? "text-yellow-400 fill-current opacity-50" 
            : "text-gray-300"
        }`}
      />
    ));
  };

  const handleJoinRoom = (room: any) => {
    setSelectedRoom(room);
    setShowLoginModal(true);
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    setShowRoomView(true);
  };

  const handleCloseRoomView = () => {
    setShowRoomView(false);
    setSelectedRoom(null);
  };

  const handleCloseModals = () => {
    setShowLoginModal(false);
    setShowPaymentModal(false);
    setSelectedRoom(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onToggleSidebar={toggleSidebar} />
      
      {/* Create Room Button - Top Right */}
      <div className="fixed top-20 right-6 z-50">
        <Button 
          className="bg-blue-600 hover:bg-blue-700 shadow-lg rounded-full px-6 py-3"
          onClick={() => setShowLoginModal(true)}
        >
          <Plus className="w-5 h-5 mr-2" />
          Tạo Room
        </Button>
      </div>
      
      <div className="container mx-auto px-6 py-8 pt-24">

        {/* Banner Section */}
        <Card className="mb-8 overflow-hidden border-0 shadow-lg">
          <div className="h-32 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-2xl font-bold mb-2">🌟 Study Together, Achieve More</h2>
              <p className="text-purple-100">Tham gia cộng đồng học tập trực tuyến hàng đầu Việt Nam</p>
            </div>
          </div>
        </Card>

        {/* Study Rooms List */}
        <div className="space-y-4">
          {studyRooms.map((room) => (
            <Card 
              key={room.id} 
              className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  {/* Left Section - Avatar and Info */}
                  <div className="flex items-center space-x-4">
                    {/* Avatar */}
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-2xl">{room.creator.avatar}</span>
                      </div>
                      {room.isLive && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        </div>
                      )}
                    </div>

                    {/* Creator Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{room.creator.name}</h3>
                      <div className="flex items-center space-x-1 mb-2">
                        {renderStars(room.creator.rating)}
                        <span className="text-sm text-gray-500 ml-2">
                          {room.creator.rating}
                        </span>
                      </div>
                      
                      {/* Vibe Quotes */}
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        {room.vibes.map((vibe, index) => (
                          <span 
                            key={index} 
                            className="text-xs bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-2 py-1 rounded-full border border-blue-200"
                          >
                            {vibe}
                          </span>
                        ))}
                      </div>
                      
                      {/* Bio */}
                      <p className="text-sm text-gray-600 mb-2 max-w-md">{room.bio}</p>
                      
                      {/* Time and Participants */}
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{room.startTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>{room.participants}/{room.maxParticipants}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Section - Participants and Join Button */}
                  <div className="flex flex-col items-end space-y-3">
                    {/* Participants Count */}
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{room.participants}</div>
                      <div className="text-xs text-gray-500">người tham gia</div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-gray-300 hover:border-gray-400"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 px-6 shadow-sm"
                        onClick={() => handleJoinRoom(room)}
                      >
                        Tham gia
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Participants Progress Bar */}
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(room.participants / room.maxParticipants) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <Button variant="outline" className="px-8">
            Xem thêm phòng học
          </Button>
        </div>
      </div>

      {/* Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={handleCloseModals}
        onLoginSuccess={handleLoginSuccess}
      />
      
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={handleCloseModals}
        onPaymentSuccess={handlePaymentSuccess}
        roomName={selectedRoom?.creator?.name || ""}
        price="20k VND"
      />
      
      <RoomViewModal
        isOpen={showRoomView}
        onClose={handleCloseRoomView}
        roomData={selectedRoom || {}}
      />
    </div>
  );
}
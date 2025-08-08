import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Star, 
  Heart, 
  Calendar, 
  MessageCircle, 
  Shield, 
  Clock,
  Play,
  Award,
  Users,
  BookOpen,
  GraduationCap,
  Briefcase,
  Target,
  Video,
  Zap,
  Calculator,
  ChevronLeft,
  ChevronRight,
  Flag
} from "lucide-react";
import Header from "@/components/header";
import BookingModal from "@/components/booking-modal";

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
  const [isFollowing, setIsFollowing] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<any>(null);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string>("Thứ 2");

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

  // Static data matching tutor-detail.tsx structure
  const achievements = [
    { title: "TOP 200 HỌC VIÊN", color: "bg-blue-100 text-blue-800 border-2" },
    { title: "ĐÃ DẠY 8000 GIỜ", color: "bg-green-100 text-green-800 border-2" },
    { title: "CHỨNG CHỈ GIẢNG VIÊN", color: "bg-purple-100 text-purple-800 border-2" }
  ];

  const subjects = [
    { name: "TOÁN", price: "150k/h", available: true, color: "bg-blue-100 text-blue-800" },
    { name: "LÝ", price: "150k/h", available: true, color: "bg-green-100 text-green-800" },
    { name: "HÓA", price: "140k/h", available: false, color: "bg-yellow-100 text-yellow-800" },
    { name: "ÔN THI", price: "180k/h", available: true, color: "bg-purple-100 text-purple-800" }
  ];

  const offers = [
    { title: "FREE 1H học thử", icon: "🎯" },
    { title: "Giảm 20% khóa dài hạn", icon: "💰" },
    { title: "Tặng tài liệu PDF", icon: "📚" }
  ];

  const videos = [
    { id: 1, title: "Video giới thiệu", type: "video", duration: "02:30", thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400" },
    { id: 2, title: "Phương pháp dạy", type: "video", duration: "03:45", thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400" },
    { id: 3, title: "Thành tích học viên", type: "image", duration: "", thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400" },
    { id: 4, title: "Bảng điểm học viên", type: "image", duration: "", thumbnail: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400" },
    { id: 5, title: "Tài liệu giảng dạy", type: "image", duration: "", thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400" },
    { id: 6, title: "Lớp học trực tiếp", type: "video", duration: "01:20", thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400" }
  ];

  const tutorInfo = "Tôi là giáo viên có 5+ năm kinh nghiệm dạy Toán, Lý cấp 2-3. Chuyên luyện thi đại học với phương pháp dạy dễ hiểu, tận tâm với từng học viên.";

  const education = [
    {
      id: 1,
      degree: "Kỹ sư Toán ứng dụng",
      school: "Đại học Bách Khoa Hà Nội",
      gpa: "GPA: 3.8/4.0",
      year: "2015-2019"
    }
  ];

  const experience = [
    {
      id: 1,
      title: "Giáo viên dạy kèm",
      description: "5+ năm dạy kèm",
      details: "Chuyên Toán, Lý cấp 2-3",
      period: "2019-2024"
    }
  ];

  const specialties = [
    {
      id: 1,
      title: "Luyện thi Đại học",
      description: "THPT Quốc gia, A00, A01",
      details: "Chuyên môn chính"
    }
  ];

  const certificates = [
    {
      id: 1,
      name: "Chứng chỉ giảng dạy",
      issuer: "TESOL, Pedagogy Certificate",
      year: "2020"
    }
  ];

  // Weekly schedule data
  const weeklySchedule = {
    "Thứ 2": [
      { time: "19:00 - 21:00", status: "available", subject: "Toán" },
      { time: "21:00 - 23:00", status: "booked", subject: "Lý" }
    ],
    "Thứ 3": [
      { time: "18:30 - 20:30", status: "available", subject: "Toán" }
    ],
    "Thứ 4": [
      { time: "19:00 - 21:00", status: "available", subject: "Toán" },
      { time: "21:00 - 23:00", status: "available", subject: "Lý" }
    ],
    "Thứ 5": [],
    "Thứ 6": [
      { time: "19:30 - 21:30", status: "booked", subject: "Toán" }
    ],
    "Thứ 7": [
      { time: "14:00 - 16:00", status: "available", subject: "Toán" },
      { time: "16:30 - 18:30", status: "available", subject: "Lý" },
      { time: "19:00 - 21:00", status: "booked", subject: "Toán" }
    ],
    "Chủ nhật": [
      { time: "09:00 - 11:00", status: "available", subject: "Toán" },
      { time: "14:00 - 16:00", status: "available", subject: "Lý" }
    ]
  };

  const weekDays = [
    { short: "T2", full: "Thứ 2" },
    { short: "T3", full: "Thứ 3" },
    { short: "T4", full: "Thứ 4" },
    { short: "T5", full: "Thứ 5" },
    { short: "T6", full: "Thứ 6" },
    { short: "T7", full: "Thứ 7" },
    { short: "CN", full: "Chủ nhật" }
  ];

  const openMediaModal = (media: any) => {
    setSelectedMedia(media);
    setIsMediaModalOpen(true);
  };

  const navigateMedia = (direction: 'prev' | 'next') => {
    if (!selectedMedia) return;
    
    const currentIndex = videos.findIndex(m => m.id === selectedMedia.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : videos.length - 1;
    } else {
      newIndex = currentIndex < videos.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedMedia(videos[newIndex]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 mb-8 text-white">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
              <AvatarImage src={tutor.avatar} />
              <AvatarFallback className="bg-white text-blue-600 text-4xl font-bold">
                {tutor.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="text-center lg:text-left flex-1">
              <h1 className="text-4xl font-bold mb-2">{tutor.name}</h1>
              <div className="text-2xl font-semibold mb-4">
                {(tutor.pricePerHour || 600000).toLocaleString()}₫/h
                <span className="text-lg font-normal ml-2">MINH TIẾN</span>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-lg">(4.9)</span>
                </div>
                <Badge className="bg-green-500 hover:bg-green-600">
                  <Shield className="w-4 h-4 mr-1" />
                  Đã xác minh
                </Badge>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <div className={`w-3 h-3 rounded-full ${
                  tutor.status === "online" ? "bg-green-400" : 
                  tutor.status === "busy" ? "bg-yellow-400" : "bg-gray-400"
                } animate-pulse`}></div>
                <span className="capitalize">{
                  tutor.status === "online" ? "Trực tuyến" :
                  tutor.status === "busy" ? "Bận" : "Ngoại tuyến"
                }</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Achievements */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-6 h-6 mr-3" />
                  Bảng thành tích
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {achievements.map((achievement, index) => (
                    <Card key={index} className={`p-4 text-center border-2 transition-all hover:shadow-md ${achievement.color}`}>
                      <div className="mb-2">
                        <Zap className="w-8 h-8 mx-auto text-current" />
                      </div>
                      <div className="text-sm font-semibold">{achievement.title}</div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Subjects */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-6 h-6 mr-3" />
                  Môn học giảng dạy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {subjects.map((subject, index) => (
                    <Card key={index} className={`p-4 h-full ${subject.color} hover:shadow-lg transition-all duration-200`}>
                      <div className="text-center">
                        <div className="w-12 h-12 mx-auto mb-3 bg-white rounded-full flex items-center justify-center">
                          <Calculator className="w-6 h-6 text-current" />
                        </div>
                        <div className="font-semibold text-xs mb-1">{subject.name}</div>
                        <div className="text-xs opacity-90">{subject.price}</div>
                        <Badge 
                          className="mt-2 text-xs" 
                          variant={subject.available ? "default" : "secondary"}
                        >
                          {subject.available ? "Còn chỗ" : "Hết chỗ"}
                        </Badge>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* About Section */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="w-6 h-6 mr-3" />
                  Giới thiệu bản thân
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                  <p className="text-gray-800 leading-relaxed text-lg">
                    {tutorInfo}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="w-6 h-6 mr-3" />
                  Học vấn
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{edu.degree}</h3>
                          <p className="text-gray-600">{edu.school}</p>
                          <p className="text-sm text-gray-500">{edu.gpa}</p>
                        </div>
                        <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded">
                          {edu.year}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="w-6 h-6 mr-3" />
                  Kinh nghiệm
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {experience.map((exp) => (
                    <div key={exp.id} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{exp.title}</h3>
                          <p className="text-gray-600">{exp.description}</p>
                          <p className="text-sm text-gray-500">{exp.details}</p>
                        </div>
                        <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded">
                          {exp.period}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Specialties */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-6 h-6 mr-3" />
                  Chuyên môn
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {specialties.map((specialty) => (
                    <div key={specialty.id} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{specialty.title}</h3>
                        <p className="text-gray-600">{specialty.description}</p>
                        <p className="text-sm text-gray-500">{specialty.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certificates */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-6 h-6 mr-3" />
                  Chứng chỉ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {certificates.map((cert) => (
                    <div key={cert.id} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{cert.name}</h3>
                          <p className="text-gray-600">{cert.issuer}</p>
                        </div>
                        <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded">
                          {cert.year}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Media Gallery */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Video className="w-6 h-6 mr-3" />
                  Thư viện ảnh & video
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {videos.map((media) => (
                    <div
                      key={media.id}
                      className="relative group cursor-pointer"
                      onClick={() => openMediaModal(media)}
                    >
                      <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={media.thumbnail}
                          alt={media.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                        {media.type === "video" && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-black bg-opacity-50 rounded-full p-3">
                              <Play className="w-6 h-6 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Action Buttons (replacing Quick Actions) */}
          <div className="lg:col-span-1 space-y-6">
            {/* Action Buttons */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-6 h-6 mr-3" />
                  Thao tác
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant={isFollowing ? "default" : "outline"}
                  className="w-full"
                  onClick={() => setIsFollowing(!isFollowing)}
                >
                  <Heart className={`h-5 w-5 mr-3 ${isFollowing ? 'fill-current' : ''}`} />
                  {isFollowing ? 'ĐANG THEO DÕI' : 'THEO DÕI'}
                </Button>

                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => setIsBookingModalOpen(true)}
                >
                  <Calendar className="h-5 w-5 mr-3" />
                  ĐẶT LỊCH
                </Button>

                <Button variant="outline" className="w-full">
                  <MessageCircle className="h-5 w-5 mr-3" />
                  NHẮN TIN
                </Button>

                <Button variant="outline" className="w-full text-red-600 hover:text-red-700 hover:border-red-300">
                  <Flag className="h-5 w-5 mr-3" />
                  BÁO CÁO
                </Button>
              </CardContent>
            </Card>

            {/* Special Offers */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-orange-50 to-red-50">
              <CardHeader>
                <CardTitle className="flex items-center text-orange-700">
                  <Zap className="w-6 h-6 mr-3" />
                  Ưu đãi đặc biệt
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {offers.map((offer, index) => (
                  <Card key={index} className="p-4 bg-white border border-orange-200">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{offer.icon}</div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-orange-700">{offer.title}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Smart Weekly Schedule */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-6 h-6 mr-3" />
                  Lịch dạy tuần này
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Day Selection Buttons */}
                <div className="flex gap-1 justify-center px-2">
                  {weekDays.map((day) => (
                    <Button
                      key={day.full}
                      variant={selectedDay === day.full ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedDay(day.full)}
                      className={`relative transition-all duration-200 w-8 h-7 text-xs px-1 ${
                        selectedDay === day.full 
                          ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg" 
                          : "hover:bg-blue-50 hover:border-blue-300"
                      }`}
                    >
                      {day.short}
                      {/* Available slots indicator */}
                      {weeklySchedule[day.full] && weeklySchedule[day.full].filter(slot => slot.status === 'available').length > 0 && (
                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                      )}
                    </Button>
                  ))}
                </div>

                {/* Selected Day Time Slots */}
                <div className="border rounded-lg p-6 bg-gradient-to-br from-blue-50 to-purple-50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg text-gray-900">{selectedDay}</h3>
                    <Badge variant="outline" className="text-sm">
                      {weeklySchedule[selectedDay]?.filter(slot => slot.status === 'available').length || 0} slot trống
                    </Badge>
                  </div>
                  
                  {weeklySchedule[selectedDay] && weeklySchedule[selectedDay].filter(slot => slot.status === 'available').length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                      {weeklySchedule[selectedDay]
                        .filter(slot => slot.status === 'available')
                        .map((slot, index) => (
                        <Card 
                          key={index} 
                          className="p-4 transition-all duration-200 cursor-pointer bg-green-50 border-green-200 hover:bg-green-100 hover:shadow-md"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-full bg-green-100">
                              <Clock className="w-4 h-4 text-green-600" />
                            </div>
                            <div>
                              <div className="font-semibold text-sm">{slot.time}</div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                      <p className="text-gray-500 font-medium">Không có lịch dạy</p>
                      <p className="text-sm text-gray-400">Thầy/cô chưa mở lớp trong ngày này</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Media Modal */}
        {isMediaModalOpen && selectedMedia && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <button
                onClick={() => setIsMediaModalOpen(false)}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-all z-10"
              >
                <MessageCircle className="w-6 h-6" />
              </button>
              
              <button
                onClick={() => navigateMedia('prev')}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-all z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={() => navigateMedia('next')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-all z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              
              <div className="p-6">
                <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                  <img
                    src={selectedMedia.thumbnail}
                    alt={selectedMedia.title}
                    className="w-full h-full object-cover"
                  />
                  {selectedMedia.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-blue-600 rounded-full p-6">
                        <Play className="w-12 h-12 text-white" />
                      </div>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-2">{selectedMedia.title}</h3>
                {selectedMedia.duration && (
                  <p className="text-gray-600">Thời lượng: {selectedMedia.duration}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      <BookingModal 
        tutor={{
          ...tutor,
          grades: ["10", "11", "12"],
          pricePerHour: tutor.price || 600000,
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
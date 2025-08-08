import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  Edit,
  Settings,
  BarChart3,
  Plus,
  Minus,
  ArrowUp,
  ArrowDown,
  Award,
  Users,
  BookOpen,
  GraduationCap,
  Briefcase,
  Target,
  ThumbsUp,
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

  const achievements = [
    { title: "TOP 200 HỌC VIÊN", color: "bg-blue-100 text-blue-800" },
    { title: "ĐÃ DẠY 8000 GIỜ", color: "bg-green-100 text-green-800" },
    { title: "CHỨNG CHỈ GIẢNG VIÊN", color: "bg-purple-100 text-purple-800" }
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
      { time: "19:00 - 21:00", status: "available", subject: "Toán" }
    ],
    "Thứ 3": [
      { time: "18:30 - 20:30", status: "available", subject: "Toán" }
    ],
    "Thứ 4": [
      { time: "19:00 - 21:00", status: "available", subject: "Toán" },
      { time: "21:00 - 23:00", status: "available", subject: "Lý" }
    ],
    "Thứ 5": [],
    "Thứ 6": [],
    "Thứ 7": [
      { time: "14:00 - 16:00", status: "available", subject: "Toán" },
      { time: "16:30 - 18:30", status: "available", subject: "Lý" }
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 pt-24 pb-8 max-w-7xl">
        {/* Main Content Grid - EXACT copy from tutor-detail.tsx */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Simple Profile Card */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-6 text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src={tutor.avatar} alt={tutor.name} />
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {tutor.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <h2 className="text-xl font-bold mb-2">{tutor.name}</h2>
                
                <div className="flex justify-center gap-2 mb-3">
                  <Badge className="bg-green-500 text-white border-0 text-xs">
                    <Shield className="w-3 h-3 mr-1" />
                    Đã xác thực
                  </Badge>
                  <Badge className="bg-yellow-500 text-white border-0 text-xs">
                    <Star className="w-3 h-3 mr-1" />
                    Top Rated
                  </Badge>
                </div>
                
                <div className="flex justify-center items-center mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-sm font-medium">4.8 (150)</span>
                </div>
                
                <div className="text-xl font-bold text-blue-600">
                  {(tutor.price || 150000).toLocaleString()}đ/h
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-6 h-6 mr-3" />
                  Thống kê nhanh
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Học viên hiện tại</span>
                  </div>
                  <span className="font-bold text-blue-600">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Giờ dạy tháng này</span>
                  </div>
                  <span className="font-bold text-green-600">87h</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">Điểm trung bình</span>
                  </div>
                  <span className="font-bold text-yellow-600">4.9/5</span>
                </div>
              </CardContent>
            </Card>
          </div>

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
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {subjects.map((subject, index) => (
                    <Card key={index} className={`p-4 h-full ${subject.color} hover:shadow-lg transition-all duration-200 cursor-pointer`}>
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
                  <p className="text-gray-800 leading-relaxed whitespace-pre-line text-lg">
                    {tutorInfo}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Education & Experience */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="w-6 h-6 mr-3" />
                  Học vấn & Kinh nghiệm
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Education Section */}
                <div>
                  <h4 className="font-semibold text-lg mb-4 flex items-center">
                    <GraduationCap className="w-5 h-5 mr-2 text-blue-600" />
                    Học vấn
                  </h4>
                  <div className="space-y-4">
                    {education.map((edu) => (
                      <div key={edu.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <GraduationCap className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-900">{edu.degree}</h5>
                          <p className="text-gray-600">{edu.school}</p>
                          <div className="flex items-center gap-3 text-sm text-gray-500">
                            <span>{edu.gpa}</span>
                            <span>•</span>
                            <span>{edu.year}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experience Section */}
                <div>
                  <h4 className="font-semibold text-lg mb-4 flex items-center">
                    <Briefcase className="w-5 h-5 mr-2 text-green-600" />
                    Kinh nghiệm
                  </h4>
                  <div className="space-y-4">
                    {experience.map((exp) => (
                      <div key={exp.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Briefcase className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-900">{exp.title}</h5>
                          <p className="text-gray-600">{exp.description}</p>
                          <div className="flex items-center gap-3 text-sm text-gray-500">
                            <span>{exp.details}</span>
                            <span>•</span>
                            <span>{exp.period}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Videos & Media Library */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Video className="w-6 h-6 mr-3" />
                  Thư viện Video & Hình ảnh
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {videos.map((media, index) => (
                    <Card 
                      key={media.id} 
                      className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer"
                      onClick={() => openMediaModal(media)}
                    >
                      {/* Media Thumbnail */}
                      <div className="aspect-square rounded-lg flex items-center justify-center relative overflow-hidden">
                        {/* Background Image */}
                        <img 
                          src={media.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400"} 
                          alt={media.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        
                        {/* Play icon for videos only */}
                        {media.type === "video" && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 bg-black/60 rounded-full flex items-center justify-center">
                              <Play className="h-6 w-6 text-white ml-1" fill="white" />
                            </div>
                          </div>
                        )}
                        
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="text-white text-center">
                            <div className="text-sm font-medium">
                              {media.type === "video" ? "Phát video" : "Xem ảnh"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Media Popup Modal */}
            {isMediaModalOpen && selectedMedia && (
              <div 
                className="fixed inset-0 z-50 flex items-center justify-center"
                style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(0, 0, 0, 0.95)' }}
                onClick={() => setIsMediaModalOpen(false)}
              >
                {/* Navigation arrows */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white rounded-full h-12 w-12 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateMedia('prev');
                  }}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white rounded-full h-12 w-12 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateMedia('next');
                  }}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>

                {/* Close button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-4 right-4 z-20 bg-black/40 hover:bg-black/60 text-white rounded-full h-12 w-12 p-0"
                  onClick={() => setIsMediaModalOpen(false)}
                >
                  ✕
                </Button>
                
                {/* Media content - Full screen */}
                <div 
                  className="w-full h-full flex items-center justify-center p-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  {selectedMedia.type === "video" ? (
                    <div className="relative max-w-full max-h-full">
                      <img 
                        src={selectedMedia.thumbnail} 
                        alt={selectedMedia.title}
                        className="max-w-full max-h-full object-contain"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-black/60 rounded-full flex items-center justify-center">
                          <Play className="h-10 w-10 text-white ml-2" fill="white" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img 
                      src={selectedMedia.thumbnail} 
                      alt={selectedMedia.title}
                      className="max-w-full max-h-full object-contain"
                    />
                  )}
                </div>

                {/* Media counter */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                  {videos.findIndex(m => m.id === selectedMedia.id) + 1} / {videos.length}
                </div>
              </div>
            )}

            {/* Reviews */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ThumbsUp className="w-6 h-6 mr-3" />
                  Đánh giá từ học viên
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  {
                    name: "Nguyễn Minh An",
                    rating: 5,
                    comment: "Thầy dạy rất nhiệt tình và dễ hiểu. Con em tiến bộ rõ rệt sau 2 tháng học.",
                    date: "2 tuần trước",
                    subject: "Toán"
                  },
                  {
                    name: "Phạm Thu Hà",
                    rating: 5,
                    comment: "Phương pháp giảng dạy của thầy rất hay, con em từ điểm 5 lên điểm 8.",
                    date: "1 tháng trước", 
                    subject: "Lý"
                  },
                  {
                    name: "Trần Văn Nam",
                    rating: 4,
                    comment: "Thầy giảng kỹ và chi tiết. Các bài tập được thầy phân loại rõ ràng.",
                    date: "3 tuần trước",
                    subject: "Hóa"
                  }
                ].map((review, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                        {review.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{review.name}</h4>
                        <Badge variant="outline">{review.subject}</Badge>
                      </div>
                      <div className="flex items-center mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Special Offers & Schedule */}
          <div className="lg:col-span-1 space-y-6">
            {/* Action Buttons */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-indigo-50 to-purple-50">
              <CardContent className="p-6 space-y-3">
                <Button 
                  variant={isFollowing ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setIsFollowing(!isFollowing)}
                >
                  <Heart className={`h-5 w-5 mr-3 ${isFollowing ? 'fill-current' : ''}`} />
                  {isFollowing ? 'ĐANG THEO DÕI' : 'THEO DÕI'}
                </Button>
                <Button 
                  className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => setIsBookingModalOpen(true)}
                >
                  <Calendar className="h-5 w-5 mr-3" />
                  ĐẶT LỊCH
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="h-5 w-5 mr-3" />
                  NHẮN TIN
                </Button>
                <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:border-red-300">
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

            {/* Weekly Schedule */}
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
      </div>

      {/* Booking Modal */}
      <BookingModal 
        tutor={{
          ...tutor,
          grades: ["10", "11", "12"],
          pricePerHour: tutor.price || 150000,
          reviewCount: 150,
          isVerified: true,
          isTopRated: true,
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
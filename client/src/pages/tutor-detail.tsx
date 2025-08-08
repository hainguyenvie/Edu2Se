import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Star, 
  Heart, 
  Calendar, 
  MessageCircle, 
  Shield, 
  Clock,
  Play,
  Facebook,
  Youtube,
  Edit,
  Settings,
  BarChart3,
  Plus,
  Minus,
  Save,
  X,
  GripVertical,
  ArrowUp,
  ArrowDown,
  Users,
  DollarSign,
  Award,
  TrendingUp,
  BookOpen,
  Video,
  Share2,
  Download,
  Camera,
  Eye,
  ThumbsUp,
  Target,
  CheckCircle,
  Trophy,
  Zap,
  Sparkles
} from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/header";
import BookingModal from "@/components/booking-modal";
import ScheduleSetupModal from "@/components/schedule-setup-modal";
import StatisticsModal from "@/components/statistics-modal";

export default function TutorDetail() {
  // This component is for editing your own profile (/my-profile route)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isScheduleSetupOpen, setIsScheduleSetupOpen] = useState(false);
  const [isStatisticsOpen, setIsStatisticsOpen] = useState(false);
  const isOwnerView = true; // Always true for own profile
  const [isEditMode, setIsEditMode] = useState(false);
  
  // Initialize editable state with default values
  const [editableAchievements, setEditableAchievements] = useState([
    { title: "TIẾU ĐỎI 200 HỌC VIÊN", color: "bg-blue-100 text-blue-800" },
    { title: "ĐÃ DẠY 8000 GIỜ", color: "bg-green-100 text-green-800" },
    { title: "CHỨNG CHỈ SEAL HỘI TIẾU", color: "bg-green-100 text-green-800" },
  ]);
  const [editableSubjects, setEditableSubjects] = useState([
    { name: "TOÁN", available: true },
    { name: "LÝ", available: true },
    { name: "HÓA", available: false },
    { name: "ÔN THI", available: true },
    { name: "LUYỆN ĐỀ", available: true },
    { name: "HỌ ĐẢP", available: true },
    { name: "TƯ VẤN TÂM SỰ", available: false },
    { name: "LỚP HỌC LIVE", available: false },
  ]);
  const [editableOffers, setEditableOffers] = useState(Array(4).fill({
    title: "FREE 1H học thử 1 tuần",
    icon: "🎯"
  }));
  const [editableVideos, setEditableVideos] = useState([
    { id: 1, title: "ẢNH VÀ VIDEO GT" },
    { id: 2, title: "ẢNH VÀ VIDEO GT" },
    { id: 3, title: "ẢNH VÀ VIDEO GT" }
  ]);
  const [editableInfo, setEditableInfo] = useState("HỌC SINH LỚP 12 NĂM LỚP, THỊ KHOA TOÁN TỈN!\nAN TRẠNG THI ĐẠO KHOA TRƯỜNG NHỮNG HỌC THỊ KHÔNG TÂM THƯỜNG.");
  const [editablePrice, setEditablePrice] = useState(350000);

  // Static tutor data for BookingModal
  const tutor = {
    id: "current-user",
    name: "MINH TIẾN",
    subjects: ["TOÁN", "LÝ"],
    grades: ["10", "11", "12"],
    education: "Đại học Bách Khoa",
    experience: "5 năm",
    pricePerHour: editablePrice,
    rating: "4.8",
    reviewCount: 156,
    status: "online" as const,
    avatar: "",
    about: editableInfo,
    achievements: editableAchievements.map(a => a.title),
    schedule: ["Thứ 2-6: 18:00-22:00", "Thứ 7: 14:00-18:00"],
    reviews: [],
    isVerified: true,
    isTopRated: true,
    profileImage: "",
    bio: editableInfo,
    location: "Hà Nội",
    createdAt: new Date("2020-01-01")
  };

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

  const sidebarItems = isOwnerView 
    ? [
        { 
          icon: isEditMode ? Save : Edit, 
          title: isEditMode ? "Lưu thay đổi" : "Chỉnh sửa hồ sơ công khai", 
          color: isEditMode ? "text-green-500" : "text-blue-500" 
        },
        { icon: Settings, title: "Thiết lập lịch dạy", color: "text-green-500" },
        { icon: Calendar, title: "Yêu cầu đặt lịch", color: "text-purple-500" },
        { icon: BarChart3, title: "Thống kê chi tiết", color: "text-orange-500" },
      ]
    : [
        { icon: Heart, title: "THEO DÕI", color: "text-red-500" },
        { icon: Calendar, title: "ĐẶT LỊCH", color: "text-blue-500" },
        { icon: MessageCircle, title: "CHAT VỚI THẦY", color: "text-green-500" },
        { icon: Shield, title: "Báo cáo", color: "text-orange-500" },
      ];

  const freeOffers = Array(4).fill({
    title: "FREE 1H học thử 1 tuần",
    icon: "🎯"
  });

  // Helper functions for editing
  const addAchievement = () => {
    const newAchievement = { title: "Thành tích mới", color: "bg-blue-100 text-blue-800" };
    setEditableAchievements([...editableAchievements, newAchievement]);
  };

  const removeAchievement = (index: number) => {
    setEditableAchievements(editableAchievements.filter((_, i) => i !== index));
  };

  const addSubject = () => {
    const newSubject = { name: "MÔN MỚI", available: true };
    setEditableSubjects([...editableSubjects, newSubject]);
  };

  const removeSubject = (index: number) => {
    setEditableSubjects(editableSubjects.filter((_, i) => i !== index));
  };

  const addOffer = () => {
    const newOffer = { title: "Ưu đãi mới", icon: "🎯" };
    setEditableOffers([...editableOffers, newOffer]);
  };

  const removeOffer = (index: number) => {
    setEditableOffers(editableOffers.filter((_, i) => i !== index));
  };

  const addVideo = () => {
    const newVideo = { id: Date.now(), title: "ẢNH VÀ VIDEO GT" };
    setEditableVideos([...editableVideos, newVideo]);
  };

  const removeVideo = (index: number) => {
    setEditableVideos(editableVideos.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header />

      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Hero Section with Cover */}
        <div className="relative mb-8">
          <div className="h-48 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            
            {/* Floating Stats */}
            <div className="absolute top-4 right-4 flex space-x-2">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                <Trophy className="w-3 h-3 mr-1" />
                Top Rated
              </Badge>
              <Badge className="bg-green-500/20 text-green-100 border-green-300/30 backdrop-blur-sm">
                <Zap className="w-3 h-3 mr-1" />
                Online
              </Badge>
            </div>
          </div>

          {/* Profile Info Overlay */}
          <div className="absolute -bottom-16 left-8 flex items-end space-x-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-2xl border-4 border-white bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center shadow-2xl">
                <span className="text-4xl">👨‍🏫</span>
              </div>
              {isEditMode && (
                <Button size="icon" className="absolute -bottom-2 -right-2 rounded-full shadow-lg">
                  <Camera className="w-4 h-4" />
                </Button>
              )}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <div className="pb-4">
              <h1 className="text-3xl font-bold text-white mb-2">MINH TIẾN</h1>
              <div className="flex items-center space-x-4 text-white/90">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">4.8</span>
                  <span className="text-sm">(156 đánh giá)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">200+ học viên</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">8000+ giờ dạy</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-20">
          
          {/* Left Sidebar - Quick Info & Actions */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Price Card */}
            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <div className="text-center">
                <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-green-700 mb-1">
                  {formatPrice(editablePrice)}₫/1h
                </div>
                <div className="text-sm text-green-600 font-medium">MINH TIẾN</div>
                {isEditMode && (
                  <Input
                    type="number"
                    value={editablePrice}
                    onChange={(e) => setEditablePrice(Number(e.target.value))}
                    className="mt-2 text-center"
                  />
                )}
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              {sidebarItems.map((item, index) => (
                <Button
                  key={index}
                  variant={index === 0 ? "default" : "outline"}
                  className={`w-full justify-start space-x-3 h-12 ${
                    index === 0 ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' : ''
                  }`}
                  onClick={() => {
                    if (index === 0) {
                      if (isEditMode) {
                        setIsEditMode(false);
                      } else {
                        setIsEditMode(true);
                      }
                    } else if (index === 1) {
                      setIsScheduleSetupOpen(true);
                    } else if (index === 2) {
                      setIsBookingModalOpen(true);
                    } else if (index === 3) {
                      setIsStatisticsOpen(true);
                    }
                  }}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.title}</span>
                </Button>
              ))}
            </div>

            {/* Quick Stats */}
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Thống kê nhanh
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Học viên hiện tại:</span>
                  <span className="font-semibold">48</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tỉ lệ hoàn thành:</span>
                  <span className="font-semibold text-green-600">96%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phản hồi trung bình:</span>
                  <span className="font-semibold text-blue-600">12 phút</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tham gia từ:</span>
                  <span className="font-semibold">2020</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-white/50 backdrop-blur-sm border border-gray-200">
                <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  📊 Tổng quan
                </TabsTrigger>
                <TabsTrigger value="achievements" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                  🏆 Thành tích
                </TabsTrigger>
                <TabsTrigger value="subjects" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                  📚 Môn học
                </TabsTrigger>
                <TabsTrigger value="media" className="data-[state=active]:bg-pink-600 data-[state=active]:text-white">
                  🎥 Phương tiện
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                
                {/* Achievement Highlights */}
                <Card className="p-6">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="flex items-center space-x-2">
                      <Trophy className="w-6 h-6 text-yellow-500" />
                      <span>Bảng thành tích nổi bật</span>
                      {isEditMode && (
                        <Button size="sm" onClick={addAchievement}>
                          <Plus className="w-4 h-4" />
                        </Button>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {editableAchievements.map((achievement, index) => (
                      <div key={index} className="relative">
                        <Card className={`p-4 text-center ${achievement.color} border-2 hover:shadow-lg transition-all duration-200`}>
                          <CardContent className="p-0">
                            {isEditMode && (
                              <div className="absolute -top-2 -right-2 flex space-x-1">
                                <Button size="icon" variant="destructive" className="h-6 w-6" onClick={() => removeAchievement(index)}>
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                            )}
                            <Award className="w-8 h-8 mx-auto mb-2 text-current opacity-70" />
                            {isEditMode ? (
                              <Input
                                value={achievement.title}
                                onChange={(e) => {
                                  const newAchievements = [...editableAchievements];
                                  newAchievements[index].title = e.target.value;
                                  setEditableAchievements(newAchievements);
                                }}
                                className="text-sm font-semibold text-center bg-transparent border-none p-0"
                              />
                            ) : (
                              <div className="text-sm font-semibold">{achievement.title}</div>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Information Section */}
                <Card className="p-6">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="w-6 h-6 text-blue-500" />
                      <span>Thông tin chi tiết</span>
                    </CardTitle>
                  </CardHeader>
                  <div className="prose max-w-none">
                    {isEditMode ? (
                      <Textarea
                        value={editableInfo}
                        onChange={(e) => setEditableInfo(e.target.value)}
                        className="min-h-32 text-gray-700"
                        placeholder="Chia sẻ về bản thân, kinh nghiệm giảng dạy..."
                      />
                    ) : (
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {editableInfo}
                      </p>
                    )}
                  </div>
                </Card>

                {/* Special Offers */}
                <Card className="p-6">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="flex items-center space-x-2">
                      <Sparkles className="w-6 h-6 text-purple-500" />
                      <span>Ưu đãi của Minh Tiến</span>
                      {isEditMode && (
                        <Button size="sm" onClick={addOffer}>
                          <Plus className="w-4 h-4" />
                        </Button>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {editableOffers.map((offer, index) => (
                      <Card key={index} className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 relative">
                        {isEditMode && (
                          <Button
                            size="icon"
                            variant="destructive"
                            className="absolute -top-2 -right-2 h-6 w-6"
                            onClick={() => removeOffer(index)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        )}
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{offer.icon}</span>
                          {isEditMode ? (
                            <Input
                              value={offer.title}
                              onChange={(e) => {
                                const newOffers = [...editableOffers];
                                newOffers[index].title = e.target.value;
                                setEditableOffers(newOffers);
                              }}
                              className="text-sm font-medium text-purple-800 bg-transparent border-none p-0"
                            />
                          ) : (
                            <div className="text-sm font-medium text-purple-800">
                              {offer.title}
                            </div>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Achievements Tab */}
              <TabsContent value="achievements">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {editableAchievements.map((achievement, index) => (
                    <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 group">
                      <div className="text-center">
                        <div className={`w-16 h-16 rounded-full ${achievement.color} mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <Trophy className="w-8 h-8" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">{achievement.title}</h3>
                        <p className="text-gray-600 text-sm">Đạt được vào tháng 1/2025</p>
                        <div className="mt-4 flex items-center justify-center space-x-2">
                          <ThumbsUp className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-500">+50 điểm uy tín</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Subjects Tab */}
              <TabsContent value="subjects">
                <Card className="p-6">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="w-6 h-6 text-green-500" />
                      <span>Nhận dạy các môn sau</span>
                      {isEditMode && (
                        <Button size="sm" onClick={addSubject}>
                          <Plus className="w-4 h-4" />
                        </Button>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {editableSubjects.map((subject, index) => (
                      <div key={index} className="relative">
                        <Button
                          variant={subject.available ? "default" : "outline"}
                          className={`w-full h-16 text-lg font-bold transition-all duration-200 ${
                            subject.available 
                              ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl' 
                              : 'text-gray-400 border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => {
                            if (isEditMode) {
                              const newSubjects = [...editableSubjects];
                              newSubjects[index].available = !newSubjects[index].available;
                              setEditableSubjects(newSubjects);
                            }
                          }}
                        >
                          {isEditMode ? (
                            <Input
                              value={subject.name}
                              onChange={(e) => {
                                const newSubjects = [...editableSubjects];
                                newSubjects[index].name = e.target.value;
                                setEditableSubjects(newSubjects);
                              }}
                              className="bg-transparent border-none text-center text-lg font-bold p-0"
                              onClick={(e) => e.stopPropagation()}
                            />
                          ) : (
                            subject.name
                          )}
                        </Button>
                        {isEditMode && (
                          <Button
                            size="icon"
                            variant="destructive"
                            className="absolute -top-2 -right-2 h-6 w-6"
                            onClick={() => removeSubject(index)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Media Tab */}
              <TabsContent value="media">
                <Card className="p-6">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="flex items-center space-x-2">
                      <Video className="w-6 h-6 text-red-500" />
                      <span>Ảnh và Video giới thiệu</span>
                      {isEditMode && (
                        <Button size="sm" onClick={addVideo}>
                          <Plus className="w-4 h-4" />
                        </Button>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {editableVideos.map((video, index) => (
                      <div key={video.id} className="relative group">
                        <Card className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center hover:shadow-xl transition-all duration-300 cursor-pointer">
                          <div className="text-center">
                            <Play className="w-16 h-16 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                            <p className="text-sm font-medium text-blue-800">{video.title}</p>
                          </div>
                        </Card>
                        {isEditMode && (
                          <Button
                            size="icon"
                            variant="destructive"
                            className="absolute -top-2 -right-2 h-6 w-6"
                            onClick={() => removeVideo(index)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        )}
                        <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center space-x-2">
                            <Eye className="w-4 h-4" />
                            <span>1.2k lượt xem</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <ThumbsUp className="w-4 h-4" />
                            <span>89</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal 
        tutor={tutor}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />

      {/* Schedule Setup Modal */}
      <ScheduleSetupModal 
        isOpen={isScheduleSetupOpen}
        onClose={() => setIsScheduleSetupOpen(false)}
      />

      {/* Statistics Modal */}
      <StatisticsModal 
        isOpen={isStatisticsOpen}
        onClose={() => setIsStatisticsOpen(false)}
      />
    </div>
  );
}
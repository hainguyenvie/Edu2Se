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
  Award,
  Users,
  BookOpen,
  TrendingUp,
  MapPin,
  Phone,
  Mail,
  GraduationCap,
  Briefcase,
  Target,
  CheckCircle,
  ThumbsUp,
  Globe,
  Video,
  Zap,
  Calculator
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
    { name: "TOÁN", price: "150k/h", available: true, color: "bg-blue-100 text-blue-800" },
    { name: "LÝ", price: "150k/h", available: true, color: "bg-green-100 text-green-800" },
    { name: "HÓA", price: "140k/h", available: false, color: "bg-yellow-100 text-yellow-800" },
    { name: "ÔN THI", price: "180k/h", available: true, color: "bg-purple-100 text-purple-800" },
    { name: "LUYỆN ĐỀ", price: "160k/h", available: true, color: "bg-red-100 text-red-800" },
    { name: "HỌC ĐẬP", price: "150k/h", available: true, color: "bg-indigo-100 text-indigo-800" },
    { name: "TƯ VẤN TÂM SỚ", price: "200k/h", available: false, color: "bg-pink-100 text-pink-800" },
    { name: "LỚP HỌC LIVE", price: "120k/h", available: false, color: "bg-gray-100 text-gray-800" },
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
    pricePerHour: editablePrice,
    rating: "4.8",
    experience: "5 năm",
    status: "online" as const,
    avatar: "",
    about: editableInfo,
    education: "Đại học Bách Khoa",
    achievements: editableAchievements.map(a => a.title),
    schedule: ["Thứ 2-6: 18:00-22:00", "Thứ 7: 14:00-18:00"],
    reviews: []
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

  // Reordering functions
  const moveItem = (array: any[], fromIndex: number, toIndex: number) => {
    const newArray = [...array];
    const [removed] = newArray.splice(fromIndex, 1);
    newArray.splice(toIndex, 0, removed);
    return newArray;
  };

  const moveAchievementUp = (index: number) => {
    if (index > 0) {
      setEditableAchievements(moveItem(editableAchievements, index, index - 1));
    }
  };

  const moveAchievementDown = (index: number) => {
    if (index < editableAchievements.length - 1) {
      setEditableAchievements(moveItem(editableAchievements, index, index + 1));
    }
  };

  const moveSubjectUp = (index: number) => {
    if (index > 0) {
      setEditableSubjects(moveItem(editableSubjects, index, index - 1));
    }
  };

  const moveSubjectDown = (index: number) => {
    if (index < editableSubjects.length - 1) {
      setEditableSubjects(moveItem(editableSubjects, index, index + 1));
    }
  };

  const moveVideoUp = (index: number) => {
    if (index > 0) {
      setEditableVideos(moveItem(editableVideos, index, index - 1));
    }
  };

  const moveVideoDown = (index: number) => {
    if (index < editableVideos.length - 1) {
      setEditableVideos(moveItem(editableVideos, index, index + 1));
    }
  };

  const moveOfferUp = (index: number) => {
    if (index > 0) {
      setEditableOffers(moveItem(editableOffers, index, index - 1));
    }
  };

  const moveOfferDown = (index: number) => {
    if (index < editableOffers.length - 1) {
      setEditableOffers(moveItem(editableOffers, index, index + 1));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      {/* Hero Section with Cover */}
      <div className="relative h-80 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        {/* Profile Hero Content */}
        <div className="relative container mx-auto px-4 pt-24 pb-8 flex items-end h-full">
          <div className="flex items-end space-x-6 text-white w-full">
            <Avatar className="w-32 h-32 border-4 border-white shadow-2xl">
              <AvatarImage src="/api/placeholder/128/128" alt="MINH TIẾN" />
              <AvatarFallback className="text-4xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                MT
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 pb-2">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-4xl font-bold">MINH TIẾN</h1>
                <Badge className="bg-green-500 text-white border-0">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Verified
                </Badge>
                <Badge className="bg-yellow-500 text-white border-0">
                  <Award className="w-4 h-4 mr-1" />
                  Top Tutor
                </Badge>
              </div>
              
              <div className="flex items-center space-x-4 mb-3">
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-lg font-semibold">4.9 (387 đánh giá)</span>
                </div>
                <div className="h-4 w-px bg-white/40"></div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>200+ học viên</span>
                </div>
                <div className="h-4 w-px bg-white/40"></div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>8000+ giờ dạy</span>
                </div>
              </div>
              
              <p className="text-lg opacity-90 max-w-2xl">
                Gia sư Toán - Lý hàng đầu với 5 năm kinh nghiệm. Chuyên luyện thi Đại học, THPT Quốc gia. 
                Phương pháp dạy hiệu quả, tận tâm với học sinh.
              </p>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold mb-1">
                {isEditMode && isOwnerView ? (
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      value={editablePrice}
                      onChange={(e) => setEditablePrice(Number(e.target.value))}
                      className="w-32 text-right text-2xl font-bold bg-white/20 border-white/30 text-white"
                    />
                    <span>₫/h</span>
                  </div>
                ) : (
                  `${formatPrice(editablePrice)}₫/h`
                )}
              </div>
              <div className="text-sm opacity-75">Giá ưu đãi cho buổi đầu</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 -mt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Quick Actions & Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4 text-center">Thao tác nhanh</h3>
                <div className="space-y-3">
                  {sidebarItems.map((item, index) => (
                    <Button
                      key={index}
                      className={`w-full justify-start ${item.color === 'text-green-500' ? 'bg-green-50 hover:bg-green-100 text-green-700' : 
                        item.color === 'text-blue-500' ? 'bg-blue-50 hover:bg-blue-100 text-blue-700' :
                        item.color === 'text-purple-500' ? 'bg-purple-50 hover:bg-purple-100 text-purple-700' :
                        'bg-orange-50 hover:bg-orange-100 text-orange-700'
                      }`}
                      variant="ghost"
                      onClick={() => {
                        if (index === 0 && isOwnerView) {
                          if (isEditMode) {
                            setIsEditMode(false);
                          } else {
                            setIsEditMode(true);
                          }
                        } else if (index === 1 && isOwnerView) {
                          setIsScheduleSetupOpen(true);
                        } else if (index === 2 && isOwnerView) {
                          // View booking requests
                        } else if (index === 3 && isOwnerView) {
                          setIsStatisticsOpen(true);
                        } else if (!isOwnerView && index === 1) {
                          setIsBookingModalOpen(true);
                        }
                      }}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      {item.title}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Stats */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Thống kê hiệu suất
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Tỷ lệ hoàn thành</span>
                    <span className="text-sm font-bold text-green-600">98%</span>
                  </div>
                  <Progress value={98} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Độ hài lòng</span>
                    <span className="text-sm font-bold text-blue-600">96%</span>
                  </div>
                  <Progress value={96} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Tỷ lệ tái đăng ký</span>
                    <span className="text-sm font-bold text-purple-600">89%</span>
                  </div>
                  <Progress value={89} className="h-2" />
                </div>
              </CardContent>
            </Card>


          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Achievements - Moved above Education */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Award className="w-6 h-6 mr-3" />
                    Bảng thành tích
                  </CardTitle>
                  {isEditMode && isOwnerView && (
                    <Button size="sm" variant="outline" onClick={addAchievement}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {editableAchievements.map((achievement, index) => (
                    <Card key={index} className={`p-4 text-center border-2 relative transition-all hover:shadow-md ${achievement.color}`}>
                      {isEditMode && isOwnerView && (
                        <>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="absolute -top-2 -right-2 h-6 w-6 p-0"
                            onClick={() => removeAchievement(index)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <div className="absolute -top-2 -left-2 flex flex-col space-y-1">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-5 w-5 p-0"
                              onClick={() => moveAchievementUp(index)}
                              disabled={index === 0}
                            >
                              <ArrowUp className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-5 w-5 p-0"
                              onClick={() => moveAchievementDown(index)}
                              disabled={index === editableAchievements.length - 1}
                            >
                              <ArrowDown className="h-3 w-3" />
                            </Button>
                          </div>
                        </>
                      )}
                      {isEditMode && isOwnerView ? (
                        <Input
                          value={achievement.title}
                          onChange={(e) => {
                            const newAchievements = [...editableAchievements];
                            newAchievements[index].title = e.target.value;
                            setEditableAchievements(newAchievements);
                          }}
                          className="text-sm font-medium bg-transparent border-none text-center p-0"
                        />
                      ) : (
                        <>
                          <div className="mb-2">
                            <Zap className="w-8 h-8 mx-auto text-current" />
                          </div>
                          <div className="text-sm font-semibold">{achievement.title}</div>
                        </>
                      )}
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Subjects - Moved under Achievements */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <BookOpen className="w-6 h-6 mr-3" />
                    Môn học giảng dạy
                  </CardTitle>
                  {isEditMode && isOwnerView && (
                    <Button size="sm" variant="outline" onClick={addSubject}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {editableSubjects.map((subject, index) => (
                    <div key={index} className="relative">
                      {isEditMode && isOwnerView && (
                        <>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="absolute -top-2 -right-2 h-6 w-6 p-0 z-10"
                            onClick={() => removeSubject(index)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <div className="absolute -top-2 -left-2 flex flex-col space-y-1 z-10">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-5 w-5 p-0"
                              onClick={() => moveSubjectUp(index)}
                              disabled={index === 0}
                            >
                              <ArrowUp className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-5 w-5 p-0"
                              onClick={() => moveSubjectDown(index)}
                              disabled={index === editableSubjects.length - 1}
                            >
                              <ArrowDown className="h-3 w-3" />
                            </Button>
                          </div>
                        </>
                      )}
                      <Card className={`p-4 h-full ${subject.color} hover:shadow-lg transition-all duration-200 cursor-pointer`}>
                        <div className="text-center">
                          <div className="w-12 h-12 mx-auto mb-3 bg-white rounded-full flex items-center justify-center">
                            <Calculator className="w-6 h-6 text-current" />
                          </div>
                          {isEditMode && isOwnerView ? (
                            <>
                              <Input
                                value={subject.name}
                                onChange={(e) => {
                                  const newSubjects = [...editableSubjects];
                                  newSubjects[index].name = e.target.value;
                                  setEditableSubjects(newSubjects);
                                }}
                                className="text-center font-semibold text-xs mb-1 bg-transparent border-none p-0"
                              />
                              <Input
                                value={subject.price}
                                onChange={(e) => {
                                  const newSubjects = [...editableSubjects];
                                  newSubjects[index].price = e.target.value;
                                  setEditableSubjects(newSubjects);
                                }}
                                className="text-center text-xs bg-transparent border-none p-0"
                              />
                            </>
                          ) : (
                            <>
                              <div className="font-semibold text-xs mb-1">{subject.name}</div>
                              <div className="text-xs opacity-90">{subject.price}</div>
                            </>
                          )}
                          <Badge 
                            className="mt-2 text-xs" 
                            variant={subject.available ? "default" : "secondary"}
                          >
                            {subject.available ? "Còn chỗ" : "Hết chỗ"}
                          </Badge>
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Education & Experience - Moved after Subjects */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="w-6 h-6 mr-3" />
                  Học vấn & Kinh nghiệm
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <GraduationCap className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Học vấn</h4>
                        <p className="text-gray-600">Đại học Bách Khoa Hà Nội</p>
                        <p className="text-sm text-gray-500">Kỹ sư Toán ứng dụng - GPA: 3.8/4.0</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Briefcase className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Kinh nghiệm</h4>
                        <p className="text-gray-600">5+ năm dạy kèm</p>
                        <p className="text-sm text-gray-500">Chuyên Toán, Lý cấp 2-3</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Target className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Chuyên môn</h4>
                        <p className="text-gray-600">Luyện thi Đại học</p>
                        <p className="text-sm text-gray-500">THPT Quốc gia, A00, A01</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Award className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Chứng chỉ</h4>
                        <p className="text-gray-600">Chứng chỉ giảng dạy</p>
                        <p className="text-sm text-gray-500">TESOL, Pedagogy Certificate</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Remove duplicate Achievements section that was here */}

                        </>
                      )}
                      {isEditMode && isOwnerView ? (
                        <Input
                          value={subject.name}
                          onChange={(e) => {
                            const newSubjects = [...editableSubjects];
                            newSubjects[index].name = e.target.value;
                            setEditableSubjects(newSubjects);
                          }}
                          className="text-sm text-center bg-primary text-white border-primary"
                        />
                      ) : (
                        <Card className={`p-4 text-center transition-all hover:shadow-md ${
                          subject.available 
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg" 
                            : "bg-gray-100 text-gray-400"
                        }`}>
                          <div className="flex items-center justify-center space-x-2">
                            <BookOpen className="w-4 h-4" />
                            <span className="font-semibold text-sm">{subject.name}</span>
                          </div>
                          {subject.available && (
                            <div className="text-xs mt-1 opacity-90">Đang nhận lớp</div>
                          )}
                        </Card>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* About */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="w-6 h-6 mr-3" />
                  Giới thiệu bản thân
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditMode && isOwnerView ? (
                  <Textarea
                    value={editableInfo}
                    onChange={(e) => setEditableInfo(e.target.value)}
                    className="text-gray-700 leading-relaxed min-h-[120px] resize-none"
                    placeholder="Nhập thông tin giới thiệu bản thân, phương pháp dạy, kinh nghiệm..."
                  />
                ) : (
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                    <p className="text-gray-800 leading-relaxed whitespace-pre-line text-lg">
                      {editableInfo}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Videos & Media */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Video className="w-6 h-6 mr-3" />
                    Video giới thiệu & Hình ảnh
                  </CardTitle>
                  {isEditMode && isOwnerView && (
                    <Button size="sm" variant="outline" onClick={addVideo}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {editableVideos.map((video, index) => (
                    <Card key={video.id} className="relative overflow-hidden group hover:shadow-xl transition-all duration-300">
                      {isEditMode && isOwnerView && (
                        <>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="absolute top-2 right-2 h-6 w-6 p-0 z-20"
                            onClick={() => removeVideo(index)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <div className="absolute top-2 left-2 flex flex-col space-y-1 z-20">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-6 w-6 p-0 bg-white/80 hover:bg-white"
                              onClick={() => moveVideoUp(index)}
                              disabled={index === 0}
                            >
                              <ArrowUp className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-6 w-6 p-0 bg-white/80 hover:bg-white"
                              onClick={() => moveVideoDown(index)}
                              disabled={index === editableVideos.length - 1}
                            >
                              <ArrowDown className="h-3 w-3" />
                            </Button>
                          </div>
                        </>
                      )}
                      <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20" />
                        <Play className="h-12 w-12 text-blue-600 relative z-10" />
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          02:30
                        </div>
                      </div>
                      <CardContent className="p-4">
                        {isEditMode && isOwnerView ? (
                          <Input
                            value={video.title}
                            onChange={(e) => {
                              const newVideos = [...editableVideos];
                              newVideos[index].title = e.target.value;
                              setEditableVideos(newVideos);
                            }}
                            className="text-sm font-medium text-center"
                          />
                        ) : (
                          <p className="text-sm text-center font-medium">{video.title}</p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

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
            {/* Special Offers */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-orange-50 to-red-50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center text-orange-700">
                    <Zap className="w-6 h-6 mr-3" />
                    Ưu đãi đặc biệt
                  </CardTitle>
                  {isEditMode && isOwnerView && (
                    <Button size="sm" variant="outline" onClick={addOffer}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {editableOffers.map((offer, index) => (
                  <Card key={index} className="p-4 bg-white border border-orange-200 relative">
                    {isEditMode && isOwnerView && (
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-6 w-6 p-0"
                        onClick={() => removeOffer(index)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                    )}
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{offer.icon}</div>
                      <div className="flex-1">
                        {isEditMode && isOwnerView ? (
                          <Input
                            value={offer.title}
                            onChange={(e) => {
                              const newOffers = [...editableOffers];
                              newOffers[index].title = e.target.value;
                              setEditableOffers(newOffers);
                            }}
                            className="text-sm font-medium"
                          />
                        ) : (
                          <p className="text-sm font-semibold text-orange-700">{offer.title}</p>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Schedule Preview - Enhanced with multiple time slots */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-6 h-6 mr-3" />
                  Lịch dạy tuần này
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { 
                    day: "Thứ 2", 
                    slots: [
                      { time: "19:00 - 21:00", status: "available" },
                      { time: "21:00 - 23:00", status: "booked" }
                    ]
                  },
                  { 
                    day: "Thứ 3", 
                    slots: [
                      { time: "18:30 - 20:30", status: "available" }
                    ]
                  },
                  { 
                    day: "Thứ 4", 
                    slots: [
                      { time: "19:00 - 21:00", status: "available" },
                      { time: "21:00 - 23:00", status: "available" }
                    ]
                  },
                  { 
                    day: "Thứ 6", 
                    slots: [
                      { time: "19:30 - 21:30", status: "booked" }
                    ]
                  },
                  { 
                    day: "Thứ 7", 
                    slots: [
                      { time: "14:00 - 16:00", status: "available" },
                      { time: "16:30 - 18:30", status: "available" },
                      { time: "19:00 - 21:00", status: "booked" }
                    ]
                  }
                ].map((daySchedule, dayIndex) => (
                  <div key={dayIndex} className="border rounded-lg p-4 bg-gray-50">
                    <div className="font-semibold text-sm mb-3 text-gray-900">{daySchedule.day}</div>
                    <div className="space-y-2">
                      {daySchedule.slots.map((slot, slotIndex) => (
                        <div 
                          key={slotIndex} 
                          className={`flex items-center justify-between p-3 rounded-lg border ${
                            slot.status === 'available' 
                              ? 'bg-green-50 border-green-200' 
                              : 'bg-red-50 border-red-200'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <Clock className={`w-4 h-4 ${
                              slot.status === 'available' ? 'text-green-600' : 'text-red-600'
                            }`} />
                            <span className="text-sm font-medium">{slot.time}</span>
                          </div>
                          <Badge 
                            variant={slot.status === 'available' ? 'default' : 'secondary'}
                            className={slot.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                          >
                            {slot.status === 'available' ? 'Còn trống' : 'Đã đặt'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
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
        </div>
        
        {/* Modals */}
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          tutor={tutor}
        />
        
        <ScheduleSetupModal
          isOpen={isScheduleSetupOpen}
          onClose={() => setIsScheduleSetupOpen(false)}
        />
        
        <StatisticsModal
          isOpen={isStatisticsOpen}
          onClose={() => setIsStatisticsOpen(false)}
        />
      </div>
    </div>
  );
}
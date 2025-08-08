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
  ChevronRight
} from "lucide-react";
import Header from "@/components/header";
import BookingModal from "@/components/booking-modal";
import ScheduleSetupModal from "@/components/schedule-setup-modal";
import StatisticsModal from "@/components/statistics-modal";

export default function TutorDetail() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isScheduleSetupOpen, setIsScheduleSetupOpen] = useState(false);
  const [isStatisticsOpen, setIsStatisticsOpen] = useState(false);
  const isOwnerView = true;
  const [isEditMode, setIsEditMode] = useState(false);
  
  const [editableAchievements, setEditableAchievements] = useState([
    { title: "TOP 200 HỌC VIÊN", color: "bg-blue-100 text-blue-800" },
    { title: "ĐÃ DẠY 8000 GIỜ", color: "bg-green-100 text-green-800" },
    { title: "CHỨNG CHỈ GIẢNG VIÊN", color: "bg-purple-100 text-purple-800" },
  ]);

  const [editableSubjects, setEditableSubjects] = useState([
    { name: "TOÁN", price: "150k/h", available: true, color: "bg-blue-100 text-blue-800" },
    { name: "LÝ", price: "150k/h", available: true, color: "bg-green-100 text-green-800" },
    { name: "HÓA", price: "140k/h", available: false, color: "bg-yellow-100 text-yellow-800" },
    { name: "ÔN THI", price: "180k/h", available: true, color: "bg-purple-100 text-purple-800" }
  ]);

  const [editableOffers, setEditableOffers] = useState([
    { title: "FREE 1H học thử", icon: "🎯" },
    { title: "Giảm 20% khóa dài hạn", icon: "💰" },
    { title: "Tặng tài liệu PDF", icon: "📚" }
  ]);

  const [editableVideos, setEditableVideos] = useState([
    { id: 1, title: "Video giới thiệu", type: "video", duration: "02:30", thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400" },
    { id: 2, title: "Phương pháp dạy", type: "video", duration: "03:45", thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400" },
    { id: 3, title: "Thành tích học viên", type: "image", duration: "", thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400" },
    { id: 4, title: "Bảng điểm học viên", type: "image", duration: "", thumbnail: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400" },
    { id: 5, title: "Tài liệu giảng dạy", type: "image", duration: "", thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400" },
    { id: 6, title: "Lớp học trực tiếp", type: "video", duration: "01:20", thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400" }
  ]);

  const [selectedMedia, setSelectedMedia] = useState<any>(null);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string>("Thứ 2");

  const [editableInfo, setEditableInfo] = useState("Tôi là giáo viên có 5+ năm kinh nghiệm dạy Toán, Lý cấp 2-3. Chuyên luyện thi đại học với phương pháp dạy dễ hiểu, tận tâm với từng học viên.");

  const [editableEducation, setEditableEducation] = useState([
    {
      id: 1,
      degree: "Kỹ sư Toán ứng dụng",
      school: "Đại học Bách Khoa Hà Nội",
      gpa: "GPA: 3.8/4.0",
      year: "2015-2019"
    }
  ]);

  const [editableExperience, setEditableExperience] = useState([
    {
      id: 1,
      title: "Giáo viên dạy kèm",
      description: "5+ năm dạy kèm",
      details: "Chuyên Toán, Lý cấp 2-3",
      period: "2019-2024"
    }
  ]);

  const [editableSpecialties, setEditableSpecialties] = useState([
    {
      id: 1,
      title: "Luyện thi Đại học",
      description: "THPT Quốc gia, A00, A01",
      details: "Chuyên môn chính"
    }
  ]);

  const [editableCertificates, setEditableCertificates] = useState([
    {
      id: 1,
      name: "Chứng chỉ giảng dạy",
      issuer: "TESOL, Pedagogy Certificate",
      year: "2020"
    }
  ]);

  const tutor = {
    id: "current-user",
    name: "MINH TIẾN",
    subjects: ["TOÁN", "LÝ"],
    grades: ["10", "11", "12"],
    education: "Đại học Bách Khoa Hà Nội",
    experience: "5 năm kinh nghiệm",
    pricePerHour: 150000,
    rating: "4.8",
    reviewCount: 150,
    status: "online",
    isVerified: true,
    isTopRated: true,
    avatar: "",
    about: editableInfo,
    achievements: editableAchievements.map(a => a.title),
    schedule: ["Thứ 2-6: 18:00-22:00"],
    reviews: [],
    createdAt: new Date()
  };

  const addAchievement = () => {
    setEditableAchievements([...editableAchievements, { title: "Thành tích mới", color: "bg-gray-100 text-gray-800" }]);
  };

  const removeAchievement = (index: number) => {
    setEditableAchievements(editableAchievements.filter((_, i) => i !== index));
  };

  const addSubject = () => {
    setEditableSubjects([...editableSubjects, { name: "MÔN MỚI", price: "150k/h", available: true, color: "bg-gray-100 text-gray-800" }]);
  };

  const removeSubject = (index: number) => {
    setEditableSubjects(editableSubjects.filter((_, i) => i !== index));
  };

  const addOffer = () => {
    setEditableOffers([...editableOffers, { title: "Ưu đãi mới", icon: "🎉" }]);
  };

  const removeOffer = (index: number) => {
    setEditableOffers(editableOffers.filter((_, i) => i !== index));
  };

  const addVideo = () => {
    const newId = Math.max(...editableVideos.map(v => v.id)) + 1;
    setEditableVideos([...editableVideos, { id: newId, title: "Media mới", type: "video", duration: "00:00", thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400" }]);
  };

  const openMediaModal = (media: any) => {
    setSelectedMedia(media);
    setIsMediaModalOpen(true);
  };

  const navigateMedia = (direction: 'prev' | 'next') => {
    if (!selectedMedia) return;
    
    const currentIndex = editableVideos.findIndex(m => m.id === selectedMedia.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : editableVideos.length - 1;
    } else {
      newIndex = currentIndex < editableVideos.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedMedia(editableVideos[newIndex]);
  };

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

  const weekDays = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];

  const removeVideo = (index: number) => {
    setEditableVideos(editableVideos.filter((_, i) => i !== index));
  };

  const addEducation = () => {
    const newId = Math.max(...editableEducation.map(e => e.id)) + 1;
    setEditableEducation([...editableEducation, { 
      id: newId, 
      degree: "Bằng cấp mới", 
      school: "Trường đại học", 
      gpa: "GPA: /4.0", 
      year: "Năm tốt nghiệp" 
    }]);
  };

  const removeEducation = (index: number) => {
    setEditableEducation(editableEducation.filter((_, i) => i !== index));
  };

  const addExperience = () => {
    const newId = Math.max(...editableExperience.map(e => e.id)) + 1;
    setEditableExperience([...editableExperience, { 
      id: newId, 
      title: "Vị trí công việc", 
      description: "Mô tả công việc", 
      details: "Chi tiết kinh nghiệm", 
      period: "Thời gian" 
    }]);
  };

  const removeExperience = (index: number) => {
    setEditableExperience(editableExperience.filter((_, i) => i !== index));
  };

  const addSpecialty = () => {
    const newId = Math.max(...editableSpecialties.map(s => s.id)) + 1;
    setEditableSpecialties([...editableSpecialties, { 
      id: newId, 
      title: "Chuyên môn mới", 
      description: "Mô tả chuyên môn", 
      details: "Chi tiết" 
    }]);
  };

  const removeSpecialty = (index: number) => {
    setEditableSpecialties(editableSpecialties.filter((_, i) => i !== index));
  };

  const addCertificate = () => {
    const newId = Math.max(...editableCertificates.map(c => c.id)) + 1;
    setEditableCertificates([...editableCertificates, { 
      id: newId, 
      name: "Chứng chỉ mới", 
      issuer: "Tổ chức cấp", 
      year: "Năm cấp" 
    }]);
  };

  const removeCertificate = (index: number) => {
    setEditableCertificates(editableCertificates.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 pt-24 pb-8 max-w-7xl">


        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Simple Profile Card */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-6 text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src="" alt="MINH TIẾN" />
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    MT
                  </AvatarFallback>
                </Avatar>
                
                <h2 className="text-xl font-bold mb-2">MINH TIẾN</h2>
                
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
                  150k/h
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            {isOwnerView && (
              <Card className="shadow-lg border-0 bg-gradient-to-br from-indigo-50 to-purple-50">
                <CardHeader>
                  <CardTitle className="flex items-center text-indigo-700">
                    <Settings className="w-6 h-6 mr-3" />
                    Thao tác nhanh
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setIsEditMode(!isEditMode)}
                  >
                    <Edit className="h-5 w-5 mr-3" />
                    {isEditMode ? "Lưu thay đổi" : "Chỉnh sửa hồ sơ"}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setIsScheduleSetupOpen(true)}
                  >
                    <Calendar className="h-5 w-5 mr-3" />
                    Thiết lập lịch dạy
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setIsStatisticsOpen(true)}
                  >
                    <BarChart3 className="h-5 w-5 mr-3" />
                    Thống kê chi tiết
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Quick Stats - Moved under Quick Actions */}
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
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute -top-2 -right-2 h-6 w-6 p-0"
                          onClick={() => removeAchievement(index)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
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
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute -top-2 -right-2 h-6 w-6 p-0 z-10"
                          onClick={() => removeSubject(index)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
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

            {/* About Section - Moved under Subjects */}
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

            {/* Education & Experience - LinkedIn Style */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <GraduationCap className="w-6 h-6 mr-3" />
                    Học vấn & Kinh nghiệm
                  </CardTitle>

                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Education Section */}
                <div>
                  <h4 className="font-semibold text-lg mb-4 flex items-center">
                    <GraduationCap className="w-5 h-5 mr-2 text-blue-600" />
                    Học vấn
                    {isEditMode && isOwnerView && (
                      <Button size="sm" variant="outline" onClick={addEducation} className="ml-auto">
                        <Plus className="h-4 w-4" />
                      </Button>
                    )}
                  </h4>
                  <div className="space-y-4">
                    {editableEducation.map((education, index) => (
                      <div key={education.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg bg-gray-50 relative">
                        {isEditMode && isOwnerView && (
                          <Button
                            size="sm"
                            variant="destructive"
                            className="absolute top-2 right-2 h-6 w-6 p-0"
                            onClick={() => removeEducation(index)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                        )}
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <GraduationCap className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          {isEditMode && isOwnerView ? (
                            <div className="space-y-2">
                              <Input
                                value={education.degree}
                                onChange={(e) => {
                                  const newEducation = [...editableEducation];
                                  newEducation[index].degree = e.target.value;
                                  setEditableEducation(newEducation);
                                }}
                                className="font-semibold"
                                placeholder="Bằng cấp"
                              />
                              <Input
                                value={education.school}
                                onChange={(e) => {
                                  const newEducation = [...editableEducation];
                                  newEducation[index].school = e.target.value;
                                  setEditableEducation(newEducation);
                                }}
                                placeholder="Trường đại học"
                              />
                              <div className="flex gap-2">
                                <Input
                                  value={education.gpa}
                                  onChange={(e) => {
                                    const newEducation = [...editableEducation];
                                    newEducation[index].gpa = e.target.value;
                                    setEditableEducation(newEducation);
                                  }}
                                  placeholder="GPA"
                                  className="text-sm"
                                />
                                <Input
                                  value={education.year}
                                  onChange={(e) => {
                                    const newEducation = [...editableEducation];
                                    newEducation[index].year = e.target.value;
                                    setEditableEducation(newEducation);
                                  }}
                                  placeholder="Năm tốt nghiệp"
                                  className="text-sm"
                                />
                              </div>
                            </div>
                          ) : (
                            <div>
                              <h5 className="font-semibold text-gray-900">{education.degree}</h5>
                              <p className="text-gray-600">{education.school}</p>
                              <div className="flex items-center gap-3 text-sm text-gray-500">
                                <span>{education.gpa}</span>
                                <span>•</span>
                                <span>{education.year}</span>
                              </div>
                            </div>
                          )}
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
                    {isEditMode && isOwnerView && (
                      <Button size="sm" variant="outline" onClick={addExperience} className="ml-auto">
                        <Plus className="h-4 w-4" />
                      </Button>
                    )}
                  </h4>
                  <div className="space-y-4">
                    {editableExperience.map((experience, index) => (
                      <div key={experience.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg bg-gray-50 relative">
                        {isEditMode && isOwnerView && (
                          <Button
                            size="sm"
                            variant="destructive"
                            className="absolute top-2 right-2 h-6 w-6 p-0"
                            onClick={() => removeExperience(index)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                        )}
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Briefcase className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          {isEditMode && isOwnerView ? (
                            <div className="space-y-2">
                              <Input
                                value={experience.title}
                                onChange={(e) => {
                                  const newExperience = [...editableExperience];
                                  newExperience[index].title = e.target.value;
                                  setEditableExperience(newExperience);
                                }}
                                className="font-semibold"
                                placeholder="Vị trí công việc"
                              />
                              <Input
                                value={experience.description}
                                onChange={(e) => {
                                  const newExperience = [...editableExperience];
                                  newExperience[index].description = e.target.value;
                                  setEditableExperience(newExperience);
                                }}
                                placeholder="Mô tả công việc"
                              />
                              <div className="flex gap-2">
                                <Input
                                  value={experience.details}
                                  onChange={(e) => {
                                    const newExperience = [...editableExperience];
                                    newExperience[index].details = e.target.value;
                                    setEditableExperience(newExperience);
                                  }}
                                  placeholder="Chi tiết"
                                  className="text-sm"
                                />
                                <Input
                                  value={experience.period}
                                  onChange={(e) => {
                                    const newExperience = [...editableExperience];
                                    newExperience[index].period = e.target.value;
                                    setEditableExperience(newExperience);
                                  }}
                                  placeholder="Thời gian"
                                  className="text-sm"
                                />
                              </div>
                            </div>
                          ) : (
                            <div>
                              <h5 className="font-semibold text-gray-900">{experience.title}</h5>
                              <p className="text-gray-600">{experience.description}</p>
                              <div className="flex items-center gap-3 text-sm text-gray-500">
                                <span>{experience.details}</span>
                                <span>•</span>
                                <span>{experience.period}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Specialties Section */}
                <div>
                  <h4 className="font-semibold text-lg mb-4 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-purple-600" />
                    Chuyên môn
                    {isEditMode && isOwnerView && (
                      <Button size="sm" variant="outline" onClick={addSpecialty} className="ml-auto">
                        <Plus className="h-4 w-4" />
                      </Button>
                    )}
                  </h4>
                  <div className="space-y-4">
                    {editableSpecialties.map((specialty, index) => (
                      <div key={specialty.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg bg-gray-50 relative">
                        {isEditMode && isOwnerView && (
                          <Button
                            size="sm"
                            variant="destructive"
                            className="absolute top-2 right-2 h-6 w-6 p-0"
                            onClick={() => removeSpecialty(index)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                        )}
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Target className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          {isEditMode && isOwnerView ? (
                            <div className="space-y-2">
                              <Input
                                value={specialty.title}
                                onChange={(e) => {
                                  const newSpecialties = [...editableSpecialties];
                                  newSpecialties[index].title = e.target.value;
                                  setEditableSpecialties(newSpecialties);
                                }}
                                className="font-semibold"
                                placeholder="Chuyên môn"
                              />
                              <Input
                                value={specialty.description}
                                onChange={(e) => {
                                  const newSpecialties = [...editableSpecialties];
                                  newSpecialties[index].description = e.target.value;
                                  setEditableSpecialties(newSpecialties);
                                }}
                                placeholder="Mô tả"
                              />
                              <Input
                                value={specialty.details}
                                onChange={(e) => {
                                  const newSpecialties = [...editableSpecialties];
                                  newSpecialties[index].details = e.target.value;
                                  setEditableSpecialties(newSpecialties);
                                }}
                                placeholder="Chi tiết"
                                className="text-sm"
                              />
                            </div>
                          ) : (
                            <div>
                              <h5 className="font-semibold text-gray-900">{specialty.title}</h5>
                              <p className="text-gray-600">{specialty.description}</p>
                              <p className="text-sm text-gray-500">{specialty.details}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certificates Section */}
                <div>
                  <h4 className="font-semibold text-lg mb-4 flex items-center">
                    <Award className="w-5 h-5 mr-2 text-orange-600" />
                    Chứng chỉ
                    {isEditMode && isOwnerView && (
                      <Button size="sm" variant="outline" onClick={addCertificate} className="ml-auto">
                        <Plus className="h-4 w-4" />
                      </Button>
                    )}
                  </h4>
                  <div className="space-y-4">
                    {editableCertificates.map((certificate, index) => (
                      <div key={certificate.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg bg-gray-50 relative">
                        {isEditMode && isOwnerView && (
                          <Button
                            size="sm"
                            variant="destructive"
                            className="absolute top-2 right-2 h-6 w-6 p-0"
                            onClick={() => removeCertificate(index)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                        )}
                        <div className="p-2 bg-orange-100 rounded-lg">
                          <Award className="w-5 h-5 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          {isEditMode && isOwnerView ? (
                            <div className="space-y-2">
                              <Input
                                value={certificate.name}
                                onChange={(e) => {
                                  const newCertificates = [...editableCertificates];
                                  newCertificates[index].name = e.target.value;
                                  setEditableCertificates(newCertificates);
                                }}
                                className="font-semibold"
                                placeholder="Tên chứng chỉ"
                              />
                              <div className="flex gap-2">
                                <Input
                                  value={certificate.issuer}
                                  onChange={(e) => {
                                    const newCertificates = [...editableCertificates];
                                    newCertificates[index].issuer = e.target.value;
                                    setEditableCertificates(newCertificates);
                                  }}
                                  placeholder="Tổ chức cấp"
                                />
                                <Input
                                  value={certificate.year}
                                  onChange={(e) => {
                                    const newCertificates = [...editableCertificates];
                                    newCertificates[index].year = e.target.value;
                                    setEditableCertificates(newCertificates);
                                  }}
                                  placeholder="Năm"
                                  className="w-24"
                                />
                              </div>
                            </div>
                          ) : (
                            <div>
                              <h5 className="font-semibold text-gray-900">{certificate.name}</h5>
                              <div className="flex items-center gap-3 text-sm text-gray-500">
                                <span>{certificate.issuer}</span>
                                <span>•</span>
                                <span>{certificate.year}</span>
                              </div>
                            </div>
                          )}
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
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Video className="w-6 h-6 mr-3" />
                    Thư viện Video & Hình ảnh
                  </CardTitle>
                  {isEditMode && isOwnerView && (
                    <Button size="sm" variant="outline" onClick={addVideo}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {editableVideos.map((media, index) => (
                    <Card 
                      key={media.id} 
                      className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer"
                      onClick={() => !isEditMode && openMediaModal(media)}
                    >
                      {isEditMode && isOwnerView && (
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute top-2 right-2 h-6 w-6 p-0 z-20"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeVideo(index);
                          }}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                      )}
                      
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
                      
                      {/* Media Info - Only show in edit mode */}
                      {isEditMode && isOwnerView && (
                        <div className="p-3">
                          <div className="space-y-2">
                            <Input
                              value={media.title}
                              onChange={(e) => {
                                const newVideos = [...editableVideos];
                                newVideos[index].title = e.target.value;
                                setEditableVideos(newVideos);
                              }}
                              className="text-xs font-medium text-center"
                              onClick={(e) => e.stopPropagation()}
                            />
                            <select
                              value={media.type}
                              onChange={(e) => {
                                const newVideos = [...editableVideos];
                                newVideos[index].type = e.target.value;
                                setEditableVideos(newVideos);
                              }}
                              className="w-full text-xs border border-gray-300 rounded px-2 py-1"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <option value="video">Video</option>
                              <option value="image">Hình ảnh</option>
                            </select>
                            <Input
                              value={media.thumbnail}
                              onChange={(e) => {
                                const newVideos = [...editableVideos];
                                newVideos[index].thumbnail = e.target.value;
                                setEditableVideos(newVideos);
                              }}
                              placeholder="URL hình ảnh"
                              className="text-xs"
                              onClick={(e) => e.stopPropagation()}
                            />
                            {media.type === "video" && (
                              <Input
                                value={media.duration}
                                onChange={(e) => {
                                  const newVideos = [...editableVideos];
                                  newVideos[index].duration = e.target.value;
                                  setEditableVideos(newVideos);
                                }}
                                placeholder="00:00"
                                className="text-xs text-center"
                                onClick={(e) => e.stopPropagation()}
                              />
                            )}
                          </div>
                        </div>
                      )}
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
                  {editableVideos.findIndex(m => m.id === selectedMedia.id) + 1} / {editableVideos.length}
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
                <div className="flex flex-wrap gap-2 justify-center">
                  {weekDays.map((day) => (
                    <Button
                      key={day}
                      variant={selectedDay === day ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedDay(day)}
                      className={`relative transition-all duration-200 ${
                        selectedDay === day 
                          ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg" 
                          : "hover:bg-blue-50 hover:border-blue-300"
                      }`}
                    >
                      {day}
                      {/* Available slots indicator */}
                      {weeklySchedule[day] && weeklySchedule[day].filter(slot => slot.status === 'available').length > 0 && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full text-xs text-white flex items-center justify-center">
                          {weeklySchedule[day].filter(slot => slot.status === 'available').length}
                        </div>
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
                  
                  {weeklySchedule[selectedDay] && weeklySchedule[selectedDay].length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                      {weeklySchedule[selectedDay].map((slot, index) => (
                        <Card 
                          key={index} 
                          className={`p-4 transition-all duration-200 cursor-pointer ${
                            slot.status === 'available' 
                              ? 'bg-green-50 border-green-200 hover:bg-green-100 hover:shadow-md' 
                              : 'bg-gray-100 border-gray-200 opacity-60'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`p-2 rounded-full ${
                                slot.status === 'available' ? 'bg-green-100' : 'bg-gray-200'
                              }`}>
                                <Clock className={`w-4 h-4 ${
                                  slot.status === 'available' ? 'text-green-600' : 'text-gray-500'
                                }`} />
                              </div>
                              <div>
                                <div className="font-semibold text-sm">{slot.time}</div>
                                <div className="text-xs text-gray-600">{slot.subject}</div>
                              </div>
                            </div>
                            <Badge 
                              variant={slot.status === 'available' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {slot.status === 'available' ? 'Đặt lịch' : 'Đã đặt'}
                            </Badge>
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

                {/* Weekly Summary */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">
                      {Object.values(weeklySchedule).flat().filter(slot => slot.status === 'available').length}
                    </div>
                    <div className="text-xs text-gray-600">Slot trống</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">
                      {Object.values(weeklySchedule).flat().filter(slot => slot.status === 'booked').length}
                    </div>
                    <div className="text-xs text-gray-600">Đã đặt</div>
                  </div>
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
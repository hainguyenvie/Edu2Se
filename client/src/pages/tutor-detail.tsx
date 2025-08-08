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
  Calculator
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
    { id: 1, title: "Video giới thiệu" },
    { id: 2, title: "Phương pháp dạy" },
    { id: 3, title: "Thành tích học viên" }
  ]);

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
    setEditableVideos([...editableVideos, { id: newId, title: "Video mới" }]);
  };

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

            {/* About Section */}
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
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute top-2 right-2 h-6 w-6 p-0 z-20"
                          onClick={() => removeVideo(index)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
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

            {/* Enhanced Schedule with Multiple Time Slots */}
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
import { useRoute } from "wouter";
import { useState } from "react";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Star,
  Users,
  Clock,
  MessageCircle,
  Calendar,
  Zap,
  BookOpen,
  Award,
  Heart,
  Shield,
  MapPin,
  GraduationCap,
  Trophy,
  HelpCircle,
  Video,
  Camera,
  ExternalLink,
  Target,
  CheckCircle,
  Calculator,
  Book,
  Languages,
  Beaker,
  Leaf,
  Globe
} from "lucide-react";

type DayName = "Thứ 2" | "Thứ 3" | "Thứ 4" | "Thứ 5" | "Thứ 6" | "Thứ 7" | "Chủ nhật";
type Slot = { time: string; status: "study" | "exam" | "break"; subject: string };

interface PublicUser {
  id: string;
  name: string;
  avatar?: string;
  role: "student" | "tutor";
  school?: string;
  grade?: string;
  location: string;
  bio: string;
  goals?: string;
  subjects: string[];
  achievements: string[];
  points: number;
  rank: string;
  streakDays?: number;
  // Tutor specific
  rating?: number;
  totalReviews?: number;
  teachingHours?: number;
  pricePerHour?: number;
  experience?: string;
  education?: string;
  followers?: number;
  following?: number;
  isVerified?: boolean;
}

// Simple subject icon mapping
const getSubjectIcon = (subjectName: string) => {
  const subjectMap: { [key: string]: any } = {
    'Toán': Calculator,
    'Văn': Book,
    'Anh': Languages,
    'Lý': Zap,
    'Hóa': Beaker,
    'Sinh': Leaf,
    'Sử': Globe,
    'Địa': Globe,
    'Tin học': Calculator,
    'default': BookOpen
  };
  
  return subjectMap[subjectName] || subjectMap['default'];
};

export default function PublicProfilePage() {
  const [match, params] = useRoute("/profile/:role/:slug");
  const { role, slug } = params || {};
  const [selectedDay, setSelectedDay] = useState<DayName>("Thứ 2");

  if (!match || !role || !slug) return null;

  // Mock user data - in real app, fetch based on role and slug
  const user: PublicUser = role === "tutor" ? {
    id: "tutor-1",
    name: "Thầy Việt Hoàng",
    avatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=200&h=200&fit=crop",
    role: "tutor",
    location: "Hà Nội",
    bio: "Tiến sĩ Khoa học máy tính, chuyên gia giảng dạy Toán - Lý - Hóa với hơn 10 năm kinh nghiệm. Đã hướng dẫn hơn 500 học sinh đỗ đại học.",
    education: "Tiến sĩ - ĐH Bách Khoa Hà Nội",
    subjects: ["Toán", "Lý", "Hóa"],
    experience: "10+ năm",
    achievements: ["Top 10 Gia Sư Toán", "Expert Teacher", "500+ Học sinh đỗ ĐH"],
    points: 15420,
    rank: "Top 1",
    rating: 5.0,
    totalReviews: 156,
    teachingHours: 890,
    pricePerHour: 600000,
    followers: 324,
    following: 45,
    isVerified: true
  } : {
    id: "student-1",
    name: slug?.replace(/-/g, " ") || "Nguyễn Minh Anh",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=200&h=200&fit=crop",
    role: "student",
    school: "THPT Chu Văn An",
    grade: "Lớp 12",
    location: "Hà Nội",
    bio: "Học sinh lớp 12 đam mê khoa học và công nghệ. Yêu thích toán học, vật lý và lập trình. Mục tiêu trở thành kỹ sư phần mềm và đóng góp cho sự phát triển của công nghệ Việt Nam.",
    goals: "Đỗ ĐHBK Hà Nội - Khoa học máy tính. Nâng điểm Toán lên 9+.",
    subjects: ["Toán", "Lý", "Hóa"],
    achievements: ["Chuỗi học 45 ngày", "Top 1% bảng xếp hạng", "100+ bài tập khó"],
    points: 2450,
    rank: "Top 1%",
    streakDays: 45,
  };

  const weeklySchedule: Record<DayName, Slot[]> = {
    "Thứ 2": [{ time: "19:00 - 21:00", status: "study", subject: user.role === "tutor" ? "Dạy Toán" : "Học Toán" }],
    "Thứ 3": [{ time: "20:00 - 21:30", status: "study", subject: user.role === "tutor" ? "Dạy Lý" : "Học Lý" }],
    "Thứ 4": [
      { time: "19:00 - 20:00", status: "study", subject: user.role === "tutor" ? "Dạy Hóa" : "Học Hóa" },
      { time: "20:30 - 21:30", status: "study", subject: user.role === "tutor" ? "Dạy Toán" : "Học Toán" },
    ],
    "Thứ 5": [],
    "Thứ 6": [{ time: "19:30 - 21:00", status: "study", subject: user.role === "tutor" ? "Dạy Tiếng Anh" : "Học Tiếng Anh" }],
    "Thứ 7": [
      { time: "09:00 - 11:00", status: "study", subject: user.role === "tutor" ? "Dạy nhóm" : "Study with me" },
      { time: "14:00 - 16:00", status: "study", subject: user.role === "tutor" ? "Dạy Lý" : "Học Lý" },
    ],
    "Chủ nhật": [{ time: "15:00 - 17:00", status: "study", subject: user.role === "tutor" ? "Ôn thi" : "Ôn thi" }],
  };

  const weekDays: Array<{ short: string; full: DayName }> = [
    { short: "T2", full: "Thứ 2" },
    { short: "T3", full: "Thứ 3" },
    { short: "T4", full: "Thứ 4" },
    { short: "T5", full: "Thứ 5" },
    { short: "T6", full: "Thứ 6" },
    { short: "T7", full: "Thứ 7" },
    { short: "CN", full: "Chủ nhật" },
  ];

  const mediaItems = [
    {
      id: "1",
      type: "video" as const,
      title: user.role === "tutor" ? "Video giới thiệu phương pháp dạy" : "Video giới thiệu bản thân",
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
      duration: "02:30"
    },
    {
      id: "2", 
      type: "image" as const,
      title: user.role === "tutor" ? "Bằng cấp và chứng chỉ" : "Bảng điểm học kỳ 1",
      thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop"
    },
    {
      id: "3",
      type: "image" as const, 
      title: user.role === "tutor" ? "Lớp học thực tế" : "Tham gia Olympic Toán",
      thumbnail: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=300&fit=crop"
    }
  ];

  const faqItems = user.role === "tutor" ? [
    {
      question: "Thầy có bao nhiều năm kinh nghiệm?",
      answer: "Tôi có hơn 10 năm kinh nghiệm giảng dạy, đã hướng dẫn hơn 500 học sinh đỗ đại học."
    },
    {
      question: "Phương pháp dạy của thầy như thế nào?",
      answer: "Tôi tập trung vào việc giúp học sinh hiểu bản chất vấn đề, kết hợp lý thuyết với thực hành và ứng dụng."
    },
    {
      question: "Thầy dạy những lớp nào?",
      answer: "Tôi chuyên dạy Toán, Lý, Hóa cho học sinh lớp 10-12 và luyện thi đại học."
    }
  ] : [
    {
      question: "Bạn học giỏi môn nào nhất?",
      answer: "Mình học giỏi nhất môn Toán và Vật lý. Đã đạt nhiều giải trong các kỳ thi học sinh giỏi cấp thành phố."
    },
    {
      question: "Mục tiêu học tập của bạn là gì?", 
      answer: "Mình muốn đỗ vào Đại học Bách Khoa Hà Nội ngành Công nghệ Thông tin với điểm số cao nhất có thể."
    },
    {
      question: "Bạn có tham gia hoạt động ngoại khóa không?",
      answer: "Có, mình tham gia CLB Robotics của trường và các cuộc thi lập trình."
    }
  ];

  const studyingSubjects = [
    { name: "TOÁN", progress: user.role === "tutor" ? "Expert" : "80%" },
    { name: "LÝ", progress: user.role === "tutor" ? "Expert" : "70%" },
    { name: "HÓA", progress: user.role === "tutor" ? "Expert" : "60%" },
    { name: "TIẾNG ANH", progress: user.role === "tutor" ? "Advanced" : "75%" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-6 text-center">
                <div className="relative">
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {user.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  {user.isVerified && (
                    <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white rounded-full p-1">
                      <CheckCircle className="w-4 h-4 fill-current" />
                    </div>
                  )}
                </div>

                <h2 className="text-xl font-bold mb-1">{user.name}</h2>
                <div className="text-sm text-gray-600 mb-2">
                  {user.role === "tutor" ? user.education : `${user.school} • ${user.grade}`}
                </div>

                <div className="flex justify-center gap-2 mb-3">
                  <Badge className="bg-green-500 text-white border-0 text-xs">
                    <Shield className="w-3 h-3 mr-1" />
                    {user.role === "tutor" ? "Gia sư" : "Học sinh"}
                  </Badge>
                  <Badge className="bg-blue-500 text-white border-0 text-xs">
                    <Star className="w-3 h-3 mr-1" /> 
                    {user.rank}
                  </Badge>
                  {user.isVerified && (
                    <Badge className="bg-purple-500 text-white border-0 text-xs">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-3 text-center mb-4">
                  <div>
                    <div className="text-xs text-gray-500">Điểm</div>
                    <div className="font-bold text-blue-600">{user.points.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Hạng</div>
                    <div className="font-bold text-purple-600">{user.rank}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">
                      {user.role === "tutor" ? "Đánh giá" : "Streak"}
                    </div>
                    <div className="font-bold text-green-600">
                      {user.role === "tutor" ? `${user.rating}★` : `${user.streakDays}d`}
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-600 mb-4">
                  <div className="flex items-center justify-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {user.location}
                  </div>
                  {user.role === "tutor" && (
                    <>
                      <div>{user.experience} kinh nghiệm</div>
                      <div className="font-semibold text-green-600 mt-1">
                        {user.pricePerHour?.toLocaleString()}₫/h
                      </div>
                    </>
                  )}
                </div>

                {user.role === "tutor" && (
                  <div className="flex items-center justify-center gap-4 text-xs text-gray-500 mb-4">
                    <div>
                      <span className="font-semibold">{user.followers}</span> theo dõi
                    </div>
                    <div>
                      <span className="font-semibold">{user.following}</span> đang theo dõi
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Media Gallery */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Thư viện
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {mediaItems.map((item, i) => (
                    <div key={i} className="aspect-square rounded-lg overflow-hidden bg-gray-100 relative group cursor-pointer">
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        src={item.thumbnail}
                        alt={item.title}
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        {item.type === "video" ? (
                          <Video className="w-6 h-6 text-white" />
                        ) : (
                          <Camera className="w-6 h-6 text-white" />
                        )}
                      </div>
                      {item.type === "video" && (
                        <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                          {item.duration}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Thống kê
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {user.role === "tutor" ? (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Giờ dạy</span>
                      </div>
                      <span className="font-bold text-green-600">{user.teachingHours}h</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">Học sinh</span>
                      </div>
                      <span className="font-bold text-blue-600">{user.totalReviews}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm">Đánh giá</span>
                      </div>
                      <span className="font-bold text-yellow-600">{user.rating}/5</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Giờ học tháng này</span>
                      </div>
                      <span className="font-bold text-green-600">24h</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">Nhóm tham gia</span>
                      </div>
                      <span className="font-bold text-blue-600">3</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Trophy className="w-4 h-4 text-purple-500" />
                        <span className="text-sm">Thành tích</span>
                      </div>
                      <span className="font-bold text-purple-600">{user.achievements.length}</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio & Goals */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="w-6 h-6 mr-3" />
                  {user.role === "tutor" ? "Giới thiệu" : "Giới thiệu & Mục tiêu"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-line text-lg">
                    {user.bio}
                    {user.goals && `\n\nMục tiêu: ${user.goals}`}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-6 h-6 mr-3" />
                  Thành tích nổi bật
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {user.achievements.map((achievement, i) => (
                    <Card key={i} className="p-4 text-center border-2 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
                      <div className="mb-2">
                        <Trophy className="w-8 h-8 mx-auto text-yellow-600" />
                      </div>
                      <div className="text-sm font-semibold text-yellow-800">{achievement}</div>
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
                  {user.role === "tutor" ? "Môn dạy" : "Môn học"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {studyingSubjects.map((subject, idx) => {
                    const Icon = getSubjectIcon(subject.name);
                    return (
                      <Card key={idx} className="p-4 h-full border-gray-200 hover:shadow-lg transition-all duration-200">
                        <div className="text-center">
                          <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                            <Icon className="w-6 h-6 text-gray-600" />
                          </div>
                          <div className="font-semibold text-xs mb-1 text-gray-800">{subject.name}</div>
                          <div className="text-xs text-gray-600">
                            {user.role === "tutor" ? `Cấp độ: ${subject.progress}` : `Tiến độ: ${subject.progress}`}
                          </div>
                          {user.role === "student" && (
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                                style={{ width: subject.progress }}
                              ></div>
                            </div>
                          )}
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="w-6 h-6 mr-3" />
                  Câu hỏi thường gặp
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {faqItems.map((faq, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                      <p className="text-gray-700 text-sm">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Actions & Schedule */}
          <div className="lg:col-span-1 space-y-6">
            {/* Action Buttons */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-indigo-50 to-purple-50">
              <CardContent className="p-6 space-y-3">
                <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white">
                  <Heart className="h-5 w-5 mr-3" />
                  THEO DÕI
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="h-5 w-5 mr-3" />
                  NHẮN TIN
                </Button>
                {user.role === "tutor" && (
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="h-5 w-5 mr-3" />
                    ĐẶT LỊCH HỌC
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Tutor Info Block (Always shown) */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="w-6 h-6 mr-3" />
                  Thông tin gia sư
                </CardTitle>
              </CardHeader>
              <CardContent>
                {user.role === "tutor" ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Kinh nghiệm</span>
                      <span className="font-semibold">{user.experience}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Học vấn</span>
                      <span className="font-semibold text-sm">{user.education}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Giá/giờ</span>
                      <span className="font-semibold text-green-600">{user.pricePerHour?.toLocaleString()}₫</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Đánh giá</span>
                      <span className="font-semibold text-yellow-600">{user.rating}★ ({user.totalReviews} đánh giá)</span>
                    </div>
                    <div className="pt-3 border-t">
                      <div className="flex flex-wrap gap-1">
                        {user.subjects.map((subject, index) => {
                          const Icon = getSubjectIcon(subject);
                          return (
                            <Badge key={index} className="bg-gradient-to-r from-green-100 to-blue-100 text-green-700 border-green-200">
                              <Icon className="w-3 h-3 mr-1" /> {subject}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p className="text-gray-500 text-sm">
                      Người dùng này chưa đăng ký làm gia sư
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Weekly Schedule */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-6 h-6 mr-3" />
                  Lịch {user.role === "tutor" ? "dạy" : "học"} tuần này
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
                      onClick={() => setSelectedDay(day.full as DayName)}
                      className={`relative transition-all duration-200 w-8 h-7 text-xs px-1 ${
                        selectedDay === day.full 
                          ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg" 
                          : "hover:bg-blue-50 hover:border-blue-300"
                      }`}
                    >
                      {day.short}
                      {/* Active classes indicator */}
                      {weeklySchedule[day.full as DayName] && weeklySchedule[day.full as DayName].length > 0 && (
                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                      )}
                    </Button>
                  ))}
                </div>

                {/* Selected Day Classes */}
                <div className="border rounded-lg p-6 bg-gradient-to-br from-blue-50 to-purple-50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg text-gray-900">{selectedDay}</h3>
                    <Badge variant="outline" className="text-sm">
                      {weeklySchedule[selectedDay]?.length || 0} buổi
                    </Badge>
                  </div>
                  
                  {weeklySchedule[selectedDay] && weeklySchedule[selectedDay].length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                      {weeklySchedule[selectedDay].map((slot: Slot, index: number) => (
                        <Card 
                          key={index} 
                          className="p-4 transition-all duration-200 cursor-pointer bg-blue-50 border-blue-200 hover:bg-blue-100 hover:shadow-md"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-full bg-blue-100">
                              <Clock className="w-4 h-4 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-sm">{slot.time}</div>
                              <div className="text-xs text-gray-600">{slot.subject}</div>
                            </div>
                            <Badge variant="outline" className="text-xs border-blue-300 text-blue-700">
                              {user.role === "tutor" ? "Dạy học" : "Học tập"}
                            </Badge>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                      <p className="text-gray-500 font-medium">Không có lịch {user.role === "tutor" ? "dạy" : "học"}</p>
                      <p className="text-sm text-gray-400">Chưa có {user.role === "tutor" ? "lớp dạy" : "lớp học"} nào trong ngày này</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

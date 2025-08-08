import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Calendar, 
  Clock, 
  Star, 
  Award, 
  BookOpen, 
  Target, 
  TrendingUp, 
  Users, 
  Heart,
  MessageSquare,
  Share2,
  Edit3,
  Settings,
  Camera,
  MapPin,
  School,
  Trophy,
  Flame,
  Gift,
  Video,
  DollarSign
} from "lucide-react";
import Header from "@/components/header";
import { useAuth } from "@/contexts/auth-context";

export default function MyProfile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock user profile data - in real app, fetch from authenticated user's data
  const profileData = {
    name: user?.fullName || "Nguyễn Minh Anh",
    email: user?.email || "minhanh@example.com",
    role: user?.role || "student",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=200&h=200&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=1200&h=400&fit=crop",
    bio: "Học sinh lớp 12A1 trường THPT Chu Văn An. Đam mê toán học và khoa học. Mục tiêu: Đại học Bách Khoa Hà Nội ngành Khoa học máy tính.",
    school: "THPT Chu Văn An",
    grade: "Lớp 12A1",
    location: "Hà Nội",
    joinDate: "2023-09-01",
    stats: {
      totalClasses: 5,
      studyHours: 124,
      totalSpent: "17,000,000₫",
      completionRate: 98,
      points: 2450,
      rank: 1,
      level: "Study Legend",
      streak: 15
    },
    subjects: [
      { name: "Toán học", progress: 85, totalLessons: 24, completedLessons: 20 },
      { name: "Vật lý", progress: 78, totalLessons: 20, completedLessons: 16 },
      { name: "Hóa học", progress: 92, totalLessons: 18, completedLessons: 17 }
    ],
    achievements: [
      { id: 1, title: "Study Streak Master", icon: "🔥", description: "Học liên tục 30 ngày", unlocked: true },
      { id: 2, title: "Math Genius", icon: "🧮", description: "Hoàn thành 100 bài toán", unlocked: true },
      { id: 3, title: "Night Owl", icon: "🦉", description: "Học tập hiệu quả ban đêm", unlocked: true },
      { id: 4, title: "Team Player", icon: "🤝", description: "50+ phiên Study With Me", unlocked: true },
      { id: 5, title: "Perfect Score", icon: "💯", description: "Đạt điểm tối đa 10 bài kiểm tra", unlocked: false },
      { id: 6, title: "Social Butterfly", icon: "🦋", description: "Kết bạn với 100+ học sinh", unlocked: false }
    ],
    recentActivity: [
      { date: "08/01/2025", activity: "Hoàn thành bài kiểm tra Toán 12", score: "9.5/10" },
      { date: "07/01/2025", activity: "Tham gia Study With Me - Physics", duration: "2h" },
      { date: "06/01/2025", activity: "Đặt lịch học với Thầy Việt Hoàng", subject: "Toán" },
      { date: "05/01/2025", activity: "Chia sẻ bài viết học tập", likes: 45 }
    ],
    upcomingClasses: [
      { subject: "Toán 12", tutor: "Thầy Việt Hoàng", time: "Thứ 2, 19:00", date: "12/01/2025" },
      { subject: "Vật lý 12", tutor: "Cô Thu Hà", time: "Thứ 4, 20:00", date: "14/01/2025" },
      { subject: "Hóa học 12", tutor: "Thầy Minh Tuấn", time: "Chủ nhật, 15:00", date: "18/01/2025" }
    ],
    coupons: [
      { code: "FREE1H", discount: "Miễn phí 1 giờ học", expiry: "31/01/2025", used: false },
      { code: "SAVE20", discount: "Giảm 20%", expiry: "28/01/2025", used: false },
      { code: "BONUS2H", discount: "Tặng 2 giờ học", expiry: "15/01/2025", used: true }
    ]
  };

  const formatJoinDate = (dateString: string) => {
    const date = new Date(dateString);
    return `Tham gia từ ${date.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Cover & Profile Section */}
      <div className="relative">
        {/* Cover Image */}
        <div 
          className="h-64 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative"
          style={{
            backgroundImage: `url(${profileData.coverImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
          <Button 
            size="sm" 
            variant="secondary" 
            className="absolute top-4 right-4 bg-white/90 hover:bg-white"
          >
            <Camera className="w-4 h-4 mr-2" />
            Đổi ảnh bìa
          </Button>
        </div>

        {/* Profile Info */}
        <div className="container mx-auto px-6 relative">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16 pb-6">
            {/* Avatar */}
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                <AvatarImage src={profileData.avatar} alt={profileData.name} />
                <AvatarFallback className="text-2xl font-bold">
                  {profileData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button 
                size="sm" 
                className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-blue-600 hover:bg-blue-700"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>

            {/* Profile Details */}
            <div className="flex-1 md:ml-6 bg-white rounded-lg p-6 shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold text-gray-900">{profileData.name}</h1>
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      <Trophy className="w-3 h-3 mr-1" />
                      {profileData.stats.level}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      <School className="w-4 h-4" />
                      {profileData.school} - {profileData.grade}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {profileData.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatJoinDate(profileData.joinDate)}
                    </span>
                  </div>
                  <p className="text-gray-700 max-w-2xl">{profileData.bio}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Chia sẻ
                  </Button>
                  <Button size="sm">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Chỉnh sửa
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            <Card className="text-center p-4">
              <CardContent className="p-0">
                <div className="text-2xl font-bold text-blue-600">{profileData.stats.totalClasses}</div>
                <div className="text-sm text-gray-600">Lớp học</div>
              </CardContent>
            </Card>
            <Card className="text-center p-4">
              <CardContent className="p-0">
                <div className="text-2xl font-bold text-green-600">{profileData.stats.studyHours}h</div>
                <div className="text-sm text-gray-600">Giờ học</div>
              </CardContent>
            </Card>
            <Card className="text-center p-4">
              <CardContent className="p-0">
                <div className="text-2xl font-bold text-purple-600">{profileData.stats.points}</div>
                <div className="text-sm text-gray-600">Điểm</div>
              </CardContent>
            </Card>
            <Card className="text-center p-4">
              <CardContent className="p-0">
                <div className="text-2xl font-bold text-orange-600">#{profileData.stats.rank}</div>
                <div className="text-sm text-gray-600">Xếp hạng</div>
              </CardContent>
            </Card>
            <Card className="text-center p-4">
              <CardContent className="p-0">
                <div className="text-2xl font-bold text-red-600 flex items-center justify-center gap-1">
                  <Flame className="w-5 h-5" />
                  {profileData.stats.streak}
                </div>
                <div className="text-sm text-gray-600">Ngày liên tiếp</div>
              </CardContent>
            </Card>
            <Card className="text-center p-4">
              <CardContent className="p-0">
                <div className="text-2xl font-bold text-teal-600">{profileData.stats.completionRate}%</div>
                <div className="text-sm text-gray-600">Hoàn thành</div>
              </CardContent>
            </Card>
          </div>

          {/* Tabbed Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="overview">
                <User className="w-4 h-4 mr-2" />
                Tổng quan
              </TabsTrigger>
              <TabsTrigger value="progress">
                <TrendingUp className="w-4 h-4 mr-2" />
                Tiến độ
              </TabsTrigger>
              <TabsTrigger value="achievements">
                <Award className="w-4 h-4 mr-2" />
                Thành tích
              </TabsTrigger>
              <TabsTrigger value="classes">
                <BookOpen className="w-4 h-4 mr-2" />
                Lớp học
              </TabsTrigger>
              <TabsTrigger value="coupons">
                <Gift className="w-4 h-4 mr-2" />
                Ưu đãi
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Hoạt động gần đây
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {profileData.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{activity.activity}</div>
                          <div className="text-sm text-gray-600">{activity.date}</div>
                          {activity.score && (
                            <Badge className="mt-1 bg-green-100 text-green-800">Điểm: {activity.score}</Badge>
                          )}
                          {activity.duration && (
                            <Badge className="mt-1 bg-blue-100 text-blue-800">Thời gian: {activity.duration}</Badge>
                          )}
                          {activity.likes && (
                            <Badge className="mt-1 bg-pink-100 text-pink-800">
                              <Heart className="w-3 h-3 mr-1" />
                              {activity.likes}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Subject Progress Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Tiến độ môn học
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {profileData.subjects.map((subject, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{subject.name}</span>
                          <span className="text-sm text-gray-600">
                            {subject.completedLessons}/{subject.totalLessons} bài
                          </span>
                        </div>
                        <Progress value={subject.progress} className="h-2" />
                        <div className="text-sm text-gray-600">{subject.progress}% hoàn thành</div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Progress Tab */}
            <TabsContent value="progress" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Detailed Subject Progress */}
                {profileData.subjects.map((subject, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{subject.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Tiến độ tổng thể</span>
                          <span className="font-bold text-lg">{subject.progress}%</span>
                        </div>
                        <Progress value={subject.progress} className="h-3" />
                        
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div className="text-center p-3 bg-blue-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">{subject.completedLessons}</div>
                            <div className="text-sm text-gray-600">Bài đã học</div>
                          </div>
                          <div className="text-center p-3 bg-green-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">{subject.totalLessons - subject.completedLessons}</div>
                            <div className="text-sm text-gray-600">Bài còn lại</div>
                          </div>
                        </div>

                        <Button variant="outline" className="w-full mt-4">
                          <Video className="w-4 h-4 mr-2" />
                          Tiếp tục học
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {profileData.achievements.map((achievement) => (
                  <Card 
                    key={achievement.id} 
                    className={`relative overflow-hidden ${
                      achievement.unlocked 
                        ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200' 
                        : 'bg-gray-50 border-gray-200 opacity-60'
                    }`}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-3">{achievement.icon}</div>
                      <h3 className="font-bold text-lg mb-2">{achievement.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{achievement.description}</p>
                      {achievement.unlocked ? (
                        <Badge className="bg-yellow-500 text-white">
                          <Award className="w-3 h-3 mr-1" />
                          Đã mở khóa
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-gray-300 text-gray-500">
                          <Target className="w-3 h-3 mr-1" />
                          Chưa đạt được
                        </Badge>
                      )}
                      
                      {achievement.unlocked && (
                        <div className="absolute top-2 right-2">
                          <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                            <Star className="w-3 h-3 text-white fill-current" />
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Classes Tab */}
            <TabsContent value="classes" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Lịch học sắp tới
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {profileData.upcomingClasses.map((classItem, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                          {classItem.subject.split(' ')[0]}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{classItem.subject}</div>
                          <div className="text-sm text-gray-600">Giáo viên: {classItem.tutor}</div>
                          <div className="text-sm text-blue-600 font-medium">
                            {classItem.time} - {classItem.date}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Nhắn tin
                        </Button>
                        <Button size="sm">
                          <Video className="w-4 h-4 mr-2" />
                          Vào lớp
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Coupons Tab */}
            <TabsContent value="coupons" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {profileData.coupons.map((coupon, index) => (
                  <Card 
                    key={index} 
                    className={`relative overflow-hidden ${
                      coupon.used 
                        ? 'bg-gray-100 border-gray-300 opacity-60' 
                        : 'bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200'
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="text-2xl mb-2">🎫</div>
                        <div className="font-bold text-lg mb-2 text-gray-900">{coupon.code}</div>
                        <div className="text-purple-600 font-semibold mb-3">{coupon.discount}</div>
                        <div className="text-sm text-gray-600 mb-4">Hết hạn: {coupon.expiry}</div>
                        
                        {coupon.used ? (
                          <Badge variant="outline" className="border-gray-400 text-gray-500">
                            Đã sử dụng
                          </Badge>
                        ) : (
                          <Button size="sm" className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                            <Gift className="w-4 h-4 mr-2" />
                            Sử dụng ngay
                          </Button>
                        )}
                      </div>
                      
                      {!coupon.used && (
                        <div className="absolute top-2 right-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">Muốn nhận thêm ưu đãi?</h3>
                  <p className="mb-4 opacity-90">Tham gia các hoạt động học tập để kiếm điểm và nhận coupon miễn phí!</p>
                  <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                    <Target className="w-4 h-4 mr-2" />
                    Xem nhiệm vụ
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
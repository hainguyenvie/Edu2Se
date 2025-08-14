import { useState } from "react";
import Header from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ScheduleSetupModal from "@/components/schedule-setup-modal";
import StatisticsModal from "@/components/statistics-modal";
import WithdrawModal from "@/components/withdraw-modal";
import { useAuth } from "@/contexts/auth-context";
import { Link } from "wouter";
import {
  Calendar,
  BarChart3,
  Settings,
  MessageCircle,
  Users,
  DollarSign,
  Clock,
  Star,
  CheckCircle,
  TrendingUp,
  Trophy,
  Medal,
  BookOpen,
  Plus,
  Edit,
  Trash2,
  Eye,
  Upload,
  Video,
  Camera,
  FileText,
  CreditCard,
  Target,
  Award,
  Zap
} from "lucide-react";

export default function TutorDashboard() {
  const { user } = useAuth();
  const [isScheduleSetupOpen, setIsScheduleSetupOpen] = useState(false);
  const [isStatisticsOpen, setIsStatisticsOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<number | null>(null);

  // Mock data for tutor management
  const myClasses = [
    {
      id: 1,
      student: "Nguyễn Văn A",
      subject: "Toán",
      time: "19:00 - 20:30",
      date: "Hôm nay",
      status: "confirmed",
      lesson: "Đạo hàm cơ bản"
    },
    {
      id: 2,
      student: "Trần Thị B",
      subject: "Lý",
      time: "20:00 - 21:30",
      date: "Thứ 3",
      status: "pending",
      lesson: "Động học chất điểm"
    },
  ];

  const myStudents = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      avatar: "/api/placeholder/32/32",
      subjects: ["Toán"],
      joinDate: "2024-01-15",
      totalHours: 24,
      progress: 75,
      lastLesson: "2 ngày trước"
    },
    {
      id: 2,
      name: "Trần Thị B",
      avatar: "/api/placeholder/32/32",
      subjects: ["Lý", "Hóa"],
      joinDate: "2024-02-01",
      totalHours: 16,
      progress: 60,
      lastLesson: "1 ngày trước"
    },
  ];

  const mySubjects = [
    {
      id: 1,
      name: "Toán",
      grade: "Lớp 10-12",
      price: 150000,
      students: 8,
      totalHours: 45,
      rating: 4.9,
      description: "Chuyên dạy Toán cấp 2-3, luyện thi THPT QG",
      curriculum: ["Đại số", "Hình học", "Giải tích"],
      media: {
        videos: 3,
        images: 5,
        documents: 8
      }
    },
    {
      id: 2,
      name: "Lý",
      grade: "Lớp 11-12",
      price: 150000,
      students: 5,
      totalHours: 32,
      rating: 4.8,
      description: "Vật lý cơ bản và nâng cao, thí nghiệm thực hành",
      curriculum: ["Cơ học", "Nhiệt học", "Điện học"],
      media: {
        videos: 2,
        images: 3,
        documents: 6
      }
    },
  ];

  const bookingRequests = [
    {
      id: 1,
      student: "Nguyễn Văn C",
      subject: "Toán",
      preferredTime: "19:00 - 20:30",
      date: "Thứ 5",
      message: "Cần học bài đạo hàm, em đang bí ở phần này ạ",
      urgent: true
    },
    {
      id: 2,
      student: "Phạm Thị D",
      subject: "Lý",
      preferredTime: "20:00 - 21:30",
      date: "Thứ 6",
      message: "Cần ôn thi giữa kỳ môn Vật lý",
      urgent: false
    },
  ];

  const recentReviews = [
    {
      id: 1,
      student: "Nguyễn Văn A",
      rating: 5,
      comment: "Thầy dạy rất hay, dễ hiểu và nhiệt tình",
      subject: "Toán",
      date: "2 ngày trước"
    },
    {
      id: 2,
      student: "Trần Thị B",
      rating: 5,
      comment: "Phương pháp dạy của thầy rất hiệu quả",
      subject: "Lý",
      date: "1 tuần trước"
    },
  ];

  const formatCurrency = (amount: number) => new Intl.NumberFormat("vi-VN").format(amount) + "₫";

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-10 max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard của Hồ Sơ Gia Sư</h1>
          <p className="text-gray-600 mt-1">Chào {user?.fullName || user?.username}! Quản lý lớp học, học sinh và doanh thu của bạn.</p>
        </div>

        {/* Gamification Banner */}
        <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white mb-8">
          <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Top 10 Gia Sư • Bộ môn Toán</h3>
                <p className="text-white/90">4.9★ • 150+ học viên • 500h+ giảng dạy</p>
                <div className="flex items-center mt-2 space-x-2">
                  <Badge className="bg-white/20 text-white border-0">Expert Teacher</Badge>
                  <Badge className="bg-white/20 text-white border-0">Top Rated</Badge>
                </div>
              </div>
            </div>
            <Link href="/ranking">
              <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white mt-4 md:mt-0">
                Xem Bảng xếp hạng →
              </Button>
            </Link>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Quick Widgets */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Stats Widgets */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg">Widget Tổng Quan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <Users className="w-8 h-8 text-blue-600" />
                    <div className="text-right">
                      <div className="text-xl font-bold text-blue-600">13</div>
                      <div className="text-xs text-gray-600">Học sinh của tôi</div>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <DollarSign className="w-8 h-8 text-green-600" />
                    <div className="text-right">
                      <div className="text-xl font-bold text-green-600">2.8M</div>
                      <div className="text-xs text-gray-600">Doanh thu tháng</div>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <Clock className="w-8 h-8 text-purple-600" />
                    <div className="text-right">
                      <div className="text-xl font-bold text-purple-600">45h</div>
                      <div className="text-xs text-gray-600">Giờ dạy tháng này</div>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <Star className="w-8 h-8 text-yellow-600" />
                    <div className="text-right">
                      <div className="text-xl font-bold text-yellow-600">4.9</div>
                      <div className="text-xs text-gray-600">Đánh giá trung bình</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ShortLink Actions */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  ShortLink Hành Động
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href={`/tutor/${user?.id}?owner=1`}>
                  <Button variant="outline" className="w-full justify-start">
                    <Eye className="w-4 h-4 mr-2" />
                    Xem hồ sơ công khai
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start" onClick={() => setIsScheduleSetupOpen(true)}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Thiết lập lịch dạy
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setIsStatisticsOpen(true)}>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Xem thống kê chi tiết
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setIsWithdrawOpen(true)}>
                  <DollarSign className="w-4 h-4 mr-2" />
                  Rút tiền
                </Button>
              </CardContent>
            </Card>

            {/* Ví - Rút tiền */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Ví của tôi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-green-600">5,250,000₫</div>
                  <p className="text-sm text-gray-500">Số dư khả dụng</p>
                </div>
                <div className="space-y-2">
                  <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => setIsWithdrawOpen(true)}>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Rút tiền
                  </Button>
                  <Link href="/settings">
                    <Button variant="outline" className="w-full text-sm">
                      Lịch sử giao dịch →
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle Column - Main Management */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lớp học của tôi */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Lớp học của tôi
                  </span>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm khung giờ
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myClasses.map((class_, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback>{class_.student[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{class_.student}</h4>
                          <p className="text-sm text-gray-600">{class_.subject} • {class_.lesson}</p>
                          <p className="text-sm text-gray-500">{class_.time} • {class_.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={class_.status === 'confirmed' ? 'default' : 'secondary'}>
                          {class_.status === 'confirmed' ? 'Đã xác nhận' : 'Chờ xác nhận'}
                        </Badge>
                        <Button size="sm">Vào lớp</Button>
                      </div>
                    </div>
                  ))}
                  <Link href="/dashboard">
                    <Button variant="ghost" className="w-full">
                      Xem tất cả lịch dạy →
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Các Môn tôi dạy */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Các Môn tôi dạy
                  </span>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm môn học
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mySubjects.map((subject) => (
                    <div key={subject.id} className="border rounded-lg p-6 bg-white">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold">{subject.name}</h3>
                          <p className="text-gray-600">{subject.grade} • {formatCurrency(subject.price)}/h</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline" onClick={() => setEditingSubject(subject.id)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center p-3 bg-blue-50 rounded">
                          <div className="font-bold text-blue-600">{subject.students}</div>
                          <div className="text-xs text-gray-600">Học sinh</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded">
                          <div className="font-bold text-green-600">{subject.totalHours}h</div>
                          <div className="text-xs text-gray-600">Tổng giờ dạy</div>
                        </div>
                        <div className="text-center p-3 bg-yellow-50 rounded">
                          <div className="font-bold text-yellow-600">{subject.rating}★</div>
                          <div className="text-xs text-gray-600">Đánh giá</div>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4">{subject.description}</p>

                      <Tabs defaultValue="curriculum" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                          <TabsTrigger value="media">Media ({subject.media.videos + subject.media.images})</TabsTrigger>
                          <TabsTrigger value="pricing">Bảng giá</TabsTrigger>
                        </TabsList>
                        <TabsContent value="curriculum">
                          <div className="space-y-2">
                            {subject.curriculum.map((topic, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                <span>{topic}</span>
                                <Button size="sm" variant="ghost">
                                  <Edit className="w-3 h-3" />
                                </Button>
                              </div>
                            ))}
                            <Button size="sm" variant="outline" className="w-full">
                              <Plus className="w-4 h-4 mr-2" />
                              Thêm chủ đề
                            </Button>
                          </div>
                        </TabsContent>
                        <TabsContent value="media">
                          <div className="grid grid-cols-3 gap-4">
                            <div className="text-center p-4 border-2 border-dashed border-gray-300 rounded-lg">
                              <Video className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                              <div className="text-sm font-medium">{subject.media.videos} Videos</div>
                              <Button size="sm" variant="ghost" className="mt-2">
                                <Upload className="w-3 h-3 mr-1" />
                                Thêm
                              </Button>
                            </div>
                            <div className="text-center p-4 border-2 border-dashed border-gray-300 rounded-lg">
                              <Camera className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                              <div className="text-sm font-medium">{subject.media.images} Ảnh</div>
                              <Button size="sm" variant="ghost" className="mt-2">
                                <Upload className="w-3 h-3 mr-1" />
                                Thêm
                              </Button>
                            </div>
                            <div className="text-center p-4 border-2 border-dashed border-gray-300 rounded-lg">
                              <FileText className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                              <div className="text-sm font-medium">{subject.media.documents} Tài liệu</div>
                              <Button size="sm" variant="ghost" className="mt-2">
                                <Upload className="w-3 h-3 mr-1" />
                                Thêm
                              </Button>
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="pricing">
                          <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                              <label className="text-sm font-medium">Giá cơ bản:</label>
                              <Input 
                                type="number" 
                                value={subject.price} 
                                className="w-32"
                                disabled={editingSubject !== subject.id}
                              />
                              <span>₫/giờ</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">Lớp riêng:</label>
                                <Input type="number" placeholder="200000" className="mt-1" disabled={editingSubject !== subject.id} />
                              </div>
                              <div>
                                <label className="text-sm font-medium">Lớp nhóm:</label>
                                <Input type="number" placeholder="120000" className="mt-1" disabled={editingSubject !== subject.id} />
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Bookings & Reviews */}
          <div className="lg:col-span-1 space-y-6">
            {/* Đặt lịch của tôi (Booking requests) */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Đặt lịch của tôi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookingRequests.map((request) => (
                    <div key={request.id} className={`p-4 rounded-lg border ${request.urgent ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-white'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-sm">{request.student}</h4>
                        {request.urgent && (
                          <Badge variant="destructive" className="text-xs">Gấp</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{request.subject}</p>
                      <p className="text-sm text-gray-500 mb-2">{request.preferredTime} • {request.date}</p>
                      <p className="text-xs text-gray-700 mb-3">"{request.message}"</p>
                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1">Chấp nhận</Button>
                        <Button size="sm" variant="outline" className="flex-1">Từ chối</Button>
                      </div>
                    </div>
                  ))}
                  <Link href="/messages">
                    <Button variant="ghost" className="w-full text-sm">
                      Xem tất cả đặt lịch →
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Học sinh của tôi */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Học sinh của tôi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myStudents.map((student) => (
                    <div key={student.id} className="p-4 border rounded-lg bg-white">
                      <div className="flex items-center space-x-3 mb-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={student.avatar} />
                          <AvatarFallback>{student.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{student.name}</h4>
                          <p className="text-xs text-gray-600">{student.subjects.join(', ')}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Tiến độ</span>
                          <span>{student.progress}%</span>
                        </div>
                        <Progress value={student.progress} className="h-2" />
                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                          <div>{student.totalHours}h đã học</div>
                          <div>{student.lastLesson}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Đánh giá gần nhất */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  Đánh giá gần nhất
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReviews.map((review) => (
                    <div key={review.id} className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-sm">{review.student}</h4>
                        <div className="flex items-center">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">"{review.comment}"</p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{review.subject}</span>
                        <span>{review.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Modals */}
      <ScheduleSetupModal 
        isOpen={isScheduleSetupOpen}
        onClose={() => setIsScheduleSetupOpen(false)}
      />
      <StatisticsModal 
        isOpen={isStatisticsOpen}
        onClose={() => setIsStatisticsOpen(false)}
      />
      <WithdrawModal 
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
      />
    </div>
  );
}

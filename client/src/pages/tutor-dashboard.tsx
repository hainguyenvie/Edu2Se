import { useState } from "react";
import Header from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ScheduleSetupModal from "@/components/schedule-setup-modal";
import StatisticsModal from "@/components/statistics-modal";
import WithdrawModal from "@/components/withdraw-modal";
import { useAuth } from "@/contexts/auth-context";
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
} from "lucide-react";

export default function TutorDashboard() {
  const { user } = useAuth();

  const [isScheduleSetupOpen, setIsScheduleSetupOpen] = useState(false);
  const [isStatisticsOpen, setIsStatisticsOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  // Check if user is a tutor
  const isTutor = user?.role === 'tutor';

  // If not a tutor, show the registration prompt
  if (!isTutor) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="container mx-auto px-4 pt-24 pb-10 max-w-4xl">
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Users className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Bạn chưa phải là gia sư
              </h1>
              <p className="text-gray-600 mb-8">
                Để truy cập trang quản lý gia sư, bạn cần đăng ký trở thành gia sư trước.
                Hãy đăng ký ngay để bắt đầu hành trình giảng dạy của bạn!
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <DollarSign className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <h3 className="font-semibold text-sm mb-1">Thu nhập linh hoạt</h3>
                  <p className="text-xs text-gray-600">Tự quyết định giá và lịch dạy</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <Users className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <h3 className="font-semibold text-sm mb-1">Kết nối học sinh</h3>
                  <p className="text-xs text-gray-600">Tìm kiếm học sinh phù hợp</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <Trophy className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                  <h3 className="font-semibold text-sm mb-1">Phát triển kỹ năng</h3>
                  <p className="text-xs text-gray-600">Nâng cao năng lực giảng dạy</p>
                </div>
              </div>

              <div className="space-y-4">
                <a href="/my-biography">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Users className="w-4 h-4 mr-2" />
                    Đăng ký làm gia sư ngay
                  </Button>
                </a>
                <a href="/my-biography">
                  <Button variant="outline" className="w-full">
                    ← Quay lại My Bio
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Mock data for tutor view
  const stats = [
    { label: "Học viên hoạt động", value: 18, icon: Users, color: "text-blue-600" },
    { label: "Giờ dạy (tháng)", value: "42h", icon: Clock, color: "text-green-600" },
    { label: "Thu nhập (tháng)", value: "12.5tr", icon: DollarSign, color: "text-emerald-600" },
    { label: "Đánh giá TB", value: "4.9/5", icon: Star, color: "text-yellow-500" },
  ];

  const upcomingLessons = [
    { course: "Toán 12 - Lớp A", time: "Hôm nay, 19:00 - 21:00", student: "Nam" },
    { course: "Vật lý 11 - Lớp B", time: "Ngày mai, 20:00 - 21:30", student: "Hà" },
    { course: "Ôn thi ĐH - Lớp C", time: "Thứ 5, 19:30 - 21:00", student: "Linh" },
  ];

  const bookingRequests = [
    { student: "Minh Anh", subject: "Toán 12", requested: "T7 14:00-16:00", note: "Muốn học hình học." },
    { student: "Quốc Huy", subject: "Vật lý 11", requested: "CN 9:00-10:30", note: "Ôn dao động cơ." },
  ];

  const recentReviews = [
    { name: "Trần Hải", rating: 5, text: "Giảng dễ hiểu, có ví dụ thực tế.", ago: "2 ngày trước" },
    { name: "Ngọc Mai", rating: 5, text: "Tận tâm, theo sát tiến độ học.", ago: "1 tuần trước" },
  ];

  const formatCurrency = (v: number) => new Intl.NumberFormat("vi-VN").format(v) + "₫";

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-10 max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Bảng điều khiển của tôi</h1>
          <p className="text-gray-600 mt-1">Chào {user?.fullName || user?.username}! Quản lý hồ sơ, lịch dạy, lớp học và ví của bạn tại đây.</p>
        </div>

        {/* Thành tích của tôi - Gamification banner */}
        <Card className="shadow-sm border-0 mb-8">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                Thành tích của tôi
              </span>
              <a href="/ranking" className="text-sm text-blue-600 hover:underline">Xem bảng xếp hạng →</a>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-gradient-to-br from-yellow-50 to-white border border-yellow-100">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <Medal className="w-4 h-4 text-yellow-600" /> Hạng hiện tại
                </div>
                <div className="text-2xl font-bold text-gray-900">Top 12 • Toán</div>
                <div className="text-xs text-gray-500">Khu vực toàn quốc</div>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-white border border-blue-100">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <Star className="w-4 h-4 text-blue-600" /> Điểm thành tích
                </div>
                <div className="text-2xl font-bold text-gray-900">1,250 điểm</div>
                <div className="mt-2">
                  <div className="mb-1 text-xs text-gray-600">Tiến tới huy hiệu Vàng</div>
                  <Progress value={68} className="h-2" />
                  <div className="text-[11px] text-gray-500 mt-1">Còn 32% để nâng hạng</div>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-br from-emerald-50 to-white border border-emerald-100">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <CheckCircle className="w-4 h-4 text-emerald-600" /> Huy hiệu đạt được
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-yellow-100 text-yellow-800">Top Tutor</Badge>
                  <Badge className="bg-blue-100 text-blue-800">100% hoàn thành</Badge>
                  <Badge className="bg-purple-100 text-purple-800">8000+ giờ</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top stat widgets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, idx) => (
            <Card key={idx} className="shadow-sm border-0">
              <CardContent className="p-5 flex items-center gap-4">
                <div className={`p-3 rounded-lg bg-gray-50 ${s.color}`}>
                  <s.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="text-2xl font-bold text-gray-900">{s.value}</div>
                  <div className="text-sm text-gray-600">{s.label}</div>
                </div>
                <TrendingUp className="w-5 h-5 text-gray-400" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cột trái: Lớp học của tôi + Học viên của tôi (booking) */}
          <div className="space-y-6 lg:col-span-2">
            <Card className="shadow-sm border-0">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Lớp học của tôi
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingLessons.map((lesson, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                    <div>
                      <div className="font-medium text-gray-900">{lesson.course}</div>
                      <div className="text-sm text-gray-600">{lesson.time} • 👩‍🎓 {lesson.student}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Chi tiết</Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">Vào lớp</Button>
                    </div>
                  </div>
                ))}
                <div className="text-right">
                  <a href="/dashboard" className="text-sm text-blue-600 hover:underline">Xem tất cả lớp học →</a>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-0">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Học viên của tôi (đặt lịch)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {bookingRequests.map((req, i) => (
                  <div key={i} className="p-3 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium text-gray-900">{req.student} • {req.subject}</div>
                      <Badge className="bg-amber-100 text-amber-700">Chờ xử lý</Badge>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">{req.requested} • {req.note}</div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="default" className="bg-green-600 hover:bg-green-700">Chấp nhận</Button>
                      <Button size="sm" variant="outline">Từ chối</Button>
                      <Button size="sm" variant="outline">Trao đổi</Button>
                    </div>
                  </div>
                ))}
                <div className="text-right">
                  <a href="/messages" className="text-sm text-blue-600 hover:underline">Xem lịch sử đặt lịch →</a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cột phải: Ví của tôi + Thao tác nhanh + Đánh giá gần đây */}
          <div className="space-y-6">
            <Card className="shadow-sm border-0">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Ví của tôi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between mb-3">
                  <div>
                    <div className="text-sm text-gray-600">Số dư khả dụng</div>
                    <div className="text-2xl font-bold text-gray-900">{formatCurrency(1_250_000)}</div>
                  </div>
                  <Button onClick={() => setIsWithdrawOpen(true)} className="bg-green-600 hover:bg-green-700">Rút tiền</Button>
                </div>
                <div className="mb-2 text-sm text-gray-600">Doanh thu tháng này</div>
                <Progress value={72} className="h-2" />
                <div className="text-xs text-gray-500 mt-1">72% mục tiêu 17,000,000₫</div>
                <div className="mt-3 text-right">
                  <a href="/settings" className="text-sm text-blue-600 hover:underline">Xem lịch sử & cấu hình rút tiền →</a>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-0">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Thao tác nhanh
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <a href={(user && `/tutor/${user.id}?owner=1`) || "/my-profile"}>
                  <Button variant="outline" className="w-full justify-start">
                    <CheckCircle className="w-4 h-4 mr-2" /> Xem/Sửa hồ sơ gia sư
                  </Button>
                </a>
                <Button variant="outline" className="w-full justify-start" onClick={() => setIsScheduleSetupOpen(true)}>
                  <Calendar className="w-4 h-4 mr-2" /> Thiết lập lịch dạy
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setIsStatisticsOpen(true)}>
                  <BarChart3 className="w-4 h-4 mr-2" /> Xem thống kê
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setIsWithdrawOpen(true)}>
                  <DollarSign className="w-4 h-4 mr-2" /> Rút tiền
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-0">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Đánh giá gần đây
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentReviews.map((r, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                        {r.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-gray-900">{r.name}</div>
                        <Badge className="bg-yellow-100 text-yellow-800">{r.rating}/5</Badge>
                      </div>
                      <div className="text-sm text-gray-700">{r.text}</div>
                      <div className="text-xs text-gray-500 mt-1">{r.ago}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            
          </div>
        </div>

        {/* Thống kê chi tiết */}
        <Card className="shadow-sm border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Thống kê chi tiết
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="hours">
              <TabsList className="mb-4">
                <TabsTrigger value="hours">Giờ dạy</TabsTrigger>
                <TabsTrigger value="earnings">Doanh thu</TabsTrigger>
                <TabsTrigger value="retention">Tái đăng ký</TabsTrigger>
              </TabsList>
              <TabsContent value="hours" className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <StatTile title="Tổng giờ (tháng)" value="42h" />
                  <StatTile title="Trung bình/buổi" value="1.8h" />
                  <StatTile title="Buổi trong tuần" value="12" />
                </div>
              </TabsContent>
              <TabsContent value="earnings" className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <StatTile title="Doanh thu (tháng)" value="12.500.000₫" />
                  <StatTile title="Giá TB/giờ" value="180.000₫" />
                  <StatTile title="Mục tiêu" value="17.000.000₫" />
                </div>
              </TabsContent>
              <TabsContent value="retention" className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <StatTile title="Tái đăng ký" value="86%" />
                  <StatTile title="Đánh giá TB" value="4.9/5" />
                  <StatTile title="Hủy buổi" value="1%" />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>

      {/* Modals */}
      <ScheduleSetupModal isOpen={isScheduleSetupOpen} onClose={() => setIsScheduleSetupOpen(false)} />
      <StatisticsModal isOpen={isStatisticsOpen} onClose={() => setIsStatisticsOpen(false)} />
      <WithdrawModal
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
        availableBalance={1250000}
        bankInfo={{
          accountName: user?.fullName || user?.username || "",
          accountNumber: "0123456789",
          bankName: "Vietcombank",
          bankBranch: "CN Cầu Giấy",
          nationalIdNumber: "012345678901",
        }}
        onSuccess={() => setIsWithdrawOpen(false)}
      />
    </div>
  );
}

function StatTile({ title, value }: { title: string; value: string }) {
  return (
    <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
      <div className="text-sm text-gray-600">{title}</div>
      <div className="text-xl font-bold text-gray-900">{value}</div>
    </div>
  );
}
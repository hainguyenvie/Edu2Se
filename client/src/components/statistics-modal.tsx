import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Clock, 
  DollarSign, 
  Star, 
  Calendar,
  BookOpen,
  MessageCircle,
  Target,
  Award,
  X
} from "lucide-react";

interface StatisticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MOCK_STATS = {
  overview: {
    totalEarnings: 15750000,
    totalHours: 245,
    totalStudents: 48,
    averageRating: 4.8,
    responseRate: 95,
    completionRate: 92
  },
  monthly: {
    earnings: [
      { month: 'T1', amount: 2500000 },
      { month: 'T2', amount: 3200000 },
      { month: 'T3', amount: 2800000 },
      { month: 'T4', amount: 3500000 },
      { month: 'T5', amount: 3750000 }
    ],
    hours: [
      { month: 'T1', hours: 38 },
      { month: 'T2', hours: 52 },
      { month: 'T3', hours: 45 },
      { month: 'T4', hours: 58 },
      { month: 'T5', hours: 52 }
    ]
  },
  subjects: [
    { name: 'Toán', students: 28, hours: 156, earnings: 9360000 },
    { name: 'Lý', students: 15, hours: 89, earnings: 5340000 },
    { name: 'Hóa', students: 5, hours: 0, earnings: 0 }
  ],
  recentBookings: [
    { student: 'Nguyễn Minh An', subject: 'Toán', date: '2025-01-27', time: '19:00', status: 'confirmed' },
    { student: 'Trần Thị Bảo', subject: 'Lý', date: '2025-01-27', time: '20:00', status: 'pending' },
    { student: 'Lê Văn Chính', subject: 'Toán', date: '2025-01-28', time: '18:00', status: 'confirmed' },
    { student: 'Phạm Thị Dung', subject: 'Lý', date: '2025-01-28', time: '19:30', status: 'completed' }
  ],
  reviews: [
    { student: 'Nguyễn Minh An', rating: 5, comment: 'Thầy dạy rất hay và dễ hiểu!', date: '2025-01-25' },
    { student: 'Trần Thị Bảo', rating: 5, comment: 'Giải thích chi tiết, tận tâm', date: '2025-01-23' },
    { student: 'Lê Văn Chính', rating: 4, comment: 'Phương pháp dạy tốt', date: '2025-01-20' }
  ]
};

export default function StatisticsModal({ isOpen, onClose }: StatisticsModalProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [activeTab, setActiveTab] = useState('overview');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Đã xác nhận';
      case 'pending': return 'Chờ xác nhận';
      case 'completed': return 'Hoàn thành';
      case 'cancelled': return 'Đã hủy';
      default: return status;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Thống Kê Chi Tiết</span>
          </DialogTitle>
          <DialogDescription>
            Xem chi tiết thống kê dạy học và thu nhập của bạn
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-6">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">7 ngày qua</SelectItem>
                <SelectItem value="month">30 ngày qua</SelectItem>
                <SelectItem value="quarter">3 tháng qua</SelectItem>
                <SelectItem value="year">12 tháng qua</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Tổng quan</TabsTrigger>
              <TabsTrigger value="earnings">Thu nhập</TabsTrigger>
              <TabsTrigger value="students">Học sinh</TabsTrigger>
              <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <DollarSign className="h-4 w-4 mr-1 text-green-500" />
                      Thu nhập
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold text-green-600">
                      {formatCurrency(MOCK_STATS.overview.totalEarnings)}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +12% so với tháng trước
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-blue-500" />
                      Giờ dạy
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">{MOCK_STATS.overview.totalHours}h</div>
                    <div className="text-xs text-gray-500">Trung bình 49h/tháng</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <Users className="h-4 w-4 mr-1 text-purple-500" />
                      Học sinh
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">{MOCK_STATS.overview.totalStudents}</div>
                    <div className="text-xs text-gray-500">+8 học sinh mới</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-500" />
                      Đánh giá
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">{MOCK_STATS.overview.averageRating}/5</div>
                    <div className="text-xs text-gray-500">Từ 156 đánh giá</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <MessageCircle className="h-4 w-4 mr-1 text-orange-500" />
                      Phản hồi
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">{MOCK_STATS.overview.responseRate}%</div>
                    <div className="text-xs text-gray-500">Tỷ lệ phản hồi tin nhắn</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <Target className="h-4 w-4 mr-1 text-red-500" />
                      Hoàn thành
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">{MOCK_STATS.overview.completionRate}%</div>
                    <div className="text-xs text-gray-500">Tỷ lệ hoàn thành lớp</div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2" />
                      Lịch dạy gần đây
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {MOCK_STATS.recentBookings.map((booking, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium">{booking.student}</div>
                            <div className="text-sm text-gray-600">{booking.subject} - {booking.date} {booking.time}</div>
                          </div>
                          <Badge className={getStatusColor(booking.status)}>
                            {getStatusText(booking.status)}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BookOpen className="h-5 w-5 mr-2" />
                      Thống kê môn học
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {MOCK_STATS.subjects.map((subject, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{subject.name}</span>
                            <span className="text-sm text-gray-600">{subject.students} học sinh</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">{subject.hours}h dạy</span>
                            <span className="font-medium text-green-600">{formatCurrency(subject.earnings)}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${(subject.hours / MOCK_STATS.overview.totalHours) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="earnings" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Biểu đồ thu nhập theo tháng</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {MOCK_STATS.monthly.earnings.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-12 text-sm font-medium">{item.month}</div>
                        <div className="flex-1">
                          <div className="w-full bg-gray-200 rounded-full h-6">
                            <div 
                              className="bg-green-500 h-6 rounded-full flex items-center justify-end pr-2" 
                              style={{ width: `${(item.amount / 4000000) * 100}%` }}
                            >
                              <span className="text-white text-xs font-medium">
                                {formatCurrency(item.amount)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="students" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Giờ dạy theo tháng</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {MOCK_STATS.monthly.hours.map((item, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <div className="w-12 text-sm font-medium">{item.month}</div>
                          <div className="flex-1">
                            <div className="w-full bg-gray-200 rounded-full h-4">
                              <div 
                                className="bg-blue-500 h-4 rounded-full flex items-center justify-end pr-2" 
                                style={{ width: `${(item.hours / 60) * 100}%` }}
                              >
                                <span className="text-white text-xs font-medium">{item.hours}h</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top học sinh</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {['Nguyễn Minh An', 'Trần Thị Bảo', 'Lê Văn Chính', 'Phạm Thị Dung'].map((student, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                              {index + 1}
                            </div>
                            <span className="font-medium">{student}</span>
                          </div>
                          <span className="text-sm text-gray-600">{15 - index * 2}h</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="h-5 w-5 mr-2" />
                    Đánh giá gần đây
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {MOCK_STATS.reviews.map((review, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="font-medium">{review.student}</div>
                            <div className="flex items-center space-x-2">
                              <div className="flex text-yellow-400">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating ? 'fill-current' : ''
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-600">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex justify-end mt-6">
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-1" />
            Đóng
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
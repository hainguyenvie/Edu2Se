import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, FileText, Users, ChevronLeft, ChevronRight, X, BookOpen, DollarSign, TrendingUp, Trophy, Medal, Star, CheckCircle } from "lucide-react";
import Header from "@/components/header";
import MeetingRoomModal from "@/features/meeting-room/components/meeting-room-modal";
import { useAuth } from "@/contexts/auth-context";

export default function Dashboard() {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedCalendarDay, setSelectedCalendarDay] = useState<Date>(new Date());
  const [isMeetingRoomOpen, setIsMeetingRoomOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [activeStatIndex, setActiveStatIndex] = useState(0);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("0");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Mock data for dashboard
  const stats = [
    { title: "Lớp Học Đã Tham Gia", count: 5, icon: "📚", color: "bg-blue-100" },
    { title: "Giờ Đã Học", count: "16h", icon: "🕐", color: "bg-purple-100" },
    { title: "Tiền đã học", count: 17, icon: "💰", color: "bg-green-100" },
    { title: "Tỉ lệ hoàn thành", count: "100%", icon: "📊", color: "bg-orange-100" }
  ];

  const upcomingClasses = [
    { subject: "Math 12 - Mrs. Huyen", time: "Mon Weekly", id: 1 },
    { subject: "Physics 12 - Mrs. Huyen", time: "Wed Weekly", id: 2 },
    { subject: "Chem 12 - Mrs. Huyen", time: "Sun Weekly", id: 3 },
    { subject: "EXC102 - Mrs. Huyen", time: "15th August", id: 4 }
  ];

  const friends = [
    { name: "Luu Quynh Chi", status: "online", avatar: "👩" },
    { name: "Luu Quynh Chi", status: "offline", avatar: "👩" }
  ];

  // Calendar generation
  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  const calendarDays = generateCalendar();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dayNames = ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"];

  // Helpers for per-day schedules
  const formatKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const buildMonthSchedule = (base: Date) => {
    const y = base.getFullYear();
    const m = base.getMonth();
    const key = (d: number) => `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    return {
      [key(2)]: [
        { subject: "Toán 12 - Cô Huyền", time: "19:00 - 21:00", tutor: "Cô Huyền" },
      ],
      [key(7)]: [
        { subject: "Vật lý 12 - Thầy Nam", time: "20:00 - 21:30", tutor: "Thầy Nam" },
      ],
      [key(12)]: [
        { subject: "Hóa học 12 - Cô Linh", time: "15:00 - 17:00", tutor: "Cô Linh" },
      ],
      [key(18)]: [
        { subject: "Toán 12 - Cô Huyền", time: "19:00 - 21:00", tutor: "Cô Huyền" },
        { subject: "Vật lý 12 - Thầy Nam", time: "21:15 - 22:00", tutor: "Thầy Nam" },
      ],
      [key(25)]: [
        { subject: "Ôn thi - Cô Mai", time: "09:00 - 11:00", tutor: "Cô Mai" },
      ],
    } as Record<string, { subject: string; time: string; tutor: string }[]>;
  };
  const scheduleByDate = buildMonthSchedule(currentDate);
  const selectedKey = formatKey(selectedCalendarDay);
  const selectedDayClasses = scheduleByDate[selectedKey] || [];

  // Status helpers
  const isSameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString();
  const parseRange = (date: Date, range: string) => {
    // expects "HH:MM - HH:MM"
    const [startStr, endStr] = range.split("-").map(s => s.trim());
    const [sh, sm] = startStr.split(":").map(Number);
    const [eh, em] = endStr.split(":").map(Number);
    const start = new Date(date.getFullYear(), date.getMonth(), date.getDate(), sh, sm || 0, 0, 0);
    const end = new Date(date.getFullYear(), date.getMonth(), date.getDate(), eh, em || 0, 0, 0);
    return { start, end };
  };
  const getStatus = (date: Date, timeRange: string): "ongoing" | "upcoming" | "finished" => {
    const now = new Date();
    if (isSameDay(date, now)) {
      const { start, end } = parseRange(date, timeRange);
      if (now < start) return "upcoming";
      if (now > end) return "finished";
      return "ongoing";
    }
    return date > now ? "upcoming" : "finished";
  };
  const getStatusBadge = (status: "ongoing" | "upcoming" | "finished") => {
    switch (status) {
      case "ongoing":
        return "bg-red-100 text-red-700";
      case "upcoming":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const navigateMonth = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
    // Keep selected day inside the newly navigated month if needed
    const adjustedSelected = new Date(newDate.getFullYear(), newDate.getMonth(), Math.min(selectedCalendarDay.getDate(), new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate()));
    setSelectedCalendarDay(adjustedSelected);
  };

  const handleJoinMeeting = (classInfo: any) => {
    setSelectedClass(classInfo);
    setIsMeetingRoomOpen(true);
  };

  const handleStatClick = (index: number) => {
    setActiveStatIndex(index);
  };

  const handleDetailClick = (index: number) => {
    setActiveTab(index.toString());
    setIsDetailModalOpen(true);
  };

  // Auto-rotate stats every 5 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveStatIndex(prev => (prev + 1) % stats.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [stats.length]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onToggleSidebar={toggleSidebar} />
      
      <div className="container mx-auto px-6 py-8 pt-24">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bảng điều khiển của tôi</h1>
          <p className="text-gray-600">Chào {user?.fullName || user?.username || "bạn"}! Đây là không gian học tập của riêng bạn.</p>
        </div>

        {/* Thành tích của tôi - Gamification */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <Medal className="w-4 h-4 text-yellow-600" /> Hạng hiện tại
              </div>
              <div className="text-2xl font-bold text-gray-900">Top 35 • Bộ môn Toán</div>
              <div className="text-xs text-gray-500">Bảng xếp hạng học viên</div>
              <div className="mt-3">
                <Button variant="ghost" className="text-blue-600 px-0" asChild>
                  <a href="/ranking">Xem bảng xếp hạng →</a>
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <Trophy className="w-4 h-4 text-amber-600" /> Điểm thành tích
              </div>
              <div className="text-2xl font-bold text-gray-900">890 điểm</div>
              <div className="mt-3">
                <div className="text-xs text-gray-600 mb-1">Tiến tới huy hiệu Bạc</div>
                <div className="w-full h-2 bg-gray-200 rounded">
                  <div className="h-2 bg-amber-500 rounded" style={{ width: "62%" }} />
                </div>
                <div className="text-[11px] text-gray-500 mt-1">Còn 38% để nâng hạng</div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <Star className="w-4 h-4 text-blue-600" /> Huy hiệu của tôi
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-blue-100 text-blue-800">Chăm chỉ</Badge>
                <Badge className="bg-green-100 text-green-800">Điểm cao</Badge>
                <Badge className="bg-purple-100 text-purple-800">Tích cực</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className={`
                relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer
                ${activeStatIndex === index ? 'ring-2 ring-blue-500 transform scale-105' : ''}
              `}
              onClick={() => handleStatClick(index)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`
                        w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center shadow-sm
                        transition-transform duration-300 ${activeStatIndex === index ? 'rotate-12' : ''}
                      `}>
                        <span className="text-2xl">{stat.icon}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900 transition-all duration-300">
                          {stat.count}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`
                    w-full mt-3 font-medium transition-all duration-300
                    ${activeStatIndex === index ? 'text-white bg-blue-600' : 'text-blue-600 hover:bg-blue-50'}
                  `}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDetailClick(index);
                  }}
                >
                  Chi Tiết →
                </Button>
                
                {/* Animated decorative gradient */}
                <div className={`
                  absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent rounded-bl-3xl
                  transition-opacity duration-300 ${activeStatIndex === index ? 'opacity-100' : 'opacity-50'}
                `}></div>
                
                {/* Active indicator */}
                {activeStatIndex === index && (
                  <div className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Calendar */}
          <Card className="lg:col-span-1 shadow-lg border-0">
            <CardContent className="p-6">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
                  📅 Lịch học của tôi
                </h3>
                
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-4">
                  <Button variant="ghost" size="icon" onClick={() => navigateMonth(-1)}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="font-medium">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </span>
                  <Button variant="ghost" size="icon" onClick={() => navigateMonth(1)}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {dayNames.map(day => (
                    <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      className={`
                        h-8 text-xs
                        ${!isCurrentMonth(day) ? 'text-gray-300' : 'text-gray-700'}
                        ${isToday(day) ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
                        ${scheduleByDate[formatKey(day)] && isCurrentMonth(day) ? 'border border-green-300 bg-green-50 text-green-700' : ''}
                        ${selectedCalendarDay.toDateString() === day.toDateString() ? 'ring-2 ring-blue-500' : ''}
                      `}
                      onClick={() => setSelectedCalendarDay(day)}
                    >
                      {day.getDate()}
                    </Button>
                  ))}
                </div>

                {/* Day Schedule Info */}
                <div className="mt-6 bg-blue-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-blue-800">{selectedCalendarDay.toLocaleDateString('vi-VN')}</span>
                    {selectedDayClasses.length > 0 && (
                      <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">{selectedDayClasses.length} buổi học</span>
                    )}
                  </div>
                  {selectedDayClasses.length > 0 ? (
                    <div className="space-y-3">
                      {selectedDayClasses.map((cls, idx) => {
                        const status = getStatus(selectedCalendarDay, cls.time);
                        return (
                          <div key={idx} className={`bg-white rounded-lg p-3 border ${status === 'ongoing' ? 'border-red-200 ring-1 ring-red-200' : 'border-blue-100'}`}>
                            <div className="flex items-center justify-between mb-1">
                              <div className="text-sm font-semibold text-gray-900">{cls.subject}</div>
                              <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${getStatusBadge(status)}`}>
                                {status === 'ongoing' ? 'Đang diễn ra' : status === 'upcoming' ? 'Sắp diễn ra' : 'Đã kết thúc'}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600">{cls.time}</div>
                            <div className="text-xs text-gray-500">👩‍🏫 {cls.tutor}</div>
                            <Button 
                              size="sm"
                              className={`w-full mt-2 shadow-sm ${status === 'ongoing' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                              onClick={() => handleJoinMeeting({
                                name: cls.subject,
                                subject: cls.subject,
                                tutor: cls.tutor,
                                time: cls.time,
                                duration: '2h'
                              })}
                            >
                              {status === 'ongoing' ? 'Vào lớp ngay' : 'Tham gia Meet'}
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-600">Không có buổi học nào trong ngày này.</div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lớp học của tôi */}
          <Card className="lg:col-span-1 shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  📚 Lớp học của tôi
                </h3>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50 font-medium">
                    View All →
                  </Button>
                  <Button variant="outline" size="sm" className="font-medium" asChild>
                    <a href="/profile/student/minh-anh">Xem trang công khai</a>
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                {upcomingClasses.map((cls, index) => (
                  <div key={cls.id} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-gray-900 mb-1">{cls.subject}</div>
                        <div className="text-xs text-gray-500 flex items-center">
                          🕒 {cls.time}
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        className="ml-3 bg-green-600 hover:bg-green-700 text-white shadow-sm"
                        onClick={() => handleJoinMeeting({
                          name: cls.subject,
                          subject: cls.subject,
                          tutor: "Mrs. Huyen",
                          time: cls.time,
                          duration: "2h"
                        })}
                      >
                        🚀 Join
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Live Session removed as requested */}
            </CardContent>
          </Card>

          {/* Bạn bè & Hội nhóm của tôi */}
          <Card className="lg:col-span-1 shadow-lg border-0">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                👥 Bạn bè & Hội nhóm của tôi
              </h3>
              
              <div className="space-y-4">
                {friends.map((friend, index) => (
                  <div key={index} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-all duration-200">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-sm">
                          <span className="text-xl text-white">{friend.avatar}</span>
                        </div>
                        <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white ${
                          friend.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                        }`}></div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-gray-900">{friend.name}</div>
                        <div className={`text-xs font-medium ${
                          friend.status === 'online' ? 'text-green-600' : 'text-gray-500'
                        }`}>
                          {friend.status === 'online' ? '🟢 Online' : '⚫ Offline'}
                        </div>
                      </div>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                        💬 Chat
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Study Group Section */}
              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-100">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  📖 Nhóm học tập
                </h4>
                <div className="bg-white rounded-lg p-3 mb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-900">Math Study Group</div>
                      <div className="text-xs text-gray-600">5 thành viên đang hoạt động</div>
                    </div>
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white"></div>
                      <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                      <div className="w-6 h-6 bg-purple-500 rounded-full border-2 border-white"></div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    🚀 Tham gia học nhóm
                  </Button>
                  <Button size="sm" variant="outline">
                    ➕ Tạo nhóm mới
                  </Button>
                </div>
              </div>

              <div className="mt-6">
                <Button variant="ghost" className="w-full text-blue-600 hover:bg-blue-50 font-medium">
                  Xem tất cả bạn bè →
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Meeting Room Modal */}
      {selectedClass && (
        <MeetingRoomModal 
          isOpen={isMeetingRoomOpen}
          onClose={() => {
            setIsMeetingRoomOpen(false);
            setSelectedClass(null);
          }}
          classInfo={selectedClass}
        />
      )}

      {/* Detailed Statistics Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">
              📊 Chi Tiết Thống Kê Học Tập
            </DialogTitle>
          </DialogHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="0" className="flex items-center space-x-2">
                <span>📚</span>
                <span className="hidden sm:inline">Lớp Học</span>
              </TabsTrigger>
              <TabsTrigger value="1" className="flex items-center space-x-2">
                <span>🕐</span>
                <span className="hidden sm:inline">Giờ Học</span>
              </TabsTrigger>
              <TabsTrigger value="2" className="flex items-center space-x-2">
                <span>💰</span>
                <span className="hidden sm:inline">Chi Phí</span>
              </TabsTrigger>
              <TabsTrigger value="3" className="flex items-center space-x-2">
                <span>📊</span>
                <span className="hidden sm:inline">Hoàn Thành</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="0" className="space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl">📚</span>
                <h2 className="text-lg font-semibold">Lớp Học Đã Tham Gia</h2>
              </div>
              {/* Lớp Học Đã Tham Gia Details */}
              <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-3">Thống kê tổng quan</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Tổng lớp học:</span>
                              <span className="font-semibold">5 lớp</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Đang học:</span>
                              <span className="font-semibold text-green-600">3 lớp</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Đã hoàn thành:</span>
                              <span className="font-semibold text-blue-600">2 lớp</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-3">Môn học</h3>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Toán học</span>
                              <Badge className="bg-blue-100 text-blue-800">2 lớp</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Vật lý</span>
                              <Badge className="bg-purple-100 text-purple-800">2 lớp</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Hóa học</span>
                              <Badge className="bg-green-100 text-green-800">1 lớp</Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-3">Danh sách lớp học</h3>
                        <div className="space-y-3">
                          {[
                            { name: "Toán 12 - Cô Huyền", status: "Đang học", progress: 75, nextClass: "Thứ 2, 19:00" },
                            { name: "Vật lý 12 - Thầy Nam", status: "Đang học", progress: 60, nextClass: "Thứ 4, 20:00" },
                            { name: "Hóa học 12 - Cô Linh", status: "Đang học", progress: 45, nextClass: "Chủ nhật, 15:00" },
                            { name: "Toán 11 - Cô Mai", status: "Hoàn thành", progress: 100, nextClass: "-" },
                            { name: "Vật lý 11 - Thầy Đức", status: "Hoàn thành", progress: 100, nextClass: "-" }
                          ].map((course, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex-1">
                                <div className="font-medium text-gray-900">{course.name}</div>
                                <div className="text-sm text-gray-600">Buổi học tiếp theo: {course.nextClass}</div>
                              </div>
                              <div className="text-right">
                                <Badge className={course.status === "Đang học" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}>
                                  {course.status}
                                </Badge>
                                <div className="text-sm text-gray-600 mt-1">{course.progress}%</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
            </TabsContent>

            <TabsContent value="1" className="space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl">🕐</span>
                <h2 className="text-lg font-semibold">Giờ Đã Học</h2>
              </div>
              {/* Giờ Đã Học Details */}
              <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-blue-600 mb-1">16</div>
                          <div className="text-sm text-gray-600">Tổng giờ học</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-green-600 mb-1">12</div>
                          <div className="text-sm text-gray-600">Giờ học tuần này</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-purple-600 mb-1">4</div>
                          <div className="text-sm text-gray-600">Giờ học hôm nay</div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-3">Lịch sử học tập</h3>
                        <div className="space-y-3">
                          {[
                            { date: "08/01/2025", subject: "Toán 12", duration: "2h", time: "19:00-21:00" },
                            { date: "06/01/2025", subject: "Vật lý 12", duration: "1.5h", time: "20:00-21:30" },
                            { date: "05/01/2025", subject: "Hóa học 12", duration: "2h", time: "15:00-17:00" },
                            { date: "03/01/2025", subject: "Toán 12", duration: "2h", time: "19:00-21:00" },
                            { date: "01/01/2025", subject: "Vật lý 12", duration: "1.5h", time: "20:00-21:30" }
                          ].map((session, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex-1">
                                <div className="font-medium text-gray-900">{session.subject}</div>
                                <div className="text-sm text-gray-600">{session.date} • {session.time}</div>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold text-blue-600">{session.duration}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
            </TabsContent>

            <TabsContent value="2" className="space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl">💰</span>
                <h2 className="text-lg font-semibold">Tiền Đã Học</h2>
              </div>
              {/* Tiền đã học Details */}
              <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-3">Thống kê chi phí</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Tổng đã thanh toán:</span>
                              <span className="font-semibold text-green-600">17,000,000₫</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Chi phí tháng này:</span>
                              <span className="font-semibold">4,500,000₫</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Trung bình/giờ:</span>
                              <span className="font-semibold">1,062,500₫</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-3">Phân bổ theo môn</h3>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Toán học</span>
                              <span className="font-semibold">8,000,000₫</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Vật lý</span>
                              <span className="font-semibold">6,000,000₫</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Hóa học</span>
                              <span className="font-semibold">3,000,000₫</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-3">Lịch sử thanh toán</h3>
                        <div className="space-y-3">
                          {[
                            { date: "01/01/2025", description: "Học phí tháng 1 - Toán 12", amount: "2,000,000₫", status: "Đã thanh toán" },
                            { date: "01/01/2025", description: "Học phí tháng 1 - Vật lý 12", amount: "1,500,000₫", status: "Đã thanh toán" },
                            { date: "01/01/2025", description: "Học phí tháng 1 - Hóa học 12", amount: "1,000,000₫", status: "Đã thanh toán" },
                            { date: "01/12/2024", description: "Học phí tháng 12 - Toán 12", amount: "2,000,000₫", status: "Đã thanh toán" },
                            { date: "01/12/2024", description: "Học phí tháng 12 - Vật lý 12", amount: "1,500,000₫", status: "Đã thanh toán" }
                          ].map((payment, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex-1">
                                <div className="font-medium text-gray-900">{payment.description}</div>
                                <div className="text-sm text-gray-600">{payment.date}</div>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold text-green-600">{payment.amount}</div>
                                <Badge className="bg-green-100 text-green-800 text-xs">{payment.status}</Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
            </TabsContent>

            <TabsContent value="3" className="space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl">📊</span>
                <h2 className="text-lg font-semibold">Tỉ Lệ Hoàn Thành</h2>
              </div>
              {/* Tỉ lệ hoàn thành Details */}
              <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-green-600 mb-1">100%</div>
                          <div className="text-sm text-gray-600">Tỉ lệ hoàn thành tổng</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-blue-600 mb-1">95%</div>
                          <div className="text-sm text-gray-600">Hoàn thành bài tập</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-purple-600 mb-1">98%</div>
                          <div className="text-sm text-gray-600">Tham gia lớp học</div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-3">Chi tiết theo môn học</h3>
                        <div className="space-y-4">
                          {[
                            { subject: "Toán 12", completion: 100, assignments: "24/24", attendance: "16/16", grade: "A+" },
                            { subject: "Vật lý 12", completion: 95, assignments: "19/20", attendance: "15/16", grade: "A" },
                            { subject: "Hóa học 12", completion: 90, assignments: "18/20", attendance: "14/15", grade: "A-" },
                            { subject: "Toán 11 (Hoàn thành)", completion: 100, assignments: "30/30", attendance: "24/24", grade: "A+" },
                            { subject: "Vật lý 11 (Hoàn thành)", completion: 98, assignments: "29/30", attendance: "23/24", grade: "A" }
                          ].map((course, idx) => (
                            <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <div className="font-medium text-gray-900">{course.subject}</div>
                                <Badge className={course.completion >= 95 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                                  {course.grade}
                                </Badge>
                              </div>
                              <div className="grid grid-cols-3 gap-4 text-sm">
                                <div>
                                  <div className="text-gray-600">Hoàn thành</div>
                                  <div className="font-semibold text-green-600">{course.completion}%</div>
                                </div>
                                <div>
                                  <div className="text-gray-600">Bài tập</div>
                                  <div className="font-semibold">{course.assignments}</div>
                                </div>
                                <div>
                                  <div className="text-gray-600">Tham gia</div>
                                  <div className="font-semibold">{course.attendance}</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
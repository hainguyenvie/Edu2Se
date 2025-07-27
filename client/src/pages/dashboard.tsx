import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, FileText, Users, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/header";
import MeetingRoomModal from "@/features/meeting-room/components/meeting-room-modal";

export default function Dashboard() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isMeetingRoomOpen, setIsMeetingRoomOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  
  // Mock data for dashboard
  const stats = [
    { title: "Lớp Học Đã Tham Gia", count: 5, icon: "📚", color: "bg-blue-100" },
    { title: "Giờ Đã Học", count: "16h", icon: "🕐", color: "bg-purple-100" },
    { title: "Chỉ Chú Đã Được Tạo", count: 17, icon: "📝", color: "bg-green-100" },
    { title: "Bài Tập Đã Hoàn Thành", count: 100, icon: "✅", color: "bg-orange-100" }
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
  };

  const handleJoinMeeting = (classInfo: any) => {
    setSelectedClass(classInfo);
    setIsMeetingRoomOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6 pt-20">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-4">
              <CardContent className="p-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                      <span className="text-xl">{stat.icon}</span>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{stat.count}</div>
                      <div className="text-xs text-gray-600">{stat.title}</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs">
                    Chi Tiết
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-4">Lịch Học</h3>
                
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
                        ${[0, 6, 13, 20, 27].includes(day.getDate()) && isCurrentMonth(day) ? 'bg-red-100 text-red-600' : ''}
                      `}
                    >
                      {day.getDate()}
                    </Button>
                  ))}
                </div>

                {/* Schedule Info */}
                <div className="mt-4 space-y-2">
                  <div className="text-sm">
                    <span className="text-gray-600">8:00 PM - 10:30 PM</span>
                  </div>
                  <div className="text-sm font-medium">Math 12 - Mrs. Huyen</div>
                  <div className="text-xs text-gray-500">Mentor: Mrs. Huyen</div>
                  <Button 
                    size="sm" 
                    className="w-full mt-3"
                    onClick={() => handleJoinMeeting({
                      name: "Math 12 - Mrs. Huyen",
                      subject: "Toán học lớp 12",
                      tutor: "Mrs. Huyen",
                      time: "8:00 PM - 10:30 PM",
                      duration: "2h 30m"
                    })}
                  >
                    Meet
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Middle Column - Upcoming Classes & Presentation */}
          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              {/* Upcoming Classes */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Class</h3>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {upcomingClasses.map((classItem) => (
                    <Card key={classItem.id} className="p-3 bg-gray-50">
                      <div className="text-sm font-medium mb-1">{classItem.subject}</div>
                      <div className="text-xs text-gray-600">{classItem.time}</div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Presentation Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Đang Diễn Ra</h3>
                <Card className="p-4 bg-blue-50 border-blue-200">
                  <div className="text-sm text-gray-600 mb-2">Name</div>
                  <div className="text-lg font-semibold mb-2">Sắp Diễn Ra</div>
                  <div className="text-sm text-gray-700 mb-3">Math 12 - Mrs. Huyen</div>
                  <Button 
                    size="sm" 
                    className="bg-blue-600 hover:bg-blue-700 text-white mb-2"
                    onClick={() => handleJoinMeeting({
                      name: "Sắp Diễn Ra",
                      subject: "Math 12 - Mrs. Huyen",
                      tutor: "Mrs. Huyen",
                      time: "Hiện tại",
                      duration: "2h"
                    })}
                  >
                    Meet
                  </Button>
                  <div className="text-xs text-gray-600">
                    Connecting in 5m
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Right Column - Friends */}
          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Bạn Bè</h3>
              
              <div className="space-y-4">
                {friends.map((friend, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-lg">{friend.avatar}</span>
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                          friend.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                        }`} />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{friend.name}</div>
                        <div className="text-xs text-gray-500 capitalize">{friend.status}</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-gray-400">
                      💬
                    </Button>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" size="sm" className="w-full mt-4">
                Xem tất cả bạn bè
              </Button>
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
    </div>
  );
}
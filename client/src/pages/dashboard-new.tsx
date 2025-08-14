import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Clock, 
  Users, 
  BookOpen, 
  DollarSign, 
  TrendingUp, 
  Trophy, 
  Medal, 
  Star, 
  CheckCircle,
  Heart,
  MessageCircle,
  UserPlus,
  BookmarkPlus,
  Video,
  Camera,
  FileText,
  CreditCard,
  HelpCircle,
  Settings
} from "lucide-react";
import Header from "@/components/header";
import { useAuth } from "@/contexts/auth-context";
import { Link } from "wouter";

export default function StudentDashboard() {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());

  // Mock data for social features
  const friends = [
    { id: 1, name: "Nguyễn Văn A", avatar: "/api/placeholder/32/32", status: "online", lastActive: "Đang học Toán" },
    { id: 2, name: "Trần Thị B", avatar: "/api/placeholder/32/32", status: "offline", lastActive: "2 giờ trước" },
    { id: 3, name: "Lê Văn C", avatar: "/api/placeholder/32/32", status: "online", lastActive: "Đang trong Study Room" },
  ];

  const studyGroups = [
    { id: 1, name: "Nhóm Toán 12A", members: 15, nextSession: "19:00 hôm nay", subject: "Đạo hàm" },
    { id: 2, name: "Luyện thi THPT QG", members: 8, nextSession: "20:00 mai", subject: "Ôn tập Lý" },
  ];

  const quickActions = [
    { icon: BookOpen, label: "Tìm gia sư", href: "/", color: "bg-blue-500" },
    { icon: Users, label: "Study Room", href: "/study-with-me", color: "bg-green-500" },
    { icon: HelpCircle, label: "Đặt câu hỏi", href: "/qa-forum", color: "bg-purple-500" },
    { icon: Video, label: "Ghi nhận học tập", href: "#", color: "bg-red-500" },
    { icon: CreditCard, label: "Nạp tiền", href: "#", color: "bg-yellow-500" },
    { icon: Settings, label: "Cài đặt", href: "/settings", color: "bg-gray-500" },
  ];

  const upcomingClasses = [
    {
      id: 1,
      subject: "Toán",
      tutor: "Thầy Minh",
      time: "19:00 - 20:30",
      date: "Hôm nay",
      type: "1-on-1",
      status: "confirmed"
    },
    {
      id: 2,
      subject: "Lý",
      tutor: "Cô Lan",
      time: "20:00 - 21:30",
      date: "Thứ 3",
      type: "Nhóm",
      status: "pending"
    },
  ];

  const myQuestions = [
    { id: 1, title: "Cách giải phương trình bậc 2 có nghiệm âm?", subject: "Toán", replies: 3, status: "answered" },
    { id: 2, title: "Định luật Newton áp dụng như thế nào?", subject: "Lý", replies: 1, status: "pending" },
  ];

  const favoriteContent = [
    { id: 1, type: "video", title: "Bài giảng đạo hàm cơ bản", tutor: "Thầy Minh", duration: "15:30" },
    { id: 2, type: "document", title: "Tóm tắt công thức Vật lý 12", tutor: "Cô Lan", pages: 12 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8 pt-24">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hồ sơ của tôi</h1>
          <p className="text-gray-600">Chào {user?.fullName || user?.username}! Đây là không gian học tập và giao lưu của bạn.</p>
        </div>

        {/* Gamification Banner */}
        <Card className="shadow-lg border-0 bg-gradient-to-r from-green-500 to-blue-600 text-white mb-8">
          <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Trophy className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Hạng #35 • Bộ môn Toán</h3>
                <p className="text-white/90">2,450 điểm • Chuỗi học 45 ngày</p>
                <div className="flex items-center mt-2 space-x-2">
                  <Badge className="bg-white/20 text-white border-0">Study Master</Badge>
                  <Badge className="bg-white/20 text-white border-0">Math Lover</Badge>
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
          {/* Left Column - Quick Actions & Schedule */}
          <div className="lg:col-span-1 space-y-6">
            {/* Shortcut Actions */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Shortcut Link
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                {quickActions.map((action, index) => (
                  <Link key={index} href={action.href}>
                    <Button variant="outline" className="h-16 flex flex-col gap-1 text-xs">
                      <action.icon className={`w-5 h-5 ${action.color.replace('bg-', 'text-')}`} />
                      {action.label}
                    </Button>
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Lịch học của tôi */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Lịch học của tôi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingClasses.map((class_, index) => (
                    <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-sm">{class_.subject}</h4>
                        <Badge variant={class_.status === 'confirmed' ? 'default' : 'secondary'} className="text-xs">
                          {class_.status === 'confirmed' ? 'Đã xác nhận' : 'Chờ xác nhận'}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600">{class_.tutor}</p>
                      <p className="text-xs text-gray-500">{class_.time} • {class_.date}</p>
                    </div>
                  ))}
                  <Link href="/dashboard">
                    <Button variant="ghost" className="w-full text-blue-600">
                      Xem tất cả lịch học →
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lớp học + Classes */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Lớp học của tôi
                  </span>
                  <Link href="/profile/student/minh-anh">
                    <Button variant="outline" size="sm">Xem trang công khai</Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="active" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="active">Đang học</TabsTrigger>
                    <TabsTrigger value="completed">Đã hoàn thành</TabsTrigger>
                    <TabsTrigger value="saved">Đã lưu</TabsTrigger>
                  </TabsList>
                  <TabsContent value="active" className="space-y-4">
                    {upcomingClasses.map((class_, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback>{class_.tutor[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-semibold">{class_.subject} với {class_.tutor}</h4>
                          <p className="text-sm text-gray-600">{class_.time} • {class_.type}</p>
                        </div>
                        <Button size="sm">Vào lớp</Button>
                      </div>
                    ))}
                  </TabsContent>
                  <TabsContent value="completed">
                    <p className="text-gray-500 text-center py-8">Chưa có lớp học nào hoàn thành</p>
                  </TabsContent>
                  <TabsContent value="saved">
                    <div className="space-y-4">
                      {favoriteContent.map((content, index) => (
                        <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                          <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                            {content.type === 'video' ? <Video className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">{content.title}</h4>
                            <p className="text-sm text-gray-600">
                              {content.tutor} • {content.type === 'video' ? content.duration : `${content.pages} trang`}
                            </p>
                          </div>
                          <Button size="sm" variant="outline">Xem</Button>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Câu hỏi của tôi (Forum) */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <HelpCircle className="w-5 h-5 mr-2" />
                    Câu hỏi của tôi (Trên Forum)
                  </span>
                  <Link href="/qa-forum">
                    <Button variant="outline" size="sm">Đặt câu hỏi mới</Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myQuestions.map((question, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-sm">{question.title}</h4>
                        <Badge variant={question.status === 'answered' ? 'default' : 'secondary'}>
                          {question.status === 'answered' ? 'Đã trả lời' : 'Chờ trả lời'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{question.subject}</span>
                        <span>{question.replies} phản hồi</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Social & Wallet */}
          <div className="lg:col-span-1 space-y-6">
            {/* Ví - Chỉ nạp */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Ví của tôi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-green-600">1,250,000₫</div>
                  <p className="text-sm text-gray-500">Số dư khả dụng</p>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700 mb-2">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Nạp tiền
                </Button>
                <Link href="/settings">
                  <Button variant="outline" className="w-full text-sm">
                    Xem lịch sử giao dịch →
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Bạn bè và Hội nhóm */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Bạn bè & Hội nhóm
                  </span>
                  <Button variant="ghost" size="sm">
                    <UserPlus className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Friends List */}
                <div className="space-y-3 mb-4">
                  <h4 className="font-semibold text-sm">Bạn bè ({friends.length})</h4>
                  {friends.map((friend) => (
                    <div key={friend.id} className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={friend.avatar} />
                          <AvatarFallback>{friend.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${
                          friend.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                        }`}></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{friend.name}</p>
                        <p className="text-xs text-gray-500 truncate">{friend.lastActive}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Study Groups */}
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-sm mb-3">Hội nhóm học tập</h4>
                  {studyGroups.map((group) => (
                    <div key={group.id} className="p-3 bg-blue-50 rounded-lg mb-3">
                      <h5 className="font-semibold text-sm">{group.name}</h5>
                      <p className="text-xs text-gray-600">{group.members} thành viên</p>
                      <p className="text-xs text-blue-600">{group.nextSession}</p>
                      <p className="text-xs text-gray-500">{group.subject}</p>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full text-sm">
                    Tham gia nhóm mới
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Thành viên yêu thích */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="w-5 h-5 mr-2" />
                  Yêu thích (Theo dõi)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>TM</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Thầy Minh</p>
                      <p className="text-xs text-gray-500">Toán • 4.9★</p>
                    </div>
                    <Button size="sm" variant="outline">Nhắn tin</Button>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>CL</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Cô Lan</p>
                      <p className="text-xs text-gray-500">Lý • 4.8★</p>
                    </div>
                    <Button size="sm" variant="outline">Nhắn tin</Button>
                  </div>
                </div>
                <Link href="/favorites">
                  <Button variant="ghost" className="w-full text-sm mt-3">
                    Xem tất cả →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

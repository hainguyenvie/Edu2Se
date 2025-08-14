import { useRoute } from "wouter";
import { useState } from "react";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
} from "lucide-react";

type DayName = "Thứ 2" | "Thứ 3" | "Thứ 4" | "Thứ 5" | "Thứ 6" | "Thứ 7" | "Chủ nhật";
type Slot = { time: string; status: "study" | "exam" | "break"; subject: string };

export default function StudentProfilePage() {
  const [match, params] = useRoute("/profile/student/:slug");
  const slug = params?.slug;
  const [selectedDay, setSelectedDay] = useState<DayName>("Thứ 2");

  if (!match) return null;

  const student = {
    id: "stu-1",
    name: slug?.replace(/-/g, " ") || "Nguyễn Minh Anh",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=200&h=200&fit=crop",
    school: "THPT Chu Văn An",
    grade: "Lớp 12",
    goals: "Đỗ ĐHBK Hà Nội - Khoa học máy tính. Nâng điểm Toán lên 9+.",
    subjects: ["Toán", "Lý", "Hóa"],
    about:
      "Học sinh lớp 12, đam mê khoa học. Phong cách học tập: ghi chú trực quan, giải đề đều đặn và học nhóm cuối tuần.",
    points: 2450,
    rank: "Top 1%",
    streakDays: 45,
  };

  const achievements = [
    { title: "Chuỗi học 45 ngày", color: "bg-blue-100 text-blue-800" },
    { title: "Hoàn thành 100+ bài tập khó", color: "bg-green-100 text-green-800" },
    { title: "Top 1% bảng xếp hạng", color: "bg-purple-100 text-purple-800" },
  ];

  const studyingSubjects = [
    { name: "TOÁN", progress: "80%" },
    { name: "LÝ", progress: "70%" },
    { name: "HÓA", progress: "60%" },
    { name: "TIẾNG ANH", progress: "75%" },
  ];

  const weeklySchedule: Record<DayName, Slot[]> = {
    "Thứ 2": [{ time: "19:00 - 21:00", status: "study", subject: "Toán" }],
    "Thứ 3": [{ time: "20:00 - 21:30", status: "study", subject: "Lý" }],
    "Thứ 4": [
      { time: "19:00 - 20:00", status: "study", subject: "Hóa" },
      { time: "20:30 - 21:30", status: "study", subject: "Toán" },
    ],
    "Thứ 5": [],
    "Thứ 6": [{ time: "19:30 - 21:00", status: "study", subject: "Tiếng Anh" }],
    "Thứ 7": [
      { time: "09:00 - 11:00", status: "study", subject: "Toán (Study with me)" },
      { time: "14:00 - 16:00", status: "study", subject: "Lý" },
    ],
    "Chủ nhật": [{ time: "15:00 - 17:00", status: "study", subject: "Ôn thi" }],
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-lg border-0">
              <CardContent className="p-6 text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src={student.avatar} alt={student.name} />
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {student.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>

                <h2 className="text-xl font-bold mb-1">{student.name}</h2>
                <div className="text-sm text-gray-600 mb-2">{student.school} • {student.grade}</div>

                <div className="flex justify-center gap-2 mb-3">
                  <Badge className="bg-green-500 text-white border-0 text-xs">
                    <Shield className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                  <Badge className="bg-blue-500 text-white border-0 text-xs">
                    <Star className="w-3 h-3 mr-1" /> Top Student
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <div className="text-xs text-gray-500">Điểm</div>
                    <div className="font-bold text-blue-600">{student.points.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Hạng</div>
                    <div className="font-bold text-purple-600">{student.rank}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Streak</div>
                    <div className="font-bold text-green-600">{student.streakDays}d</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Study Gallery */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-6 h-6 mr-3" />
                  Thư viện học tập
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=300&fit=crop",
                    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop", 
                    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=300&fit=crop",
                    "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=300&h=300&fit=crop"
                  ].map((src, i) => (
                    <div key={i} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                      <img
                        className="w-full h-full object-cover"
                        src={src}
                        alt={`Học tập ${i + 1}`}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://via.placeholder.com/300x300/f3f4f6/9ca3af?text=Study+${i + 1}`;
                        }}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-6 h-6 mr-3" />
                  Thống kê nhanh
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
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
                    <span className="text-sm">Nhóm đang tham gia</span>
                  </div>
                  <span className="font-bold text-blue-600">3</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Achievements */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-6 h-6 mr-3" />
                  Bảng thành tích
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {achievements.map((a, i) => (
                    <Card key={i} className={`p-4 text-center border-2 ${a.color}`}>
                      <div className="mb-2">
                        <Zap className="w-8 h-8 mx-auto text-current" />
                      </div>
                      <div className="text-sm font-semibold">{a.title}</div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Subjects in progress */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-6 h-6 mr-3" />
                  Môn học đang học
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {studyingSubjects.map((s, idx) => (
                    <Card key={idx} className="p-4 h-full border-gray-200 hover:shadow-lg transition-all duration-200">
                      <div className="text-center">
                        <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-gray-600" />
                        </div>
                        <div className="font-semibold text-xs mb-1 text-gray-800">{s.name}</div>
                        <div className="text-xs text-gray-600">Tiến độ: {s.progress}</div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                            style={{ width: s.progress }}
                          ></div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* About / Goals */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="w-6 h-6 mr-3" />
                  Mục tiêu & Phong cách học
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-line text-lg">{student.about}\n\nMục tiêu: {student.goals}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Actions & Weekly schedule */}
          <div className="lg:col-span-1 space-y-6">
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
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-6 h-6 mr-3" />
                  Lịch học tuần này
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
                      {weeklySchedule[selectedDay]?.length || 0} lớp học
                    </Badge>
                  </div>
                  
                  {weeklySchedule[selectedDay] && weeklySchedule[selectedDay].length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                      {weeklySchedule[selectedDay].map((slot: Slot, index: number) => (
                        <Card 
                          key={index} 
                          className={`p-4 transition-all duration-200 cursor-pointer ${
                            slot.status === 'study' ? 'bg-blue-50 border-blue-200 hover:bg-blue-100' : 
                            slot.status === 'exam' ? 'bg-red-50 border-red-200 hover:bg-red-100' :
                            'bg-green-50 border-green-200 hover:bg-green-100'
                          } hover:shadow-md`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-full ${
                              slot.status === 'study' ? 'bg-blue-100' : 
                              slot.status === 'exam' ? 'bg-red-100' :
                              'bg-green-100'
                            }`}>
                              <Clock className={`w-4 h-4 ${
                                slot.status === 'study' ? 'text-blue-600' : 
                                slot.status === 'exam' ? 'text-red-600' :
                                'text-green-600'
                              }`} />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-sm">{slot.time}</div>
                              <div className="text-xs text-gray-600">{slot.subject}</div>
                            </div>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                slot.status === 'study' ? 'border-blue-300 text-blue-700' : 
                                slot.status === 'exam' ? 'border-red-300 text-red-700' :
                                'border-green-300 text-green-700'
                              }`}
                            >
                              {slot.status === 'study' ? 'Học tập' : 
                               slot.status === 'exam' ? 'Thi/Kiểm tra' : 'Nghỉ'}
                            </Badge>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                      <p className="text-gray-500 font-medium">Không có lịch học</p>
                      <p className="text-sm text-gray-400">Bạn chưa có lớp học nào trong ngày này</p>
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
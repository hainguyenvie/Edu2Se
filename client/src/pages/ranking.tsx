import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Trophy, 
  Medal, 
  Award, 
  Star, 
  Clock, 
  BookOpen, 
  Users, 
  TrendingUp,
  Eye,
  Heart,
  MessageCircle
} from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/header";

interface StudentRanking {
  id: string;
  name: string;
  avatar: string;
  rank: number;
  points: number;
  studyHours: number;
  badges: string[];
  level: string;
  school?: string;
  profileSlug: string;
}

interface TutorRanking {
  id: string;
  name: string;
  avatar: string;
  rank: number;
  rating: number;
  teachingHours: number;
  completedSessions: number;
  subjects: string[];
  intro: string;
  profileSlug: string;
  isVerified: boolean;
}

export default function RankingPage() {
  const [activeTab, setActiveTab] = useState("students");

  // Mock data for student rankings
  const studentRankings: StudentRanking[] = [
    {
      id: "1",
      name: "Nguyễn Minh Anh",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop",
      rank: 1,
      points: 2450,
      studyHours: 124,
      badges: ["Study Streak", "Math Master", "Night Owl"],
      level: "Study Legend",
      school: "THPT Chu Văn An",
      profileSlug: "minh-anh"
    },
    {
      id: "2", 
      name: "Trần Hoàng Nam",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      rank: 2,
      points: 2280,
      studyHours: 98,
      badges: ["Physics Pro", "Team Player", "Early Bird"],
      level: "Study Master",
      school: "THPT Lê Quý Đôn",
      profileSlug: "hoang-nam"
    },
    {
      id: "3",
      name: "Lê Thu Hương",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
      rank: 3,
      points: 2150,
      studyHours: 89,
      badges: ["Literature Queen", "Consistent", "Mentor"],
      level: "Study Expert",
      school: "THPT Marie Curie",
      profileSlug: "thu-huong"
    },
    {
      id: "4",
      name: "Phạm Đức Minh",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      rank: 4,
      points: 1980,
      studyHours: 76,
      badges: ["Chemistry Wizard", "Focus Master"],
      level: "Study Pro",
      school: "THPT Nguyễn Huệ",
      profileSlug: "duc-minh"
    },
    {
      id: "5",
      name: "Võ Khánh Linh",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop",
      rank: 5,
      points: 1850,
      studyHours: 71,
      badges: ["Biology Expert", "Study Buddy"],
      level: "Study Ace",
      school: "THPT Trần Phú",
      profileSlug: "khanh-linh"
    }
  ];

  // Mock data for tutor rankings
  const tutorRankings: TutorRanking[] = [
    {
      id: "1",
      name: "Thầy Việt Hoàng",
      avatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=100&h=100&fit=crop",
      rank: 1,
      rating: 5.0,
      teachingHours: 890,
      completedSessions: 156,
      subjects: ["Toán", "Lý", "Hóa"],
      intro: "Tiến sĩ khoa học, chuyên gia luyện thi đại học với 10 năm kinh nghiệm",
      profileSlug: "viet-hoang",
      isVerified: true
    },
    {
      id: "2",
      name: "Cô Jennifer Smith",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
      rank: 2,
      rating: 4.9,
      teachingHours: 650,
      completedSessions: 89,
      subjects: ["Tiếng Anh"],
      intro: "Native English speaker từ Cambridge, chuyên IELTS và giao tiếp",
      profileSlug: "jennifer-smith",
      isVerified: true
    },
    {
      id: "3",
      name: "Thầy Đức Anh",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      rank: 3,
      rating: 4.9,
      teachingHours: 520,
      completedSessions: 78,
      subjects: ["Tiếng Anh"],
      intro: "IELTS 8.0, chuyên gia tiếng Anh với phương pháp dạy sáng tạo",
      profileSlug: "duc-anh",
      isVerified: true
    },
    {
      id: "4",
      name: "Cô Thanh Huyền", 
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop",
      rank: 4,
      rating: 4.8,
      teachingHours: 445,
      completedSessions: 52,
      subjects: ["Toán", "Lý"],
      intro: "Chuyên gia toán - lý tích hợp, đại học Bách Khoa",
      profileSlug: "thanh-huyen",
      isVerified: true
    },
    {
      id: "5",
      name: "Thầy Quang Minh",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      rank: 5,
      rating: 4.8,
      teachingHours: 380,
      completedSessions: 45,
      subjects: ["Hóa"],
      intro: "Chuyên gia hóa học, cử nhân y dược với nhiều năm kinh nghiệm",
      profileSlug: "quang-minh",
      isVerified: true
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-500">#{rank}</span>;
    }
  };

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return `#${rank}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            🏆 Bảng Xếp Hạng
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Khám phá những học sinh xuất sắc nhất và các gia sư hàng đầu trong cộng đồng AitheduConnect
          </p>
        </div>

        {/* Rankings Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-white border border-gray-200 rounded-xl p-1 h-auto">
            <TabsTrigger 
              value="students" 
              className="flex items-center justify-center gap-2 text-base py-4 px-6 rounded-lg transition-all duration-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-50"
            >
              <BookOpen className="w-5 h-5" />
              Học Sinh Xuất Sắc
            </TabsTrigger>
            <TabsTrigger 
              value="tutors"
              className="flex items-center justify-center gap-2 text-base py-4 px-6 rounded-lg transition-all duration-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-50"
            >
              <Users className="w-5 h-5" />
              Gia Sư Hàng Đầu
            </TabsTrigger>
          </TabsList>

          {/* Student Rankings */}
          <TabsContent value="students" className="space-y-4">
            <div className="grid gap-4">
              {studentRankings.map((student) => (
                <Card key={student.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-6">
                      {/* Rank & Avatar */}
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col items-center">
                          {getRankIcon(student.rank)}
                          <span className="text-xs font-medium text-gray-500 mt-1">
                            {getRankBadge(student.rank)}
                          </span>
                        </div>
                        <Avatar className="w-16 h-16 border-4 border-white shadow-lg">
                          <AvatarImage src={student.avatar} alt={student.name} />
                          <AvatarFallback>{student.name[0]}</AvatarFallback>
                        </Avatar>
                      </div>

                      {/* Student Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{student.name}</h3>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
                            {student.level}
                          </Badge>
                        </div>
                        
                        {student.school && (
                          <p className="text-sm text-gray-600 mb-2">🏫 {student.school}</p>
                        )}

                        <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4 text-green-500" />
                            <span className="font-semibold text-green-600">{student.points.toLocaleString()}</span>
                            <span>điểm</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-blue-500" />
                            <span className="font-semibold text-blue-600">{student.studyHours}</span>
                            <span>giờ học</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {student.badges.map((badge, index) => (
                            <Badge key={index} variant="outline" className="text-xs bg-gradient-to-r from-purple-100 to-blue-100 border-purple-200">
                              🏅 {badge}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="flex flex-col items-end gap-2">
                        <Link href={`/profile/student/${student.profileSlug}`}>
                          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6">
                            <Eye className="w-4 h-4 mr-2" />
                            Xem Profile
                          </Button>
                        </Link>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {Math.floor(Math.random() * 50) + 10}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" />
                            {Math.floor(Math.random() * 20) + 5}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tutor Rankings */}
          <TabsContent value="tutors" className="space-y-4">
            <div className="grid gap-4">
              {tutorRankings.map((tutor) => (
                <Card key={tutor.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-6">
                      {/* Rank & Avatar */}
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col items-center">
                          {getRankIcon(tutor.rank)}
                          <span className="text-xs font-medium text-gray-500 mt-1">
                            {getRankBadge(tutor.rank)}
                          </span>
                        </div>
                        <div className="relative">
                          <Avatar className="w-16 h-16 border-4 border-white shadow-lg">
                            <AvatarImage src={tutor.avatar} alt={tutor.name} />
                            <AvatarFallback>{tutor.name[0]}</AvatarFallback>
                          </Avatar>
                          {tutor.isVerified && (
                            <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white rounded-full p-1">
                              <Star className="w-3 h-3 fill-current" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Tutor Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{tutor.name}</h3>
                          {tutor.isVerified && (
                            <Badge className="bg-blue-600 text-white">
                              ✓ Verified
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-semibold text-yellow-600">{tutor.rating}</span>
                            <span>({tutor.completedSessions} đánh giá)</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-green-500" />
                            <span className="font-semibold text-green-600">{tutor.teachingHours}</span>
                            <span>giờ dạy</span>
                          </div>
                        </div>

                        <p className="text-sm text-gray-700 mb-3 line-clamp-2">{tutor.intro}</p>

                        <div className="flex flex-wrap gap-2">
                          {tutor.subjects.map((subject, index) => (
                            <Badge key={index} variant="outline" className="text-xs bg-gradient-to-r from-green-100 to-blue-100 border-green-200">
                              📚 {subject}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="flex flex-col items-end gap-2">
                        <Link href={`/profile/tutor/${tutor.profileSlug}`}>
                          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6">
                            <Eye className="w-4 h-4 mr-2" />
                            Xem Profile
                          </Button>
                        </Link>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {Math.floor(Math.random() * 100) + 20}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" />
                            {Math.floor(Math.random() * 50) + 10}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Bottom Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="text-3xl font-bold text-blue-600 mb-2">1,247</div>
            <div className="text-gray-600">Học sinh tham gia</div>
          </Card>
          <Card className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <div className="text-3xl font-bold text-purple-600 mb-2">89</div>
            <div className="text-gray-600">Gia sư đã xác thực</div>
          </Card>
          <Card className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="text-3xl font-bold text-green-600 mb-2">12,450</div>
            <div className="text-gray-600">Giờ học hoàn thành</div>
          </Card>
        </div>
      </div>
    </div>
  );
}
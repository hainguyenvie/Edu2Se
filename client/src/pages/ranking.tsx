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
  MessageCircle,
  CheckCircle,
  Calculator,
  Book,
  Languages,
  Zap,
  Beaker,
  Leaf,
  Globe,
  Info
} from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/header";

interface StudentRanking {
  id: string;
  name: string;
  avatar: string;
  rank: number;
  completionRate: number;
  studyHours: number;
  subjects: { name: string; hours: number }[];
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

export default function RankingPage() {
  const [activeTab, setActiveTab] = useState("tutors");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Mock data for student rankings
  const studentRankings: StudentRanking[] = [
    {
      id: "1",
      name: "Nguyễn Minh Anh",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop",
      rank: 1,
      completionRate: 98.5,
      studyHours: 124,
      subjects: [
        { name: "Toán", hours: 45 },
        { name: "Lý", hours: 38 },
        { name: "Hóa", hours: 41 }
      ],
      school: "THPT Chu Văn An",
      profileSlug: "minh-anh"
    },
    {
      id: "2", 
      name: "Trần Hoàng Nam",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      rank: 2,
      completionRate: 96.2,
      studyHours: 98,
      subjects: [
        { name: "Lý", hours: 42 },
        { name: "Hóa", hours: 35 },
        { name: "Sinh", hours: 21 }
      ],
      school: "THPT Lê Quý Đôn",
      profileSlug: "hoang-nam"
    },
    {
      id: "3",
      name: "Lê Thu Hương",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
      rank: 3,
      completionRate: 94.8,
      studyHours: 89,
      subjects: [
        { name: "Văn", hours: 38 },
        { name: "Anh", hours: 31 },
        { name: "Sử", hours: 20 }
      ],
      school: "THPT Marie Curie",
      profileSlug: "thu-huong"
    },
    {
      id: "4",
      name: "Phạm Đức Minh",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      rank: 4,
      completionRate: 92.3,
      studyHours: 76,
      subjects: [
        { name: "Hóa", hours: 42 },
        { name: "Sinh", hours: 34 }
      ],
      school: "THPT Nguyễn Huệ",
      profileSlug: "duc-minh"
    },
    {
      id: "5",
      name: "Võ Khánh Linh",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop",
      rank: 5,
      completionRate: 89.7,
      studyHours: 71,
      subjects: [
        { name: "Sinh", hours: 38 },
        { name: "Hóa", hours: 33 }
      ],
      school: "THPT Trần Phú",
      profileSlug: "khanh-linh"
    }
  ];

  // Mock data for tutor rankings
  const tutorRankings: TutorRanking[] = [
    {
      id: "24dd3973-3c7f-4cac-92a1-c59cae149cbb",
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
      id: "72fc434e-e191-4d0c-aeac-4199d12a057c",
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
      id: "8a9b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d",
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
      id: "1b2c3d4e-5f6a-7b8c-9d0e-1f2a3b4c5d6e",
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
      id: "2c3d4e5f-6a7b-8c9d-0e1f-2a3b4c5d6e7f",
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
      <Header onToggleSidebar={toggleSidebar} />
      <div className="container mx-auto px-4 py-8 pt-24 max-w-4xl">
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
              value="tutors"
              className="flex items-center justify-center gap-2 text-base py-4 px-6 rounded-lg transition-all duration-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-50"
            >
              <Users className="w-5 h-5" />
              Gia Sư Hàng Đầu
            </TabsTrigger>
            <TabsTrigger 
              value="students" 
              className="flex items-center justify-center gap-2 text-base py-4 px-6 rounded-lg transition-all duration-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-50"
            >
              <BookOpen className="w-5 h-5" />
              Học Sinh Xuất Sắc
            </TabsTrigger>
          </TabsList>

          {/* Ranking Criteria Info */}
          {activeTab === "tutors" && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-4 h-4 text-blue-600" />
                <h3 className="font-semibold text-blue-900">Tiêu chí xếp hạng gia sư</h3>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-blue-800">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Giờ dạy học: {tutorRankings[0]?.teachingHours || 0}+ giờ</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-current" />
                  <span>Đánh giá: {tutorRankings[0]?.rating || 0}/5.0</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>Số buổi dạy: {tutorRankings[0]?.completedSessions || 0}+ buổi</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "students" && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-4 h-4 text-green-600" />
                <h3 className="font-semibold text-green-900">Tiêu chí xếp hạng học sinh</h3>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-green-800">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Tỷ lệ hoàn thành: {studentRankings[0]?.completionRate || 0}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Giờ học: {studentRankings[0]?.studyHours || 0}+ giờ</span>
                </div>
              </div>
            </div>
          )}

          {/* Student Rankings */}
          <TabsContent value="students" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Học Sinh Xuất Sắc</h2>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  Xếp hạng theo tỷ lệ hoàn thành
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-blue-500" />
                  và giờ học
                </span>
              </div>
            </div>
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
                        </div>
                        
                        {student.school && (
                          <p className="text-sm text-gray-600 mb-2">🏫 {student.school}</p>
                        )}

                        <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4 text-green-500" />
                            <span className="font-semibold text-green-600">{student.completionRate}%</span>
                            <span>hoàn thành</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-blue-500" />
                            <span className="font-semibold text-blue-600">{student.studyHours}</span>
                            <span>giờ học</span>
                          </div>
                        </div>

                        {/* Ranking Score */}
                        <div className="mb-3">
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span className="font-medium">Điểm xếp hạng:</span>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="w-3 h-3 text-green-500" />
                              <span className="font-semibold text-green-600">{student.completionRate}</span>
                              <span>+</span>
                              <Clock className="w-3 h-3 text-blue-500" />
                              <span className="font-semibold text-blue-600">{student.studyHours}</span>
                              <span>=</span>
                              <span className="font-bold text-purple-600">{Math.round(student.completionRate * 0.8 + student.studyHours * 0.2)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {student.subjects.map((subject, index) => {
                            const SubjectIcon = getSubjectIcon(subject.name);
                            return (
                              <Badge key={index} variant="outline" className="text-xs bg-gray-100 border-gray-200 text-gray-700 flex items-center gap-1">
                                <SubjectIcon className="w-3 h-3" />
                                {subject.name} ({subject.hours}h)
                              </Badge>
                            );
                          })}
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="flex flex-col items-end gap-2">
                        <Button 
                          className="bg-gray-700 hover:bg-gray-800 text-white px-6"
                          onClick={() => {
                            // TODO: Open chat box for messaging
                            console.log(`Open chat with ${student.name}`);
                          }}
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Nhắn tin
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tutor Rankings */}
          <TabsContent value="tutors" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Gia Sư Hàng Đầu</h2>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-blue-500" />
                  Xếp hạng theo giờ dạy học
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  và đánh giá
                </span>
              </div>
            </div>
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
                              <CheckCircle className="w-3 h-3 fill-current" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Tutor Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{tutor.name}</h3>
                          {tutor.isVerified && (
                            <Badge className="bg-blue-600 text-white flex items-center gap-2 px-3 py-1 rounded-full">
                              <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center">
                                <CheckCircle className="w-2.5 h-2.5 fill-current text-white" />
                              </div>
                              VERIFIED
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

                        {/* Ranking Score */}
                        <div className="mb-3">
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span className="font-medium">Điểm xếp hạng:</span>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-blue-500" />
                              <span className="font-semibold text-blue-600">{tutor.teachingHours}</span>
                              <span>+</span>
                              <Star className="w-3 h-3 text-yellow-500 fill-current" />
                              <span className="font-semibold text-yellow-600">{tutor.rating}</span>
                              <span>=</span>
                              <span className="font-bold text-purple-600">{Math.round(tutor.teachingHours * 0.7 + tutor.rating * 100)}</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-sm text-gray-700 mb-3 line-clamp-2">{tutor.intro}</p>

                        <div className="flex flex-wrap gap-2">
                          {tutor.subjects.map((subject, index) => {
                            const SubjectIcon = getSubjectIcon(subject);
                            return (
                              <Badge key={index} variant="outline" className="text-xs bg-gray-100 border-gray-200 text-gray-700 flex items-center gap-1">
                                <SubjectIcon className="w-3 h-3" />
                                {subject}
                              </Badge>
                            );
                          })}
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="flex flex-col items-end gap-2">
                        <Link href={`/tutor/${tutor.id}`}>
                          <Button className="bg-gray-800 hover:bg-gray-900 text-white px-6">
                            <Eye className="w-4 h-4 mr-2" />
                            Xem Profile
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
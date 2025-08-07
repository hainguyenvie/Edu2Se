import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Calendar, 
  Trophy, 
  Clock, 
  BookOpen, 
  Star,
  Heart,
  MessageCircle,
  Share2,
  Users,
  TrendingUp,
  Target,
  Award,
  ExternalLink
} from "lucide-react";
import { Link } from "wouter";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
  likes: number;
  comments: number;
  tags: string[];
}

interface Achievement {
  id: string;
  title: string;
  icon: string;
  description: string;
  dateEarned: string;
}

export default function StudentProfilePage() {
  const [match, params] = useRoute("/profile/student/:slug");
  const slug = params?.slug;

  // Mock student data - in real app, fetch based on slug
  const student = {
    id: "1",
    name: "Nguyễn Minh Anh",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=200&h=200&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=1200&h=400&fit=crop",
    bio: "Học sinh lớp 12A1 trường THPT Chu Văn An. Đam mê toán học và khoa học. Mục tiêu: Đại học Bách Khoa Hà Nội ngành Khoa học máy tính.",
    school: "THPT Chu Văn An",
    grade: "Lớp 12A1",
    location: "Hà Nội",
    joinDate: "2023-09-01",
    points: 2450,
    studyHours: 124,
    rank: 1,
    level: "Study Legend",
    followers: 156,
    following: 89,
    socialLinks: {
      facebook: "https://facebook.com/minhanh",
      instagram: "https://instagram.com/minhanh_study",
      tiktok: "https://tiktok.com/@minhanh_study",
      zalo: "https://zalo.me/minhanh"
    }
  };

  const achievements: Achievement[] = [
    {
      id: "1",
      title: "Study Streak Master",
      icon: "🔥",
      description: "Học liên tục 30 ngày không nghỉ",
      dateEarned: "2024-01-15"
    },
    {
      id: "2", 
      title: "Math Genius",
      icon: "🧮",
      description: "Hoàn thành 100 bài toán khó",
      dateEarned: "2024-01-10"
    },
    {
      id: "3",
      title: "Night Owl",
      icon: "🦉",
      description: "Học tập hiệu quả vào ban đêm",
      dateEarned: "2024-01-05"
    },
    {
      id: "4",
      title: "Team Player",
      icon: "🤝",
      description: "Tham gia 50+ phiên Study With Me",
      dateEarned: "2023-12-20"
    }
  ];

  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "Bí quyết học toán hiệu quả trong mùa thi",
      content: "Sau 2 năm học tập chăm chỉ, mình muốn chia sẻ những kinh nghiệm học toán hiệu quả. Đầu tiên, việc luyện tập hàng ngày là vô cùng quan trọng...",
      date: "2024-01-20",
      likes: 45,
      comments: 12,
      tags: ["Toán học", "Học tập", "Kinh nghiệm"]
    },
    {
      id: "2",
      title: "Study With Me: Tại sao học nhóm lại hiệu quả?",
      content: "Học một mình thường khiến mình mất động lực. Kể từ khi tham gia Study With Me trên AitheduConnect, mình đã cảm thấy việc học trở nên thú vị hơn rất nhiều...",
      date: "2024-01-15", 
      likes: 38,
      comments: 8,
      tags: ["Study With Me", "Động lực", "Học nhóm"]
    },
    {
      id: "3",
      title: "Hành trình từ 0 điểm đến top 1 bảng xếp hạng",
      content: "6 tháng trước, mình chỉ là một học sinh bình thường với điểm số không cao. Hôm nay mình sẽ chia sẻ hành trình thay đổi bản thân...",
      date: "2024-01-10",
      likes: 67,
      comments: 23,
      tags: ["Câu chuyện", "Động lực", "Thành công"]
    }
  ];

  const studyStats = [
    { label: "Điểm tích lũy", value: "2,450", icon: TrendingUp, color: "text-green-600" },
    { label: "Giờ học", value: "124h", icon: Clock, color: "text-blue-600" },
    { label: "Bài tập hoàn thành", value: "89", icon: Target, color: "text-purple-600" },
    { label: "Ngày streak", value: "45", icon: Award, color: "text-orange-600" }
  ];

  if (!match) {
    return <div>Profile not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image */}
      <div className="relative h-64 bg-gradient-to-r from-blue-600 to-purple-600">
        <img 
          src={student.coverImage} 
          alt="Cover" 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/70 to-purple-600/70" />
        
        {/* Back Button */}
        <div className="absolute top-6 left-6">
          <Link href="/ranking">
            <Button variant="secondary" className="bg-white/90 hover:bg-white">
              ← Quay lại bảng xếp hạng
            </Button>
          </Link>
        </div>

        {/* Share Button */}
        <div className="absolute top-6 right-6">
          <Button variant="secondary" className="bg-white/90 hover:bg-white">
            <Share2 className="w-4 h-4 mr-2" />
            Chia sẻ
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        {/* Profile Header */}
        <Card className="mb-8 shadow-xl">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Avatar & Basic Info */}
              <div className="flex flex-col items-center md:items-start">
                <Avatar className="w-32 h-32 border-4 border-white shadow-lg mb-4">
                  <AvatarImage src={student.avatar} alt={student.name} />
                  <AvatarFallback className="text-2xl">{student.name[0]}</AvatarFallback>
                </Avatar>
                
                <div className="text-center md:text-left">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{student.name}</h1>
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white mb-2">
                    #{student.rank} - {student.level}
                  </Badge>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{student.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Tham gia từ {new Date(student.joinDate).toLocaleDateString('vi-VN')}</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex-1">
                <p className="text-gray-700 text-lg leading-relaxed mb-6">{student.bio}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {studyStats.map((stat, index) => (
                    <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                      <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span className="font-semibold">{student.followers}</span>
                    <span>người theo dõi</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">{student.following}</span>
                    <span>đang theo dõi</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  <Heart className="w-4 h-4 mr-2" />
                  Theo dõi
                </Button>
                <Button variant="outline">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Nhắn tin
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Tabs */}
        <Tabs defaultValue="blog" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white border border-gray-200 rounded-lg p-1">
            <TabsTrigger value="blog" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              📝 Blog & Chia sẻ
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              🏆 Thành tích
            </TabsTrigger>
            <TabsTrigger value="social" className="data-[state=active]:bg-pink-600 data-[state=active]:text-white">
              🌐 Mạng xã hội
            </TabsTrigger>
          </TabsList>

          {/* Blog Posts */}
          <TabsContent value="blog" className="space-y-6">
            {blogPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">{post.title}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{new Date(post.date).toLocaleDateString('vi-VN')}</span>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4 line-clamp-3">{post.content}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" size="sm">
                    Đọc thêm →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Achievements */}
          <TabsContent value="achievements">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{achievement.title}</h3>
                        <p className="text-gray-600 mb-3">{achievement.description}</p>
                        <div className="text-sm text-gray-500">
                          Đạt được: {new Date(achievement.dateEarned).toLocaleDateString('vi-VN')}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Social Media */}
          <TabsContent value="social">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(student.socialLinks).map(([platform, url]) => (
                <Card key={platform} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-xl">
                        {platform === 'facebook' && '📘'}
                        {platform === 'instagram' && '📷'}
                        {platform === 'tiktok' && '🎵'}
                        {platform === 'zalo' && '💬'}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 capitalize">{platform}</h3>
                        <p className="text-gray-600">Theo dõi Minh Anh trên {platform}</p>
                      </div>
                      <a 
                        href={url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
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
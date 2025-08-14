import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Calendar, 
  Star, 
  Clock, 
  BookOpen, 
  Heart,
  MessageCircle,
  Share2,
  Users,
  TrendingUp,
  Target,
  Award,
  ExternalLink,
  GraduationCap,
  CheckCircle,
  Calculator,
  Book,
  Languages,
  Zap,
  Beaker,
  Leaf,
  Globe
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

interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  icon: string;
}

// Simple subject icon mapping (same as ranking page)
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

export default function TutorProfilePage() {
  const [match, params] = useRoute("/profile/tutor/:slug");
  const slug = params?.slug;

  // Mock tutor data - in real app, fetch based on slug
  const tutor = {
    id: "1",
    name: "Thầy Việt Hoàng",
    avatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=200&h=200&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=400&fit=crop",
    bio: "Tiến sĩ Khoa học máy tính, chuyên gia giảng dạy Toán - Lý - Hóa với hơn 10 năm kinh nghiệm. Đã hướng dẫn hơn 500 học sinh đỗ đại học.",
    education: "Tiến sĩ - ĐH Bách Khoa Hà Nội",
    subjects: ["Toán", "Lý", "Hóa"],
    experience: "10+ năm",
    location: "Hà Nội",
    joinDate: "2020-03-15",
    rating: 5.0,
    totalReviews: 156,
    teachingHours: 890,
    completedSessions: 156,
    rank: 1,
    followers: 324,
    following: 45,
    pricePerHour: 600000,
    isVerified: true,
    socialLinks: {
      facebook: "https://facebook.com/thayviethoa ng",
      youtube: "https://youtube.com/@viethoang_teach",
      linkedin: "https://linkedin.com/in/viethoang",
      website: "https://viethoang-teach.com"
    }
  };

  const certifications: Certification[] = [
    {
      id: "1",
      title: "Tiến sĩ Khoa học máy tính",
      issuer: "ĐH Bách Khoa Hà Nội",
      date: "2015-06-15",
      icon: "🎓"
    },
    {
      id: "2",
      title: "Chứng chỉ giảng viên xuất sắc",
      issuer: "Bộ Giáo dục & Đào tạo",
      date: "2020-12-01",
      icon: "🏆"
    },
    {
      id: "3",
      title: "Giải thưởng Gia sư của năm",
      issuer: "AitheduConnect",
      date: "2023-12-31",
      icon: "⭐"
    },
    {
      id: "4",
      title: "Chứng chỉ Teaching Excellence",
      issuer: "International Teaching Institute",
      date: "2022-08-20",
      icon: "📜"
    }
  ];

  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "Phương pháp học Toán hiệu quả cho học sinh THPT",
      content: "Sau 10 năm giảng dạy, tôi nhận ra rằng học Toán không chỉ là thuộc công thức mà còn là hiểu bản chất. Hôm nay tôi sẽ chia sẻ 5 phương pháp học Toán hiệu quả nhất...",
      date: "2024-01-22",
      likes: 89,
      comments: 34,
      tags: ["Toán học", "Phương pháp", "THPT"]
    },
    {
      id: "2",
      title: "Tại sao học sinh sợ Vật lý và cách khắc phục",
      content: "Vật lý thường được coi là môn khó nhất. Nhưng thực chất, Vật lý rất gần gũi với cuộc sống. Tôi sẽ chia sẻ cách làm cho Vật lý trở nên thú vị và dễ hiểu...",
      date: "2024-01-18",
      likes: 67,
      comments: 28,
      tags: ["Vật lý", "Tâm lý học", "Giảng dạy"]
    },
    {
      id: "3",
      title: "Kinh nghiệm luyện thi đại học từ A đến Z",
      content: "Với 10 năm kinh nghiệm luyện thi, tôi đã giúp hàng trăm học sinh đỗ đại học. Bài viết này sẽ tổng hợp toàn bộ kinh nghiệm từ việc lên kế hoạch đến tips làm bài...",
      date: "2024-01-15",
      likes: 124,
      comments: 56,
      tags: ["Thi đại học", "Chiến lược", "Kinh nghiệm"]
    }
  ];

  const teachingStats = [
    { label: "Đánh giá", value: "5.0★", icon: Star, color: "text-yellow-600" },
    { label: "Giờ dạy", value: "890h", icon: Clock, color: "text-blue-600" },
    { label: "Học sinh", value: "156", icon: Users, color: "text-green-600" },
    { label: "Tỷ lệ đỗ ĐH", value: "95%", icon: Target, color: "text-purple-600" }
  ];

  if (!match) {
    return <div>Profile not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image */}
      <div className="relative h-64 bg-gradient-to-r from-purple-600 to-blue-600">
        <img 
          src={tutor.coverImage} 
          alt="Cover" 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/70 to-blue-600/70" />
        
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
                <div className="relative">
                  <Avatar className="w-32 h-32 border-4 border-white shadow-lg mb-4">
                    <AvatarImage src={tutor.avatar} alt={tutor.name} />
                    <AvatarFallback className="text-2xl">{tutor.name[0]}</AvatarFallback>
                  </Avatar>
                  {tutor.isVerified && (
                    <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white rounded-full p-2">
                      <CheckCircle className="w-6 h-6 fill-current" />
                    </div>
                  )}
                </div>
                
                <div className="text-center md:text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{tutor.name}</h1>
                    {tutor.isVerified && (
                      <Badge className="bg-blue-600 text-white flex items-center gap-2 px-3 py-1 rounded-full">
                        <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center">
                          <CheckCircle className="w-2.5 h-2.5 fill-current text-white" />
                        </div>
                        VERIFIED
                      </Badge>
                    )}
                  </div>
                  <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white mb-2">
                    #{tutor.rank} - Gia sư hàng đầu
                  </Badge>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <GraduationCap className="w-4 h-4" />
                    <span>{tutor.education}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{tutor.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Tham gia từ {new Date(tutor.joinDate).toLocaleDateString('vi-VN')}</span>
                  </div>
                </div>
              </div>

              {/* Stats & Info */}
              <div className="flex-1">
                <p className="text-gray-700 text-lg leading-relaxed mb-6">{tutor.bio}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {teachingStats.map((stat, index) => (
                    <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                      <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 mb-4">
                  {tutor.subjects.map((subject, index) => {
                    const Icon = getSubjectIcon(subject);
                    return (
                      <Badge key={index} className="bg-gradient-to-r from-green-100 to-blue-100 text-green-700 border-green-200">
                        <Icon className="w-4 h-4 mr-1" /> {subject}
                      </Badge>
                    );
                  })}
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span className="font-semibold">{tutor.followers}</span>
                    <span>người theo dõi</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">{tutor.following}</span>
                    <span>đang theo dõi</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-green-600">{tutor.pricePerHour.toLocaleString()}₫/h</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                  📚 Đặt lịch học
                </Button>
                <Button variant="outline">
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
          <TabsList className="grid w-full grid-cols-4 bg-white border border-gray-200 rounded-lg p-1">
            <TabsTrigger value="blog" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              ✍️ Blog & Chia sẻ
            </TabsTrigger>
            <TabsTrigger value="curriculum" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
              📚 Chương trình học
            </TabsTrigger>
            <TabsTrigger value="certifications" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              🎓 Bằng cấp
            </TabsTrigger>
            <TabsTrigger value="social" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              🌐 Liên kết
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

          {/* Curriculum */}
          <TabsContent value="curriculum" className="space-y-6">
            <div className="grid gap-6">
              {/* Mock curriculum data */}
              {[
                {
                  id: "1",
                  title: "Toán Cấp Tốc - Ôn Thi Đại Học",
                  subject: "Toán",
                  grade: "Lớp 12",
                  difficulty: "advanced",
                  estimatedHours: 40,
                  price: 800000,
                  description: "Khóa học tổng hợp toàn bộ kiến thức Toán 12 cho kỳ thi Đại học",
                  topics: [
                    "Hàm số và đồ thị",
                    "Đạo hàm và ứng dụng",
                    "Tích phân và ứng dụng",
                    "Số phức",
                    "Hình học không gian",
                    "Phương trình và bất phương trình"
                  ]
                },
                {
                  id: "2",
                  title: "Toán Nâng Cao - Lớp 11",
                  subject: "Toán",
                  grade: "Lớp 11",
                  difficulty: "intermediate",
                  estimatedHours: 35,
                  price: 700000,
                  description: "Chương trình Toán 11 nâng cao với các dạng bài khó",
                  topics: [
                    "Lượng giác cơ bản",
                    "Phương trình lượng giác",
                    "Dãy số và cấp số",
                    "Giới hạn hàm số",
                    "Đường thẳng và mặt phẳng",
                    "Khối đa diện"
                  ]
                }
              ].map((curriculum) => (
                <Card key={curriculum.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl mb-2">{curriculum.title}</CardTitle>
                        <div className="flex items-center gap-3 mb-2">
                          <Badge className="bg-blue-100 text-blue-800">
                            {curriculum.subject} - {curriculum.grade}
                          </Badge>
                          <Badge className={
                            curriculum.difficulty === 'advanced' ? 'bg-red-100 text-red-800' :
                            curriculum.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }>
                            {curriculum.difficulty === 'advanced' ? 'Nâng cao' :
                             curriculum.difficulty === 'intermediate' ? 'Trung bình' : 'Cơ bản'}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm">{curriculum.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                          }).format(curriculum.price)}
                        </div>
                        <div className="text-sm text-gray-500">{curriculum.estimatedHours}h</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <Clock className="w-5 h-5 mx-auto text-blue-600 mb-1" />
                          <div className="text-sm font-medium">{curriculum.estimatedHours}h</div>
                          <div className="text-xs text-gray-600">Tổng thời gian</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <Target className="w-5 h-5 mx-auto text-green-600 mb-1" />
                          <div className="text-sm font-medium">{curriculum.topics.length}</div>
                          <div className="text-xs text-gray-600">Chủ đề</div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded-lg">
                          <GraduationCap className="w-5 h-5 mx-auto text-purple-600 mb-1" />
                          <div className="text-sm font-medium">{curriculum.grade}</div>
                          <div className="text-xs text-gray-600">Cấp độ</div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3">Nội dung chương trình:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {curriculum.topics.map((topic, index) => (
                            <div key={index} className="flex items-center p-2 bg-gray-50 rounded">
                              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mr-3">
                                {index + 1}
                              </div>
                              <span className="text-sm">{topic}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4 border-t">
                        <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Đăng ký khóa học
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Calendar className="w-4 h-4 mr-2" />
                          Xem lịch học
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Certifications */}
          <TabsContent value="certifications">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((cert) => (
                <Card key={cert.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{cert.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{cert.title}</h3>
                        <p className="text-purple-600 font-medium mb-2">{cert.issuer}</p>
                        <div className="text-sm text-gray-500">
                          Cấp ngày: {new Date(cert.date).toLocaleDateString('vi-VN')}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Social Media & Links */}
          <TabsContent value="social">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(tutor.socialLinks).map(([platform, url]) => (
                <Card key={platform} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-xl">
                        {platform === 'facebook' && '📘'}
                        {platform === 'youtube' && '📺'}
                        {platform === 'linkedin' && '💼'}
                        {platform === 'website' && '🌐'}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 capitalize">{platform}</h3>
                        <p className="text-gray-600">
                          {platform === 'facebook' && 'Trang Facebook cá nhân'}
                          {platform === 'youtube' && 'Kênh YouTube giảng dạy'}
                          {platform === 'linkedin' && 'Hồ sơ LinkedIn'}
                          {platform === 'website' && 'Website cá nhân'}
                        </p>
                      </div>
                      <a 
                        href={url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:text-purple-700"
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
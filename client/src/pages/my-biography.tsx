import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Edit, 
  Save, 
  X, 
  User, 
  Video, 
  FileText, 
  Settings,
  Eye,
  Share2,
  Heart,
  MessageCircle,
  Calendar,
  MapPin,
  GraduationCap,
  Target,
  Star,
  Users,
  BookOpen,
  Trophy
} from "lucide-react";
import Header from "@/components/header";
import MediaUploader from "@/components/media-uploader";
import ContentManager from "@/components/content-manager";
import { useAuth } from "@/contexts/auth-context";

interface MediaItem {
  id: string;
  type: "video" | "image";
  title: string;
  url?: string;
  thumbnail: string;
  duration?: string;
  description?: string;
  uploadDate: string;
  size?: string;
}

interface ContentItem {
  id: string;
  type: "article" | "achievement" | "link" | "quote" | "goal" | "tip";
  title: string;
  content: string;
  url?: string;
  date: string;
  category?: string;
  featured?: boolean;
}

interface UserProfile {
  bio: string;
  location: string;
  school: string;
  grade?: string;
  goals: string;
  interests: string[];
  socialLinks: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    zalo?: string;
  };
}

export default function MyBiographyPage() {
  const { user } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // User profile state
  const [userProfile, setUserProfile] = useState<UserProfile>({
    bio: "Học sinh lớp 12 đam mê khoa học và công nghệ. Yêu thích toán học, vật lý và lập trình. Mục tiêu trở thành kỹ sư phần mềm và đóng góp cho sự phát triển của công nghệ Việt Nam.",
    location: "Hà Nội, Việt Nam",
    school: "THPT Chu Văn An",
    grade: "Lớp 12A1",
    goals: "Đỗ vào Đại học Bách Khoa Hà Nội - Khoa Công nghệ Thông tin với điểm số cao. Nâng cao kỹ năng lập trình và tham gia các dự án thực tế.",
    interests: ["Toán học", "Vật lý", "Lập trình", "Âm nhạc", "Đọc sách"],
    socialLinks: {
      facebook: "",
      instagram: "",
      tiktok: "",
      zalo: ""
    }
  });

  // Media items state
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([
    {
      id: "1",
      type: "video",
      title: "Video giới thiệu bản thân",
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
      duration: "02:30",
      description: "Xin chào! Mình là học sinh lớp 12, đam mê toán học và lập trình.",
      uploadDate: "15/01/2025",
      size: "12.5 MB"
    },
    {
      id: "2",
      type: "image",
      title: "Bảng điểm học kỳ 1",
      thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop",
      description: "Kết quả học tập học kỳ 1 năm 2024-2025",
      uploadDate: "10/01/2025",
      size: "2.8 MB"
    },
    {
      id: "3",
      type: "image",
      title: "Tham gia Olympic Toán",
      thumbnail: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=300&fit=crop",
      description: "Giải nhì Olympic Toán cấp thành phố",
      uploadDate: "05/01/2025",
      size: "3.2 MB"
    }
  ]);

  // Content items state
  const [contentItems, setContentItems] = useState<ContentItem[]>([
    {
      id: "1",
      type: "achievement",
      title: "Giải nhì Olympic Toán cấp thành phố",
      content: "Đạt giải nhì trong kỳ thi Olympic Toán học cấp thành phố Hà Nội năm 2024. Đây là thành tích đáng tự hào sau 2 năm nỗ lực học tập và luyện tập.",
      date: "20/12/2024",
      category: "Học tập",
      featured: true
    },
    {
      id: "2",
      type: "goal",
      title: "Mục tiêu năm 2025",
      content: "1. Đạt điểm trung bình 9.0 trở lên trong năm học\n2. Hoàn thành khóa học lập trình Python\n3. Tham gia ít nhất 3 cuộc thi học sinh giỏi\n4. Cải thiện kỹ năng tiếng Anh lên mức IELTS 7.0",
      date: "01/01/2025",
      category: "Kế hoạch",
      featured: true
    },
    {
      id: "3",
      type: "tip",
      title: "Phương pháp học Toán hiệu quả",
      content: "Chia sẻ phương pháp học toán hiệu quả mà mình đã áp dụng:\n\n1. Hiểu rõ lý thuyết trước khi làm bài tập\n2. Làm bài từ dễ đến khó, đảm bảo nắm vững cơ bản\n3. Ghi chép những công thức và phương pháp quan trọng\n4. Thường xuyên ôn tập và làm đề thi thử",
      date: "15/12/2024",
      category: "Học tập"
    }
  ]);

  const [editedProfile, setEditedProfile] = useState<UserProfile>(userProfile);

  const handleSaveProfile = () => {
    setUserProfile(editedProfile);
    setIsEditMode(false);
  };

  const handleCancelEdit = () => {
    setEditedProfile(userProfile);
    setIsEditMode(false);
  };

  const stats = {
    totalMedia: mediaItems.length,
    totalContent: contentItems.length,
    achievements: contentItems.filter(item => item.type === "achievement").length,
    goals: contentItems.filter(item => item.type === "goal").length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8 pt-24 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Biography</h1>
              <p className="text-gray-600">Quản lý và chia sẻ hồ sơ cá nhân của bạn</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="hidden sm:flex">
                <Eye className="w-4 h-4 mr-2" />
                Xem như khách
              </Button>
              <Button variant="outline" className="hidden sm:flex">
                <Share2 className="w-4 h-4 mr-2" />
                Chia sẻ
              </Button>
              <Button 
                onClick={() => setIsEditMode(!isEditMode)}
                className={isEditMode ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}
              >
                {isEditMode ? (
                  <>
                    <X className="w-4 h-4 mr-2" />
                    Hủy
                  </>
                ) : (
                  <>
                    <Edit className="w-4 h-4 mr-2" />
                    Chỉnh sửa
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-6 text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={user?.id ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}` : undefined} />
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {user?.fullName?.split(" ").map(n => n[0]).join("") || user?.username?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>

                <h2 className="text-xl font-bold mb-1">{user?.fullName || user?.username}</h2>
                
                {isEditMode ? (
                  <div className="space-y-2 text-left">
                    <Input
                      value={editedProfile.school}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, school: e.target.value }))}
                      placeholder="Trường học"
                      className="text-center"
                    />
                    {user?.role === "student" && (
                      <Input
                        value={editedProfile.grade || ""}
                        onChange={(e) => setEditedProfile(prev => ({ ...prev, grade: e.target.value }))}
                        placeholder="Lớp"
                        className="text-center"
                      />
                    )}
                    <Input
                      value={editedProfile.location}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Địa điểm"
                      className="text-center"
                    />
                  </div>
                ) : (
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex items-center justify-center">
                      <GraduationCap className="w-4 h-4 mr-1" />
                      {userProfile.school}
                    </div>
                    {userProfile.grade && (
                      <div>{userProfile.grade}</div>
                    )}
                    <div className="flex items-center justify-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {userProfile.location}
                    </div>
                  </div>
                )}

                <div className="flex justify-center gap-2 mt-4">
                  <Badge className="bg-green-500 text-white border-0 text-xs">
                    <Users className="w-3 h-3 mr-1" />
                    {user?.role === "student" ? "Học sinh" : "Gia sư"}
                  </Badge>
                  <Badge className="bg-blue-500 text-white border-0 text-xs">
                    <Star className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="w-5 h-5 mr-2" />
                  Thống kê
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Video className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Media</span>
                  </div>
                  <span className="font-bold text-blue-600">{stats.totalMedia}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Nội dung</span>
                  </div>
                  <span className="font-bold text-green-600">{stats.totalContent}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">Thành tích</span>
                  </div>
                  <span className="font-bold text-yellow-600">{stats.achievements}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-purple-500" />
                    <span className="text-sm">Mục tiêu</span>
                  </div>
                  <span className="font-bold text-purple-600">{stats.goals}</span>
                </div>
              </CardContent>
            </Card>

            {/* Interests */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="w-5 h-5 mr-2" />
                  Sở thích
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditMode ? (
                  <Input
                    value={editedProfile.interests.join(", ")}
                    onChange={(e) => setEditedProfile(prev => ({ 
                      ...prev, 
                      interests: e.target.value.split(", ").filter(Boolean) 
                    }))}
                    placeholder="Nhập sở thích, cách nhau bằng dấu phẩy"
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {userProfile.interests.map((interest, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview" className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Tổng quan
                </TabsTrigger>
                <TabsTrigger value="media" className="flex items-center">
                  <Video className="w-4 h-4 mr-2" />
                  Videos & Ảnh
                </TabsTrigger>
                <TabsTrigger value="content" className="flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Nội dung khác
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Bio Section */}
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        <MessageCircle className="w-6 h-6 mr-3" />
                        Giới thiệu bản thân
                      </CardTitle>
                      {isEditMode && (
                        <Button 
                          onClick={handleSaveProfile}
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Lưu
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {isEditMode ? (
                      <Textarea
                        value={editedProfile.bio}
                        onChange={(e) => setEditedProfile(prev => ({ ...prev, bio: e.target.value }))}
                        placeholder="Viết giới thiệu về bản thân..."
                        className="min-h-[120px]"
                      />
                    ) : (
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                          {userProfile.bio}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Goals Section */}
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="w-6 h-6 mr-3" />
                      Mục tiêu
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEditMode ? (
                      <Textarea
                        value={editedProfile.goals}
                        onChange={(e) => setEditedProfile(prev => ({ ...prev, goals: e.target.value }))}
                        placeholder="Chia sẻ mục tiêu học tập và phát triển của bạn..."
                        className="min-h-[100px]"
                      />
                    ) : (
                      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
                        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                          {userProfile.goals}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="w-6 h-6 mr-3" />
                      Hoạt động gần đây
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Thêm video giới thiệu bản thân</p>
                          <p className="text-xs text-gray-500">2 ngày trước</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Chia sẻ thành tích Olympic Toán</p>
                          <p className="text-xs text-gray-500">1 tuần trước</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Cập nhật mục tiêu năm 2025</p>
                          <p className="text-xs text-gray-500">2 tuần trước</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="media">
                <MediaUploader 
                  mediaItems={mediaItems}
                  onMediaUpdate={setMediaItems}
                  isEditMode={isEditMode}
                />
              </TabsContent>

              <TabsContent value="content">
                <ContentManager
                  contentItems={contentItems}
                  onContentUpdate={setContentItems}
                  isEditMode={isEditMode}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

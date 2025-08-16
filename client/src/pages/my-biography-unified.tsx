import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
  Trophy,
  HelpCircle,
  CreditCard,
  DollarSign,
  Upload,
  Camera,
  Plus,
  ExternalLink,
  UserPlus,
  Check
} from "lucide-react";
import Header from "@/components/header";
import MediaUploader from "@/components/media-uploader";
import ContentManager from "@/components/content-manager";
import TutorRegistrationModal from "@/components/tutor-registration-modal";
import { useAuth } from "@/contexts/auth-context";
import { Link } from "wouter";

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

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  isEditing?: boolean;
}

interface StudyClass {
  id: string;
  subject: string;
  tutor: string;
  status: "enrolled" | "following" | "completed";
  progress: number;
  nextSession?: string;
}

interface WalletTransaction {
  id: string;
  type: "topup" | "payment" | "refund";
  amount: number;
  description: string;
  date: string;
  status: "completed" | "pending" | "failed";
}

export default function UnifiedMyBioPage() {
  const { user } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [isTutorRegOpen, setIsTutorRegOpen] = useState(false);

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
    }
  ]);

  // FAQ state
  const [faqItems, setFaqItems] = useState<FAQItem[]>([
    {
      id: "1",
      question: "Bạn học giỏi môn nào nhất?",
      answer: "Mình học giỏi nhất môn Toán và Vật lý. Đã đạt nhiều giải trong các kỳ thi học sinh giỏi cấp thành phố."
    },
    {
      id: "2", 
      question: "Mục tiêu học tập của bạn là gì?",
      answer: "Mình muốn đỗ vào Đại học Bách Khoa Hà Nội ngành Công nghệ Thông tin với điểm số cao nhất có thể."
    }
  ]);

  // Study classes state
  const [studyClasses, setStudyClasses] = useState<StudyClass[]>([
    {
      id: "1",
      subject: "Toán 12 - Cô Huyền",
      tutor: "Cô Huyền",
      status: "enrolled",
      progress: 75,
      nextSession: "Thứ 2, 19:00"
    },
    {
      id: "2",
      subject: "Vật lý 12 - Thầy Nam", 
      tutor: "Thầy Nam",
      status: "enrolled",
      progress: 60,
      nextSession: "Thứ 4, 20:00"
    },
    {
      id: "3",
      subject: "Advanced Mathematics - Prof. Johnson",
      tutor: "Prof. Johnson", 
      status: "following",
      progress: 0
    }
  ]);

  // Wallet state
  const [walletBalance, setWalletBalance] = useState(1250000);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([
    {
      id: "1",
      type: "payment",
      amount: -200000,
      description: "Thanh toán học phí - Toán 12",
      date: "15/01/2025",
      status: "completed"
    },
    {
      id: "2",
      type: "topup",
      amount: 500000,
      description: "Nạp tiền vào ví",
      date: "10/01/2025", 
      status: "completed"
    },
    {
      id: "3",
      type: "payment",
      amount: -150000,
      description: "Thanh toán học phí - Vật lý 12",
      date: "08/01/2025",
      status: "completed"
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

  const addFAQ = () => {
    const newFAQ: FAQItem = {
      id: Date.now().toString(),
      question: "Câu hỏi mới",
      answer: "Câu trả lời...",
      isEditing: true
    };
    setFaqItems([...faqItems, newFAQ]);
  };

  const updateFAQ = (id: string, question: string, answer: string) => {
    setFaqItems(faqItems.map(item => 
      item.id === id 
        ? { ...item, question, answer, isEditing: false }
        : item
    ));
  };

  const deleteFAQ = (id: string) => {
    setFaqItems(faqItems.filter(item => item.id !== id));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const isTutor = user?.role === 'tutor';

  const stats = {
    totalMedia: mediaItems.length,
    totalFAQ: faqItems.length,
    enrolledClasses: studyClasses.filter(c => c.status === 'enrolled').length,
    followingClasses: studyClasses.filter(c => c.status === 'following').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8 pt-24 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bio</h1>
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
                    {!isTutor && (
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
                    {isTutor ? "Gia sư" : "Học sinh"}
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
                    <HelpCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">FAQ</span>
                  </div>
                  <span className="font-bold text-green-600">{stats.totalFAQ}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-purple-500" />
                    <span className="text-sm">Lớp đang học</span>
                  </div>
                  <span className="font-bold text-purple-600">{stats.enrolledClasses}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span className="text-sm">Theo dõi</span>
                  </div>
                  <span className="font-bold text-red-600">{stats.followingClasses}</span>
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
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="overview" className="flex items-center text-xs">
                  <User className="w-3 h-3 mr-1" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="media" className="flex items-center text-xs">
                  <Video className="w-3 h-3 mr-1" />
                  Videos & Photos
                </TabsTrigger>
                <TabsTrigger value="faq" className="flex items-center text-xs">
                  <HelpCircle className="w-3 h-3 mr-1" />
                  FAQ
                </TabsTrigger>
                <TabsTrigger value="study" className="flex items-center text-xs">
                  <BookOpen className="w-3 h-3 mr-1" />
                  Study
                </TabsTrigger>
                <TabsTrigger value="wallet" className="flex items-center text-xs">
                  <CreditCard className="w-3 h-3 mr-1" />
                  Wallet
                </TabsTrigger>
                <TabsTrigger value="tutor" className="flex items-center text-xs">
                  <UserPlus className="w-3 h-3 mr-1" />
                  {isTutor ? "Trang Gia Sư" : "Trở thành Gia Sư"}
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
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
                          <p className="text-sm font-medium">Cập nhật FAQ</p>
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

              {/* Videos & Photos Tab */}
              <TabsContent value="media">
                <MediaUploader 
                  mediaItems={mediaItems}
                  onMediaUpdate={setMediaItems}
                  isEditMode={isEditMode}
                />
              </TabsContent>

              {/* FAQ Tab */}
              <TabsContent value="faq" className="space-y-6">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        <HelpCircle className="w-6 h-6 mr-3" />
                        Frequently Asked Questions
                      </CardTitle>
                      {isEditMode && (
                        <Button onClick={addFAQ} size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Thêm FAQ
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {faqItems.map((faq) => (
                        <FAQEditor 
                          key={faq.id}
                          faq={faq}
                          isEditMode={isEditMode}
                          onUpdate={updateFAQ}
                          onDelete={deleteFAQ}
                        />
                      ))}
                      {faqItems.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                          <HelpCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                          <p>Chưa có câu hỏi thường gặp nào</p>
                          {isEditMode && (
                            <Button onClick={addFAQ} className="mt-4">
                              <Plus className="w-4 h-4 mr-2" />
                              Thêm FAQ đầu tiên
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Study Tab */}
              <TabsContent value="study" className="space-y-6">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BookOpen className="w-6 h-6 mr-3" />
                      Lớp học của tôi
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="enrolled">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="enrolled">Đang học ({stats.enrolledClasses})</TabsTrigger>
                        <TabsTrigger value="following">Theo dõi ({stats.followingClasses})</TabsTrigger>
                        <TabsTrigger value="completed">Hoàn thành</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="enrolled" className="space-y-4">
                        {studyClasses.filter(c => c.status === 'enrolled').map((cls) => (
                          <ClassCard key={cls.id} class={cls} />
                        ))}
                      </TabsContent>
                      
                      <TabsContent value="following" className="space-y-4">
                        {studyClasses.filter(c => c.status === 'following').map((cls) => (
                          <ClassCard key={cls.id} class={cls} />
                        ))}
                      </TabsContent>
                      
                      <TabsContent value="completed" className="space-y-4">
                        <div className="text-center py-12 text-gray-500">
                          <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                          <p>Chưa có lớp học nào hoàn thành</p>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Wallet Tab */}
              <TabsContent value="wallet" className="space-y-6">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="w-6 h-6 mr-3" />
                      Ví của tôi
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg mb-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm opacity-90">Số dư khả dụng</p>
                          <p className="text-3xl font-bold">{formatCurrency(walletBalance)}</p>
                        </div>
                        <DollarSign className="w-12 h-12 opacity-50" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <Button className="bg-green-600 hover:bg-green-700">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Nạp tiền
                      </Button>
                      <Button variant="outline">
                        <FileText className="w-4 h-4 mr-2" />
                        Lịch sử giao dịch
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold">Giao dịch gần đây</h4>
                      {transactions.slice(0, 5).map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              transaction.type === 'topup' ? 'bg-green-100 text-green-600' :
                              transaction.type === 'payment' ? 'bg-red-100 text-red-600' :
                              'bg-blue-100 text-blue-600'
                            }`}>
                              {transaction.type === 'topup' ? '↑' : 
                               transaction.type === 'payment' ? '↓' : '↩'}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{transaction.description}</p>
                              <p className="text-xs text-gray-500">{transaction.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-bold ${
                              transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                            </p>
                            <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                              {transaction.status === 'completed' ? 'Thành công' : 
                               transaction.status === 'pending' ? 'Đang xử lý' : 'Thất bại'}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Become Tutor / Tutor Tab */}
              <TabsContent value="tutor" className="space-y-6">
                {isTutor ? (
                  <Card className="shadow-lg border-0">
                    <CardHeader>
                                          <CardTitle className="flex items-center">
                      <GraduationCap className="w-6 h-6 mr-3" />
                      Trang Quản Lý Gia Sư
                    </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <GraduationCap className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                        <h3 className="text-xl font-bold mb-2">Bạn đã là gia sư!</h3>
                        <p className="text-gray-600 mb-6">Quản lý lớp học, học sinh và doanh thu của bạn</p>
                        <Link href="/my-profile">
                          <Button className="bg-blue-600 hover:bg-blue-700">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Đi đến Trang Quản Lý Gia Sư
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <UserPlus className="w-6 h-6 mr-3" />
                        Trở thành Gia sư
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <UserPlus className="w-16 h-16 mx-auto mb-4 text-green-600" />
                        <h3 className="text-xl font-bold mb-2">Bạn chưa phải là gia sư</h3>
                        <p className="text-gray-600 mb-6">
                          Đăng ký để trở thành gia sư và bắt đầu dạy học trực tuyến
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          <div className="p-4 bg-blue-50 rounded-lg">
                            <DollarSign className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                            <h4 className="font-semibold text-sm">Thu nhập linh hoạt</h4>
                            <p className="text-xs text-gray-600">Tự quyết định giá và lịch dạy</p>
                          </div>
                          <div className="p-4 bg-green-50 rounded-lg">
                            <Users className="w-8 h-8 mx-auto mb-2 text-green-600" />
                            <h4 className="font-semibold text-sm">Kết nối học sinh</h4>
                            <p className="text-xs text-gray-600">Tìm kiếm học sinh phù hợp</p>
                          </div>
                          <div className="p-4 bg-purple-50 rounded-lg">
                            <Trophy className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                            <h4 className="font-semibold text-sm">Phát triển kỹ năng</h4>
                            <p className="text-xs text-gray-600">Nâng cao năng lực giảng dạy</p>
                          </div>
                        </div>
                        <Button 
                          onClick={() => setIsTutorRegOpen(true)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <UserPlus className="w-4 h-4 mr-2" />
                          Đăng ký làm gia sư
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Tutor Registration Modal */}
      <TutorRegistrationModal 
        isOpen={isTutorRegOpen}
        onClose={() => setIsTutorRegOpen(false)}
      />
    </div>
  );
}

// Helper Components
function FAQEditor({ 
  faq, 
  isEditMode, 
  onUpdate, 
  onDelete 
}: { 
  faq: FAQItem; 
  isEditMode: boolean;
  onUpdate: (id: string, question: string, answer: string) => void;
  onDelete: (id: string) => void;
}) {
  const [question, setQuestion] = useState(faq.question);
  const [answer, setAnswer] = useState(faq.answer);
  const [isEditing, setIsEditing] = useState(faq.isEditing || false);

  const handleSave = () => {
    onUpdate(faq.id, question, answer);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setIsEditing(false);
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      {isEditing ? (
        <div className="space-y-3">
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Câu hỏi..."
          />
          <Textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Câu trả lời..."
            className="min-h-[80px]"
          />
          <div className="flex gap-2">
            <Button onClick={handleSave} size="sm" className="bg-green-600 hover:bg-green-700">
              <Save className="w-3 h-3 mr-1" />
              Lưu
            </Button>
            <Button onClick={handleCancel} size="sm" variant="outline">
              <X className="w-3 h-3 mr-1" />
              Hủy
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-semibold text-gray-900">{faq.question}</h4>
            {isEditMode && (
              <div className="flex gap-1">
                <Button onClick={() => setIsEditing(true)} size="sm" variant="ghost">
                  <Edit className="w-3 h-3" />
                </Button>
                <Button onClick={() => onDelete(faq.id)} size="sm" variant="ghost" className="text-red-600">
                  <X className="w-3 h-3" />
                </Button>
              </div>
            )}
          </div>
          <p className="text-gray-700 text-sm">{faq.answer}</p>
        </div>
      )}
    </div>
  );
}

function ClassCard({ class: cls }: { class: StudyClass }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white border rounded-lg">
      <div className="flex items-center space-x-4">
        <Avatar className="h-12 w-12">
          <AvatarFallback>{cls.tutor[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-semibold">{cls.subject}</h4>
          <p className="text-sm text-gray-600">với {cls.tutor}</p>
          {cls.nextSession && (
            <p className="text-sm text-gray-500">Buổi tiếp theo: {cls.nextSession}</p>
          )}
          {cls.status === 'enrolled' && (
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs mb-1">
                <span>Tiến độ</span>
                <span>{cls.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${cls.progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Badge variant={cls.status === 'enrolled' ? 'default' : 'secondary'}>
          {cls.status === 'enrolled' ? 'Đang học' :
           cls.status === 'following' ? 'Theo dõi' : 'Hoàn thành'}
        </Badge>
        {cls.status === 'enrolled' ? (
          <Button size="sm">Vào lớp</Button>
        ) : (
          <Button size="sm" variant="outline">Xem chi tiết</Button>
        )}
      </div>
    </div>
  );
}

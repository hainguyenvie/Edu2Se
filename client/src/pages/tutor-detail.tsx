import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { type Tutor } from "@shared/schema";
import { 
  Star, 
  Heart, 
  Calendar, 
  MessageCircle, 
  Shield, 
  Clock,
  Play,
  Facebook,
  Youtube,
  Edit,
  Settings,
  BarChart3,
  Plus,
  Minus,
  Save,
  X,
  GripVertical,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/header";
import BookingModal from "@/components/booking-modal";

export default function TutorDetail() {
  const [match, params] = useRoute("/tutor/:id");
  const [isFavorited, setIsFavorited] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isOwnerView, setIsOwnerView] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  // Initialize editable state with default values
  const [editableAchievements, setEditableAchievements] = useState([
    { title: "TIẾU ĐỎI 200 HỌC VIÊN", color: "bg-blue-100 text-blue-800" },
    { title: "ĐÃ DẠY 8000 GIỜ", color: "bg-green-100 text-green-800" },
    { title: "CHỨNG CHỈ SEAL HỘI TIẾU", color: "bg-green-100 text-green-800" },
  ]);
  const [editableSubjects, setEditableSubjects] = useState([
    { name: "TOÁN", available: true },
    { name: "LÝ", available: true },
    { name: "HÓA", available: false },
    { name: "ÔN THI", available: true },
    { name: "LUYỆN ĐỀ", available: true },
    { name: "HỌ ĐẢP", available: true },
    { name: "TƯ VẤN TÂM SỰ", available: false },
    { name: "LỚP HỌC LIVE", available: false },
  ]);
  const [editableOffers, setEditableOffers] = useState(Array(4).fill({
    title: "FREE 1H học thử 1 tuần",
    icon: "🎯"
  }));
  const [editableVideos, setEditableVideos] = useState([
    { id: 1, title: "ẢNH VÀ VIDEO GT" },
    { id: 2, title: "ẢNH VÀ VIDEO GT" },
    { id: 3, title: "ẢNH VÀ VIDEO GT" }
  ]);
  const [editableInfo, setEditableInfo] = useState("HỌC SINH LỚP 12 NĂM LỚP, THỊ KHOA TOÁN TỈN!\nAN TRẠNG THI ĐẠO KHOA TRƯỜNG NHỮNG HỌC THỊ KHÔNG TÂM THƯỜNG.");
  const [editablePrice, setEditablePrice] = useState(0);
  
  const { data: tutor, isLoading } = useQuery<Tutor>({
    queryKey: ['/api/tutors', params?.id],
    enabled: !!params?.id,
  });

  // Update price when tutor data loads
  useEffect(() => {
    if (tutor?.pricePerHour) {
      setEditablePrice(tutor.pricePerHour);
    }
  }, [tutor]);

  // Check if this is the owner viewing their own profile
  useEffect(() => {
    const checkOwnership = async () => {
      try {
        const response = await fetch('/api/tutors');
        const tutors = await response.json();
        if (tutors && tutors.length > 0) {
          // Check if current tutor ID matches the first tutor (current user)
          const currentUserTutorId = tutors[0].id;
          setIsOwnerView(params?.id === currentUserTutorId);
        }
      } catch (error) {
        console.error('Failed to check ownership:', error);
      }
    };
    
    if (params?.id) {
      checkOwnership();
    }
  }, [params?.id]);

  if (!match || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải thông tin gia sư...</p>
        </div>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy gia sư</h2>
          <Link href="/">
            <Button>Quay về trang chủ</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const subjects = [
    { name: "TOÁN", available: true },
    { name: "LÝ", available: true },
    { name: "HÓA", available: false },
    { name: "ÔN THI", available: true },
    { name: "LUYỆN ĐỀ", available: true },
    { name: "HỌ ĐẢP", available: true },
    { name: "TƯ VẤN TÂM SỰ", available: false },
    { name: "LỚP HỌC LIVE", available: false },
  ];

  const achievements = [
    { title: "TIẾU ĐỎI 200 HỌC VIÊN", color: "bg-blue-100 text-blue-800" },
    { title: "ĐÃ DẠY 8000 GIỜ", color: "bg-green-100 text-green-800" },
    { title: "CHỨNG CHỈ SEAL HỘI TIẾU", color: "bg-green-100 text-green-800" },
  ];

  const sidebarItems = isOwnerView 
    ? [
        { 
          icon: isEditMode ? Save : Edit, 
          title: isEditMode ? "Lưu thay đổi" : "Chỉnh sửa hồ sơ công khai", 
          color: isEditMode ? "text-green-500" : "text-blue-500" 
        },
        { icon: Settings, title: "Thiết lập lịch dạy", color: "text-green-500" },
        { icon: Calendar, title: "Yêu cầu đặt lịch", color: "text-purple-500" },
        { icon: BarChart3, title: "Thống kê chi tiết", color: "text-orange-500" },
      ]
    : [
        { icon: Heart, title: "THEO DÕI", color: "text-red-500" },
        { icon: Calendar, title: "ĐẶT LỊCH", color: "text-blue-500" },
        { icon: MessageCircle, title: "CHAT VỚI THẦY", color: "text-green-500" },
        { icon: Shield, title: "Báo cáo", color: "text-orange-500" },
      ];

  const freeOffers = Array(4).fill({
    title: "FREE 1H học thử 1 tuần",
    icon: "🎯"
  });



  // Helper functions for editing
  const addAchievement = () => {
    const newAchievement = { title: "Thành tích mới", color: "bg-blue-100 text-blue-800" };
    setEditableAchievements([...editableAchievements, newAchievement]);
  };

  const removeAchievement = (index: number) => {
    setEditableAchievements(editableAchievements.filter((_, i) => i !== index));
  };

  const addSubject = () => {
    const newSubject = { name: "MÔN MỚI", available: true };
    setEditableSubjects([...editableSubjects, newSubject]);
  };

  const removeSubject = (index: number) => {
    setEditableSubjects(editableSubjects.filter((_, i) => i !== index));
  };

  const addOffer = () => {
    const newOffer = { title: "Ưu đãi mới", icon: "🎯" };
    setEditableOffers([...editableOffers, newOffer]);
  };

  const removeOffer = (index: number) => {
    setEditableOffers(editableOffers.filter((_, i) => i !== index));
  };

  const addVideo = () => {
    const newVideo = { id: Date.now(), title: "ẢNH VÀ VIDEO GT" };
    setEditableVideos([...editableVideos, newVideo]);
  };

  const removeVideo = (index: number) => {
    setEditableVideos(editableVideos.filter((_, i) => i !== index));
  };

  // Reordering functions
  const moveItem = (array: any[], fromIndex: number, toIndex: number) => {
    const newArray = [...array];
    const [removed] = newArray.splice(fromIndex, 1);
    newArray.splice(toIndex, 0, removed);
    return newArray;
  };

  const moveAchievementUp = (index: number) => {
    if (index > 0) {
      setEditableAchievements(moveItem(editableAchievements, index, index - 1));
    }
  };

  const moveAchievementDown = (index: number) => {
    if (index < editableAchievements.length - 1) {
      setEditableAchievements(moveItem(editableAchievements, index, index + 1));
    }
  };

  const moveSubjectUp = (index: number) => {
    if (index > 0) {
      setEditableSubjects(moveItem(editableSubjects, index, index - 1));
    }
  };

  const moveSubjectDown = (index: number) => {
    if (index < editableSubjects.length - 1) {
      setEditableSubjects(moveItem(editableSubjects, index, index + 1));
    }
  };

  const moveVideoUp = (index: number) => {
    if (index > 0) {
      setEditableVideos(moveItem(editableVideos, index, index - 1));
    }
  };

  const moveVideoDown = (index: number) => {
    if (index < editableVideos.length - 1) {
      setEditableVideos(moveItem(editableVideos, index, index + 1));
    }
  };

  const moveOfferUp = (index: number) => {
    if (index > 0) {
      setEditableOffers(moveItem(editableOffers, index, index - 1));
    }
  };

  const moveOfferDown = (index: number) => {
    if (index < editableOffers.length - 1) {
      setEditableOffers(moveItem(editableOffers, index, index + 1));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-6 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Profile */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              {/* Profile Image */}
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto mb-4 rounded-lg border-2 border-orange-200 bg-orange-50 flex items-center justify-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-2xl">👨‍🏫</span>
                  </div>
                </div>
                
                {/* Rating */}
                <div className="flex justify-center mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(parseFloat(tutor.rating || "0"))
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {isEditMode && isOwnerView ? (
                    <div className="flex items-center justify-center space-x-2">
                      <Input
                        type="number"
                        value={editablePrice}
                        onChange={(e) => setEditablePrice(Number(e.target.value))}
                        className="w-20 text-center text-lg font-bold"
                      />
                      <span>₫/1h</span>
                    </div>
                  ) : (
                    `${formatPrice(tutor.pricePerHour)}₫/1h`
                  )}
                </div>
                <div className="text-sm text-gray-600">MINH TIẾN</div>
              </div>

              {/* Social Links */}
              <div className="flex justify-center space-x-3 mb-6">
                <Button variant="outline" size="icon" className="text-blue-600">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="text-red-600">
                  <Youtube className="h-4 w-4" />
                </Button>
              </div>

              {/* Stats */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Học tập</span>
                  <span className="font-medium">⭐⭐⭐⭐⭐</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Thành tích</span>
                  <span className="font-medium">⭐⭐⭐⭐⭐</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Achievements */}
            <div className="mb-6">
              <div className="flex items-center justify-center mb-4">
                <h2 className="text-lg font-semibold">BẢNG THÀNH TÍCH</h2>
                {isEditMode && isOwnerView && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={addAchievement}
                    className="ml-3"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {editableAchievements.map((achievement, index) => (
                  <Card key={index} className={`p-4 text-center ${achievement.color} relative`}>
                    {isEditMode && isOwnerView && (
                      <>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute -top-2 -right-2 h-6 w-6 p-0"
                          onClick={() => removeAchievement(index)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <div className="absolute -top-2 -left-2 flex flex-col space-y-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-5 w-5 p-0"
                            onClick={() => moveAchievementUp(index)}
                            disabled={index === 0}
                          >
                            <ArrowUp className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-5 w-5 p-0"
                            onClick={() => moveAchievementDown(index)}
                            disabled={index === editableAchievements.length - 1}
                          >
                            <ArrowDown className="h-3 w-3" />
                          </Button>
                        </div>
                      </>
                    )}
                    {isEditMode && isOwnerView ? (
                      <Input
                        value={achievement.title}
                        onChange={(e) => {
                          const newAchievements = [...editableAchievements];
                          newAchievements[index].title = e.target.value;
                          setEditableAchievements(newAchievements);
                        }}
                        className="text-sm font-medium bg-transparent border-none text-center p-0"
                      />
                    ) : (
                      <div className="text-sm font-medium">{achievement.title}</div>
                    )}
                  </Card>
                ))}
              </div>
            </div>

            {/* Subjects */}
            <div className="mb-6">
              <div className="flex items-center justify-center mb-4">
                <h3 className="text-lg font-semibold">NHẬN DẠY CÁC MÔN SAU</h3>
                {isEditMode && isOwnerView && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={addSubject}
                    className="ml-3"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {editableSubjects.map((subject, index) => (
                  <div key={index} className="relative">
                    {isEditMode && isOwnerView && (
                      <>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute -top-2 -right-2 h-6 w-6 p-0 z-10"
                          onClick={() => removeSubject(index)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <div className="absolute -top-2 -left-2 flex flex-col space-y-1 z-10">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-5 w-5 p-0"
                            onClick={() => moveSubjectUp(index)}
                            disabled={index === 0}
                          >
                            <ArrowUp className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-5 w-5 p-0"
                            onClick={() => moveSubjectDown(index)}
                            disabled={index === editableSubjects.length - 1}
                          >
                            <ArrowDown className="h-3 w-3" />
                          </Button>
                        </div>
                      </>
                    )}
                    {isEditMode && isOwnerView ? (
                      <Input
                        value={subject.name}
                        onChange={(e) => {
                          const newSubjects = [...editableSubjects];
                          newSubjects[index].name = e.target.value;
                          setEditableSubjects(newSubjects);
                        }}
                        className="text-sm text-center bg-primary text-white border-primary"
                      />
                    ) : (
                      <Button
                        variant={subject.available ? "default" : "outline"}
                        className={`text-sm w-full ${
                          subject.available 
                            ? "bg-primary text-white" 
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                        disabled={!subject.available}
                      >
                        {subject.name}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* About */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">THÔNG TIN</h3>
              <Card className="p-6">
                {isEditMode && isOwnerView ? (
                  <Textarea
                    value={editableInfo}
                    onChange={(e) => setEditableInfo(e.target.value)}
                    className="text-gray-700 leading-relaxed min-h-[100px] resize-none"
                    placeholder="Nhập thông tin về bản thân..."
                  />
                ) : (
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {editableInfo}
                  </p>
                )}
              </Card>
            </div>

            {/* Videos */}
            <div className="mb-6">
              <div className="flex items-center justify-center mb-4">
                <h3 className="text-lg font-semibold">ẢNH VÀ VIDEO GT</h3>
                {isEditMode && isOwnerView && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={addVideo}
                    className="ml-3"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {editableVideos.map((video, index) => (
                  <Card key={video.id} className="p-4 relative">
                    {isEditMode && isOwnerView && (
                      <>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute -top-2 -right-2 h-6 w-6 p-0 z-10"
                          onClick={() => removeVideo(index)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <div className="absolute -top-2 -left-2 flex flex-col space-y-1 z-10">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-5 w-5 p-0"
                            onClick={() => moveVideoUp(index)}
                            disabled={index === 0}
                          >
                            <ArrowUp className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-5 w-5 p-0"
                            onClick={() => moveVideoDown(index)}
                            disabled={index === editableVideos.length - 1}
                          >
                            <ArrowDown className="h-3 w-3" />
                          </Button>
                        </div>
                      </>
                    )}
                    <div className="bg-blue-200 rounded-lg h-32 flex items-center justify-center mb-3">
                      <Play className="h-8 w-8 text-blue-600" />
                    </div>
                    <p className="text-sm text-center font-medium">{video.title}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h3 className="text-lg font-semibold mb-4">ĐÁNH GIÁ</h3>
              <Card className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 text-sm">
                      Tôi đã học bằng thầy day hay và đề hỏu
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Action Buttons */}
            {sidebarItems.map((item, index) => (
              <Button 
                key={index} 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => {
                  if (item.title === "ĐẶT LỊCH") {
                    setIsBookingModalOpen(true);
                  } else if (item.title === "Chỉnh sửa hồ sơ công khai" || item.title === "Lưu thay đổi") {
                    if (isEditMode) {
                      // Save changes logic here
                      console.log("Saving changes...", {
                        price: editablePrice,
                        achievements: editableAchievements,
                        subjects: editableSubjects,
                        videos: editableVideos,
                        info: editableInfo,
                        offers: editableOffers
                      });
                    }
                    setIsEditMode(!isEditMode);
                  } else if (item.title === "Thiết lập lịch dạy") {
                    console.log("Schedule setup clicked");
                    // Handle schedule setup
                  } else if (item.title === "Yêu cầu đặt lịch") {
                    console.log("Booking requests clicked");
                    // Handle booking requests
                  } else if (item.title === "Thống kê chi tiết") {
                    console.log("Statistics clicked");
                    // Handle statistics view
                  }
                }}
              >
                <item.icon className={`h-5 w-5 mr-3 ${item.color}`} />
                {item.title}
              </Button>
            ))}

            {/* Free Offers */}
            <div className="space-y-3">
              <div className="flex items-center justify-center">
                <h4 className="font-semibold text-center">ƯU ĐÃI CỦA MINH TIẾN</h4>
                {isEditMode && isOwnerView && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={addOffer}
                    className="ml-3"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                )}
              </div>
              {editableOffers.map((offer, index) => (
                <Card key={index} className="p-4 border-purple-200 bg-purple-50 relative">
                  {isEditMode && isOwnerView && (
                    <>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-6 w-6 p-0 z-10"
                        onClick={() => removeOffer(index)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <div className="absolute -top-2 -left-2 flex flex-col space-y-1 z-10">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-5 w-5 p-0"
                          onClick={() => moveOfferUp(index)}
                          disabled={index === 0}
                        >
                          <ArrowUp className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-5 w-5 p-0"
                          onClick={() => moveOfferDown(index)}
                          disabled={index === editableOffers.length - 1}
                        >
                          <ArrowDown className="h-3 w-3" />
                        </Button>
                      </div>
                    </>
                  )}
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{offer.icon}</span>
                    {isEditMode && isOwnerView ? (
                      <Input
                        value={offer.title}
                        onChange={(e) => {
                          const newOffers = [...editableOffers];
                          newOffers[index].title = e.target.value;
                          setEditableOffers(newOffers);
                        }}
                        className="text-sm font-medium text-purple-800 bg-transparent border-none p-0"
                      />
                    ) : (
                      <div className="text-sm font-medium text-purple-800">
                        {offer.title}
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal 
        tutor={tutor}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
}
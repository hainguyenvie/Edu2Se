import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import {
  GraduationCap,
  Users,
  Clock,
  DollarSign,
  MapPin,
  Zap,
  MessageCircle,
  Heart,
  User,
  Star,
  ChevronRight
} from "lucide-react";

interface QuickRequest {
  id: string;
  type: "need-tutor" | "need-student";
  userId: string;
  userName: string;
  userAvatar?: string;
  userRating?: number;
  subject: string;
  grade: string;
  budget?: number;
  hourlyRate?: number;
  timeSlots: string[];
  description: string;
  location?: string;
  urgent: boolean;
  postedAt: Date;
  contactCount: number;
  isBookmarked?: boolean;
}

interface QuickRequestsFeedProps {
  limit?: number;
  showHeader?: boolean;
  filterType?: "need-tutor" | "need-student" | "all";
}

export default function QuickRequestsFeed({ 
  limit = 10, 
  showHeader = true, 
  filterType = "all" 
}: QuickRequestsFeedProps) {
  const { toast } = useToast();
  const [requests, setRequests] = useState<QuickRequest[]>([
    {
      id: "1",
      type: "need-tutor",
      userId: "user1",
      userName: "Nguyễn Minh Anh",
      userAvatar: "/api/placeholder/40/40",
      subject: "Toán",
      grade: "Lớp 12",
      budget: 500000,
      timeSlots: ["Tối (18h-22h)", "Cuối tuần"],
      description: "Cần gia sư dạy kèm Toán 12, chuẩn bị thi Đại học. Mong muốn thầy/cô có kinh nghiệm và nhiệt tình.",
      location: "Quận Cầu Giấy, Hà Nội",
      urgent: true,
      postedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      contactCount: 12,
      isBookmarked: false
    },
    {
      id: "2",
      type: "need-student",
      userId: "user2",
      userName: "Thầy Việt Hoàng",
      userAvatar: "/api/placeholder/40/40",
      userRating: 4.9,
      subject: "Lý",
      grade: "Lớp 10, Lớp 11",
      hourlyRate: 200000,
      timeSlots: ["Chiều (13h-17h)", "Tối (18h-22h)"],
      description: "Thầy có 5 năm kinh nghiệm dạy Lý, đã giúp nhiều em đạt điểm cao. Phương pháp dạy dễ hiểu, tận tâm.",
      location: "Quận Đống Đa, Hà Nội",
      urgent: false,
      postedAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      contactCount: 8,
      isBookmarked: true
    },
    {
      id: "3",
      type: "need-tutor",
      userId: "user3",
      userName: "Chị Thanh Hường",
      subject: "Tiếng Anh",
      grade: "Lớp 8",
      budget: 300000,
      timeSlots: ["Sáng (7h-12h)", "Chiều (13h-17h)"],
      description: "Con tôi cần học thêm Tiếng Anh, hiện tại khá yếu. Mong tìm được cô dạy kiên trì và vui vẻ.",
      location: "Quận Hoàng Mai, Hà Nội",
      urgent: false,
      postedAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      contactCount: 5,
      isBookmarked: false
    },
    {
      id: "4",
      type: "need-student",
      userId: "user4",
      userName: "Cô Lan Anh",
      userRating: 4.8,
      subject: "Hóa",
      grade: "Lớp 11, Lớp 12",
      hourlyRate: 180000,
      timeSlots: ["Tối (18h-22h)", "Cuối tuần"],
      description: "Cô chuyên dạy Hóa THPT, có bằng Thạc sĩ Hóa học. Đã giúp nhiều em đỗ đại học với điểm cao.",
      location: "Quận Hai Bà Trưng, Hà Nội",
      urgent: false,
      postedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      contactCount: 15,
      isBookmarked: false
    }
  ]);

  const filteredRequests = requests
    .filter(req => filterType === "all" || req.type === filterType)
    .slice(0, limit);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} phút trước`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} giờ trước`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} ngày trước`;
    }
  };

  const handleContact = (requestId: string) => {
    toast({
      title: "Đã gửi liên hệ",
      description: "Thông tin liên hệ đã được gửi. Người đăng sẽ liên hệ lại với bạn sớm!"
    });
    
    // Update contact count
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, contactCount: req.contactCount + 1 }
        : req
    ));
  };

  const handleBookmark = (requestId: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, isBookmarked: !req.isBookmarked }
        : req
    ));
  };

  return (
    <div className="space-y-4">
      {showHeader && (
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Yêu Cầu Nhanh</h2>
          <Button variant="outline" size="sm">
            Xem tất cả
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}

      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <Card key={request.id} className={`hover:shadow-md transition-shadow ${
            request.urgent ? 'border-yellow-300 bg-yellow-50/30' : ''
          }`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                {/* User Avatar */}
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarImage src={request.userAvatar} />
                  <AvatarFallback>
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{request.userName}</span>
                        {request.userRating && (
                          <div className="flex items-center text-yellow-500">
                            <Star className="w-3 h-3 fill-current" />
                            <span className="text-xs ml-1">{request.userRating}</span>
                          </div>
                        )}
                        {request.urgent && (
                          <Badge className="bg-yellow-100 text-yellow-800 text-xs px-1.5 py-0.5">
                            <Zap className="w-3 h-3 mr-1" />
                            Gấp
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {formatTimeAgo(request.postedAt)}
                        {request.location && (
                          <>
                            <span>•</span>
                            <MapPin className="w-3 h-3" />
                            {request.location}
                          </>
                        )}
                      </div>
                    </div>
                    
                    <Badge className={`text-xs ${
                      request.type === "need-tutor" 
                        ? "bg-blue-100 text-blue-800" 
                        : "bg-orange-100 text-orange-800"
                    }`}>
                      {request.type === "need-tutor" ? (
                        <>
                          <GraduationCap className="w-3 h-3 mr-1" />
                          Cần gia sư
                        </>
                      ) : (
                        <>
                          <Users className="w-3 h-3 mr-1" />
                          Cần học sinh
                        </>
                      )}
                    </Badge>
                  </div>

                  {/* Subject & Grade */}
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {request.subject}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {request.grade}
                    </Badge>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                    {request.description}
                  </p>

                  {/* Time Slots */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {request.timeSlots.map((slot, index) => (
                      <Badge key={index} variant="outline" className="text-xs px-2 py-0.5">
                        {slot}
                      </Badge>
                    ))}
                  </div>

                  {/* Price & Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center text-green-600 font-medium text-sm">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {request.budget 
                          ? formatCurrency(request.budget) + "/tháng"
                          : formatCurrency(request.hourlyRate!) + "/h"
                        }
                      </div>
                      <div className="flex items-center text-gray-500 text-xs">
                        <MessageCircle className="w-3 h-3 mr-1" />
                        {request.contactCount} lượt liên hệ
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleBookmark(request.id)}
                        className={`p-2 ${request.isBookmarked ? 'text-red-500' : 'text-gray-400'}`}
                      >
                        <Heart className={`w-4 h-4 ${request.isBookmarked ? 'fill-current' : ''}`} />
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => handleContact(request.id)}
                        className={`${
                          request.type === "need-tutor"
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-orange-600 hover:bg-orange-700"
                        }`}
                      >
                        <MessageCircle className="w-3 h-3 mr-1" />
                        Liên hệ
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <Card className="p-8 text-center">
          <div className="text-gray-500">
            <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p>Chưa có yêu cầu nào</p>
            <p className="text-sm mt-1">Hãy là người đầu tiên đăng yêu cầu!</p>
          </div>
        </Card>
      )}
    </div>
  );
}

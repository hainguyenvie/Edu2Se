import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  BookOpen,
  GraduationCap,
  Clock,
  MapPin,
  DollarSign,
  Star,
  MessageCircle,
  Plus,
  Search,
  Filter,
  Calendar,
  Users,
  Zap
} from "lucide-react";
import Header from "@/components/header";
import { useAuth } from "@/contexts/auth-context";

type RequestType = "cần học" | "cần dạy";

interface QuickRequest {
  id: string;
  type: RequestType;
  title: string;
  subject: string;
  grade?: string;
  location: string;
  budget: string;
  description: string;
  author: {
    name: string;
    avatar?: string;
    role: "student" | "tutor";
    rating?: number;
  };
  createdAt: string;
  urgent: boolean;
  responses: number;
  status: "active" | "fulfilled" | "expired";
}

export default function QuickRequestsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<RequestType>("cần học");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  // Mock data for quick requests
  const quickRequests: QuickRequest[] = [
    {
      id: "1",
      type: "cần học",
      title: "Cần gia sư Toán 12 gấp - thi học kỳ tuần sau",
      subject: "Toán",
      grade: "Lớp 12",
      location: "Quận Cầu Giấy, Hà Nội",
      budget: "150,000 - 200,000₫/h",
      description: "Em cần học gấp phần đạo hàm và tích phân để chuẩn bị thi học kỳ. Có thể học online hoặc offline đều được. Mong các thầy cô liên hệ.",
      author: {
        name: "Nguyễn Văn A",
        avatar: "/api/placeholder/32/32",
        role: "student"
      },
      createdAt: "2 giờ trước",
      urgent: true,
      responses: 5,
      status: "active"
    },
    {
      id: "2",
      type: "cần dạy",
      title: "Gia sư Lý 10-11 tìm học viên - chuyên Cơ học",
      subject: "Lý",
      grade: "Lớp 10-11",
      location: "Quận Đống Đa, Hà Nội",
      budget: "120,000 - 180,000₫/h",
      description: "Thầy có 3 năm kinh nghiệm dạy Vật lý, chuyên phần Cơ học. Phương pháp dạy dễ hiểu, có tài liệu riêng. Nhận dạy cả online và offline.",
      author: {
        name: "Thầy Minh Đức",
        avatar: "/api/placeholder/32/32",
        role: "tutor",
        rating: 4.8
      },
      createdAt: "5 giờ trước",
      urgent: false,
      responses: 3,
      status: "active"
    },
    {
      id: "3",
      type: "cần học",
      title: "Tìm gia sư Hóa 12 - ôn thi THPT Quốc gia",
      subject: "Hóa",
      grade: "Lớp 12",
      location: "Quận Ba Đình, Hà Nội",
      budget: "180,000 - 250,000₫/h",
      description: "Cần gia sư có kinh nghiệm luyện thi THPT QG môn Hóa. Ưu tiên thầy cô có tài liệu ôn tập và đề thi thử.",
      author: {
        name: "Trần Thị B",
        avatar: "/api/placeholder/32/32",
        role: "student"
      },
      createdAt: "1 ngày trước",
      urgent: false,
      responses: 8,
      status: "active"
    },
    {
      id: "4",
      type: "cần dạy",
      title: "Nhận dạy Tiếng Anh giao tiếp - Native speaker",
      subject: "Tiếng Anh",
      location: "Online hoặc TP.HCM",
      budget: "300,000 - 500,000₫/h",
      description: "Native English speaker với 5 năm kinh nghiệm dạy tiếng Anh giao tiếp cho người Việt. Chuyên IELTS, TOEIC và English for Business.",
      author: {
        name: "John Smith",
        avatar: "/api/placeholder/32/32",
        role: "tutor",
        rating: 4.9
      },
      createdAt: "3 ngày trước",
      urgent: false,
      responses: 12,
      status: "active"
    }
  ];

  const subjects = ["Toán", "Lý", "Hóa", "Sinh", "Văn", "Anh", "Sử", "Địa", "GDCD"];
  const grades = ["Lớp 6", "Lớp 7", "Lớp 8", "Lớp 9", "Lớp 10", "Lớp 11", "Lớp 12"];

  const filteredRequests = quickRequests.filter(request => {
    const matchesTab = request.type === activeTab;
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === "" || request.subject === selectedSubject;
    return matchesTab && matchesSearch && matchesSubject;
  });

  const CreateRequestModal = () => {
    const [formData, setFormData] = useState({
      type: "cần học" as RequestType,
      title: "",
      subject: "",
      grade: "",
      location: "",
      budget: "",
      description: "",
      urgent: false
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Handle form submission
      console.log("Creating request:", formData);
      setIsCreateModalOpen(false);
      // Reset form
      setFormData({
        type: "cần học",
        title: "",
        subject: "",
        grade: "",
        location: "",
        budget: "",
        description: "",
        urgent: false
      });
    };

    return (
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Đăng yêu cầu nhanh</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Loại yêu cầu</Label>
                <Select value={formData.type} onValueChange={(value: RequestType) => setFormData({...formData, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cần học">Cần học</SelectItem>
                    <SelectItem value="cần dạy">Cần dạy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Môn học</Label>
                <Select value={formData.subject} onValueChange={(value) => setFormData({...formData, subject: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn môn học" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map(subject => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Tiêu đề</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="VD: Cần gia sư Toán 12 gấp - thi học kỳ tuần sau"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Lớp học</Label>
                <Select value={formData.grade} onValueChange={(value) => setFormData({...formData, grade: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn lớp" />
                  </SelectTrigger>
                  <SelectContent>
                    {grades.map(grade => (
                      <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Khu vực</Label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="VD: Quận Cầu Giấy, Hà Nội"
                  required
                />
              </div>
            </div>

            <div>
              <Label>Ngân sách</Label>
              <Input
                value={formData.budget}
                onChange={(e) => setFormData({...formData, budget: e.target.value})}
                placeholder="VD: 150,000 - 200,000₫/h"
                required
              />
            </div>

            <div>
              <Label>Mô tả chi tiết</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Mô tả yêu cầu của bạn..."
                className="min-h-24"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="urgent"
                checked={formData.urgent}
                onChange={(e) => setFormData({...formData, urgent: e.target.checked})}
                className="rounded"
              />
              <Label htmlFor="urgent">Yêu cầu gấp</Label>
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Hủy
              </Button>
              <Button type="submit">
                Đăng yêu cầu
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-6 py-8 pt-24">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Yêu Cầu Nhanh (Kiểu rao vặt)</h1>
          <p className="text-gray-600">Đăng yêu cầu học tập hoặc giảng dạy nhanh chóng, kết nối trực tiếp với cộng đồng</p>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Tìm kiếm yêu cầu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Môn học" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tất cả</SelectItem>
                {subjects.map(subject => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={() => setIsCreateModalOpen(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Đăng yêu cầu
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as RequestType)} className="mb-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="cần học" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Cần học ({quickRequests.filter(r => r.type === "cần học").length})
            </TabsTrigger>
            <TabsTrigger value="cần dạy" className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Cần dạy ({quickRequests.filter(r => r.type === "cần dạy").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredRequests.map((request) => (
                <Card key={request.id} className="shadow-lg border-0 hover:shadow-xl transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge 
                            variant={request.type === "cần học" ? "default" : "secondary"} 
                            className={request.type === "cần học" ? "bg-blue-600" : "bg-green-600"}
                          >
                            {request.type === "cần học" ? "Cần học" : "Cần dạy"}
                          </Badge>
                          {request.urgent && (
                            <Badge variant="destructive" className="text-xs">
                              <Zap className="w-3 h-3 mr-1" />
                              Gấp
                            </Badge>
                          )}
                          <Badge variant="outline">{request.subject}</Badge>
                          {request.grade && (
                            <Badge variant="outline">{request.grade}</Badge>
                          )}
                        </div>
                        <h3 className="font-bold text-lg leading-tight">{request.title}</h3>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4 line-clamp-3">{request.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {request.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <DollarSign className="w-4 h-4 mr-2" />
                        {request.budget}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        {request.createdAt}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={request.author.avatar} />
                          <AvatarFallback>{request.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{request.author.name}</p>
                          <div className="flex items-center text-xs text-gray-500">
                            <Users className="w-3 h-3 mr-1" />
                            {request.author.role === "student" ? "Học viên" : "Gia sư"}
                            {request.author.rating && (
                              <>
                                <Star className="w-3 h-3 ml-2 mr-1 fill-yellow-400 text-yellow-400" />
                                {request.author.rating}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {request.responses}
                        </div>
                        <Button size="sm">
                          {request.type === "cần học" ? "Ứng tuyển" : "Liên hệ"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredRequests.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Không tìm thấy yêu cầu nào
                </h3>
                <p className="text-gray-500 mb-4">
                  Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
                </p>
                <Button onClick={() => setIsCreateModalOpen(true)}>
                  Tạo yêu cầu đầu tiên
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <CreateRequestModal />
    </div>
  );
}

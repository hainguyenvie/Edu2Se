import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageCircle, 
  Clock, 
  User, 
  BookOpen, 
  Plus,
  Eye,
  ThumbsUp,
  Share2
} from "lucide-react";
import Header from "@/components/header";

interface Question {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    isTutor: boolean;
  };
  subject: string;
  timestamp: string;
  answersCount: number;
  viewsCount: number;
  likesCount: number;
  tags: string[];
}

export default function QAForum() {
  const [activeTab, setActiveTab] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    subject: ""
  });

  // Mock data for questions
  const questions: Question[] = [
    {
      id: "1",
      title: "Cách giải bài toán tích phân này?",
      content: "Tôi đang gặp khó khăn với bài toán tích phân này. Có ai có thể giúp tôi giải thích cách làm không? Đây là bài toán: ∫(x²+2x+1)dx từ 0 đến 2.",
      author: {
        name: "Nguyễn Minh Anh",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop",
        isTutor: false
      },
      subject: "Toán",
      timestamp: "2 giờ trước",
      answersCount: 5,
      viewsCount: 124,
      likesCount: 12,
      tags: ["Tích phân", "Lớp 12", "Đại học"]
    },
    {
      id: "2",
      title: "Phương pháp học IELTS Speaking hiệu quả?",
      content: "Mình đang chuẩn bị thi IELTS và muốn cải thiện Speaking. Có ai có kinh nghiệm chia sẻ phương pháp học hiệu quả không? Mình đang ở band 6.0 và muốn đạt 7.0+.",
      author: {
        name: "Thầy Đức Anh",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
        isTutor: true
      },
      subject: "Tiếng Anh",
      timestamp: "4 giờ trước",
      answersCount: 8,
      viewsCount: 89,
      likesCount: 23,
      tags: ["IELTS", "Speaking", "Band 7.0"]
    },
    {
      id: "3",
      title: "Giải thích về phản ứng oxi hóa khử",
      content: "Em không hiểu rõ về phản ứng oxi hóa khử trong hóa học. Có thể ai đó giải thích đơn giản và cho ví dụ cụ thể không? Em đang học lớp 11.",
      author: {
        name: "Lê Thu Hương",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
        isTutor: false
      },
      subject: "Hóa",
      timestamp: "1 ngày trước",
      answersCount: 3,
      viewsCount: 67,
      likesCount: 8,
      tags: ["Oxi hóa khử", "Lớp 11", "Hóa vô cơ"]
    },
    {
      id: "4",
      title: "Cách viết essay cho bài thi THPT Quốc gia",
      content: "Mình cần tips viết essay cho môn Văn trong kỳ thi THPT. Có ai có kinh nghiệm chia sẻ cấu trúc và cách viết hiệu quả không?",
      author: {
        name: "Cô Thanh Huyền",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop",
        isTutor: true
      },
      subject: "Văn",
      timestamp: "2 ngày trước",
      answersCount: 12,
      viewsCount: 156,
      likesCount: 34,
      tags: ["Essay", "THPT Quốc gia", "Văn học"]
    },
    {
      id: "5",
      title: "Bài tập về dao động điều hòa",
      content: "Ai có thể giúp mình giải bài tập này về dao động điều hòa không? Một con lắc đơn có chiều dài l = 1m, g = 9.8 m/s². Tính chu kỳ dao động.",
      author: {
        name: "Trần Hoàng Nam",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        isTutor: false
      },
      subject: "Lý",
      timestamp: "3 ngày trước",
      answersCount: 6,
      viewsCount: 98,
      likesCount: 15,
      tags: ["Dao động", "Con lắc", "Lớp 12"]
    }
  ];

  const subjects = [
    "Toán", "Lý", "Hóa", "Sinh", "Văn", "Sử", "Địa", "Tiếng Anh", "Tin học", "Khác"
  ];

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement question submission
    console.log("Submitting question:", formData);
    setFormData({ title: "", content: "", subject: "" });
    setShowForm(false);
  };

  const handleViewQuestion = (questionId: string) => {
    // TODO: Navigate to question detail page
    console.log("Viewing question:", questionId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8 pt-24 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            💬 Diễn Đàn Hỏi Đáp
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Đặt câu hỏi, chia sẻ kiến thức và kết nối với cộng đồng học tập AitheduConnect
          </p>
        </div>

        {/* Post Question Button */}
        <div className="flex justify-center mb-8">
          <Button 
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 rounded-full shadow-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Đặt Câu Hỏi
          </Button>
        </div>

        {/* Question Form */}
        {showForm && (
          <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">Đặt Câu Hỏi Mới</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitQuestion} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tiêu đề câu hỏi *
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Nhập tiêu đề câu hỏi của bạn..."
                    required
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Môn học
                  </label>
                  <Select value={formData.subject} onValueChange={(value) => setFormData({ ...formData, subject: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn môn học" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nội dung câu hỏi *
                  </label>
                  <Textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Mô tả chi tiết câu hỏi của bạn..."
                    required
                    rows={6}
                    className="w-full"
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                    Đăng Câu Hỏi
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setShowForm(false)}
                  >
                    Hủy
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Filter Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-white rounded-xl p-1 shadow-sm border border-gray-200">
            {[
              { id: "all", label: "Tất cả", icon: MessageCircle },
              { id: "math", label: "Toán", icon: BookOpen },
              { id: "english", label: "Tiếng Anh", icon: BookOpen },
              { id: "physics", label: "Lý", icon: BookOpen },
              { id: "chemistry", label: "Hóa", icon: BookOpen }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${isActive 
                      ? "bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-md" 
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {questions.map((question) => (
            <Card key={question.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.01] border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Author Avatar */}
                  <div className="flex flex-col items-center gap-2">
                    <Avatar className="w-12 h-12 border-2 border-white shadow-md">
                      <AvatarImage src={question.author.avatar} alt={question.author.name} />
                      <AvatarFallback>{question.author.name[0]}</AvatarFallback>
                    </Avatar>
                    {question.author.isTutor && (
                      <Badge className="bg-blue-600 text-white text-xs">
                        Gia sư
                      </Badge>
                    )}
                  </div>

                  {/* Question Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900 hover:text-green-600 cursor-pointer transition-colors">
                        {question.title}
                      </h3>
                      <Badge variant="outline" className="bg-gradient-to-r from-green-100 to-blue-100 border-green-200">
                        {question.subject}
                      </Badge>
                    </div>

                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {question.content}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {question.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs bg-gray-100 border-gray-200">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{question.author.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{question.timestamp}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{question.answersCount} trả lời</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{question.viewsCount} lượt xem</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{question.likesCount} thích</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex flex-col items-end gap-2">
                    <Button 
                      onClick={() => handleViewQuestion(question.id)}
                      className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Xem Chi Tiết
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <Button variant="outline" className="px-8 py-3">
            Tải Thêm Câu Hỏi
          </Button>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  Users, 
  Clock, 
  BookOpen, 
  GraduationCap,
  Calendar,
  Star,
  Plus,
  Eye
} from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/header";

interface CreateRoomForm {
  roomName: string;
  subject: string;
  gradeLevel: string;
  description: string;
  maxParticipants: number;
  startTime: string;
  startDate: string;
}

export default function CreateStudyRoom() {
  const [formData, setFormData] = useState<CreateRoomForm>({
    roomName: "",
    subject: "",
    gradeLevel: "",
    description: "",
    maxParticipants: 20,
    startTime: "",
    startDate: ""
  });

  const [errors, setErrors] = useState<Partial<CreateRoomForm>>({});

  // Mock data for dropdowns
  const subjects = [
    "Toán", "Lý", "Hóa", "Sinh", "Văn", "Sử", "Địa", "Tiếng Anh", "Tin học", "Tất cả"
  ];

  const gradeLevels = [
    { value: "primary", label: "Tiểu học (Lớp 1-5)" },
    { value: "secondary", label: "THCS (Lớp 6-9)" },
    { value: "high-school", label: "THPT (Lớp 10-12)" },
    { value: "university", label: "Đại học" },
    { value: "all", label: "Mọi lứa tuổi" }
  ];

  const timeSlots = [
    "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", 
    "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"
  ];

  const handleInputChange = (field: keyof CreateRoomForm, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CreateRoomForm> = {};

    if (!formData.roomName.trim()) {
      newErrors.roomName = "Tên phòng học là bắt buộc";
    }

    if (!formData.subject) {
      newErrors.subject = "Vui lòng chọn môn học";
    }

    if (!formData.gradeLevel) {
      newErrors.gradeLevel = "Vui lòng chọn cấp độ";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Mô tả là bắt buộc";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Vui lòng chọn ngày";
    }

    if (!formData.startTime) {
      newErrors.startTime = "Vui lòng chọn thời gian";
    }

    if (formData.maxParticipants < 2 || formData.maxParticipants > 50) {
      newErrors.maxParticipants = "Số người tham gia phải từ 2-50";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // TODO: Implement room creation
      console.log("Creating room:", formData);
      // Navigate back to study-with-me page
      window.location.href = "/study-with-me";
    }
  };

  const getGradeLevelLabel = (value: string) => {
    return gradeLevels.find(level => level.value === value)?.label || value;
  };

  const getTargetAudience = () => {
    if (!formData.gradeLevel) return "";
    const level = gradeLevels.find(l => l.value === formData.gradeLevel);
    return level ? level.label.replace(/\([^)]*\)/g, '').trim() : "";
  };

  // Preview room data
  const previewRoom = {
    id: "preview",
    creator: {
      name: "Bạn",
      avatar: "👤",
      rating: 5.0
    },
    participants: 0,
    maxParticipants: formData.maxParticipants,
    bio: formData.description || "Mô tả phòng học sẽ hiển thị ở đây...",
    startTime: formData.startDate && formData.startTime ? `${formData.startDate} ${formData.startTime}` : "Chưa chọn thời gian",
    subject: formData.subject || "Chưa chọn môn",
    targetAudience: getTargetAudience() || "Chưa chọn cấp độ",
    isLive: false
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8 pt-24 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/study-with-me">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Quay lại
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                🎓 Tạo Phòng Học Cùng Nhau
              </h1>
              <p className="text-gray-600 mt-1">
                Tạo phòng học mới và kết nối với cộng đồng học tập
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-blue-600" />
                  Thông Tin Phòng Học
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Room Name */}
                  <div className="space-y-2">
                    <Label htmlFor="roomName" className="text-sm font-medium text-gray-700">
                      Tên phòng học *
                    </Label>
                    <Input
                      id="roomName"
                      value={formData.roomName}
                      onChange={(e) => handleInputChange("roomName", e.target.value)}
                      placeholder="Nhập tên phòng học..."
                      className={errors.roomName ? "border-red-500" : ""}
                    />
                    {errors.roomName && (
                      <p className="text-red-500 text-xs">{errors.roomName}</p>
                    )}
                  </div>

                  {/* Subject and Grade Level */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
                        Môn học *
                      </Label>
                      <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                        <SelectTrigger className={errors.subject ? "border-red-500" : ""}>
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
                      {errors.subject && (
                        <p className="text-red-500 text-xs">{errors.subject}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gradeLevel" className="text-sm font-medium text-gray-700">
                        Cấp độ *
                      </Label>
                      <Select value={formData.gradeLevel} onValueChange={(value) => handleInputChange("gradeLevel", value)}>
                        <SelectTrigger className={errors.gradeLevel ? "border-red-500" : ""}>
                          <SelectValue placeholder="Chọn cấp độ" />
                        </SelectTrigger>
                        <SelectContent>
                          {gradeLevels.map((level) => (
                            <SelectItem key={level.value} value={level.value}>
                              {level.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.gradeLevel && (
                        <p className="text-red-500 text-xs">{errors.gradeLevel}</p>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                      Mô tả phòng học *
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Mô tả chi tiết về phòng học, mục tiêu học tập, phương pháp..."
                      rows={4}
                      className={errors.description ? "border-red-500" : ""}
                    />
                    {errors.description && (
                      <p className="text-red-500 text-xs">{errors.description}</p>
                    )}
                  </div>

                  {/* Max Participants */}
                  <div className="space-y-2">
                    <Label htmlFor="maxParticipants" className="text-sm font-medium text-gray-700">
                      Số người tham gia tối đa *
                    </Label>
                    <Input
                      id="maxParticipants"
                      type="number"
                      min="2"
                      max="50"
                      value={formData.maxParticipants}
                      onChange={(e) => handleInputChange("maxParticipants", parseInt(e.target.value))}
                      className={errors.maxParticipants ? "border-red-500" : ""}
                    />
                    {errors.maxParticipants && (
                      <p className="text-red-500 text-xs">{errors.maxParticipants}</p>
                    )}
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate" className="text-sm font-medium text-gray-700">
                        Ngày bắt đầu *
                      </Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => handleInputChange("startDate", e.target.value)}
                        className={errors.startDate ? "border-red-500" : ""}
                      />
                      {errors.startDate && (
                        <p className="text-red-500 text-xs">{errors.startDate}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="startTime" className="text-sm font-medium text-gray-700">
                        Thời gian bắt đầu *
                      </Label>
                      <Select value={formData.startTime} onValueChange={(value) => handleInputChange("startTime", value)}>
                        <SelectTrigger className={errors.startTime ? "border-red-500" : ""}>
                          <SelectValue placeholder="Chọn thời gian" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.startTime && (
                        <p className="text-red-500 text-xs">{errors.startTime}</p>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg font-semibold"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Tạo Phòng Học
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-green-600" />
                  Xem Trước Phòng Học
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Preview Card */}
                  <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        {/* Left Section - Avatar and Info */}
                        <div className="flex items-center space-x-4">
                          {/* Avatar */}
                          <div className="relative">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                              <span className="text-2xl">{previewRoom.creator.avatar}</span>
                            </div>
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          </div>

                          {/* Creator Info */}
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{previewRoom.creator.name}</h3>
                            <div className="flex items-center space-x-1 mb-2">
                              {Array.from({ length: 5 }, (_, index) => (
                                <Star
                                  key={index}
                                  className={`w-4 h-4 ${
                                    index < Math.floor(previewRoom.creator.rating) 
                                      ? "text-yellow-400 fill-current" 
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                              <span className="text-sm text-gray-500 ml-2">
                                {previewRoom.creator.rating}
                              </span>
                            </div>
                            
                            {/* Subject and Target Audience */}
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <span className="text-sm text-gray-700">
                                {previewRoom.subject} • {previewRoom.targetAudience}
                              </span>
                            </div>
                            
                            {/* Bio */}
                            <p className="text-sm text-gray-600 mb-2 max-w-md">{previewRoom.bio}</p>
                            
                            {/* Time and Participants */}
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{previewRoom.startTime}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="w-3 h-3" />
                                <span>{previewRoom.participants}/{previewRoom.maxParticipants}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right Section - Participants and Join Button */}
                        <div className="flex flex-col items-end space-y-3">
                          {/* Participants Count */}
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">{previewRoom.participants}</div>
                            <div className="text-xs text-gray-500">người tham gia</div>
                          </div>

                          {/* Action Button */}
                          <div className="flex space-x-2">
                            <Button 
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700 px-6 shadow-sm"
                              disabled
                            >
                              Tham gia
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Participants Progress Bar */}
                      <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(previewRoom.participants / previewRoom.maxParticipants) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Preview Info */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">💡 Lưu ý:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Phòng học sẽ hiển thị trong danh sách sau khi tạo</li>
                      <li>• Bạn sẽ là người tạo và quản lý phòng học này</li>
                      <li>• Có thể chỉnh sửa thông tin phòng học sau khi tạo</li>
                      <li>• Phòng học sẽ tự động đóng khi đạt số người tối đa</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

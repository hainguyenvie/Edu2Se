import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, Upload, Check } from "lucide-react";

interface TutorRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type RegistrationStage = 1 | 2 | 3 | 4 | 5;

export default function TutorRegistrationModal({ isOpen, onClose }: TutorRegistrationModalProps) {
  const [stage, setStage] = useState<RegistrationStage>(1);
  const [formData, setFormData] = useState({
    // Stage 1 - Personal Info
    fullName: "",
    phone: "",
    email: "",
    birthDate: "",
    gender: "",
    address: "",
    
    // Stage 2 - Education & Experience
    university: "",
    major: "",
    graduationYear: "",
    degree: "",
    gpa: "",
    
    // Stage 3 - Teaching Experience
    experience: "",
    subjects: [] as string[],
    gradelevels: [] as string[],
    teachingMethod: "",
    teachingPhilosophy: "",
    
    // Stage 4 - Video & Schedule
    videoUrl: "",
    availableDays: "",
    schedule: "",
    calendlyLink: ""
  });

  const handleNext = () => {
    if (stage < 5) {
      setStage((prev) => (prev + 1) as RegistrationStage);
    }
  };

  const handleBack = () => {
    if (stage > 1) {
      setStage((prev) => (prev - 1) as RegistrationStage);
    }
  };

  const handleClose = () => {
    setStage(1);
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      birthDate: "",
      gender: "",
      address: "",
      university: "",
      major: "",
      graduationYear: "",
      degree: "",
      gpa: "",
      experience: "",
      subjects: [],
      gradelevels: [],
      teachingMethod: "",
      teachingPhilosophy: "",
      videoUrl: "",
      availableDays: "",
      schedule: "",
      calendlyLink: ""
    });
    onClose();
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubjectChange = (subject: string, checked: boolean) => {
    if (checked) {
      updateFormData('subjects', [...formData.subjects, subject]);
    } else {
      updateFormData('subjects', formData.subjects.filter(s => s !== subject));
    }
  };

  const handleGradeLevelChange = (grade: string, checked: boolean) => {
    if (checked) {
      updateFormData('gradelevels', [...formData.gradelevels, grade]);
    } else {
      updateFormData('gradelevels', formData.gradelevels.filter(g => g !== grade));
    }
  };

  const renderProgressSteps = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4, 5].map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
              step <= stage ? 'bg-green-600' : 'bg-gray-400'
            }`}
          >
            {step}
          </div>
          {step < 5 && (
            <div className={`w-12 h-1 mx-2 ${step < stage ? 'bg-green-600' : 'bg-gray-300'}`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderStage1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2">BƯỚC 1: Thông tin cá nhân + CCCD</h3>
        <p className="text-sm text-gray-600">
          Thu thập thông tin cơ bản về các thông đánh hình ban đầu...
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName">Họ và tên</Label>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) => updateFormData('fullName', e.target.value)}
            placeholder="Nhập họ và tên"
          />
        </div>

        <div>
          <Label htmlFor="phone">Số điện thoại</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => updateFormData('phone', e.target.value)}
            placeholder="Nhập số điện thoại"
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            placeholder="Nhập email"
          />
        </div>

        <div>
          <Label htmlFor="birthDate">Ngày sinh</Label>
          <Input
            id="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={(e) => updateFormData('birthDate', e.target.value)}
          />
        </div>

        <div>
          <Label>Giới tính</Label>
          <RadioGroup
            value={formData.gender}
            onValueChange={(value) => updateFormData('gender', value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Nam" id="male" />
              <Label htmlFor="male">Nam</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Nữ" id="female" />
              <Label htmlFor="female">Nữ</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Khác" id="other" />
              <Label htmlFor="other">Khác</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="address">Địa chỉ hiện tại</Label>
          <Textarea
            id="address"
            value={formData.address}
            onChange={(e) => updateFormData('address', e.target.value)}
            placeholder="Nhập địa chỉ"
          />
        </div>

        <div className="border-t pt-4">
          <Label>Upload CCCD/CMND</Label>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600">Khu vực ảnh mặt trước CCCD của bạn sẽ xuất hiện tại đây</p>
              <Button variant="outline" size="sm" className="mt-2">
                Mặt trước
              </Button>
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600">Khu vực ảnh mặt sau CCCD của bạn sẽ xuất hiện tại đây</p>
              <Button variant="outline" size="sm" className="mt-2">
                Mặt sau
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStage2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2">BƯỚC 2: Học vấn + bằng cấp</h3>
        <p className="text-sm text-gray-600">
          Đánh giá trình độ học vấn và chuyên môn của gia sư...
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="university">Trường đại học/cao đẳng</Label>
          <Input
            id="university"
            value={formData.university}
            onChange={(e) => updateFormData('university', e.target.value)}
            placeholder="Tên trường"
          />
        </div>

        <div>
          <Label htmlFor="major">Ngành học</Label>
          <Input
            id="major"
            value={formData.major}
            onChange={(e) => updateFormData('major', e.target.value)}
            placeholder="Ngành học"
          />
        </div>

        <div>
          <Label htmlFor="graduationYear">Năm tốt nghiệp</Label>
          <Input
            id="graduationYear"
            value={formData.graduationYear}
            onChange={(e) => updateFormData('graduationYear', e.target.value)}
            placeholder="Năm tốt nghiệp"
          />
        </div>

        <div>
          <Label htmlFor="degree">Bằng cấp cao nhất</Label>
          <Input
            id="degree"
            value={formData.degree}
            onChange={(e) => updateFormData('degree', e.target.value)}
            placeholder="Bằng cấp"
          />
        </div>

        <div>
          <Label htmlFor="gpa">GPA/Điểm trung bình</Label>
          <Input
            id="gpa"
            value={formData.gpa}
            onChange={(e) => updateFormData('gpa', e.target.value)}
            placeholder="GPA/Điểm TB"
          />
        </div>

        <div className="border-t pt-4">
          <Label>Upload Bằng cấp/Chứng chỉ:</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mt-2">
            <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-600">Tài liệu bằng cấp của bạn sẽ xuất hiện tại đây</p>
            <Button variant="outline" size="sm" className="mt-2">
              Chọn file
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStage3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2">BƯỚC 3: Kinh nghiệm giảng dạy</h3>
        <p className="text-sm text-gray-600">
          Hiểu rõ kinh nghiệm và phương pháp giảng dạy của gia sư...
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Số năm kinh nghiệm giảng dạy</Label>
          <RadioGroup
            value={formData.experience}
            onValueChange={(value) => updateFormData('experience', value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="0-1 năm" id="exp1" />
              <Label htmlFor="exp1">0-1 năm</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1-3 năm" id="exp2" />
              <Label htmlFor="exp2">1-3 năm</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="3-5 năm" id="exp3" />
              <Label htmlFor="exp3">3-5 năm</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value=">5 năm" id="exp4" />
              <Label htmlFor="exp4">&gt;5 năm</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label>Môn học có thể dạy</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {['Toán', 'Lý', 'Hóa', 'Anh', 'Văn', 'Sinh', 'Khác'].map((subject) => (
              <div key={subject} className="flex items-center space-x-2">
                <Checkbox
                  id={subject}
                  checked={formData.subjects.includes(subject)}
                  onCheckedChange={(checked) => handleSubjectChange(subject, checked as boolean)}
                />
                <Label htmlFor={subject}>{subject}</Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label>Cấp học có thể dạy</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {['Tiểu học', 'THCS', 'THPT', 'Đại học', 'Luyện thi'].map((grade) => (
              <div key={grade} className="flex items-center space-x-2">
                <Checkbox
                  id={grade}
                  checked={formData.gradelevels.includes(grade)}
                  onCheckedChange={(checked) => handleGradeLevelChange(grade, checked as boolean)}
                />
                <Label htmlFor={grade}>{grade}</Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="teachingMethod">Vì sao bạn lựa chọn nghề giảng dạy và là thành lực của những gì bạn có thể?</Label>
          <Textarea
            id="teachingMethod"
            value={formData.teachingMethod}
            onChange={(e) => updateFormData('teachingMethod', e.target.value)}
            placeholder="Mô tả phương pháp giảng dạy của bạn"
            className="h-24"
          />
        </div>

        <div>
          <Label htmlFor="teachingPhilosophy">Phương pháp giảng dạy của bạn nhận được đầu tư từ đội ngũ cao Phong Thủy. Hãy bạn bạn ghi hình này:</Label>
          <Textarea
            id="teachingPhilosophy"
            value={formData.teachingPhilosophy}
            onChange={(e) => updateFormData('teachingPhilosophy', e.target.value)}
            placeholder="Triết lý giảng dạy"
            className="h-24"
          />
        </div>

        <div>
          <Label>Upload Chứng chỉ/Giải thưởng liên quan:</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-600">Tài liệu bằng cấp của bạn sẽ xuất hiện tại đây</p>
            <Button variant="outline" size="sm" className="mt-2">
              Chọn file
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStage4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2">BƯỚC 4: Video giới thiệu</h3>
        <p className="text-sm text-gray-600">
          Cho phép gia sư tải lên video tự giới thiệu giảng dạy của mình trong, đề cập tính cách khen, kiểm thuần
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Video Upload:</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-600">Khu vực làm tải bộ hiện/Tải video lên</p>
            <Button variant="outline" size="sm" className="mt-2">
              Chọn video
            </Button>
          </div>
        </div>

        <div>
          <Label htmlFor="videoUrl">Hoặc dán video link từ:</Label>
          <Input
            id="videoUrl"
            value={formData.videoUrl}
            onChange={(e) => updateFormData('videoUrl', e.target.value)}
            placeholder="Link video từ YouTube, Drive, etc."
          />
        </div>

        <div>
          <Label htmlFor="schedule">Giờ có thể giao với bạn thân và những ngành càng dạy của bạn khi có thể thực hiện:</Label>
          <Textarea
            id="schedule"
            value={formData.schedule}
            onChange={(e) => updateFormData('schedule', e.target.value)}
            placeholder="Mô tả lịch trình có thể"
            className="h-20"
          />
        </div>

        <div>
          <Label>Lịch trình (Calendly/Calendar):</Label>
          <div className="bg-blue-100 rounded-lg p-4 flex items-center justify-center h-32">
            <div className="text-center">
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                  <div key={i} className="w-4 h-4 bg-blue-600 rounded-sm"></div>
                ))}
              </div>
              <p className="text-xs text-blue-700">Calendar Widget</p>
            </div>
          </div>
        </div>

        <div>
          <Label>Upload Ảnh đại diện:</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-600">Ảnh đại diện của bạn sẽ xuất hiện tại đây</p>
            <Button variant="outline" size="sm" className="mt-2">
              Chọn ảnh
            </Button>
          </div>
        </div>

        <div className="border-t pt-4">
          <p className="text-xs text-gray-600">
            Tôi đồng ý với điều khoản và Chính sách bảo mật của AitheduConnect.
          </p>
        </div>
      </div>
    </div>
  );

  const renderStage5 = () => (
    <div className="text-center py-8">
      <div className="bg-pink-100 border border-pink-300 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-pink-800 mb-2">
          Hồ sơ của bạn đã được gửi đi để xác minh! 🎉
        </h3>
      </div>

      <div className="text-left mb-8">
        <h4 className="font-semibold mb-4">Checklist các mục đã gửi:</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-600" />
            <span className="text-sm">Thông tin cá nhân & CCCD</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-600" />
            <span className="text-sm">Bằng cấp & Học vấn</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-600" />
            <span className="text-sm">Kinh nghiệm giảng dạy</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-600" />
            <span className="text-sm">Video giới thiệu & Ảnh đại diện</span>
          </div>
        </div>
      </div>

      <div className="bg-orange-100 border border-orange-300 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-orange-800 mb-2">Đang chờ phê duyệt</h4>
        <p className="text-sm text-orange-700">
          Quá trình xác minh thường mất 1-2 ngày làm việc
        </p>
      </div>

      <div className="flex gap-4 justify-center">
        <Button onClick={handleClose} className="bg-blue-600 hover:bg-blue-700">
          Về Trang Chủ
        </Button>
        <Button variant="outline">
          Xem Dashboard Gia Sư (đang xây dựng)
        </Button>
      </div>
    </div>
  );

  const renderCurrentStage = () => {
    switch (stage) {
      case 1: return renderStage1();
      case 2: return renderStage2();
      case 3: return renderStage3();
      case 4: return renderStage4();
      case 5: return renderStage5();
      default: return renderStage1();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-red-600 mb-4">
            ĐĂNG KÝ GIA SƯ
          </DialogTitle>
        </DialogHeader>
        
        {renderProgressSteps()}
        
        <div className="px-6 pb-6">
          {renderCurrentStage()}
          
          {stage < 5 && (
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={stage === 1}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Quay lại
              </Button>
              
              <Button
                onClick={handleNext}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              >
                Tiếp tục
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
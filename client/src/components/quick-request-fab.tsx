import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth-context";
import {
  Plus,
  GraduationCap,
  Users,
  X,
  Clock,
  DollarSign,
  BookOpen,
  Zap
} from "lucide-react";

type RequestType = "need-tutor" | "need-student" | null;

interface QuickRequest {
  type: RequestType;
  subject: string;
  grade: string;
  budget?: number;
  hourlyRate?: number;
  timeSlots: string[];
  description: string;
  urgent: boolean;
}

export default function QuickRequestFAB() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [requestType, setRequestType] = useState<RequestType>(null);
  const [formData, setFormData] = useState<QuickRequest>({
    type: null,
    subject: "",
    grade: "",
    budget: undefined,
    hourlyRate: undefined,
    timeSlots: [],
    description: "",
    urgent: false
  });

  const subjects = [
    "Toán", "Lý", "Hóa", "Sinh", "Văn", "Tiếng Anh", 
    "Lịch sử", "Địa lý", "GDCD", "Tin học"
  ];

  const grades = [
    "Lớp 6", "Lớp 7", "Lớp 8", "Lớp 9",
    "Lớp 10", "Lớp 11", "Lớp 12", "Đại học"
  ];

  const timeSlotOptions = [
    "Sáng (7h-12h)", "Chiều (13h-17h)", "Tối (18h-22h)",
    "Cuối tuần", "Linh hoạt"
  ];

  const quickBudgetOptions = [
    { label: "100k-200k/tháng", value: 150000 },
    { label: "200k-500k/tháng", value: 350000 },
    { label: "500k-1tr/tháng", value: 750000 },
    { label: "Trên 1tr/tháng", value: 1000000 }
  ];

  const quickHourlyRates = [
    { label: "100k-150k/h", value: 125000 },
    { label: "150k-200k/h", value: 175000 },
    { label: "200k-300k/h", value: 250000 },
    { label: "300k+/h", value: 300000 }
  ];

  const handleOpenRequest = (type: RequestType) => {
    if (!user) {
      toast({
        title: "Vui lòng đăng nhập",
        description: "Bạn cần đăng nhập để đăng yêu cầu",
        variant: "destructive"
      });
      return;
    }
    
    setRequestType(type);
    setFormData(prev => ({ ...prev, type }));
    setIsOpen(true);
  };

  const handleTimeSlotToggle = (slot: string) => {
    setFormData(prev => ({
      ...prev,
      timeSlots: prev.timeSlots.includes(slot)
        ? prev.timeSlots.filter(s => s !== slot)
        : [...prev.timeSlots, slot]
    }));
  };

  const handleSubmit = () => {
    if (!formData.subject || !formData.grade) {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng điền đầy đủ môn học và lớp",
        variant: "destructive"
      });
      return;
    }

    // Here would be API call to submit the request
    console.log("Quick Request:", formData);
    
    toast({
      title: "Đăng yêu cầu thành công!",
      description: requestType === "need-tutor" 
        ? "Yêu cầu tìm gia sư đã được đăng. Các gia sư sẽ liên hệ với bạn sớm!"
        : "Yêu cầu dạy học đã được đăng. Học sinh quan tâm sẽ liên hệ với bạn!"
    });

    // Reset form
    setFormData({
      type: null,
      subject: "",
      grade: "",
      budget: undefined,
      hourlyRate: undefined,
      timeSlots: [],
      description: "",
      urgent: false
    });
    setIsOpen(false);
    setRequestType(null);
  };

  const handleClose = () => {
    setIsOpen(false);
    setRequestType(null);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">


        {/* Main FAB - Now just for finding tutors */}
        <Button
          size="lg"
          className="h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 transition-all"
          onClick={() => handleOpenRequest("need-tutor")}
        >
          <GraduationCap className="h-7 w-7" />
        </Button>
      </div>

      {/* Quick Request Modal */}
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-lg">
              {requestType === "need-tutor" ? (
                <>
                  <GraduationCap className="w-5 h-5 mr-2 text-blue-600" />
                  Đăng yêu cầu tìm gia sư
                </>
              ) : (
                <>
                  <Users className="w-5 h-5 mr-2 text-orange-600" />
                  Đăng yêu cầu dạy học
                </>
              )}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Subject */}
            <div>
              <Label htmlFor="subject">Môn học *</Label>
              <Select value={formData.subject} onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}>
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

            {/* Grade */}
            <div>
              <Label htmlFor="grade">Lớp/Cấp độ *</Label>
              <Select value={formData.grade} onValueChange={(value) => setFormData(prev => ({ ...prev, grade: value }))}>
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

            {/* Budget/Rate */}
            <div>
              <Label className="flex items-center">
                <DollarSign className="w-4 h-4 mr-1" />
                {requestType === "need-tutor" ? "Ngân sách" : "Học phí/giờ"}
              </Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {(requestType === "need-tutor" ? quickBudgetOptions : quickHourlyRates).map(option => (
                  <Button
                    key={option.value}
                    variant={
                      (requestType === "need-tutor" ? formData.budget : formData.hourlyRate) === option.value 
                        ? "default" : "outline"
                    }
                    size="sm"
                    className="text-xs"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      [requestType === "need-tutor" ? "budget" : "hourlyRate"]: option.value
                    }))}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Time Slots */}
            <div>
              <Label className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                Thời gian
              </Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {timeSlotOptions.map(slot => (
                  <Badge
                    key={slot}
                    variant={formData.timeSlots.includes(slot) ? "default" : "outline"}
                    className="cursor-pointer text-xs"
                    onClick={() => handleTimeSlotToggle(slot)}
                  >
                    {slot}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Mô tả thêm (tùy chọn)</Label>
              <Textarea
                id="description"
                placeholder={
                  requestType === "need-tutor"
                    ? "Ví dụ: Cần gia sư dạy kèm tại nhà, giúp con học giỏi hơn..."
                    : "Ví dụ: Có kinh nghiệm 3 năm, đã giúp nhiều em đỗ đại học..."
                }
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="resize-none"
                rows={3}
              />
            </div>

            {/* Urgent Toggle */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="urgent"
                checked={formData.urgent}
                onChange={(e) => setFormData(prev => ({ ...prev, urgent: e.target.checked }))}
                className="rounded"
              />
              <Label htmlFor="urgent" className="flex items-center text-sm">
                <Zap className="w-4 h-4 mr-1 text-yellow-500" />
                Yêu cầu gấp (hiển thị nổi bật)
              </Label>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={handleClose} className="flex-1">
                Hủy
              </Button>
              <Button 
                onClick={handleSubmit} 
                className={`flex-1 ${
                  requestType === "need-tutor" 
                    ? "bg-blue-600 hover:bg-blue-700" 
                    : "bg-orange-600 hover:bg-orange-700"
                }`}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Đăng ngay
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

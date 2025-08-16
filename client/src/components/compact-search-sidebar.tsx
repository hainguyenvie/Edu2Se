import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth-context";
import {
  Search,
  BookOpen,
  Clock,
  DollarSign,
  Zap,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickSearchFilters {
  subject: string;
  grade: string;
  budget: number | undefined;
  timeSlots: string[];
  description: string;
  urgent: boolean;
  keywords: string;
}

interface CompactSearchSidebarProps {
  onSearch: (filters: any) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function CompactSearchSidebar({ onSearch, isOpen, onClose }: CompactSearchSidebarProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [filters, setFilters] = useState<QuickSearchFilters>({
    subject: "",
    grade: "",
    budget: undefined,
    timeSlots: [],
    description: "",
    urgent: false,
    keywords: ""
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



  const handleTimeSlotToggle = (slot: string) => {
    setFilters(prev => ({
      ...prev,
      timeSlots: prev.timeSlots.includes(slot)
        ? prev.timeSlots.filter(s => s !== slot)
        : [...prev.timeSlots, slot]
    }));
  };

  const handleQuickSearch = () => {
    // Convert to search filters format
    const searchFilters = {
      subject: filters.subject || undefined,
      keywords: filters.keywords || undefined,
      minPrice: filters.budget ? Math.max(0, filters.budget - 50000) : undefined,
      maxPrice: filters.budget ? filters.budget + 50000 : undefined,
      timeSlots: filters.timeSlots.length > 0 ? filters.timeSlots : undefined,
    };
    
    onSearch(searchFilters);
    
    if (filters.subject || filters.keywords) {
      toast({
        title: "Đang tìm kiếm...",
        description: `Tìm gia sư ${filters.subject ? `dạy ${filters.subject}` : 'phù hợp'} cho bạn`,
      });
    }
  };

  const handlePostRequest = () => {
    if (!user) {
      toast({
        title: "Vui lòng đăng nhập",
        description: "Bạn cần đăng nhập để đăng yêu cầu học",
        variant: "destructive"
      });
      return;
    }

    if (!filters.subject || !filters.grade) {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng điền đầy đủ môn học và lớp",
        variant: "destructive"
      });
      return;
    }

    // Here would be API call to post the request
    console.log("Student Learning Request:", filters);
    
    toast({
      title: "Đăng yêu cầu học thành công!",
      description: "Các gia sư phù hợp sẽ liên hệ với bạn sớm!"
    });

    // Reset form
    setFilters({
      subject: "",
      grade: "",
      budget: undefined,
      timeSlots: [],
      description: "",
      urgent: false,
      keywords: ""
    });
    setIsPostingRequest(false);
  };

  const clearFilters = () => {
    setFilters({
      subject: "",
      grade: "",
      budget: undefined,
      timeSlots: [],
      description: "",
      urgent: false,
      keywords: ""
    });
    onSearch({});
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] w-80 bg-white border-r border-gray-200 z-30 transition-transform duration-300 overflow-y-auto shadow-lg",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Tìm gia sư</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>





        {/* Filters Form - Always visible but compact */}
        <Card>
          <CardContent className="p-3 space-y-3">
            {/* Subject & Grade in one row */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs">Môn học</Label>
                <Select value={filters.subject} onValueChange={(value) => setFilters(prev => ({ ...prev, subject: value }))}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Chọn môn" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map(subject => (
                      <SelectItem key={subject} value={subject} className="text-xs">{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs">Lớp</Label>
                <Select value={filters.grade} onValueChange={(value) => setFilters(prev => ({ ...prev, grade: value }))}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Chọn lớp" />
                  </SelectTrigger>
                  <SelectContent>
                    {grades.map(grade => (
                      <SelectItem key={grade} value={grade} className="text-xs">{grade}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Budget */}
            <div>
              <Label className="text-xs flex items-center">
                <DollarSign className="w-3 h-3 mr-1" />
                Ngân sách
              </Label>
              <div className="grid grid-cols-2 gap-1 mt-1">
                {quickBudgetOptions.map(option => (
                  <Button
                    key={option.value}
                    variant={filters.budget === option.value ? "default" : "outline"}
                    size="sm"
                    className="text-xs h-6"
                    onClick={() => setFilters(prev => ({
                      ...prev,
                      budget: prev.budget === option.value ? undefined : option.value
                    }))}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Time Slots */}
            <div>
              <Label className="text-xs flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                Thời gian
              </Label>
              <div className="flex flex-wrap gap-1 mt-1">
                {timeSlotOptions.map(slot => (
                  <Badge
                    key={slot}
                    variant={filters.timeSlots.includes(slot) ? "default" : "outline"}
                    className="cursor-pointer text-xs px-1 py-0.5"
                    onClick={() => handleTimeSlotToggle(slot)}
                  >
                    {slot.split('(')[0].trim()}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Description - smaller */}
            <div>
              <Label htmlFor="description" className="text-xs">Ghi chú (tùy chọn)</Label>
              <Textarea
                id="description"
                placeholder="Mô tả yêu cầu..."
                value={filters.description}
                onChange={(e) => setFilters(prev => ({ ...prev, description: e.target.value }))}
                className="resize-none text-xs h-12"
                rows={2}
              />
            </div>

            {/* Urgent Toggle */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="urgent"
                checked={filters.urgent}
                onChange={(e) => setFilters(prev => ({ ...prev, urgent: e.target.checked }))}
                className="rounded"
              />
              <Label htmlFor="urgent" className="text-xs flex items-center">
                <Zap className="w-3 h-3 mr-1 text-yellow-500" />
                Yêu cầu gấp
              </Label>
            </div>

            {/* Two Action Buttons */}
            <div className="grid grid-cols-1 gap-2 pt-2 border-t border-gray-200">
              <Button 
                onClick={handlePostRequest} 
                className="w-full bg-blue-600 hover:bg-blue-700 h-8 text-xs"
              >
                <BookOpen className="w-3 h-3 mr-1" />
                Đăng yêu cầu học
              </Button>
              <Button 
                onClick={handleQuickSearch}
                variant="outline"
                className="w-full h-8 text-xs"
              >
                <Search className="w-3 h-3 mr-1" />
                Tìm kiếm thường
              </Button>
            </div>

            {/* Clear filters button */}
            {(filters.subject || filters.grade || filters.budget || filters.timeSlots.length > 0 || filters.keywords || filters.description) && (
              <Button 
                variant="ghost" 
                onClick={clearFilters}
                className="w-full h-6 text-xs text-gray-500 hover:text-gray-700"
              >
                <X className="w-3 h-3 mr-1" />
                Xóa tất cả bộ lọc
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </aside>
  );
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, BookOpen, Search, Filter, Clock, Star, MapPin, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { type Subject, type SearchFilters } from "@shared/schema";

interface EnhancedSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle?: () => void;
  onSubjectSelect?: (subject: string) => void;
  onFiltersChange?: (filters: SearchFilters) => void;
}

export default function EnhancedSidebar({ 
  isOpen, 
  onClose, 
  onToggle, 
  onSubjectSelect, 
  onFiltersChange 
}: EnhancedSidebarProps) {
  const [subject, setSubject] = useState<string>("");
  const [courseType, setCourseType] = useState<string>("");
  const [priceRange, setPriceRange] = useState([200000]);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [keywords, setKeywords] = useState("");

  // Fetch subjects data
  const { data: subjects = [] } = useQuery<Subject[]>({
    queryKey: ['/api/subjects'],
  });

  const popularSubjects = ["Toán", "Tiếng Anh", "Lý", "Hóa"];
  const timeSlotOptions = [
    { value: "morning", label: "Sáng", icon: "🌅", time: "6:00 - 12:00" },
    { value: "afternoon", label: "Chiều", icon: "☀️", time: "12:00 - 18:00" },
    { value: "evening", label: "Tối", icon: "🌆", time: "18:00 - 22:00" },
  ];

  const priceRanges = [
    { label: "Dưới 100k", value: [0, 100000], popular: true },
    { label: "100k - 200k", value: [100000, 200000], popular: true },
    { label: "200k - 500k", value: [200000, 500000] },
    { label: "Trên 500k", value: [500000, 5000000] },
  ];

  const handleTimeSlotChange = (slot: string, checked: boolean) => {
    const newTimeSlots = checked
      ? [...timeSlots, slot]
      : timeSlots.filter(s => s !== slot);
    setTimeSlots(newTimeSlots);
  };

  const handlePriceRangeSelect = (range: number[]) => {
    setPriceRange([range[1]]);
  };

  const handleSubjectSelect = (selectedSubject: string) => {
    setSubject(selectedSubject);
    if (onSubjectSelect) {
      onSubjectSelect(selectedSubject);
    }
    handleSearch();
  };

  const handleSearch = () => {
    const filters: SearchFilters = {
      subject: subject || undefined,
      courseType: courseType || undefined,
      minPrice: 50000,
      maxPrice: priceRange[0],
      timeSlots: timeSlots.length > 0 ? timeSlots : undefined,
      keywords: keywords || undefined,
    };
    
    if (onFiltersChange) {
      onFiltersChange(filters);
    }
  };

  const clearFilters = () => {
    setSubject("");
    setCourseType("");
    setPriceRange([200000]);
    setTimeSlots([]);
    setKeywords("");
    if (onFiltersChange) {
      onFiltersChange({});
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const hasActiveFilters = subject || courseType || timeSlots.length > 0 || keywords;

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] w-96 bg-white border-r border-gray-200 z-30 transition-transform duration-300 overflow-y-auto shadow-lg",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Tìm gia sư</h2>
          {onToggle && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="text-gray-500 hover:text-gray-700 p-1"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Search Input */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Tìm theo tên, môn học..."
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="pl-10 h-11 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button 
              onClick={handleSearch} 
              className="w-full mt-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-10 rounded-lg"
            >
              <Search className="w-4 h-4 mr-2" />
              Tìm nhanh
            </Button>
          </CardContent>
        </Card>

        {/* Popular Subjects */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center">
              <Star className="w-4 h-4 mr-2 text-orange-500" />
              Môn học phổ biến
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-2">
              {popularSubjects.map((subjectName) => (
                <Badge
                  key={subjectName}
                  variant={subject === subjectName ? "default" : "secondary"}
                  className={`cursor-pointer hover:scale-105 transition-transform px-3 py-2 rounded-lg text-center justify-center ${
                    subject === subjectName 
                      ? "bg-blue-600 text-white shadow-md" 
                      : "bg-gray-100 text-gray-700 hover:bg-blue-50 border border-gray-200"
                  }`}
                  onClick={() => handleSubjectSelect(subjectName)}
                >
                  {subjectName}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Subject Selection */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-blue-500" />
              Môn học
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger className="h-11 border-2 border-gray-200 focus:border-blue-500 rounded-lg">
                <SelectValue placeholder="Chọn môn học" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subj) => (
                  <SelectItem key={subj.id} value={subj.name}>
                    {subj.nameVi}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Course Type */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center">
              <Filter className="w-4 h-4 mr-2 text-purple-500" />
              Khóa học
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <Select value={courseType} onValueChange={setCourseType}>
              <SelectTrigger className="h-11 border-2 border-gray-200 focus:border-blue-500 rounded-lg">
                <SelectValue placeholder="Chọn loại khóa học" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cơ bản">Cơ bản</SelectItem>
                <SelectItem value="Nâng cao">Nâng cao</SelectItem>
                <SelectItem value="Luyện thi">Luyện thi</SelectItem>
                <SelectItem value="Ôn thi">Ôn thi</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Time Slots */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center">
              <Clock className="w-4 h-4 mr-2 text-green-500" />
              Thời gian
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            {timeSlotOptions.map((slot) => (
              <div key={slot.value} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                <Checkbox
                  id={slot.value}
                  checked={timeSlots.includes(slot.value)}
                  onCheckedChange={(checked) =>
                    handleTimeSlotChange(slot.value, checked as boolean)
                  }
                  className="rounded border-2"
                />
                <Label htmlFor={slot.value} className="flex-1 cursor-pointer flex items-center space-x-3">
                  <span className="text-lg">{slot.icon}</span>
                  <div>
                    <div className="font-medium text-gray-900">{slot.label}</div>
                    <div className="text-xs text-gray-500">{slot.time}</div>
                  </div>
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Price Range */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Giá tối đa (VNĐ/giờ)</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {priceRanges.map((range) => (
                <Button
                  key={range.label}
                  variant="outline"
                  size="sm"
                  onClick={() => handlePriceRangeSelect(range.value)}
                  className={`relative h-10 rounded-lg border-2 transition-all text-xs ${
                    priceRange[0] === range.value[1]
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {range.popular && (
                    <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs px-1 py-0.5 rounded-full">
                      Hot
                    </div>
                  )}
                  {range.label}
                </Button>
              ))}
            </div>
            <div className="space-y-3">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={5000000}
                min={50000}
                step={50000}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>50K</span>
                <span className="font-medium text-blue-600">
                  {formatPrice(priceRange[0])}₫
                </span>
                <span>5M</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Filters */}
        {hasActiveFilters && (
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-blue-700">Bộ lọc đang áp dụng:</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-100 p-1"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {subject && (
                  <Badge variant="default" className="bg-blue-600 text-xs">
                    {subject}
                  </Badge>
                )}
                {courseType && (
                  <Badge variant="default" className="bg-purple-600 text-xs">
                    {courseType}
                  </Badge>
                )}
                {timeSlots.map((slot) => (
                  <Badge key={slot} variant="default" className="bg-green-600 text-xs">
                    {timeSlotOptions.find(t => t.value === slot)?.label}
                  </Badge>
                ))}
                {keywords && (
                  <Badge variant="default" className="bg-orange-600 text-xs">
                    "{keywords}"
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </aside>
  );
}
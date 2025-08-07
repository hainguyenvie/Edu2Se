import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X, Clock, Star, MapPin, ChevronDown } from "lucide-react";
import { type SearchFilters } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { type Subject } from "@shared/schema";

interface SearchFiltersProps {
  onFiltersChange: (filters: SearchFilters) => void;
}

export default function SearchFilters({ onFiltersChange }: SearchFiltersProps) {
  const [subject, setSubject] = useState<string>("");
  const [courseType, setCourseType] = useState<string>("");
  const [priceRange, setPriceRange] = useState([200000]);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [keywords, setKeywords] = useState("");
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  // Fetch subjects data for dynamic options
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
    onFiltersChange(filters);
  };

  const clearFilters = () => {
    setSubject("");
    setCourseType("");
    setPriceRange([200000]);
    setTimeSlots([]);
    setKeywords("");
    onFiltersChange({});
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const hasActiveFilters = subject || courseType || timeSlots.length > 0 || keywords;

  return (
    <Card className="mx-4 shadow-lg border-0 bg-gradient-to-r from-blue-50 to-purple-50">
      <CardContent className="p-6">
        {/* Main Search Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Tìm gia sư theo tên, môn học hoặc từ khóa..."
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="pl-12 h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl bg-white shadow-sm"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Button 
            onClick={handleSearch} 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 h-12 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
          >
            <Search className="w-5 h-5 mr-2" />
            Tìm nhanh
          </Button>
        </div>

        {/* Quick Subject Tags */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-gray-700">Môn học phổ biến:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {popularSubjects.map((subjectName) => (
              <Badge
                key={subjectName}
                variant={subject === subjectName ? "default" : "secondary"}
                className={`cursor-pointer hover:scale-105 transition-transform px-4 py-2 rounded-full ${
                  subject === subjectName 
                    ? "bg-blue-600 text-white shadow-md" 
                    : "bg-white text-gray-700 hover:bg-blue-50 border border-gray-200"
                }`}
                onClick={() => handleSubjectSelect(subjectName)}
              >
                {subjectName}
              </Badge>
            ))}
            <Badge
              variant="outline"
              className="cursor-pointer hover:scale-105 transition-transform px-4 py-2 rounded-full bg-white text-blue-600 border-blue-300 hover:bg-blue-50"
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            >
              Xem thêm
              <ChevronDown className={`w-3 h-3 ml-1 transition-transform ${isAdvancedOpen ? 'rotate-180' : ''}`} />
            </Badge>
          </div>
        </div>

        {/* Advanced Filters */}
        {isAdvancedOpen && (
          <div className="space-y-6 p-4 bg-white rounded-xl border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Subject Selection */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                  Môn học
                </Label>
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
              </div>

              {/* Course Type */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <Filter className="w-4 h-4 mr-2 text-purple-500" />
                  Khóa học
                </Label>
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
              </div>

              {/* Time Slots */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-green-500" />
                  Thời gian
                </Label>
                <div className="space-y-2">
                  {timeSlotOptions.map((slot) => (
                    <div key={slot.value} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                      <Checkbox
                        id={slot.value}
                        checked={timeSlots.includes(slot.value)}
                        onCheckedChange={(checked) =>
                          handleTimeSlotChange(slot.value, checked as boolean)
                        }
                        className="rounded border-2"
                      />
                      <Label htmlFor={slot.value} className="flex-1 cursor-pointer flex items-center space-x-2">
                        <span className="text-lg">{slot.icon}</span>
                        <div>
                          <div className="font-medium text-gray-900">{slot.label}</div>
                          <div className="text-xs text-gray-500">{slot.time}</div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Price Range */}
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-3">
                Giá tối đa (VNĐ/giờ)
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                {priceRanges.map((range) => (
                  <Button
                    key={range.label}
                    variant="outline"
                    onClick={() => handlePriceRangeSelect(range.value)}
                    className={`relative h-12 rounded-lg border-2 transition-all ${
                      priceRange[0] === range.value[1]
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {range.popular && (
                      <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full">
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
                  <span className="font-medium text-blue-600 text-sm">
                    {formatPrice(priceRange[0])}₫
                  </span>
                  <span>5M</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Active Filters & Actions */}
        {hasActiveFilters && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-blue-700">Bộ lọc đang áp dụng:</span>
                <div className="flex flex-wrap gap-2">
                  {subject && (
                    <Badge variant="default" className="bg-blue-600">
                      {subject}
                      <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setSubject("")} />
                    </Badge>
                  )}
                  {courseType && (
                    <Badge variant="default" className="bg-purple-600">
                      {courseType}
                      <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setCourseType("")} />
                    </Badge>
                  )}
                  {timeSlots.map((slot) => (
                    <Badge key={slot} variant="default" className="bg-green-600">
                      {timeSlotOptions.find(t => t.value === slot)?.label}
                      <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => handleTimeSlotChange(slot, false)} />
                    </Badge>
                  ))}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-100"
              >
                <X className="w-4 h-4 mr-1" />
                Xóa tất cả
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

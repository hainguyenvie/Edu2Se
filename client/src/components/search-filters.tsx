import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, FileText, Zap, FlaskConical, Microscope, Globe2, Languages, BookOpen } from "lucide-react";
import { type SearchFilters } from "@shared/schema";

interface SearchFiltersProps {
  onFiltersChange: (filters: SearchFilters) => void;
}

export default function SearchFilters({ onFiltersChange }: SearchFiltersProps) {
  const [subject, setSubject] = useState<string>("");
  const [courseType, setCourseType] = useState<string>("");
  const [priceRange, setPriceRange] = useState([200000]);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [keywords, setKeywords] = useState("");

  // Subject data with icons and colors
  const subjects = [
    { value: "Toán", label: "TOÁN", icon: Calculator, color: "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200" },
    { value: "Văn", label: "VĂN", icon: FileText, color: "bg-green-100 text-green-700 border-green-200 hover:bg-green-200" },
    { value: "Lý", label: "LÝ", icon: Zap, color: "bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200" },
    { value: "Hóa", label: "HÓA", icon: FlaskConical, color: "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200" },
    { value: "Sinh", label: "SINH", icon: Microscope, color: "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200" },
    { value: "Tiếng Anh", label: "TIẾNG ANH", icon: Globe2, color: "bg-indigo-100 text-indigo-700 border-indigo-200 hover:bg-indigo-200" },
    { value: "Tiếng Pháp", label: "TIẾNG PHÁP", icon: Languages, color: "bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-200" },
    { value: "Tiếng Nga", label: "TIẾNG NGA", icon: BookOpen, color: "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200" },
  ];

  const handleTimeSlotChange = (slot: string, checked: boolean) => {
    const newTimeSlots = checked
      ? [...timeSlots, slot]
      : timeSlots.filter(s => s !== slot);
    setTimeSlots(newTimeSlots);
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  return (
    <div className="bg-white mx-4 p-6 rounded-lg shadow-sm border border-gray-200">
      {/* Subject Selection Pills */}
      <div className="mb-6">
        <Label className="block text-sm font-medium text-gray-700 mb-3">
          Môn học
        </Label>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {subjects.map((subj) => {
            const Icon = subj.icon;
            const isSelected = subject === subj.value;
            return (
              <button
                key={subj.value}
                onClick={() => setSubject(isSelected ? "" : subj.value)}
                className={`
                  flex flex-col items-center p-3 rounded-lg border-2 transition-all duration-200 group hover:scale-105
                  ${isSelected 
                    ? subj.color.replace('hover:bg-', 'bg-').replace('-100', '-200') + ' ring-2 ring-offset-1 ring-blue-500' 
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                  }
                `}
              >
                <Icon className={`w-6 h-6 mb-1 ${isSelected ? '' : 'text-gray-400 group-hover:text-gray-600'}`} />
                <span className="text-xs font-medium text-center leading-tight">
                  {subj.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">

        {/* Course Type Dropdown */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">
            Khóa học
          </Label>
          <Select value={courseType} onValueChange={setCourseType}>
            <SelectTrigger>
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

        {/* Price Range */}
        <div className="md:col-span-2">
          <Label className="block text-sm font-medium text-gray-700 mb-2">
            Giá tối đa (VNĐ/giờ)
          </Label>
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
              <span className="font-medium text-primary">
                {formatPrice(priceRange[0])}₫
              </span>
              <span>5M</span>
            </div>
          </div>
        </div>
      </div>

      {/* Time Schedule and Search */}
      <div className="flex flex-col md:flex-row md:items-end gap-4">
        {/* Time Schedule */}
        <div className="flex-1">
          <Label className="block text-sm font-medium text-gray-700 mb-2">
            Thời gian
          </Label>
          <div className="flex space-x-4">
            {[
              { value: "morning", label: "Sáng" },
              { value: "afternoon", label: "Chiều" },
              { value: "evening", label: "Tối" },
            ].map((slot) => (
              <div key={slot.value} className="flex items-center space-x-2">
                <Checkbox
                  id={slot.value}
                  checked={timeSlots.includes(slot.value)}
                  onCheckedChange={(checked) =>
                    handleTimeSlotChange(slot.value, checked as boolean)
                  }
                />
                <Label htmlFor={slot.value} className="text-sm text-gray-700">
                  {slot.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Keywords and Search Button */}
        <div className="flex space-x-3">
          <Input
            type="text"
            placeholder="Từ khóa..."
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="w-40"
          />
          <Button onClick={handleSearch} className="bg-primary hover:bg-primary/90">
            Tìm nhanh
          </Button>
        </div>
      </div>
    </div>
  );
}

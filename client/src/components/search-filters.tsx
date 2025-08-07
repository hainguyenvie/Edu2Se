import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Subject Dropdown */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">
            Môn học
          </Label>
          <Select value={subject} onValueChange={setSubject}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn môn học" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Toán">Toán</SelectItem>
              <SelectItem value="Văn">Văn</SelectItem>
              <SelectItem value="Tiếng Anh">Tiếng Anh</SelectItem>
              <SelectItem value="Lý">Lý</SelectItem>
              <SelectItem value="Hóa">Hóa</SelectItem>
              <SelectItem value="Sinh">Sinh</SelectItem>
            </SelectContent>
          </Select>
        </div>

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

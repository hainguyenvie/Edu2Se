import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { X, Search, BookOpen, Star, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { type Subject } from "@shared/schema";
import { cn } from "@/lib/utils";
import {
  Calculator,
  Book,
  Languages,
  Zap,
  Beaker,
  Leaf,
  Globe,
  Music,
  Palette,
  Code,
  Camera,
  Gamepad2,
} from "lucide-react";

const iconMap = {
  Calculator,
  Book,
  Languages,
  Zap,
  Beaker,
  Leaf,
  Globe,
  Music,
  Palette,
  Code,
  Camera,
  Gamepad2,
};

const SUBJECT_COLORS = {
  Calculator: "#3B82F6", // Blue for Math
  Book: "#10B981", // Green for Literature
  Languages: "#8B5CF6", // Purple for Languages
  Zap: "#F59E0B", // Orange for Physics
  Beaker: "#EF4444", // Red for Chemistry
  Leaf: "#22C55E", // Green for Biology
  Globe: "#06B6D4", // Cyan for Geography
  Music: "#EC4899", // Pink for Music
  Palette: "#F97316", // Orange for Art
  Code: "#6366F1", // Indigo for Programming
  Camera: "#84CC16", // Lime for Photography
  Gamepad2: "#A855F7", // Purple for Gaming
};

interface SubjectsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSubjectSelect: (subject: string) => void;
}

export default function SubjectsOverlay({ isOpen, onClose, onSubjectSelect }: SubjectsOverlayProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: subjects = [] } = useQuery<Subject[]>({
    queryKey: ['/api/subjects'],
  });

  // Popular subjects data
  const popularSubjects = [
    { name: "Toán", nameVi: "TOÁN", icon: "Calculator", students: "2.3k", growth: "+15%" },
    { name: "Tiếng Anh", nameVi: "TIẾNG ANH", icon: "Languages", students: "1.8k", growth: "+22%" },
    { name: "Lý", nameVi: "VẬT LÝ", icon: "Zap", students: "1.2k", growth: "+8%" },
    { name: "Hóa", nameVi: "HÓA HỌC", icon: "Beaker", students: "980", growth: "+12%" },
  ];

  // Filter subjects based on search term
  const filteredSubjects = subjects.filter(subject =>
    subject.nameVi.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubjectClick = (subject: Subject | typeof popularSubjects[0]) => {
    onSubjectSelect(subject.name);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[85vh] bg-white shadow-2xl overflow-hidden">
        <CardHeader className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardTitle className="text-2xl font-bold text-center">
            Chọn môn học
          </CardTitle>
          <p className="text-center text-blue-100 mt-1">
            Tìm gia sư phù hợp cho môn học bạn quan tâm
          </p>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 text-white hover:bg-white/20"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        
        <CardContent className="p-6 overflow-y-auto max-h-[calc(85vh-120px)]">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Tìm kiếm môn học..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
            />
          </div>

          {/* Popular Subjects Section */}
          {!searchTerm && (
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-5 h-5 text-orange-500" />
                <h3 className="text-lg font-semibold text-gray-900">Môn học phổ biến</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {popularSubjects.map((subject) => {
                  const IconComponent = iconMap[subject.icon as keyof typeof iconMap] || Calculator;
                  const iconColor = SUBJECT_COLORS[subject.icon as keyof typeof SUBJECT_COLORS] || SUBJECT_COLORS.Calculator;
                  
                  return (
                    <Card 
                      key={subject.name}
                      className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-blue-300"
                      onClick={() => handleSubjectClick(subject)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div 
                              className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                              style={{ backgroundColor: iconColor + '20' }}
                            >
                              <IconComponent 
                                className="w-6 h-6" 
                                style={{ color: iconColor }}
                              />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {subject.nameVi}
                              </h4>
                              <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <span>{subject.students} học sinh</span>
                                <span className="text-green-600 font-medium">{subject.growth}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            {Array.from({ length: 5 }, (_, i) => (
                              <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                            ))}
                            <span className="text-sm text-gray-600 ml-1">4.8</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* All Subjects Grid */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-900">
                {searchTerm ? `Kết quả tìm kiếm "${searchTerm}"` : "Tất cả môn học"}
              </h3>
              <span className="text-sm text-gray-500">
                ({filteredSubjects.length} môn)
              </span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredSubjects.map((subject) => {
                const IconComponent = iconMap[subject.icon as keyof typeof iconMap] || Calculator;
                const iconColor = SUBJECT_COLORS[subject.icon as keyof typeof SUBJECT_COLORS] || SUBJECT_COLORS.Calculator;
                
                return (
                  <Card 
                    key={subject.id}
                    className="group hover:shadow-md transition-all duration-300 cursor-pointer hover:scale-105 border hover:border-blue-300"
                    onClick={() => handleSubjectClick(subject)}
                  >
                    <CardContent className="p-4 text-center">
                      <div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: iconColor + '20' }}
                      >
                        <IconComponent 
                          className="w-8 h-8" 
                          style={{ color: iconColor }}
                        />
                      </div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors text-sm">
                        {subject.nameVi}
                      </h4>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {filteredSubjects.length === 0 && searchTerm && (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Không tìm thấy môn học
                </h3>
                <p className="text-gray-500">
                  Thử tìm kiếm với từ khóa khác hoặc chọn từ danh sách bên dưới
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
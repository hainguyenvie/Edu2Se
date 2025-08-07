import { useQuery } from "@tanstack/react-query";
import { type Subject } from "@shared/schema";
import { 
  Calculator, 
  Book, 
  Languages, 
  Globe, 
  GraduationCap, 
  Star, 
  MessageCircle, 
  Compass,
  Zap,
  Beaker,
  Leaf,
  Earth,
  X,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SUBJECT_COLORS } from "@/config/constants";
import SubjectsOverlay from "@/components/subjects-overlay";
import { useState } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle?: () => void;
  onSubjectSelect?: (subject: string) => void;
}

const iconMap = {
  Calculator,
  Book,
  Languages,
  Globe,
  GraduationCap,
  Star,
  MessageCircle,
  Compass,
  Zap,
  Beaker,
  Leaf,
  GlobeEurope: Earth,
};

export default function Sidebar({ isOpen, onClose, onToggle, onSubjectSelect }: SidebarProps) {
  const [showSubjectsOverlay, setShowSubjectsOverlay] = useState(false);
  
  const { data: subjects = [] } = useQuery<Subject[]>({
    queryKey: ['/api/subjects'],
  });

  const handleSubjectClick = (subject: string) => {
    if (onSubjectSelect) {
      onSubjectSelect(subject);
    }
    onClose(); // Close sidebar after selection
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 h-full w-64 bg-white border-r border-gray-200 z-30 sidebar-transition",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="p-4">
        {/* Sidebar Header with Toggle */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Môn học</h2>
          {onToggle && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="text-gray-500 hover:text-gray-700 p-1"
              title="Hide Sidebar"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Modern Subject Selector Button */}
        <Button
          onClick={() => setShowSubjectsOverlay(true)}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mb-4"
        >
          <BookOpen className="w-5 h-5 mr-2" />
          Chọn môn học
        </Button>

        {/* Quick Access - Popular Subjects */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-600 mb-3">Môn học phổ biến</h3>
          {subjects.slice(0, 6).map((subject) => {
            const IconComponent = iconMap[subject.icon as keyof typeof iconMap] || Calculator;
            const iconColor = SUBJECT_COLORS[subject.icon as keyof typeof SUBJECT_COLORS] || SUBJECT_COLORS.Calculator;
            
            return (
              <button
                key={subject.id}
                onClick={() => handleSubjectClick(subject.name)}
                className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition-all hover:shadow-sm group"
              >
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: iconColor + '20' }}
                >
                  <IconComponent 
                    className="w-4 h-4" 
                    style={{ color: iconColor }}
                  />
                </div>
                <span className="text-sm group-hover:text-blue-600 transition-colors">
                  {subject.nameVi}
                </span>
              </button>
            );
          })}
          
          {subjects.length > 6 && (
            <Button
              variant="ghost"
              onClick={() => setShowSubjectsOverlay(true)}
              className="w-full text-blue-600 hover:text-blue-700 text-sm mt-2"
            >
              Xem tất cả ({subjects.length} môn) →
            </Button>
          )}
        </div>
      </div>

      {/* Subjects Overlay */}
      <SubjectsOverlay
        isOpen={showSubjectsOverlay}
        onClose={() => setShowSubjectsOverlay(false)}
        onSubjectSelect={handleSubjectClick}
      />
    </aside>
  );
}

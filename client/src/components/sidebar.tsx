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
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SUBJECT_COLORS } from "@/config/constants";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle?: () => void;
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

export default function Sidebar({ isOpen, onClose, onToggle }: SidebarProps) {
  const { data: subjects = [] } = useQuery<Subject[]>({
    queryKey: ['/api/subjects'],
  });

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
        <nav className="space-y-2">
          {subjects.map((subject) => {
            const IconComponent = iconMap[subject.icon as keyof typeof iconMap] || Calculator;
            const iconColor = SUBJECT_COLORS[subject.icon as keyof typeof SUBJECT_COLORS] || SUBJECT_COLORS.Calculator;
            
            return (
              <a
                key={subject.id}
                href="#"
                className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium border border-gray-200 transition-all hover:shadow-sm"
                onClick={onClose}
              >
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: iconColor + '20' }}
                >
                  <IconComponent 
                    className="w-4 h-4" 
                    style={{ color: iconColor }}
                  />
                </div>
                <span>{subject.nameVi}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

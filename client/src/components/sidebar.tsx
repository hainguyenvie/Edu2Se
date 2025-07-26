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
  Earth
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
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

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { data: subjects = [] } = useQuery<Subject[]>({
    queryKey: ['/api/subjects'],
  });

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 h-full w-64 bg-white border-r border-gray-200 z-30 sidebar-transition",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      <div className="p-4">
        <nav className="space-y-2">
          {subjects.map((subject) => {
            const IconComponent = iconMap[subject.icon as keyof typeof iconMap] || Calculator;
            
            return (
              <a
                key={subject.id}
                href="#"
                className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 font-medium border border-gray-200 transition-colors"
                onClick={onClose}
              >
                <IconComponent className="w-5 h-5 text-primary" />
                <span>{subject.nameVi}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

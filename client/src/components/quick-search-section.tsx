import { 
  Calculator, 
  Book, 
  Languages, 
  Zap,
  Beaker,
  Leaf
} from "lucide-react";
import { QUICK_SEARCH_CATEGORIES } from "@/config/constants";

const iconMap = {
  Calculator,
  Book,
  Languages,
  Zap,
  Beaker,
  Leaf,
};

interface QuickSearchSectionProps {
  onSubjectSelect: (subject: string) => void;
}

export default function QuickSearchSection({ onSubjectSelect }: QuickSearchSectionProps) {
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Tìm nhanh</h3>
      <div className="grid grid-cols-3 gap-3">
        {QUICK_SEARCH_CATEGORIES.map((category) => {
          const IconComponent = iconMap[category.icon as keyof typeof iconMap];
          
          return (
            <button
              key={category.name}
              className="flex flex-col items-center p-4 rounded-xl transition-all hover:scale-105 hover:shadow-md relative"
              style={{ backgroundColor: category.color + '15' }}
              onClick={() => onSubjectSelect(category.name)}
            >
              {category.popular && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-medium">
                  Hot
                </div>
              )}
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-2"
                style={{ backgroundColor: category.color }}
              >
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-800">
                {category.nameVi}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
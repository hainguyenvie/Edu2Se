import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarToggleButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export default function SidebarToggleButton({ isOpen, onToggle, className = "" }: SidebarToggleButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onToggle}
      className={`p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors ${className}`}
      title={isOpen ? "Hide Sidebar" : "Show Sidebar"}
    >
      {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
    </Button>
  );
}
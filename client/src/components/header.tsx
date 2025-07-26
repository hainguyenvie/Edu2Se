import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, Heart, User } from "lucide-react";
import { Link } from "wouter";
import TutorRegistrationModal from "@/components/tutor-registration-modal";

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  return (
    <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-40">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          {onToggleSidebar && (
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-gray-600 hover:text-gray-900"
              onClick={onToggleSidebar}
            >
              <Menu className="h-6 w-6" />
            </Button>
          )}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A+</span>
            </div>
            <span className="hidden sm:block font-semibold text-gray-900 text-lg">
              AitheduConnect
            </span>
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden md:flex items-center space-x-6">
          <Button variant="outline" className="text-gray-600 hover:text-primary">
            Học cùng tôi
          </Button>
          <Button variant="outline" className="text-gray-600 hover:text-primary">
            Bảng xếp hạng
          </Button>
          <Button variant="outline" className="text-gray-600 hover:text-primary">
            Mã giảm giá
          </Button>
          <Button variant="outline" className="text-gray-600 hover:text-primary">
            Hỏi đáp
          </Button>
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-3">
          <Link href="/favorites">
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:block text-gray-600 hover:text-primary"
            >
              <Heart className="h-5 w-5" />
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:block text-gray-600 hover:text-primary relative"
              >
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center border-2 border-orange-200">
                  <span className="text-sm">👤</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/dashboard" className="w-full cursor-pointer">
                  Thông tin cá nhân
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Lớp học của tôi
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsRegistrationModalOpen(true)}>
                Đăng kí làm gia sư
              </DropdownMenuItem>
              <DropdownMenuItem>
                Khác
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Tutor Registration Modal */}
      <TutorRegistrationModal 
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
      />
    </header>
  );
}

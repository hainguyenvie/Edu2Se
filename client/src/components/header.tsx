import { Button } from "@/components/ui/button";
import { Menu, Heart, User } from "lucide-react";
import { Link } from "wouter";

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
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
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:block text-gray-600 hover:text-primary"
          >
            <User className="h-5 w-5" />
          </Button>
          <Button className="bg-primary text-white hover:bg-primary/90">
            Đăng nhập
          </Button>
        </div>
      </div>
    </header>
  );
}

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, Heart, User, Bell, MessageCircle } from "lucide-react";
import { Link } from "wouter";
import { AuthNav } from "./auth-nav";
import TutorRegistrationModal from "./tutor-registration-modal";
import NotificationDropdown from "./notification-dropdown";
import MessagesPopup from "./messages-popup";

interface HeaderProps {
  onToggleSidebar?: () => void;
  onSubjectSelect?: (subject: string) => void;
}

export default function Header({ onToggleSidebar, onSubjectSelect }: HeaderProps) {
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [currentTutorId, setCurrentTutorId] = useState<string | null>(null);

  // Fetch the first tutor ID to use as current user's tutor profile
  useEffect(() => {
    const fetchCurrentTutorId = async () => {
      try {
        const response = await fetch('/api/tutors');
        const tutors = await response.json();
        if (tutors && tutors.length > 0) {
          // Use the first tutor (Thầy Đức Anh) as the current user's profile
          setCurrentTutorId(tutors[0].id);
        }
      } catch (error) {
        console.error('Failed to fetch tutor ID:', error);
      }
    };
    
    fetchCurrentTutorId();
  }, []);
  return (
    <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-40">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          {onToggleSidebar && (
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-gray-900"
              onClick={onToggleSidebar}
              title="Toggle Sidebar"
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
          <Link href="/study-with-me">
            <Button variant="outline" className="text-gray-600 hover:text-primary">
              Học cùng tôi
            </Button>
          </Link>
          <Link href="/ranking">
            <Button variant="outline" className="text-gray-600 hover:text-primary">
              Bảng xếp hạng
            </Button>
          </Link>
          <Link href="/coupons">
            <Button variant="outline" className="text-gray-600 hover:text-primary">
              Mã giảm giá
            </Button>
          </Link>
          <Button variant="outline" className="text-gray-600 hover:text-primary">
            Hỏi đáp
          </Button>
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-3">
          {/* Messages Icon */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="hidden sm:block text-gray-600 hover:text-primary relative"
            onClick={() => setIsMessagesOpen(!isMessagesOpen)}
          >
            <MessageCircle className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </Button>

          {/* Favorites Heart Icon */}
          <Link href="/favorites">
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:block text-gray-600 hover:text-primary"
            >
              <Heart className="h-5 w-5" />
            </Button>
          </Link>

          {/* Notifications Icon */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="hidden sm:block text-gray-600 hover:text-primary relative"
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              5
            </span>
          </Button>
          <AuthNav />
        </div>
      </div>

      {/* Tutor Registration Modal */}
      <TutorRegistrationModal 
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
      />

      {/* Notification Dropdown */}
      <NotificationDropdown 
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />

      {/* Messages Popup */}
      <MessagesPopup 
        isOpen={isMessagesOpen}
        onClose={() => setIsMessagesOpen(false)}
      />
    </header>
  );
}

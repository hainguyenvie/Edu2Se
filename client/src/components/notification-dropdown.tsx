import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Clock, User, BookOpen, Bell } from "lucide-react";

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const notifications = [
  {
    id: 1,
    type: "booking",
    title: "Đặt lịch học mới",
    message: "Bạn có một lịch học Toán với Thầy Đức Anh vào 19:00 hôm nay",
    time: "5 phút trước",
    icon: BookOpen,
    unread: true
  },
  {
    id: 2,
    type: "message",
    title: "Tin nhắn mới",
    message: "Cô Mai đã gửi cho bạn tài liệu ôn tập Lý",
    time: "10 phút trước",
    icon: User,
    unread: true
  },
  {
    id: 3,
    type: "reminder",
    title: "Nhắc nhở",
    message: "Lớp học Hóa của bạn sẽ bắt đầu trong 30 phút",
    time: "20 phút trước",
    icon: Clock,
    unread: false
  },
  {
    id: 4,
    type: "system",
    title: "Cập nhật hệ thống",
    message: "AitheduConnect đã thêm tính năng học nhóm mới",
    time: "1 giờ trước",
    icon: Bell,
    unread: false
  },
  {
    id: 5,
    type: "booking",
    title: "Xác nhận đặt lịch",
    message: "Thầy Minh đã xác nhận lịch học Anh văn ngày mai",
    time: "2 giờ trước",
    icon: BookOpen,
    unread: false
  }
];

export default function NotificationDropdown({ isOpen, onClose }: NotificationDropdownProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      />
      
      {/* Notification Panel */}
      <div className="fixed top-16 right-4 z-50 w-80">
        <Card className="shadow-lg border">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-lg font-semibold">Thông báo</CardTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-80">
              <div className="space-y-1">
                {notifications.map((notification) => {
                  const IconComponent = notification.icon;
                  return (
                    <div
                      key={notification.id}
                      className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                        notification.unread ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-full ${
                          notification.unread 
                            ? 'bg-blue-100 text-blue-600' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className={`text-sm font-medium ${
                              notification.unread ? 'text-gray-900' : 'text-gray-700'
                            }`}>
                              {notification.title}
                            </p>
                            {notification.unread && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
            <div className="p-3 border-t border-gray-200">
              <Button variant="ghost" className="w-full text-sm text-blue-600 hover:text-blue-700">
                Xem tất cả thông báo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
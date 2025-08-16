import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, GraduationCap, Star, Users, DollarSign, Trophy, Sparkles } from "lucide-react";
import Header from "@/components/header";
import { Link } from "wouter";
import { useAuth } from "@/contexts/auth-context";

export default function TutorSuccessPage() {
  const { updateUserRole } = useAuth();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Auto upgrade to tutor role when accessing this page
    if (updateUserRole) {
      updateUserRole('tutor');
    }
    
    // Hide confetti after 3 seconds
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, [updateUserRole]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Header />
      
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`
              }}
            >
              <Sparkles className={`w-4 h-4 text-${['yellow', 'green', 'blue', 'purple'][Math.floor(Math.random() * 4)]}-500`} />
            </div>
          ))}
        </div>
      )}
      
      <div className="container mx-auto px-6 py-8 pt-24 max-w-4xl">
        {/* Success Banner */}
        <Card className="shadow-2xl border-0 bg-gradient-to-r from-green-500 to-blue-600 text-white mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <CardContent className="p-8 relative">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-4xl font-bold mb-4">🎉 Chúc mừng!</h1>
              <h2 className="text-2xl mb-4">Bạn đã trở thành Gia sư thành công!</h2>
              <p className="text-white/90 text-lg">
                Hành trình giảng dạy của bạn bắt đầu từ đây. Chào mừng đến với cộng đồng gia sư AitheduConnect!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* New Features Unlocked */}
        <Card className="shadow-lg border-0 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="w-6 h-6 mr-3 text-yellow-600" />
              Tính năng mới đã mở khóa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <GraduationCap className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="font-bold mb-2">Trang Quản Lý Gia Sư</h3>
                <p className="text-sm text-gray-600">Quản lý lớp học, học sinh, lịch dạy và doanh thu</p>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <Users className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <h3 className="font-bold mb-2">Kết nối Học sinh</h3>
                <p className="text-sm text-gray-600">Nhận booking requests và quản lý học sinh</p>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <DollarSign className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <h3 className="font-bold mb-2">Kiếm thu nhập</h3>
                <p className="text-sm text-gray-600">Rút tiền và theo dõi doanh thu</p>
              </div>
            </div>
          </CardContent>
        </Card>



        {/* Next Steps */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle>🚀 Bước tiếp theo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/my-profile">
                <Button className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-lg">
                  <GraduationCap className="w-6 h-6 mr-3" />
                  Đi đến Trang Quản Lý Gia Sư
                </Button>
              </Link>
              
              <Link href="/my-biography">
                <Button variant="outline" className="w-full h-16 text-lg">
                  📝 Cập nhật My Bio
                </Button>
              </Link>
              
              <Link href="/profile/tutor/viet-hoang">
                <Button variant="outline" className="w-full h-16 text-lg">
                  👀 Xem Public Profile
                </Button>
              </Link>
              
              <Link href="/role-demo">
                <Button variant="outline" className="w-full h-16 text-lg">
                  🔄 Role Demo (Test)
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Achievement Badge */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center p-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full shadow-lg">
            <Star className="w-6 h-6 mr-2" />
            <span className="font-bold">New Achievement: Gia sư Mới!</span>
            <Star className="w-6 h-6 ml-2" />
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { type Tutor } from "@shared/schema";
import { 
  Star, 
  ArrowLeft,
  Users,
  Clock,
  MessageCircle
} from "lucide-react";
import Header from "@/components/header";
import { Link } from "wouter";

export default function Favorites() {
  const { data: tutors = [], isLoading } = useQuery<Tutor[]>({
    queryKey: ['/api/tutors'],
  });

  // Mock favorites for now - in real app this would come from user preferences
  const favoriteTutors = tutors.slice(0, 4);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onToggleSidebar={toggleSidebar} />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Đang tải danh sách yêu thích...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onToggleSidebar={toggleSidebar} />
      
      <div className="container mx-auto px-4 py-6 pt-20">
        {/* Page Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Chi tiết gia sư</h1>
        </div>

        {/* Favorites Grid */}
        <div className="space-y-4">
          {favoriteTutors.map((tutor) => (
            <Card key={tutor.id} className="p-6 bg-white rounded-xl border border-gray-200">
              <div className="flex items-center justify-between">
                {/* Left Side - Tutor Info */}
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center border-2 border-orange-200">
                    <span className="text-2xl">👨‍🏫</span>
                  </div>
                  
                  {/* Info */}
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">{tutor.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">Giáo viên Toán Anh</p>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(parseFloat(tutor.rating || "0"))
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    
                    {/* Subject Tags */}
                    <div className="flex gap-2">
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Toán</Badge>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Anh</Badge>
                      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Văn</Badge>
                    </div>
                  </div>
                </div>

                {/* Center - Students & Reviews */}
                <div className="flex items-center gap-8">
                  {/* Students */}
                  <div className="flex items-center gap-6">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-8 h-8 bg-blue-100 rounded-full border-2 border-white flex items-center justify-center">
                          <span className="text-xs">👤</span>
                        </div>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">Học viên</span>
                  </div>

                  {/* Stats */}
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">500+</div>
                    <div className="text-xs text-gray-600">Người theo dõi</div>
                  </div>
                </div>

                {/* Right Side - Offers & Actions */}
                <div className="flex items-center gap-4">
                  {/* Offers */}
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                          <span className="text-orange-600 font-bold">20%</span>
                        </div>
                        <span className="text-gray-700">Giảm 20% dịch vụ online đặc biệt AITHÔNG</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2">
                    <Link href={`/tutor/${tutor.id}`}>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                        Trang cá nhân
                      </Button>
                    </Link>
                    <Button variant="outline" className="px-6 py-2 rounded-lg">
                      Nhắn tin
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {favoriteTutors.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-4xl">💝</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Chưa có gia sư yêu thích</h3>
            <p className="text-gray-600 mb-6">Hãy khám phá và thêm những gia sư ưa thích vào danh sách này</p>
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Khám phá gia sư
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
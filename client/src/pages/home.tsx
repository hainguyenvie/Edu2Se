import { useState } from "react";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import VideoCarousel from "@/components/video-carousel";
import SearchFilters from "@/components/search-filters";
import TutorCard from "@/components/tutor-card";
import CommunityFeatures from "@/components/community-features";
import { useQuery } from "@tanstack/react-query";
import { type Tutor, type SearchFilters as SearchFiltersType } from "@shared/schema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState<SearchFiltersType>({});

  // Build query string from filters
  const queryParams = new URLSearchParams();
  if (filters.subject) queryParams.append('subject', filters.subject);
  if (filters.courseType) queryParams.append('courseType', filters.courseType);
  if (filters.minPrice) queryParams.append('minPrice', filters.minPrice.toString());
  if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice.toString());
  if (filters.timeSlots?.length) queryParams.append('timeSlots', filters.timeSlots.join(','));
  if (filters.keywords) queryParams.append('keywords', filters.keywords);

  const { data: tutors = [], isLoading } = useQuery<Tutor[]>({
    queryKey: ['/api/tutors', queryParams.toString()],
  });

  const handleFilterChange = (newFilters: SearchFiltersType) => {
    setFilters(newFilters);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onToggleSidebar={toggleSidebar} />
      
      <div className="flex pt-16">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={closeSidebar}
          />
        )}

        {/* Main content */}
        <main className="flex-1 lg:ml-64">
          {/* Promotional Banner */}
          <div className="bg-gradient-to-r from-purple-400 to-pink-400 text-white p-6 mx-4 mt-4 rounded-lg">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">🎉 KHUYẾN MÃI ĐẶC BIỆT</h2>
              <p className="text-purple-100">
                Học thử 15 phút miễn phí cho học viên mới • Giảm 50% khóa học đầu tiên
              </p>
            </div>
          </div>

          {/* Video Carousel */}
          <VideoCarousel />

          {/* Search Filters */}
          <SearchFilters onFiltersChange={handleFilterChange} />

          {/* Tutors Section */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Gia sư nổi bật</h2>
                <p className="text-gray-600 mt-1">
                  {tutors.length} gia sư {filters.subject ? `dạy ${filters.subject}` : 'đang sẵn sàng'}
                </p>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>Sắp xếp:</span>
                <Select defaultValue="relevant">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevant">Phù hợp nhất</SelectItem>
                    <SelectItem value="price-low">Giá thấp nhất</SelectItem>
                    <SelectItem value="rating">Đánh giá cao nhất</SelectItem>
                    <SelectItem value="newest">Mới nhất</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Tutors Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 animate-pulse">
                    <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : tutors.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Không tìm thấy gia sư nào
                </h3>
                <p className="text-gray-600 mb-4">
                  Thử điều chỉnh bộ lọc tìm kiếm để xem thêm kết quả
                </p>
                <Button 
                  onClick={() => setFilters({})}
                  variant="outline"
                >
                  Xóa bộ lọc
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {tutors.map((tutor) => (
                  <TutorCard key={tutor.id} tutor={tutor} />
                ))}
              </div>
            )}

            {/* Load More Section */}
            {tutors.length > 0 && (
              <div className="text-center mt-8">
                <Button variant="outline" size="lg">
                  Xem thêm gia sư
                </Button>
              </div>
            )}
          </div>

          {/* Community Features */}
          <CommunityFeatures />
        </main>
      </div>
    </div>
  );
}

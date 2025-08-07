import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Copy, 
  Calendar, 
  Percent, 
  Clock, 
  Gift,
  Tag,
  Users,
  Star,
  Zap,
  TrendingUp,
  Filter,
  Search
} from "lucide-react";
import Header from "@/components/header";

interface Coupon {
  id: string;
  title: string;
  code: string;
  discountType: "percent" | "fixed" | "free_trial";
  discountValue: number;
  description: string;
  validFrom: string;
  validTo: string;
  conditions: string[];
  eligibility: "new_users" | "all_users" | "returning_users";
  status: "active" | "expired" | "soon_expire";
  category: "general" | "first_time" | "seasonal" | "premium";
  usageCount: number;
  maxUsage?: number;
  isHot?: boolean;
  isNew?: boolean;
}

export default function CouponsPage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterEligibility, setFilterEligibility] = useState("all");
  const [sortBy, setSortBy] = useState("expiry");
  const [testCouponCode, setTestCouponCode] = useState("");
  const [activeTab, setActiveTab] = useState("browse");

  // Mock coupon data
  const coupons: Coupon[] = [
    {
      id: "1",
      title: "Chào mừng học viên mới",
      code: "WELCOME50",
      discountType: "percent",
      discountValue: 50,
      description: "Giảm 50% cho buổi học đầu tiên",
      validFrom: "2025-01-01",
      validTo: "2025-03-31",
      conditions: ["Chỉ dành cho học viên mới", "Áp dụng 1 lần duy nhất"],
      eligibility: "new_users",
      status: "active",
      category: "first_time",
      usageCount: 245,
      maxUsage: 500,
      isNew: true,
      isHot: true
    },
    {
      id: "2",
      title: "Học thử miễn phí",
      code: "FREETRIAL15",
      discountType: "free_trial",
      discountValue: 15,
      description: "15 phút học thử miễn phí với gia sư",
      validFrom: "2025-01-15",
      validTo: "2025-02-28",
      conditions: ["Áp dụng cho tất cả gia sư", "Không giới hạn số lần sử dụng"],
      eligibility: "all_users",
      status: "active",
      category: "general",
      usageCount: 1230,
      isHot: true
    },
    {
      id: "3",
      title: "Giảm giá Tết Nguyên Đán",
      code: "TET2025",
      discountType: "fixed",
      discountValue: 100000,
      description: "Giảm 100K cho gói học dài hạn",
      validFrom: "2025-01-25",
      validTo: "2025-02-15",
      conditions: ["Áp dụng cho gói học từ 500K trở lên", "Không áp dụng cùng mã khác"],
      eligibility: "all_users",
      status: "active",
      category: "seasonal",
      usageCount: 89,
      maxUsage: 200,
      isNew: true
    },
    {
      id: "4",
      title: "Combo 5 buổi học",
      code: "COMBO5",
      discountType: "percent",
      discountValue: 25,
      description: "Giảm 25% khi đặt combo 5 buổi học",
      validFrom: "2025-01-01",
      validTo: "2025-04-30",
      conditions: ["Áp dụng cho combo từ 5 buổi", "Thanh toán một lần"],
      eligibility: "all_users",
      status: "active",
      category: "general",
      usageCount: 156,
      maxUsage: 300
    },
    {
      id: "5",
      title: "Học sinh quay lại",
      code: "COMEBACK30",
      discountType: "percent",
      discountValue: 30,
      description: "Giảm 30% cho học sinh cũ quay lại",
      validFrom: "2025-02-01",
      validTo: "2025-02-10",
      conditions: ["Dành cho học sinh đã học trước đây", "Nghỉ học trên 3 tháng"],
      eligibility: "returning_users",
      status: "soon_expire",
      category: "premium",
      usageCount: 23,
      maxUsage: 100
    },
    {
      id: "6",
      title: "Flash Sale cuối tuần",
      code: "WEEKEND60",
      discountType: "percent",
      discountValue: 60,
      description: "Flash sale 60% chỉ trong cuối tuần",
      validFrom: "2025-01-25",
      validTo: "2025-01-26",
      conditions: ["Chỉ áp dụng thứ 7 & chủ nhật", "Số lượng có hạn"],
      eligibility: "all_users",
      status: "expired",
      category: "seasonal",
      usageCount: 150,
      maxUsage: 150
    }
  ];

  const getDiscountText = (coupon: Coupon) => {
    switch (coupon.discountType) {
      case "percent":
        return `${coupon.discountValue}% OFF`;
      case "fixed":
        return `${coupon.discountValue.toLocaleString()}₫ OFF`;
      case "free_trial":
        return `${coupon.discountValue} phút miễn phí`;
      default:
        return "Giảm giá";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 border-green-200";
      case "soon_expire":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "expired":
        return "bg-gray-100 text-gray-500 border-gray-200";
      default:
        return "bg-gray-100 text-gray-500 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Đang áp dụng";
      case "soon_expire":
        return "Sắp hết hạn";
      case "expired":
        return "Đã hết hạn";
      default:
        return "Không xác định";
    }
  };

  const getEligibilityText = (eligibility: string) => {
    switch (eligibility) {
      case "new_users":
        return "Học viên mới";
      case "all_users":
        return "Tất cả học viên";
      case "returning_users":
        return "Học viên cũ";
      default:
        return "Không xác định";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "first_time":
        return <Star className="w-4 h-4" />;
      case "seasonal":
        return <Gift className="w-4 h-4" />;
      case "premium":
        return <Zap className="w-4 h-4" />;
      default:
        return <Tag className="w-4 h-4" />;
    }
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Đã sao chép!",
      description: `Mã giảm giá "${code}" đã được sao chép vào clipboard.`,
      duration: 2000,
    });
  };

  const testCoupon = () => {
    const coupon = coupons.find(c => c.code.toLowerCase() === testCouponCode.toLowerCase());
    
    if (!coupon) {
      toast({
        title: "Mã không hợp lệ",
        description: "Không tìm thấy mã giảm giá này.",
        variant: "destructive",
      });
      return;
    }

    if (coupon.status === "expired") {
      toast({
        title: "Mã đã hết hạn",
        description: "Mã giảm giá này đã hết hạn sử dụng.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Mã hợp lệ!",
      description: `Bạn sẽ được giảm ${getDiscountText(coupon)} khi áp dụng mã này.`,
    });
  };

  const filteredCoupons = coupons
    .filter(coupon => {
      // Search filter
      if (searchTerm && !coupon.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !coupon.code.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Type filter
      if (filterType !== "all" && coupon.discountType !== filterType) {
        return false;
      }
      
      // Eligibility filter
      if (filterEligibility !== "all" && coupon.eligibility !== filterEligibility) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "expiry":
          return new Date(a.validTo).getTime() - new Date(b.validTo).getTime();
        case "popularity":
          return b.usageCount - a.usageCount;
        case "discount":
          return b.discountValue - a.discountValue;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            🎫 Mã Giảm Giá
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Khám phá các ưu đãi hấp dẫn và tiết kiệm chi phí học tập của bạn
          </p>
        </div>

        {/* Hot Deals Banner */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-xl p-6 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5" />
                <span className="font-bold text-sm">FLASH SALE</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Giảm đến 60% - Chỉ còn 2 ngày!</h3>
              <p className="text-sm opacity-90">Ưu đãi đặc biệt cho học viên mới. Đăng ký ngay!</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-white border border-gray-200 rounded-xl p-1 h-auto">
            <TabsTrigger 
              value="browse" 
              className="flex items-center justify-center gap-2 text-base py-4 px-6 rounded-lg transition-all duration-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-50"
            >
              <Tag className="w-5 h-5" />
              Duyệt mã giảm giá
            </TabsTrigger>
            <TabsTrigger 
              value="test"
              className="flex items-center justify-center gap-2 text-base py-4 px-6 rounded-lg transition-all duration-200 data-[state=active]:bg-pink-600 data-[state=active]:text-white data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-50"
            >
              <Search className="w-5 h-5" />
              Kiểm tra mã
            </TabsTrigger>
          </TabsList>

          {/* Browse Coupons Tab */}
          <TabsContent value="browse" className="space-y-6">
            {/* Filters */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-gray-500" />
                    <span className="font-medium text-gray-700">Lọc kết quả:</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 flex-1">
                    <div className="flex-1 min-w-[200px]">
                      <Input
                        placeholder="Tìm kiếm mã giảm giá..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Loại giảm giá" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả loại</SelectItem>
                        <SelectItem value="percent">Giảm %</SelectItem>
                        <SelectItem value="fixed">Giảm tiền</SelectItem>
                        <SelectItem value="free_trial">Học thử</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={filterEligibility} onValueChange={setFilterEligibility}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Đối tượng" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả</SelectItem>
                        <SelectItem value="new_users">Học viên mới</SelectItem>
                        <SelectItem value="all_users">Mọi học viên</SelectItem>
                        <SelectItem value="returning_users">Học viên cũ</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Sắp xếp" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="expiry">Thời hạn</SelectItem>
                        <SelectItem value="popularity">Phổ biến</SelectItem>
                        <SelectItem value="discount">Mức giảm</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Coupons Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCoupons.map((coupon) => (
                <Card key={coupon.id} className={`group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-0 bg-white/90 backdrop-blur-sm relative overflow-hidden ${coupon.status === 'expired' ? 'opacity-60' : ''}`}>
                  {/* Gradient overlay for different categories */}
                  <div className={`absolute inset-0 opacity-5 ${
                    coupon.discountType === 'percent' ? 'bg-gradient-to-br from-green-400 to-green-600' :
                    coupon.discountType === 'fixed' ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
                    'bg-gradient-to-br from-purple-400 to-purple-600'
                  }`}></div>
                  
                  <CardHeader className="relative z-10 pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(coupon.category)}
                        <CardTitle className="text-lg font-bold text-gray-900 line-clamp-2">
                          {coupon.title}
                        </CardTitle>
                      </div>
                      <div className="flex flex-col gap-1">
                        {coupon.isNew && (
                          <Badge className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1">
                            MỚI
                          </Badge>
                        )}
                        {coupon.isHot && (
                          <Badge className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-2 py-1">
                            HOT
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    {/* Discount Amount */}
                    <div className={`text-2xl font-black ${
                      coupon.discountType === 'percent' ? 'text-green-600' :
                      coupon.discountType === 'fixed' ? 'text-blue-600' :
                      'text-purple-600'
                    }`}>
                      {getDiscountText(coupon)}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="relative z-10 pt-0">
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {coupon.description}
                    </p>
                    
                    {/* Coupon Code */}
                    <div className="bg-gray-50 rounded-lg p-3 mb-4 border-2 border-dashed border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 font-medium">MÃ:</span>
                          <code className="font-mono font-bold text-lg text-gray-900">
                            {coupon.code}
                          </code>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(coupon.code)}
                          className="hover:bg-purple-50 hover:border-purple-300"
                          disabled={coupon.status === 'expired'}
                        >
                          <Copy className="w-4 h-4 mr-1" />
                          Sao chép
                        </Button>
                      </div>
                    </div>
                    
                    {/* Status and Eligibility */}
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className={getStatusColor(coupon.status)}>
                        {getStatusText(coupon.status)}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <Users className="w-3 h-3 mr-1" />
                        {getEligibilityText(coupon.eligibility)}
                      </Badge>
                    </div>
                    
                    {/* Validity Period */}
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(coupon.validFrom).toLocaleDateString('vi-VN')} - {new Date(coupon.validTo).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                    
                    {/* Usage Stats */}
                    {coupon.maxUsage && (
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                        <TrendingUp className="w-4 h-4" />
                        <span>
                          Đã sử dụng: {coupon.usageCount}/{coupon.maxUsage}
                        </span>
                        <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-purple-500 h-1.5 rounded-full" 
                            style={{ width: `${(coupon.usageCount / coupon.maxUsage) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    {/* Conditions */}
                    <div className="space-y-1">
                      <span className="text-xs font-medium text-gray-700">Điều kiện:</span>
                      {coupon.conditions.map((condition, index) => (
                        <div key={index} className="text-xs text-gray-500 flex items-start gap-1">
                          <span className="text-purple-400">•</span>
                          <span>{condition}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredCoupons.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Tag className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-medium text-gray-500 mb-2">Không tìm thấy mã giảm giá</h3>
                <p className="text-gray-400">Thử thay đổi bộ lọc để xem thêm ưu đãi</p>
              </div>
            )}
          </TabsContent>

          {/* Test Coupon Tab */}
          <TabsContent value="test" className="space-y-6">
            <Card className="border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Kiểm tra mã giảm giá
                </CardTitle>
                <p className="text-gray-600">Nhập mã giảm giá để kiểm tra tính hợp lệ và mức giảm</p>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Input
                    placeholder="Nhập mã giảm giá (ví dụ: WELCOME50)"
                    value={testCouponCode}
                    onChange={(e) => setTestCouponCode(e.target.value)}
                    className="flex-1 text-lg font-mono"
                  />
                  <Button 
                    onClick={testCoupon}
                    className="bg-purple-600 hover:bg-purple-700"
                    disabled={!testCouponCode.trim()}
                  >
                    Kiểm tra
                  </Button>
                </div>
                
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-2">Mã giảm giá có sẵn:</h4>
                  <div className="flex flex-wrap gap-2">
                    {coupons.filter(c => c.status === 'active').slice(0, 6).map((coupon) => (
                      <Button
                        key={coupon.id}
                        variant="outline"
                        size="sm"
                        onClick={() => setTestCouponCode(coupon.code)}
                        className="text-xs"
                      >
                        {coupon.code}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
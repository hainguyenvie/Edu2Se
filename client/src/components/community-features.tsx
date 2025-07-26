import { Button } from "@/components/ui/button";
import { Users, HelpCircle, Trophy } from "lucide-react";

export default function CommunityFeatures() {
  const features = [
    {
      icon: Users,
      title: "Study-With-Me",
      description: "47 phòng đang hoạt động",
      buttonText: "Tham gia ngay",
      buttonColor: "bg-green-500 hover:bg-green-600",
    },
    {
      icon: HelpCircle,
      title: "Q&A Forum",
      description: "123 câu hỏi hôm nay",
      buttonText: "Đặt câu hỏi",
      buttonColor: "bg-yellow-500 hover:bg-yellow-600",
    },
    {
      icon: Trophy,
      title: "Bảng xếp hạng",
      description: "Thi đua học tập",
      buttonText: "Xem thứ hạng",
      buttonColor: "bg-purple-500 hover:bg-purple-600",
    },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 mx-4 mb-8 p-6 rounded-lg">
      <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 Tính năng cộng đồng</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-3 mb-3">
              <div className={`w-10 h-10 ${feature.buttonColor} rounded-full flex items-center justify-center`}>
                <feature.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
            <Button className={`w-full ${feature.buttonColor} text-white text-sm font-medium`}>
              {feature.buttonText}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Users } from "lucide-react";
import Header from "@/components/header";
import QuickRequestsFeed from "@/components/quick-requests-feed";
import QuickRequestFAB from "@/components/quick-request-fab";
import { useAuth } from "@/contexts/auth-context";

export default function QuickRequests() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-10 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Yêu Cầu Nhanh</h1>
          <p className="text-gray-600">Đăng yêu cầu học tập hoặc dạy học của bạn một cách nhanh chóng</p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">
              Tất cả
            </TabsTrigger>
            <TabsTrigger value="need-tutor">
              <GraduationCap className="w-4 h-4 mr-2" />
              Cần gia sư
            </TabsTrigger>
            <TabsTrigger value="need-student">
              <Users className="w-4 h-4 mr-2" />
              Cần học sinh
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <QuickRequestsFeed showHeader={false} />
          </TabsContent>

          <TabsContent value="need-tutor" className="mt-6">
            <QuickRequestsFeed filterType="need-tutor" showHeader={false} />
          </TabsContent>

          <TabsContent value="need-student" className="mt-6">
            <QuickRequestsFeed filterType="need-student" showHeader={false} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Quick Request FAB */}
      <QuickRequestFAB />
    </div>
  );
}
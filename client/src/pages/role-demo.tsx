import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/auth-context";
import { Users, GraduationCap, BookOpen } from "lucide-react";
import Header from "@/components/header";
import { Link } from "wouter";

export default function RoleDemo() {
  const { user, updateUserRole } = useAuth();
  const [selectedRole, setSelectedRole] = useState<'student' | 'tutor'>(user?.role || 'student');

  const handleRoleChange = (newRole: 'student' | 'tutor') => {
    setSelectedRole(newRole);
    if (updateUserRole) {
      updateUserRole(newRole);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8 pt-24 max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Role Demo</h1>
          <p className="text-gray-600">Thay đổi role để test các tính năng khác nhau</p>
        </div>

        {/* Current Role Display */}
        <Card className="shadow-lg border-0 mb-8">
          <CardHeader>
            <CardTitle className="text-center">Role hiện tại</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <Badge className={`text-lg px-4 py-2 ${user?.role === 'tutor' ? 'bg-blue-600' : 'bg-green-600'} text-white`}>
              {user?.role === 'tutor' ? '👨‍🏫 Gia Sư' : '👨‍🎓 Học Sinh'}
            </Badge>
            <p className="text-gray-600 mt-2">
              {user?.fullName || user?.username} - {user?.email}
            </p>
          </CardContent>
        </Card>

        {/* Role Switcher */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card 
            className={`cursor-pointer transition-all duration-200 ${
              selectedRole === 'student' 
                ? 'ring-2 ring-green-500 shadow-lg' 
                : 'hover:shadow-md'
            }`}
            onClick={() => handleRoleChange('student')}
          >
            <CardContent className="p-6 text-center">
              <Users className="w-16 h-16 mx-auto mb-4 text-green-600" />
              <h3 className="text-xl font-bold mb-2">Học Sinh</h3>
              <p className="text-gray-600 text-sm mb-4">
                Tìm gia sư, học tập, quản lý lịch học
              </p>
              <ul className="text-left text-sm text-gray-600 space-y-1">
                <li>• My Bio với student view</li>
                <li>• Tab "Trở thành Gia Sư"</li>
                <li>• Button "Trở thành Gia Sư" → Prompt đăng ký</li>
                <li>• Navigation: My Bio + Trở thành Gia Sư</li>
              </ul>
            </CardContent>
          </Card>

          <Card 
            className={`cursor-pointer transition-all duration-200 ${
              selectedRole === 'tutor' 
                ? 'ring-2 ring-blue-500 shadow-lg' 
                : 'hover:shadow-md'
            }`}
            onClick={() => handleRoleChange('tutor')}
          >
            <CardContent className="p-6 text-center">
              <GraduationCap className="w-16 h-16 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-bold mb-2">Gia Sư</h3>
              <p className="text-gray-600 text-sm mb-4">
                Quản lý học sinh, lớp học, doanh thu
              </p>
              <ul className="text-left text-sm text-gray-600 space-y-1">
                <li>• My Bio với tutor features</li>
                <li>• Tab "Trang Gia Sư"</li>
                <li>• Full Tutor Dashboard</li>
                <li>• Navigation: My Bio + Trang Gia Sư</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="w-6 h-6 mr-3" />
              Test Navigation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/my-biography">
                <Button variant="outline" className="w-full">
                  📝 My Bio
                </Button>
              </Link>
              <Link href="/my-profile">
                <Button variant="outline" className="w-full">
                  {user?.role === 'tutor' ? '👨‍🏫 Trang Gia Sư' : '🚀 Trở thành Gia Sư'}
                </Button>
              </Link>
              <Link href="/profile/student/test-user">
                <Button variant="outline" className="w-full">
                  👀 Public Profile
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Role Logic Explanation */}
        <Card className="shadow-lg border-0 mt-8">
          <CardHeader>
            <CardTitle>🔍 Role Logic Test</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">👨‍🎓 Student Role Logic:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Navigation: "My Bio" + "Trở thành Gia Sư"</li>
                  <li>• My Bio: Tab "Trở thành Gia Sư" → Registration CTA</li>
                  <li>• /my-profile → "Bạn chưa phải là gia sư" prompt</li>
                </ul>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">👨‍🏫 Tutor Role Logic:</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Navigation: "My Bio" + "Trang Gia Sư"</li>
                  <li>• My Bio: Tab "Trang Gia Sư" → Link to dashboard</li>
                  <li>• /my-profile → Full Tutor Dashboard</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

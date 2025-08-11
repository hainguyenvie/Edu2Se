import { useState } from "react";
import Header from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth-context";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export default function SettingsPage() {
  const { user } = useAuth();
  const { toast } = useToast();

  // Account info
  const [fullName, setFullName] = useState<string>(user?.fullName || "");
  const [loginIdentifier] = useState<string>(user?.email || user?.username || "");

  // Extended profile fields (demo/local state)
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [school, setSchool] = useState<string>("");
  const [gradeLevel, setGradeLevel] = useState<string>("");
  const [favoriteSubjects, setFavoriteSubjects] = useState<string>("");
  const [learningGoals, setLearningGoals] = useState<string>("");
  const [preferredStudyTime, setPreferredStudyTime] = useState<string>("");

  // Notifications
  const [notifyApp, setNotifyApp] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifyMessages, setNotifyMessages] = useState(true);
  const [notifyReminders, setNotifyReminders] = useState(true);

  // Security
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Student payment prefs (removed general payment note)

  // Invoice (Hóa đơn) settings per Vietnamese VAT e-invoice
  const [requireInvoice, setRequireInvoice] = useState<boolean>(false);
  const [invoiceType, setInvoiceType] = useState<string>("individual"); // individual | business
  // Common invoice contact
  const [invoiceEmail, setInvoiceEmail] = useState<string>(user?.email || "");
  const [invoicePhone, setInvoicePhone] = useState<string>("");
  // Individual invoice
  const [individualName, setIndividualName] = useState<string>(user?.fullName || "");
  const [individualAddress, setIndividualAddress] = useState<string>("");
  const [personalTaxCode, setPersonalTaxCode] = useState<string>(""); // optional
  // Business invoice
  const [businessName, setBusinessName] = useState<string>("");
  const [taxCode, setTaxCode] = useState<string>(""); // Mã số thuế (MST)
  const [businessAddress, setBusinessAddress] = useState<string>("");
  const [invoiceRecipient, setInvoiceRecipient] = useState<string>("");

  // Roles
  const isTutor = (user?.role || "student") === "tutor";
  const isStudent = (user?.role || "student") === "student";
  const [tutorPricePerHour, setTutorPricePerHour] = useState<string>("");
  const [tutorBio, setTutorBio] = useState<string>("");
  // Tutor withdrawal banking info
  const [bankAccountName, setBankAccountName] = useState<string>(user?.fullName || "");
  const [bankAccountNumber, setBankAccountNumber] = useState<string>("");
  const [bankName, setBankName] = useState<string>("");
  const [bankBranch, setBankBranch] = useState<string>("");
  const [nationalIdNumber, setNationalIdNumber] = useState<string>(""); // CMND/CCCD
  const [payoutAgreement, setPayoutAgreement] = useState<boolean>(false);

  const handleSaveAccount = () => {
    toast({ title: "Đã lưu", description: "Cập nhật thông tin tài khoản (demo)." });
  };

  const handleSaveNotifications = () => {
    toast({ title: "Đã lưu", description: "Cập nhật cài đặt thông báo (demo)." });
  };

  const handleChangePassword = () => {
    if (!oldPassword || !newPassword || newPassword !== confirmPassword) {
      toast({ title: "Lỗi", description: "Vui lòng kiểm tra lại mật khẩu.", variant: "destructive" });
      return;
    }
    toast({ title: "Thành công", description: "Đổi mật khẩu (demo)." });
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleSavePayments = () => {
    toast({ title: "Đã lưu", description: "Cập nhật cài đặt thanh toán & hóa đơn (demo)." });
  };

  const handleSaveTutor = () => {
    toast({ title: "Đã lưu", description: "Cập nhật hồ sơ gia sư (demo)." });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-5xl mx-auto px-4 pt-24 pb-12">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Cài đặt</h1>
          <p className="text-sm text-gray-600 mt-1">Tùy chỉnh tài khoản và trải nghiệm học tập của bạn.</p>
        </div>

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid grid-cols-4 md:w-[640px] w-full">
            <TabsTrigger value="account">Tài khoản</TabsTrigger>
            <TabsTrigger value="notifications">Thông báo</TabsTrigger>
            <TabsTrigger value="security">Bảo mật</TabsTrigger>
            <TabsTrigger value="payments">Thanh toán</TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin tài khoản</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Họ và tên</Label>
                  <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Nhập họ tên" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loginId">Email / Tên đăng nhập</Label>
                  <Input id="loginId" value={loginIdentifier} disabled />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input id="phone" inputMode="tel" placeholder="Ví dụ: 09xxxxxxxx" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Ngày sinh</Label>
                  <Input id="dob" type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label>Giới tính</Label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn giới tính" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Nam</SelectItem>
                      <SelectItem value="female">Nữ</SelectItem>
                      <SelectItem value="other">Khác</SelectItem>
                      <SelectItem value="prefer-not">Không tiết lộ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Tỉnh/Thành phố</Label>
                  <Input id="city" placeholder="Ví dụ: Hà Nội" value={city} onChange={(e) => setCity(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="school">Trường</Label>
                  <Input id="school" placeholder="Ví dụ: THPT Chuyên ..." value={school} onChange={(e) => setSchool(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grade">Khối/Lớp</Label>
                  <Input id="grade" placeholder="Ví dụ: Lớp 12" value={gradeLevel} onChange={(e) => setGradeLevel(e.target.value)} />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="favSubjects">Môn học yêu thích</Label>
                  <Input id="favSubjects" placeholder="Ví dụ: Toán, Lý, Hóa" value={favoriteSubjects} onChange={(e) => setFavoriteSubjects(e.target.value)} />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="goals">Mục tiêu học tập</Label>
                  <Textarea id="goals" placeholder="Ví dụ: Nâng điểm Toán lên 9.0, luyện thi ĐH, ..." value={learningGoals} onChange={(e) => setLearningGoals(e.target.value)} />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label>Thời gian học ưa thích</Label>
                  <Select value={preferredStudyTime} onValueChange={setPreferredStudyTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn thời gian học" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Buổi sáng</SelectItem>
                      <SelectItem value="afternoon">Buổi chiều</SelectItem>
                      <SelectItem value="evening">Buổi tối</SelectItem>
                      <SelectItem value="weekend">Cuối tuần</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Button onClick={handleSaveAccount}>Lưu thay đổi</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Thông báo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Thông báo trong ứng dụng</p>
                    <p className="text-sm text-gray-600">Hiển thị thông báo trong AitheduConnect.</p>
                  </div>
                  <Switch checked={notifyApp} onCheckedChange={setNotifyApp} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Thông báo qua email</p>
                    <p className="text-sm text-gray-600">Nhận email về hoạt động tài khoản.</p>
                  </div>
                  <Switch checked={notifyEmail} onCheckedChange={setNotifyEmail} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Tin nhắn mới</p>
                    <p className="text-sm text-gray-600">Nhắc bạn khi có tin nhắn mới.</p>
                  </div>
                  <Switch checked={notifyMessages} onCheckedChange={setNotifyMessages} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Lịch học & lời nhắc</p>
                    <p className="text-sm text-gray-600">Nhắc trước buổi học, thay đổi lịch.</p>
                  </div>
                  <Switch checked={notifyReminders} onCheckedChange={setNotifyReminders} />
                </div>
                <div>
                  <Button onClick={handleSaveNotifications}>Lưu cài đặt</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Bảo mật</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="oldPassword">Mật khẩu hiện tại</Label>
                  <Input id="oldPassword" type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Mật khẩu mới</Label>
                  <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                  <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <div className="md:col-span-2">
                  <Button onClick={handleChangePassword}>Đổi mật khẩu</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="mt-4 space-y-6">
            {/* Student receipt/invoice settings */}
            {isStudent && (
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin xuất hóa đơn/biên lai (Học viên)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">Thiết lập thông tin để xuất hóa đơn điện tử/biên lai học phí theo quy định (Nghị định 123/2020/NĐ-CP, Thông tư 78/2021/TT-BTC).</p>
                  <div className="flex items-center gap-3">
                    <Checkbox id="requireInvoice" checked={requireInvoice} onCheckedChange={(v) => setRequireInvoice(Boolean(v))} />
                    <Label htmlFor="requireInvoice">Yêu cầu xuất hóa đơn/biên lai</Label>
                  </div>

                  {requireInvoice && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Loại chứng từ</Label>
                        <Select value={invoiceType} onValueChange={setInvoiceType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn loại" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="individual">Cá nhân</SelectItem>
                            <SelectItem value="business">Tổ chức/Doanh nghiệp</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="invoiceEmail">Email nhận chứng từ</Label>
                        <Input id="invoiceEmail" type="email" value={invoiceEmail} onChange={(e) => setInvoiceEmail(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="invoicePhone">Số điện thoại</Label>
                        <Input id="invoicePhone" inputMode="tel" value={invoicePhone} onChange={(e) => setInvoicePhone(e.target.value)} />
                      </div>

                      {invoiceType === "individual" ? (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="individualName">Họ và tên (người nhận)</Label>
                            <Input id="individualName" value={individualName} onChange={(e) => setIndividualName(e.target.value)} />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="individualAddress">Địa chỉ</Label>
                            <Input id="individualAddress" value={individualAddress} onChange={(e) => setIndividualAddress(e.target.value)} />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="personalTaxCode">Mã số thuế cá nhân (nếu có)</Label>
                            <Input id="personalTaxCode" value={personalTaxCode} onChange={(e) => setPersonalTaxCode(e.target.value)} />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="businessName">Tên đơn vị</Label>
                            <Input id="businessName" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="taxCode">Mã số thuế (MST)</Label>
                            <Input id="taxCode" value={taxCode} onChange={(e) => setTaxCode(e.target.value)} />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="businessAddress">Địa chỉ đơn vị</Label>
                            <Input id="businessAddress" value={businessAddress} onChange={(e) => setBusinessAddress(e.target.value)} />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="invoiceRecipient">Người nhận chứng từ (email/tên)</Label>
                            <Input id="invoiceRecipient" value={invoiceRecipient} onChange={(e) => setInvoiceRecipient(e.target.value)} />
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Tutor withdrawal information (always visible for now) */}
            {true && (
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin rút tiền cho Gia sư</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Để tuân thủ quy định chi trả và xác minh danh tính, vui lòng cung cấp chính xác thông tin CMND/CCCD và tài khoản ngân hàng.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bankAccountName">Chủ tài khoản</Label>
                      <Input id="bankAccountName" value={bankAccountName} onChange={(e) => setBankAccountName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bankAccountNumber">Số tài khoản</Label>
                      <Input id="bankAccountNumber" inputMode="numeric" value={bankAccountNumber} onChange={(e) => setBankAccountNumber(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bankName">Ngân hàng</Label>
                      <Input id="bankName" placeholder="Ví dụ: Vietcombank" value={bankName} onChange={(e) => setBankName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bankBranch">Chi nhánh</Label>
                      <Input id="bankBranch" placeholder="Ví dụ: CN Cầu Giấy" value={bankBranch} onChange={(e) => setBankBranch(e.target.value)} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="nationalIdNumber">Số CMND/CCCD</Label>
                      <Input id="nationalIdNumber" inputMode="numeric" value={nationalIdNumber} onChange={(e) => setNationalIdNumber(e.target.value)} />
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Checkbox id="payoutAgreement" checked={payoutAgreement} onCheckedChange={(v) => setPayoutAgreement(Boolean(v))} />
                    <Label htmlFor="payoutAgreement" className="text-sm text-gray-700">
                      Tôi xác nhận thông tin rút tiền là chính xác và đồng ý để AitheduConnect thực hiện chuyển khoản. Tôi chịu trách nhiệm khai báo thuế theo quy định pháp luật Việt Nam khi cần thiết.
                    </Label>
                  </div>
                </CardContent>
              </Card>
            )}

            <div>
              <Button onClick={handleSavePayments}>Lưu cài đặt thanh toán</Button>
            </div>
          </TabsContent>
        </Tabs>

        {isTutor && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Cài đặt dành cho Gia sư</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tutorPrice">Giá dạy (VND/giờ)</Label>
                  <Input
                    id="tutorPrice"
                    inputMode="numeric"
                    placeholder="Ví dụ: 150000"
                    value={tutorPricePerHour}
                    onChange={(e) => setTutorPricePerHour(e.target.value)}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="tutorBio">Giới thiệu ngắn</Label>
                  <Input id="tutorBio" placeholder="Giới thiệu bản thân, thế mạnh, kinh nghiệm..." value={tutorBio} onChange={(e) => setTutorBio(e.target.value)} />
                </div>
                <div className="flex gap-2 md:col-span-2">
                  <Button onClick={handleSaveTutor}>Lưu cài đặt gia sư</Button>
                  <a href="/my-profile">
                    <Button variant="outline">Cập nhật hồ sơ chi tiết</Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}



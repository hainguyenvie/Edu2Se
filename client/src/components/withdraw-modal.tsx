import { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";

type BankInfo = {
  accountName?: string;
  accountNumber?: string;
  bankName?: string;
  bankBranch?: string;
  nationalIdNumber?: string;
};

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableBalance: number;
  bankInfo?: BankInfo;
  onSuccess?: (amount: number) => void;
}

export default function WithdrawModal({ isOpen, onClose, availableBalance, bankInfo, onSuccess }: WithdrawModalProps) {
  const { toast } = useToast();
  const [amount, setAmount] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [agree, setAgree] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("withdraw");

  const MIN_WITHDRAW = 50000; // VND
  const FEE_FIXED = 3000; // VND (demo) - removed from UI

  const essentialInfoMissing = useMemo(() => {
    const a = bankInfo?.accountName?.trim();
    const n = bankInfo?.accountNumber?.trim();
    const b = bankInfo?.bankName?.trim();
    const id = bankInfo?.nationalIdNumber?.trim();
    return !a || !n || !b || !id;
  }, [bankInfo]);

  const parsedAmount = useMemo(() => {
    const num = parseInt((amount || "").replace(/[^0-9]/g, ""), 10);
    return Number.isFinite(num) ? num : 0;
  }, [amount]);

  const exceedsBalance = parsedAmount > availableBalance;
  const belowMinimum = parsedAmount > 0 && parsedAmount < MIN_WITHDRAW;
  const netAmount = parsedAmount; // No fee deduction
  const isValid = parsedAmount >= MIN_WITHDRAW && !exceedsBalance && !essentialInfoMissing && agree;

  const formatVnd = (val: number) => new Intl.NumberFormat('vi-VN').format(val) + " đ";

  const handleSubmit = () => {
    if (!isValid) return;
    toast({ title: "Yêu cầu rút tiền đã được tạo", description: `Số tiền: ${formatVnd(parsedAmount)}` });
    onSuccess?.(parsedAmount);
    setAmount("");
    setNote("");
    setAgree(false);
    onClose();
  };

  // Mock withdrawal history data
  const withdrawalHistory = [
    {
      id: "WD001",
      amount: 500000,
      status: "completed",
      createdAt: "2024-01-15T10:30:00Z",
      completedAt: "2024-01-16T14:20:00Z",
      note: "Rút tiền tháng 1"
    },
    {
      id: "WD002", 
      amount: 300000,
      status: "processing",
      createdAt: "2024-01-20T09:15:00Z",
      note: "Rút tiền khẩn cấp"
    },
    {
      id: "WD003",
      amount: 750000,
      status: "processing",
      createdAt: "2024-01-22T16:45:00Z",
      note: "Rút tiền cuối tháng"
    },
    {
      id: "WD004",
      amount: 200000,
      status: "completed",
      createdAt: "2024-01-18T11:20:00Z",
      completedAt: "2024-01-19T09:30:00Z",
      note: "Rút tiền khẩn cấp"
    }
  ];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "completed":
        return { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50", label: "Hoàn thành" };
      case "processing":
        return { icon: Clock, color: "text-blue-600", bg: "bg-blue-50", label: "Đang xử lý" };
      default:
        return { icon: Clock, color: "text-gray-600", bg: "bg-gray-50", label: "Không xác định" };
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Rút tiền</DialogTitle>
          <DialogDescription>Yêu cầu chuyển khoản thu nhập về tài khoản ngân hàng của bạn.</DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="withdraw">Rút tiền</TabsTrigger>
            <TabsTrigger value="history">Lịch sử rút tiền</TabsTrigger>
          </TabsList>

          <TabsContent value="withdraw" className="space-y-4 mt-4">
            <div className="flex items-center justify-between p-3 rounded-md bg-blue-50 border border-blue-100">
              <div className="text-sm text-gray-700">Số dư khả dụng</div>
              <Badge className="bg-blue-600">{formatVnd(availableBalance)}</Badge>
            </div>

            {essentialInfoMissing && (
              <Alert>
                <AlertDescription>
                  Thiếu thông tin rút tiền. Vui lòng cập nhật phần "Thông tin rút tiền cho Gia sư" tại Cài đặt trước khi thực hiện rút tiền.
                  <a href="/settings" className="ml-2 underline text-blue-600">Đi tới Cài đặt</a>
                </AlertDescription>
              </Alert>
            )}

            {!essentialInfoMissing && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>Chủ tài khoản</Label>
                  <Input value={bankInfo?.accountName || ""} disabled />
                </div>
                <div className="space-y-1">
                  <Label>Số tài khoản</Label>
                  <Input value={bankInfo?.accountNumber || ""} disabled />
                </div>
                <div className="space-y-1">
                  <Label>Ngân hàng</Label>
                  <Input value={bankInfo?.bankName || ""} disabled />
                </div>
                <div className="space-y-1">
                  <Label>Chi nhánh</Label>
                  <Input value={bankInfo?.bankBranch || ""} disabled />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="withdrawAmount">Số tiền muốn rút (VND)</Label>
              <Input
                id="withdrawAmount"
                inputMode="numeric"
                placeholder="VD: 200000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              {belowMinimum && (
                <div className="text-xs text-red-600">Số tiền tối thiểu: {formatVnd(MIN_WITHDRAW)}</div>
              )}
              {exceedsBalance && (
                <div className="text-xs text-red-600">Số tiền rút vượt quá số dư khả dụng.</div>
              )}
            </div>

            <div className="flex items-start gap-3">
              <Checkbox id="agree" checked={agree} onCheckedChange={(v) => setAgree(Boolean(v))} />
              <Label htmlFor="agree" className="text-sm text-gray-700">
                Tôi xác nhận thông tin là chính xác và đồng ý điều khoản chi trả. Tôi sẽ thực hiện nghĩa vụ thuế theo quy định khi cần thiết.
              </Label>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={onClose}>Hủy</Button>
              <Button onClick={handleSubmit} disabled={!isValid}>Xác nhận rút tiền</Button>
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {withdrawalHistory.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Clock className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>Chưa có lịch sử rút tiền</p>
                </div>
              ) : (
                withdrawalHistory.map((withdrawal) => {
                  const statusInfo = getStatusInfo(withdrawal.status);
                  const StatusIcon = statusInfo.icon;
                  
                  return (
                    <div key={withdrawal.id} className={`p-4 rounded-lg border ${statusInfo.bg}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <StatusIcon className={`w-4 h-4 ${statusInfo.color}`} />
                          <span className={`text-sm font-medium ${statusInfo.color}`}>
                            {statusInfo.label}
                          </span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {withdrawal.id}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-lg">{formatVnd(withdrawal.amount)}</span>
                        <span className="text-xs text-gray-500">
                          {formatDate(withdrawal.createdAt)}
                        </span>
                      </div>
                      
                      {withdrawal.note && (
                        <p className="text-sm text-gray-600 mb-2">{withdrawal.note}</p>
                      )}
                      
                      {withdrawal.status === "completed" && withdrawal.completedAt && (
                        <p className="text-xs text-green-600">
                          Hoàn thành: {formatDate(withdrawal.completedAt)}
                        </p>
                      )}
                      
                      {withdrawal.status === "processing" && (
                        <p className="text-xs text-blue-600">
                          Dự kiến hoàn thành trong 24h
                        </p>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}



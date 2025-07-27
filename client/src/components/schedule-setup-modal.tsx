import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, Plus, Minus, Save, X } from "lucide-react";

interface ScheduleSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TimeSlot {
  start: string;
  end: string;
  isAvailable: boolean;
}

interface DaySchedule {
  [key: string]: TimeSlot[];
}

const DAYS_OF_WEEK = [
  { key: 'monday', name: 'Thứ Hai', nameShort: 'T2' },
  { key: 'tuesday', name: 'Thứ Ba', nameShort: 'T3' },
  { key: 'wednesday', name: 'Thứ Tư', nameShort: 'T4' },
  { key: 'thursday', name: 'Thứ Năm', nameShort: 'T5' },
  { key: 'friday', name: 'Thứ Sáu', nameShort: 'T6' },
  { key: 'saturday', name: 'Thứ Bảy', nameShort: 'T7' },
  { key: 'sunday', name: 'Chủ Nhật', nameShort: 'CN' }
];

const DEFAULT_TIME_SLOTS: TimeSlot[] = [
  { start: '06:00', end: '08:00', isAvailable: false },
  { start: '08:00', end: '10:00', isAvailable: false },
  { start: '10:00', end: '12:00', isAvailable: false },
  { start: '14:00', end: '16:00', isAvailable: false },
  { start: '16:00', end: '18:00', isAvailable: false },
  { start: '18:00', end: '20:00', isAvailable: false },
  { start: '20:00', end: '22:00', isAvailable: false }
];

export default function ScheduleSetupModal({ isOpen, onClose }: ScheduleSetupModalProps) {
  const [schedule, setSchedule] = useState<DaySchedule>(() => {
    const initialSchedule: DaySchedule = {};
    DAYS_OF_WEEK.forEach(day => {
      initialSchedule[day.key] = [...DEFAULT_TIME_SLOTS];
    });
    return initialSchedule;
  });

  const [selectedDay, setSelectedDay] = useState('monday');

  const toggleTimeSlot = (dayKey: string, slotIndex: number) => {
    setSchedule(prev => ({
      ...prev,
      [dayKey]: prev[dayKey].map((slot, index) => 
        index === slotIndex 
          ? { ...slot, isAvailable: !slot.isAvailable }
          : slot
      )
    }));
  };

  const addTimeSlot = (dayKey: string) => {
    const newSlot: TimeSlot = { start: '09:00', end: '11:00', isAvailable: true };
    setSchedule(prev => ({
      ...prev,
      [dayKey]: [...prev[dayKey], newSlot]
    }));
  };

  const removeTimeSlot = (dayKey: string, slotIndex: number) => {
    setSchedule(prev => ({
      ...prev,
      [dayKey]: prev[dayKey].filter((_, index) => index !== slotIndex)
    }));
  };

  const updateTimeSlot = (dayKey: string, slotIndex: number, field: 'start' | 'end', value: string) => {
    setSchedule(prev => ({
      ...prev,
      [dayKey]: prev[dayKey].map((slot, index) => 
        index === slotIndex 
          ? { ...slot, [field]: value }
          : slot
      )
    }));
  };

  const copyScheduleToAll = (sourceDayKey: string) => {
    const sourceSchedule = schedule[sourceDayKey];
    const newSchedule: DaySchedule = {};
    
    DAYS_OF_WEEK.forEach(day => {
      newSchedule[day.key] = sourceSchedule.map(slot => ({ ...slot }));
    });
    
    setSchedule(newSchedule);
  };

  const clearDaySchedule = (dayKey: string) => {
    setSchedule(prev => ({
      ...prev,
      [dayKey]: prev[dayKey].map(slot => ({ ...slot, isAvailable: false }))
    }));
  };

  const setAllDayAvailable = (dayKey: string) => {
    setSchedule(prev => ({
      ...prev,
      [dayKey]: prev[dayKey].map(slot => ({ ...slot, isAvailable: true }))
    }));
  };

  const getAvailableSlots = (dayKey: string) => {
    return schedule[dayKey].filter(slot => slot.isAvailable).length;
  };

  const handleSave = () => {
    console.log('Saving schedule:', schedule);
    // Here you would save the schedule to your backend
    onClose();
  };

  const currentDaySchedule = schedule[selectedDay] || [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Thiết Lập Lịch Dạy</span>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
          {/* Days of Week */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold mb-3">Chọn ngày trong tuần</h3>
            <div className="space-y-2">
              {DAYS_OF_WEEK.map(day => (
                <Card 
                  key={day.key}
                  className={`p-3 cursor-pointer transition-colors ${
                    selectedDay === day.key 
                      ? 'ring-2 ring-blue-500 bg-blue-50' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedDay(day.key)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{day.name}</div>
                      <div className="text-sm text-gray-600">
                        {getAvailableSlots(day.key)} khung giờ
                      </div>
                    </div>
                    <Badge variant={getAvailableSlots(day.key) > 0 ? "default" : "secondary"}>
                      {day.nameShort}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Schedule for Selected Day */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">
                Lịch dạy {DAYS_OF_WEEK.find(d => d.key === selectedDay)?.name}
              </h3>
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => addTimeSlot(selectedDay)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Thêm khung
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => copyScheduleToAll(selectedDay)}
                >
                  Sao chép cho tất cả
                </Button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex space-x-2 mb-4">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setAllDayAvailable(selectedDay)}
              >
                Bật tất cả
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => clearDaySchedule(selectedDay)}
              >
                Tắt tất cả
              </Button>
            </div>

            {/* Time Slots */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {currentDaySchedule.map((slot, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Switch
                        checked={slot.isAvailable}
                        onCheckedChange={() => toggleTimeSlot(selectedDay, index)}
                      />
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <input
                          type="time"
                          value={slot.start}
                          onChange={(e) => updateTimeSlot(selectedDay, index, 'start', e.target.value)}
                          className="border rounded px-2 py-1 text-sm"
                        />
                        <span className="text-gray-500">-</span>
                        <input
                          type="time"
                          value={slot.end}
                          onChange={(e) => updateTimeSlot(selectedDay, index, 'end', e.target.value)}
                          className="border rounded px-2 py-1 text-sm"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge variant={slot.isAvailable ? "default" : "secondary"}>
                        {slot.isAvailable ? "Có sẵn" : "Không có sẵn"}
                      </Badge>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeTimeSlot(selectedDay, index)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {currentDaySchedule.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Clock className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>Chưa có khung giờ nào được thiết lập</p>
                <Button 
                  className="mt-2"
                  onClick={() => addTimeSlot(selectedDay)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Thêm khung giờ đầu tiên
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2">Tổng quan lịch dạy</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {DAYS_OF_WEEK.map(day => (
              <div key={day.key} className="text-center">
                <div className="text-sm font-medium">{day.nameShort}</div>
                <div className="text-lg font-bold text-blue-600">
                  {getAvailableSlots(day.key)}
                </div>
                <div className="text-xs text-gray-600">khung giờ</div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 mt-6">
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-1" />
            Hủy
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-1" />
            Lưu lịch dạy
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
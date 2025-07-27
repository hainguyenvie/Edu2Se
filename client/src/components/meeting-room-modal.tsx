import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Settings, 
  Users,
  Clock,
  BookOpen,
  Phone,
  PhoneOff,
  Monitor,
  Camera,
  Volume2,
  X
} from "lucide-react";

interface MeetingRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  classInfo: {
    name: string;
    subject: string;
    tutor: string;
    time: string;
    duration: string;
  };
}

export default function MeetingRoomModal({ isOpen, onClose, classInfo }: MeetingRoomModalProps) {
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionTime, setConnectionTime] = useState(5);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  // Get user media when modal opens
  useEffect(() => {
    if (isOpen && cameraEnabled) {
      navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: micEnabled 
      })
      .then(stream => {
        setMediaStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(err => {
        console.error('Error accessing media devices:', err);
        setCameraEnabled(false);
      });
    }

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isOpen, cameraEnabled, micEnabled]);

  // Update media tracks based on enabled state
  useEffect(() => {
    if (mediaStream) {
      const videoTracks = mediaStream.getVideoTracks();
      const audioTracks = mediaStream.getAudioTracks();
      
      videoTracks.forEach(track => {
        track.enabled = cameraEnabled;
      });
      
      audioTracks.forEach(track => {
        track.enabled = micEnabled;
      });
    }
  }, [cameraEnabled, micEnabled, mediaStream]);

  const handleJoinClass = () => {
    setIsConnecting(true);
    
    // Countdown timer
    const timer = setInterval(() => {
      setConnectionTime(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // Navigate to virtual classroom
          console.log('Joining virtual classroom with Lessonspace...');
          setIsConnecting(false);
          setConnectionTime(5);
          onClose();
          // Navigate to virtual classroom page
          window.location.href = '/virtual-classroom';
          return 5;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleClose = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
    }
    setIsConnecting(false);
    setConnectionTime(5);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Video className="h-5 w-5" />
            <span>Chuẩn Bị Vào Lớp</span>
          </DialogTitle>
          <DialogDescription>
            Kiểm tra camera và mic trước khi tham gia lớp học trực tuyến
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
          {/* Video Preview */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Xem trước video</span>
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>Sẵn sàng tham gia</span>
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
                  {cameraEnabled ? (
                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center text-white">
                        <VideoOff className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                        <p className="text-lg font-medium">Camera đã tắt</p>
                        <p className="text-sm text-gray-400">Bật camera để thấy hình ảnh của bạn</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Video Controls Overlay */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="flex items-center space-x-3 bg-black bg-opacity-50 rounded-full px-4 py-2">
                      <Button
                        size="sm"
                        variant={cameraEnabled ? "default" : "destructive"}
                        className="rounded-full w-10 h-10 p-0"
                        onClick={() => setCameraEnabled(!cameraEnabled)}
                      >
                        {cameraEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                      </Button>
                      
                      <Button
                        size="sm"
                        variant={micEnabled ? "default" : "destructive"}
                        className="rounded-full w-10 h-10 p-0"
                        onClick={() => setMicEnabled(!micEnabled)}
                      >
                        {micEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full w-10 h-10 p-0"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Name overlay */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-black bg-opacity-50 text-white">
                      Bạn
                    </Badge>
                  </div>
                </div>

                {/* Audio/Video Status */}
                <div className="flex items-center justify-between mt-4 text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Camera className="h-4 w-4" />
                      <span className={cameraEnabled ? "text-green-600" : "text-red-600"}>
                        Camera: {cameraEnabled ? "Bật" : "Tắt"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Volume2 className="h-4 w-4" />
                      <span className={micEnabled ? "text-green-600" : "text-red-600"}>
                        Mic: {micEnabled ? "Bật" : "Tắt"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Class Info & Controls */}
          <div className="lg:col-span-1 space-y-4">
            {/* Class Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Thông tin lớp học</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-sm font-medium">Tên lớp</Label>
                  <p className="text-sm text-gray-600">{classInfo.name}</p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Môn học</Label>
                  <p className="text-sm text-gray-600">{classInfo.subject}</p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Giáo viên</Label>
                  <p className="text-sm text-gray-600">{classInfo.tutor}</p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Thời gian</Label>
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Clock className="h-3 w-3" />
                    <span>{classInfo.time}</span>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Thời lượng</Label>
                  <p className="text-sm text-gray-600">{classInfo.duration}</p>
                </div>
              </CardContent>
            </Card>

            {/* Device Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span>Cài đặt thiết bị</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="camera-toggle" className="text-sm font-medium">
                    Camera
                  </Label>
                  <Switch
                    id="camera-toggle"
                    checked={cameraEnabled}
                    onCheckedChange={setCameraEnabled}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="mic-toggle" className="text-sm font-medium">
                    Microphone
                  </Label>
                  <Switch
                    id="mic-toggle"
                    checked={micEnabled}
                    onCheckedChange={setMicEnabled}
                  />
                </div>

                <div className="pt-2 border-t">
                  <p className="text-xs text-gray-500">
                    Bạn có thể thay đổi cài đặt này bất kỳ lúc nào trong lớp học
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Connection Status */}
            {isConnecting && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
                    <p className="text-sm font-medium">Đang kết nối...</p>
                    <p className="text-xs text-gray-500">{connectionTime}s</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-6 pt-4 border-t">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Monitor className="h-4 w-4" />
            <span>Được hỗ trợ bởi Lessonspace</span>
          </div>
          
          <div className="flex space-x-3">
            <Button variant="outline" onClick={handleClose} disabled={isConnecting}>
              <PhoneOff className="h-4 w-4 mr-1" />
              Hủy
            </Button>
            <Button 
              onClick={handleJoinClass} 
              disabled={isConnecting}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isConnecting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Đang vào lớp...
                </>
              ) : (
                <>
                  <Phone className="h-4 w-4 mr-1" />
                  Vào lớp học
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
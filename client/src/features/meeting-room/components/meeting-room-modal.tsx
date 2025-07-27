import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { ClassInfo, MeetingSettings } from "@shared/types";
import { MEETING_ROOM, VIETNAMESE_LABELS } from "@/config/constants";

interface MeetingRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  classInfo: ClassInfo;
}

export default function MeetingRoomModal({ isOpen, onClose, classInfo }: MeetingRoomModalProps) {
  const [settings, setSettings] = useState<MeetingSettings>({
    cameraEnabled: true,
    micEnabled: true,
    speakerEnabled: true,
  });
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionTime, setConnectionTime] = useState(MEETING_ROOM.CONNECTION_TIMEOUT);

  const handleJoinClass = () => {
    setIsConnecting(true);
    setConnectionTime(MEETING_ROOM.CONNECTION_TIMEOUT);

    const timer = setInterval(() => {
      setConnectionTime(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // Navigate to virtual classroom
          console.log('Joining virtual classroom with Lessonspace...');
          setIsConnecting(false);
          setConnectionTime(MEETING_ROOM.CONNECTION_TIMEOUT);
          onClose();
          // Navigate to virtual classroom page
          window.location.href = '/virtual-classroom';
          return MEETING_ROOM.CONNECTION_TIMEOUT;
        }
        return prev - 1;
      });
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[600px] p-0">
        <div className="flex h-full">
          {/* Video Preview Section */}
          <div className="flex-1 bg-gray-900 relative overflow-hidden">
            {/* Mock video feed */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
              {settings.cameraEnabled ? (
                <div className="text-white text-center">
                  <Camera className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg opacity-75">Camera Preview</p>
                </div>
              ) : (
                <div className="text-white text-center">
                  <VideoOff className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg opacity-75">Camera Off</p>
                </div>
              )}
            </div>

            {/* Controls Overlay */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
              <Button
                variant={settings.cameraEnabled ? "default" : "destructive"}
                size="lg"
                className="rounded-full h-12 w-12"
                onClick={() => setSettings(prev => ({ ...prev, cameraEnabled: !prev.cameraEnabled }))}
              >
                {settings.cameraEnabled ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
              </Button>
              
              <Button
                variant={settings.micEnabled ? "default" : "destructive"}
                size="lg"
                className="rounded-full h-12 w-12"
                onClick={() => setSettings(prev => ({ ...prev, micEnabled: !prev.micEnabled }))}
              >
                {settings.micEnabled ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
              </Button>
              
              <Button
                variant="ghost"
                size="lg"
                className="rounded-full h-12 w-12 bg-gray-700 hover:bg-gray-600"
              >
                <Settings className="h-6 w-6 text-white" />
              </Button>
            </div>
          </div>

          {/* Settings Panel */}
          <div className="w-80 bg-white border-l flex flex-col">
            <DialogHeader className="p-6 border-b">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-lg font-semibold">
                  {VIETNAMESE_LABELS.JOIN_CLASS}
                </DialogTitle>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>

            <div className="flex-1 p-6 space-y-6">
              {/* Class Info */}
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">{classInfo.subject}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-600">{classInfo.tutor}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-orange-600" />
                      <span className="text-sm text-gray-600">{classInfo.time}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Duration: {classInfo.duration}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Device Settings */}
              <div className="space-y-4">
                <h3 className="font-medium">{VIETNAMESE_LABELS.SETTINGS}</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Camera className="h-4 w-4" />
                      <Label htmlFor="camera-switch">{VIETNAMESE_LABELS.CAMERA}</Label>
                    </div>
                    <Switch
                      id="camera-switch"
                      checked={settings.cameraEnabled}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, cameraEnabled: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Mic className="h-4 w-4" />
                      <Label htmlFor="mic-switch">{VIETNAMESE_LABELS.MICROPHONE}</Label>
                    </div>
                    <Switch
                      id="mic-switch"
                      checked={settings.micEnabled}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, micEnabled: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Volume2 className="h-4 w-4" />
                      <Label htmlFor="speaker-switch">Speaker</Label>
                    </div>
                    <Switch
                      id="speaker-switch"
                      checked={settings.speakerEnabled}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, speakerEnabled: checked }))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Join Button */}
            <div className="p-6 border-t">
              {isConnecting ? (
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                    <span className="text-sm">{VIETNAMESE_LABELS.CONNECTING}...</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {VIETNAMESE_LABELS.CONNECTING} in {connectionTime}s
                  </p>
                </div>
              ) : (
                <Button 
                  onClick={handleJoinClass}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  size="lg"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  {VIETNAMESE_LABELS.JOIN_CLASS}
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
import { Button } from "@/components/ui/button";
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Hand,
  MessageCircle,
  Share,
  PhoneOff
} from "lucide-react";
import { ControlBarProps } from "../types";
import { VIETNAMESE_LABELS } from "@/config/constants";

export function ControlBar({
  cameraEnabled,
  micEnabled,
  handRaised,
  showChat,
  onCameraToggle,
  onMicToggle,
  onHandToggle,
  onChatToggle,
  onLeaveClass
}: ControlBarProps) {
  return (
    <div className="bg-gray-800 border-t border-gray-700 p-3 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Button
          variant={cameraEnabled ? "default" : "destructive"}
          size="sm"
          onClick={onCameraToggle}
          className="flex items-center space-x-1"
        >
          {cameraEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
        </Button>
        
        <Button
          variant={micEnabled ? "default" : "destructive"}
          size="sm"
          onClick={onMicToggle}
          className="flex items-center space-x-1"
        >
          {micEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
        </Button>
        
        <Button
          variant={handRaised ? "default" : "ghost"}
          size="sm"
          onClick={onHandToggle}
          className={`flex items-center space-x-1 ${handRaised ? 'bg-yellow-600' : ''}`}
        >
          <Hand className="h-4 w-4" />
          <span className="text-xs">{VIETNAMESE_LABELS.RAISE_HAND}</span>
        </Button>
      </div>

      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 text-sm text-gray-300">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>2 người tham gia</span>
        </div>
        
        {!showChat && (
          <Button variant="ghost" size="sm" onClick={onChatToggle}>
            <MessageCircle className="h-4 w-4" />
            <span className="ml-1 text-xs">{VIETNAMESE_LABELS.CHAT}</span>
          </Button>
        )}
        
        <Button variant="ghost" size="sm">
          <Share className="h-4 w-4" />
          <span className="ml-1 text-xs">{VIETNAMESE_LABELS.SHARE_SCREEN}</span>
        </Button>
        
        <Button 
          variant="destructive" 
          size="sm"
          onClick={onLeaveClass}
          className="flex items-center space-x-1"
        >
          <PhoneOff className="h-4 w-4" />
          <span className="text-xs">{VIETNAMESE_LABELS.LEAVE_CLASS}</span>
        </Button>
      </div>
    </div>
  );
}
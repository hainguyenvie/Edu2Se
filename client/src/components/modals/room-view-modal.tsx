import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Share2, Users, Star, Volume2, VolumeX, Camera, CameraOff, Mic, MicOff } from "lucide-react";

interface RoomViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomData: {
    id: number;
    creator: {
      name: string;
      avatar: string;
      rating: number;
    };
    participants: number;
    vibes: string[];
    bio: string;
  };
}

export default function RoomViewModal({ isOpen, onClose, roomData }: RoomViewModalProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isMicOff, setIsMicOff] = useState(false);

  // Mock participants data
  const participants = [
    { id: 1, name: "Bạn", avatar: "🧑‍💻", isHost: true },
    { id: 2, name: "Mai Anh", avatar: "👩‍🎓", isHost: false },
    { id: 3, name: "Tuấn", avatar: "👨‍🎨", isHost: false },
    { id: 4, name: "Linh", avatar: "👩‍🔬", isHost: false },
    { id: 5, name: "Hưng", avatar: "👨‍💼", isHost: false },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating) 
            ? "text-yellow-400 fill-current" 
            : "text-gray-300"
        }`}
      />
    ));
  };

  const handleShare = () => {
    // Simulate share functionality
    navigator.clipboard?.writeText(window.location.href);
    alert("Đã copy link phòng học!");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-6xl h-full max-h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-xl">{roomData.creator.avatar}</span>
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">{roomData.creator.name}</h2>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {renderStars(roomData.creator.rating)}
                </div>
                <div className="flex items-center space-x-1">
                  {roomData.vibes.map((vibe, index) => (
                    <span key={index} className="text-sm">{vibe}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              onClick={handleShare}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Chia sẻ</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Video Area */}
          <div className="flex-1 bg-gradient-to-br from-blue-500 to-purple-600 relative">
            {/* Video Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-blue-400 rounded-lg w-32 h-24 flex items-center justify-center shadow-lg">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-l-6 border-r-0 border-b-4 border-t-4 border-l-white border-t-transparent border-b-transparent ml-1"></div>
                </div>
              </div>
            </div>
            
            {/* Video Overlay Info */}
            <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-2 rounded-lg">
              <div className="text-sm font-medium">Study Session: {roomData.bio}</div>
            </div>
            
            {/* Study Timer */}
            <div className="absolute top-4 right-4 bg-white/90 text-gray-900 px-3 py-2 rounded-lg">
              <div className="text-sm font-bold">🕐 1:23:45</div>
            </div>
          </div>

          {/* Participants Sidebar */}
          <div className="w-64 bg-gray-50 border-l border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Thành viên ({participants.length})</span>
              </h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {participants.map((participant) => (
                <div key={participant.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white transition-colors">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-lg">{participant.avatar}</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 flex items-center space-x-1">
                      <span>{participant.name}</span>
                      {participant.isHost && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">Host</span>
                      )}
                    </div>
                    <div className="text-xs text-green-600">🟢 Đang hoạt động</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Control Bar */}
        <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-300">
              Đang trong phòng: <span className="text-white font-medium">{roomData.creator.name}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMicOff(!isMicOff)}
              className={`text-white hover:bg-gray-700 ${isMicOff ? 'bg-red-600 hover:bg-red-700' : ''}`}
            >
              {isMicOff ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`text-white hover:bg-gray-700 ${isVideoOff ? 'bg-red-600 hover:bg-red-700' : ''}`}
            >
              {isVideoOff ? <CameraOff className="w-4 h-4" /> : <Camera className="w-4 h-4" />}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMuted(!isMuted)}
              className={`text-white hover:bg-gray-700 ${isMuted ? 'bg-red-600 hover:bg-red-700' : ''}`}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
            
            <div className="w-px h-6 bg-gray-600 mx-2"></div>
            
            <Button
              onClick={onClose}
              className="bg-red-600 hover:bg-red-700 text-white px-6"
            >
              Rời phòng
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Settings, 
  Users,
  MessageCircle,
  Share,
  Hand,
  MoreHorizontal,
  Calculator,
  FileText,
  PenTool,
  MousePointer,
  Square,
  Circle,
  Type,
  Eraser,
  Undo,
  Redo,
  Search,
  ZoomIn,
  Home,
  X,
  Plus,
  Edit,
  Minus,
  Upload,
  Download,
  Phone,
  PhoneOff
} from "lucide-react";

interface VirtualClassroomProps {
  classInfo?: {
    name: string;
    subject: string;
    tutor: string;
    time: string;
    duration: string;
  };
}

export default function VirtualClassroom({ classInfo }: VirtualClassroomProps) {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState('Main Room');
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const [handRaised, setHandRaised] = useState(false);
  const [selectedTool, setSelectedTool] = useState('pointer');
  const [zoom, setZoom] = useState(100);
  const [showChat, setShowChat] = useState(true);
  const [chatMessages, setChatMessages] = useState([
    { user: 'Thầy Minh', message: 'Chào mừng các em đến với lớp học!', time: '19:05' },
    { user: 'Nguyễn An', message: 'Chào thầy ạ!', time: '19:05' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const tabs = [
    { name: 'Main Room', icon: Home, active: true },
    { name: 'Tour', icon: Users, active: false },
    { name: 'Mathematics', icon: Calculator, active: true },
    { name: 'Language', icon: Type, active: false },
    { name: 'Documents', icon: FileText, active: false },
    { name: 'Formulas & Graphs', icon: Edit, active: false },
    { name: 'Lines', icon: Minus, active: false },
    { name: 'Code', icon: Square, active: false },
    { name: 'M...', icon: MoreHorizontal, active: false },
  ];

  const tools = [
    { id: 'pointer', icon: MousePointer, name: 'Pointer' },
    { id: 'pen', icon: PenTool, name: 'Pen' },
    { id: 'highlighter', icon: Edit, name: 'Highlighter' },
    { id: 'shapes', icon: Square, name: 'Shapes' },
    { id: 'text', icon: Type, name: 'Text' },
    { id: 'eraser', icon: Eraser, name: 'Eraser' },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([...chatMessages, {
        user: 'Bạn',
        message: newMessage.trim(),
        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      }]);
      setNewMessage('');
    }
  };

  const handleLeaveClass = () => {
    setLocation('/dashboard');
  };

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col overflow-hidden">
      {/* Top Navigation Bar */}
      <div className="bg-gray-800 border-b border-gray-700 p-2 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          {tabs.map((tab, index) => (
            <div key={index} className="flex items-center">
              <Button
                variant={tab.name === activeTab ? "default" : "ghost"}
                size="sm"
                className={`
                  px-3 py-1 text-xs flex items-center space-x-1
                  ${tab.name === activeTab 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }
                  ${!tab.active ? 'opacity-50' : ''}
                `}
                onClick={() => setActiveTab(tab.name)}
                disabled={!tab.active}
              >
                <tab.icon className="h-3 w-3" />
                <span>{tab.name}</span>
              </Button>
              {index < tabs.length - 1 && tab.active && (
                <Button variant="ghost" size="sm" className="px-1 text-gray-400">
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-gray-300">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-300">
            <Users className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-300">
            <MessageCircle className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-300">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Toolbar */}
        <div className="bg-gray-800 border-r border-gray-700 p-2 flex flex-col space-y-2">
          <Button variant="ghost" size="sm" className="p-2">
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="p-2">
            <Upload className="h-4 w-4" />
          </Button>
          
          {tools.map((tool) => (
            <Button
              key={tool.id}
              variant={selectedTool === tool.id ? "default" : "ghost"}
              size="sm"
              className={`p-2 ${selectedTool === tool.id ? 'bg-blue-600' : ''}`}
              onClick={() => setSelectedTool(tool.id)}
              title={tool.name}
            >
              <tool.icon className="h-4 w-4" />
            </Button>
          ))}
          
          <div className="border-t border-gray-700 pt-2 mt-2">
            <Button variant="ghost" size="sm" className="p-2">
              <Undo className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <Redo className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Whiteboard Area */}
        <div className="flex-1 relative bg-white">
          {/* Welcome Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="mb-8">
                <div className="w-32 h-32 mx-auto mb-6 bg-blue-500 rounded-2xl flex items-center justify-center">
                  <div className="text-6xl">🐱</div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-blue-500 rounded-lg p-2 mr-3">
                    <span className="text-white font-bold text-xl">L</span>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-800">AitheduConnect</h1>
                </div>
                <p className="text-lg text-gray-600 mb-2">Chào mừng đến với lớp học trực tuyến!</p>
                <p className="text-blue-600 font-medium">
                  {classInfo?.subject || 'Toán học lớp 12'} - {classInfo?.tutor || 'Thầy Minh'}
                </p>
              </div>
              
              <p className="text-gray-600">Hãy bắt đầu bằng cách sử dụng các công cụ bên trái.</p>
            </div>
          </div>

          {/* Zoom Controls */}
          <div className="absolute bottom-4 left-4 flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-3 py-1">
            <Button variant="ghost" size="sm" onClick={() => setZoom(Math.max(25, zoom - 25))}>
              <Minus className="h-3 w-3" />
            </Button>
            <span className="text-sm text-gray-600 min-w-[50px] text-center">{zoom}%</span>
            <Button variant="ghost" size="sm" onClick={() => setZoom(Math.min(200, zoom + 25))}>
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {/* Document Selection */}
          <div className="absolute bottom-4 right-4 bg-white border border-gray-300 rounded-lg p-2">
            <div className="text-sm text-gray-600 mb-2">0 Selected</div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">Select All</Button>
              <Button variant="outline" size="sm">Deselect All</Button>
            </div>
            <div className="flex space-x-2 mt-2">
              <Button variant="outline" size="sm">← Back</Button>
              <Button variant="outline" size="sm">Next →</Button>
            </div>
          </div>
        </div>

        {/* Chat Panel */}
        {showChat && (
          <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
            <div className="p-3 border-b border-gray-700 flex items-center justify-between">
              <h3 className="font-medium">Chat</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowChat(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex-1 p-3 space-y-3 overflow-y-auto">
              {chatMessages.map((msg, index) => (
                <div key={index} className="bg-gray-700 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-blue-400">{msg.user}</span>
                    <span className="text-xs text-gray-400">{msg.time}</span>
                  </div>
                  <p className="text-sm text-gray-200">{msg.message}</p>
                </div>
              ))}
            </div>
            
            <div className="p-3 border-t border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Nhập tin nhắn..."
                  className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
                <Button size="sm" onClick={handleSendMessage}>
                  Gửi
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Control Bar */}
      <div className="bg-gray-800 border-t border-gray-700 p-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button
            variant={cameraEnabled ? "default" : "destructive"}
            size="sm"
            onClick={() => setCameraEnabled(!cameraEnabled)}
            className="flex items-center space-x-1"
          >
            {cameraEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
          </Button>
          
          <Button
            variant={micEnabled ? "default" : "destructive"}
            size="sm"
            onClick={() => setMicEnabled(!micEnabled)}
            className="flex items-center space-x-1"
          >
            {micEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
          </Button>
          
          <Button
            variant={handRaised ? "default" : "ghost"}
            size="sm"
            onClick={() => setHandRaised(!handRaised)}
            className={`flex items-center space-x-1 ${handRaised ? 'bg-yellow-600' : ''}`}
          >
            <Hand className="h-4 w-4" />
            <span className="text-xs">Giơ tay</span>
          </Button>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-sm text-gray-300">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>2 người tham gia</span>
          </div>
          
          {!showChat && (
            <Button variant="ghost" size="sm" onClick={() => setShowChat(true)}>
              <MessageCircle className="h-4 w-4" />
              <span className="ml-1 text-xs">Chat</span>
            </Button>
          )}
          
          <Button variant="ghost" size="sm">
            <Share className="h-4 w-4" />
            <span className="ml-1 text-xs">Chia sẻ</span>
          </Button>
          
          <Button 
            variant="destructive" 
            size="sm"
            onClick={handleLeaveClass}
            className="flex items-center space-x-1"
          >
            <PhoneOff className="h-4 w-4" />
            <span className="text-xs">Rời lớp</span>
          </Button>
        </div>
      </div>

      {/* User notification */}
      <div className="absolute top-16 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
            9
          </div>
          <span className="text-sm">Bạn đã vào lớp học thành công!</span>
        </div>
      </div>
    </div>
  );
}
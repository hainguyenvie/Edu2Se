import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X, Send, Minimize2, Plus, Search } from "lucide-react";

interface MessagesPopupProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTutorName?: string;
}

const conversations = [
  {
    id: 1,
    name: "Thầy Đức Anh",
    avatar: "👨‍🏫",
    lastMessage: "Chào em, hôm nay em có câu hỏi gì không?",
    time: "2 phút",
    unread: 2,
    online: true
  },
  {
    id: 2,
    name: "Cô Mai",
    avatar: "👩‍🏫",
    lastMessage: "Em đã làm bài tập chưa nhỉ?",
    time: "5 phút",
    unread: 0,
    online: true
  },
  {
    id: 3,
    name: "Thầy Minh",
    avatar: "👨‍💼",
    lastMessage: "Ngày mai chúng ta học bài mới nhé",
    time: "1 giờ",
    unread: 1,
    online: false
  }
];

const currentMessages = [
  {
    id: 1,
    sender: "Thầy Đức Anh",
    message: "Chào em! Hôm nay chúng ta sẽ học về phương trình bậc 2",
    time: "14:30",
    isOwn: false
  },
  {
    id: 2,
    sender: "Tôi",
    message: "Dạ chào thầy! Em đã chuẩn bị sẵn sàng ạ",
    time: "14:31",
    isOwn: true
  },
  {
    id: 3,
    sender: "Thầy Đức Anh",
    message: "Tốt lắm! Em có câu hỏi gì về bài cũ không?",
    time: "14:32",
    isOwn: false
  },
  {
    id: 4,
    sender: "Tôi",
    message: "Dạ em muốn hỏi về cách giải phương trình có delta âm ạ",
    time: "14:33",
    isOwn: true
  }
];

export default function MessagesPopup({ isOpen, onClose, selectedTutorName }: MessagesPopupProps) {
  // Find the conversation based on selected tutor name or default to first
  const initialConversation = selectedTutorName 
    ? conversations.find(conv => conv.name === selectedTutorName) || conversations[0]
    : conversations[0];
  
  const [selectedConversation, setSelectedConversation] = useState(initialConversation);
  const [newMessage, setNewMessage] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);

  // Update selected conversation when selectedTutorName changes
  useEffect(() => {
    if (selectedTutorName) {
      const conversation = conversations.find(conv => conv.name === selectedTutorName);
      if (conversation) {
        setSelectedConversation(conversation);
      }
    }
  }, [selectedTutorName]);

  if (!isOpen) return null;

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[900px]">
      <Card className="shadow-2xl border-0 overflow-hidden">
        {/* Header */}
        <CardHeader className="flex flex-row items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <CardTitle className="text-lg font-semibold">
            {isMinimized ? "Tin nhắn" : `Đang trò chuyện với ${selectedConversation.name}`}
          </CardTitle>
          <div className="flex items-center space-x-1">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-8 w-8 text-white hover:bg-white/20 rounded-full"
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="h-8 w-8 text-white hover:bg-white/20 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0">
            <div className="flex h-[500px]">
              {/* Conversation List */}
              <div className="w-80 border-r border-gray-200 bg-gray-50 flex-shrink-0">
                <div className="p-3 border-b border-gray-200 bg-white">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Tìm kiếm cuộc trò chuyện..."
                      className="pl-9 h-9 text-sm border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <ScrollArea className="h-[430px]">
                  <div className="p-2">
                    {conversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        onClick={() => setSelectedConversation(conversation)}
                        className={`p-3 mb-2 rounded-lg cursor-pointer transition-all duration-200 ${
                          selectedConversation.id === conversation.id 
                            ? 'bg-blue-100 border border-blue-200 shadow-sm' 
                            : 'bg-white hover:bg-gray-100 border border-gray-100 hover:border-gray-200'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="relative flex-shrink-0">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium shadow-sm">
                              {conversation.avatar}
                            </div>
                            {conversation.online && (
                              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="text-sm font-semibold text-gray-900 truncate">
                                {conversation.name}
                              </h4>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-gray-500">
                                  {conversation.time}
                                </span>
                                {conversation.unread > 0 && (
                                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[18px] text-center font-medium">
                                    {conversation.unread}
                                  </span>
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 truncate">
                              {conversation.lastMessage}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Chat Area */}
              <div className="flex-1 flex flex-col bg-white">
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium shadow-sm">
                        {selectedConversation.avatar}
                      </div>
                      {selectedConversation.online && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedConversation.name}</h3>
                      <p className="text-sm text-gray-500">
                        {selectedConversation.online ? 'Đang hoạt động' : 'Offline'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {currentMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'} mb-3`}
                      >
                        <div className={`flex max-w-[75%] ${message.isOwn ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2`}>
                          {!message.isOwn && (
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0 mb-1">
                              {selectedConversation.avatar}
                            </div>
                          )}
                          <div className={`flex flex-col ${message.isOwn ? 'items-end' : 'items-start'}`}>
                            <div
                              className={`px-4 py-3 rounded-2xl shadow-sm ${
                                message.isOwn
                                  ? 'bg-blue-600 text-white rounded-br-md'
                                  : 'bg-gray-100 text-gray-900 rounded-bl-md border border-gray-200'
                              }`}
                            >
                              <p className="text-sm leading-relaxed">{message.message}</p>
                            </div>
                            <span className={`text-xs mt-1 px-2 ${
                              message.isOwn ? 'text-blue-600' : 'text-gray-500'
                            }`}>
                              {message.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  <div className="flex items-end space-x-3">
                    <div className="flex-1 relative">
                      <Input
                        placeholder="Nhập tin nhắn..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                        className="pr-12 py-3 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none min-h-[44px]"
                      />
                    </div>
                    <Button
                      onClick={handleSendMessage}
                      size="icon"
                      className="h-11 w-11 bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-all duration-200"
                      disabled={!newMessage.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Nhấn Enter để gửi, Shift + Enter để xuống dòng</p>
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
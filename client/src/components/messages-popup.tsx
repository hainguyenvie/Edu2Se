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
    <div className="fixed bottom-4 right-4 z-50 w-80">
      <Card className="shadow-lg border">
        {/* Header */}
        <CardHeader className="flex flex-row items-center justify-between p-3 bg-blue-600 text-white rounded-t-lg">
          <CardTitle className="text-sm font-medium">
            {isMinimized ? "Tin nhắn" : selectedConversation.name}
          </CardTitle>
          <div className="flex items-center space-x-1">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-6 w-6 text-white hover:bg-blue-700"
            >
              <Minimize2 className="h-3 w-3" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="h-6 w-6 text-white hover:bg-blue-700"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0">
            <div className="flex h-96">
              {/* Conversation List */}
              <div className="w-1/3 border-r border-gray-200">
                <div className="p-2 border-b border-gray-200">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-3 w-3 text-gray-400" />
                    <Input
                      placeholder="Tìm kiếm..."
                      className="pl-7 h-8 text-xs"
                    />
                  </div>
                </div>
                <ScrollArea className="h-80">
                  {conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation)}
                      className={`p-2 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                        selectedConversation.id === conversation.id ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <div className="relative">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm">
                            {conversation.avatar}
                          </div>
                          {conversation.online && (
                            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border border-white"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-medium text-gray-900 truncate">
                              {conversation.name}
                            </p>
                            {conversation.unread > 0 && (
                              <span className="bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[16px] text-center">
                                {conversation.unread}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 truncate mt-1">
                            {conversation.lastMessage}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {conversation.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </div>

              {/* Chat Area */}
              <div className="flex-1 flex flex-col">
                {/* Messages */}
                <ScrollArea className="flex-1 p-2">
                  <div className="space-y-2">
                    {currentMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-2 rounded-lg text-xs ${
                            message.isOwn
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p>{message.message}</p>
                          <p className={`text-xs mt-1 ${
                            message.isOwn ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {message.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="p-2 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Nhập tin nhắn..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 h-8 text-xs"
                    />
                    <Button
                      onClick={handleSendMessage}
                      size="icon"
                      className="h-8 w-8"
                    >
                      <Send className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Search, Plus, ArrowLeft } from "lucide-react";
import Header from "@/components/header";
import { Link } from "wouter";

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

const messages = [
  { id: 1, text: "Chào thầy!", sender: "me", time: "14:30" },
  { id: 2, text: "Chào em! Hôm nay có gì cần hỗ trợ không?", sender: "tutor", time: "14:31" },
  { id: 3, text: "Em có thắc mắc về bài tập toán thầy giao hôm qua", sender: "me", time: "14:32" },
  { id: 4, text: "Được rồi, em gửi đề bài lên đây nhé", sender: "tutor", time: "14:33" }
];

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-16 h-screen flex">
        {/* Sidebar - Conversations List */}
        <div className="w-1/3 border-r border-gray-200 bg-white">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Tin nhắn</h2>
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
            </div>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Tìm kiếm cuộc trò chuyện..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Conversations */}
          <ScrollArea className="h-[calc(100vh-200px)]">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                  selectedConversation.id === conversation.id ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>{conversation.avatar}</AvatarFallback>
                    </Avatar>
                    {conversation.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 truncate">{conversation.name}</h3>
                      <span className="text-xs text-gray-500">{conversation.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                  </div>
                  
                  {conversation.unread > 0 && (
                    <div className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {conversation.unread}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 bg-white">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback>{selectedConversation.avatar}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-gray-900">{selectedConversation.name}</h3>
                <p className="text-sm text-gray-500">
                  {selectedConversation.online ? 'Đang hoạt động' : 'Offline'}
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'} mb-4`}
                >
                  <div className={`flex max-w-[75%] ${message.sender === 'me' ? 'flex-row-reverse' : 'flex-row'} items-end space-x-3`}>
                    {message.sender !== 'me' && (
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0 mb-1">
                        {selectedConversation.avatar}
                      </div>
                    )}
                    <div className={`flex flex-col ${message.sender === 'me' ? 'items-end' : 'items-start'}`}>
                      <div
                        className={`px-4 py-3 rounded-2xl shadow-sm ${
                          message.sender === 'me'
                            ? 'bg-blue-600 text-white rounded-br-md'
                            : 'bg-gray-100 text-gray-900 rounded-bl-md border border-gray-200'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.text}</p>
                      </div>
                      <span className={`text-xs mt-1 px-2 ${
                        message.sender === 'me' ? 'text-blue-600' : 'text-gray-500'
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
    </div>
  );
}
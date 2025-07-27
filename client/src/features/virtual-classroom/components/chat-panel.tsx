import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { ChatPanelProps } from "../types";
import { VIETNAMESE_LABELS } from "@/config/constants";

export function ChatPanel({ 
  showChat, 
  chatMessages, 
  newMessage, 
  onSendMessage, 
  onMessageChange, 
  onToggleChat 
}: ChatPanelProps) {
  if (!showChat) return null;

  return (
    <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
      <div className="p-3 border-b border-gray-700 flex items-center justify-between">
        <h3 className="font-medium">{VIETNAMESE_LABELS.CHAT}</h3>
        <Button variant="ghost" size="sm" onClick={onToggleChat}>
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
            onChange={(e) => onMessageChange(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
            placeholder={VIETNAMESE_LABELS.ENTER_MESSAGE}
            className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          />
          <Button size="sm" onClick={onSendMessage}>
            {VIETNAMESE_LABELS.SEND_MESSAGE}
          </Button>
        </div>
      </div>
    </div>
  );
}
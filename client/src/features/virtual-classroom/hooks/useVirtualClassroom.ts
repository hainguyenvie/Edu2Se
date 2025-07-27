import { useState } from "react";
import { useLocation } from "wouter";
import { VirtualClassroomState, ChatMessage } from "../types";
import { VIRTUAL_CLASSROOM, VIETNAMESE_LABELS } from "@/config/constants";

export function useVirtualClassroom() {
  const [, setLocation] = useLocation();
  
  const [state, setState] = useState<VirtualClassroomState>({
    activeTab: VIRTUAL_CLASSROOM.TABS.MAIN_ROOM,
    cameraEnabled: true,
    micEnabled: true,
    handRaised: false,
    selectedTool: VIRTUAL_CLASSROOM.TOOLS.POINTER,
    zoom: VIRTUAL_CLASSROOM.DEFAULT_ZOOM,
    showChat: true,
    chatMessages: [
      { user: 'Thầy Minh', message: 'Chào mừng các em đến với lớp học!', time: '19:05' },
      { user: 'Nguyễn An', message: 'Chào thầy ạ!', time: '19:05' },
    ],
    newMessage: '',
  });

  const updateState = (updates: Partial<VirtualClassroomState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const handleSendMessage = () => {
    if (state.newMessage.trim()) {
      const newMessage: ChatMessage = {
        user: 'Bạn',
        message: state.newMessage.trim(),
        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      };
      
      updateState({
        chatMessages: [...state.chatMessages, newMessage],
        newMessage: ''
      });
    }
  };

  const handleLeaveClass = () => {
    setLocation('/dashboard');
  };

  const handleZoomChange = (direction: 'in' | 'out') => {
    const currentIndex = VIRTUAL_CLASSROOM.ZOOM_LEVELS.findIndex(level => level === state.zoom);
    let newIndex: number;
    
    if (direction === 'in' && currentIndex < VIRTUAL_CLASSROOM.ZOOM_LEVELS.length - 1) {
      newIndex = currentIndex + 1;
    } else if (direction === 'out' && currentIndex > 0) {
      newIndex = currentIndex - 1;
    } else {
      return; // No change needed
    }
    
    updateState({ zoom: VIRTUAL_CLASSROOM.ZOOM_LEVELS[newIndex] });
  };

  return {
    state,
    updateState,
    handleSendMessage,
    handleLeaveClass,
    handleZoomChange,
  };
}
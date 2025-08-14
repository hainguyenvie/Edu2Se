import { ClassInfo, ChatMessage, VirtualClassroomTool, VirtualClassroomTab } from "@shared/types";

// Re-export types
export type { ChatMessage, VirtualClassroomTool, VirtualClassroomTab };

export interface VirtualClassroomState {
  activeTab: string;
  cameraEnabled: boolean;
  micEnabled: boolean;
  handRaised: boolean;
  selectedTool: string;
  zoom: number;
  showChat: boolean;
  chatMessages: ChatMessage[];
  newMessage: string;
}

export interface VirtualClassroomProps {
  classInfo?: ClassInfo;
}

export interface DrawingCanvasProps {
  selectedTool: string;
  zoom: number;
}

export interface ChatPanelProps {
  showChat: boolean;
  chatMessages: ChatMessage[];
  newMessage: string;
  onSendMessage: () => void;
  onMessageChange: (message: string) => void;
  onToggleChat: () => void;
}

export interface ToolbarProps {
  selectedTool: string;
  onToolSelect: (tool: string) => void;
  tools: VirtualClassroomTool[];
}

export interface TopNavigationProps {
  activeTab: string;
  tabs: VirtualClassroomTab[];
  onTabChange: (tab: string) => void;
}

export interface ControlBarProps {
  cameraEnabled: boolean;
  micEnabled: boolean;
  handRaised: boolean;
  showChat: boolean;
  onCameraToggle: () => void;
  onMicToggle: () => void;
  onHandToggle: () => void;
  onChatToggle: () => void;
  onLeaveClass: () => void;
}
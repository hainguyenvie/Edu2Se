import { TopNavigation, Toolbar, Whiteboard, ChatPanel, ControlBar } from "@/features/virtual-classroom/components";
import { useVirtualClassroom } from "@/features/virtual-classroom/hooks/useVirtualClassroom";
import { virtualClassroomTabs, virtualClassroomTools } from "@/features/virtual-classroom/data/classroom-data";
import { VirtualClassroomProps } from "@/features/virtual-classroom/types";

export default function VirtualClassroom({ classInfo }: VirtualClassroomProps) {
  const { state, updateState, handleSendMessage, handleLeaveClass, handleZoomChange } = useVirtualClassroom();

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col overflow-hidden">
      {/* Top Navigation Bar */}
      <TopNavigation 
        activeTab={state.activeTab}
        tabs={virtualClassroomTabs}
        onTabChange={(tab) => updateState({ activeTab: tab })}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Toolbar */}
        <Toolbar 
          selectedTool={state.selectedTool}
          onToolSelect={(tool) => updateState({ selectedTool: tool })}
          tools={virtualClassroomTools}
        />

        {/* Whiteboard Area */}
        <Whiteboard 
          selectedTool={state.selectedTool}
          zoom={state.zoom}
          classInfo={classInfo}
          onZoomIn={() => handleZoomChange('in')}
          onZoomOut={() => handleZoomChange('out')}
        />

        {/* Chat Panel */}
        <ChatPanel 
          showChat={state.showChat}
          chatMessages={state.chatMessages}
          newMessage={state.newMessage}
          onSendMessage={handleSendMessage}
          onMessageChange={(message) => updateState({ newMessage: message })}
          onToggleChat={() => updateState({ showChat: !state.showChat })}
        />
      </div>

      {/* Bottom Control Bar */}
      <ControlBar 
        cameraEnabled={state.cameraEnabled}
        micEnabled={state.micEnabled}
        handRaised={state.handRaised}
        showChat={state.showChat}
        onCameraToggle={() => updateState({ cameraEnabled: !state.cameraEnabled })}
        onMicToggle={() => updateState({ micEnabled: !state.micEnabled })}
        onHandToggle={() => updateState({ handRaised: !state.handRaised })}
        onChatToggle={() => updateState({ showChat: !state.showChat })}
        onLeaveClass={handleLeaveClass}
      />
    </div>
  );
}
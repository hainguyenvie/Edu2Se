import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { DrawingCanvasProps } from "../types";
import { ClassInfo } from "@shared/types";

interface WhiteboardProps extends DrawingCanvasProps {
  classInfo?: ClassInfo;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export function Whiteboard({ selectedTool, zoom, classInfo, onZoomIn, onZoomOut }: WhiteboardProps) {
  return (
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
        <Button variant="ghost" size="sm" onClick={onZoomOut}>
          <Minus className="h-3 w-3" />
        </Button>
        <span className="text-sm text-gray-600 min-w-[50px] text-center">{zoom}%</span>
        <Button variant="ghost" size="sm" onClick={onZoomIn}>
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
  );
}
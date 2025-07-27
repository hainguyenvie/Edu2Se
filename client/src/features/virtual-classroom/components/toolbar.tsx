import { Button } from "@/components/ui/button";
import { Plus, Upload, Undo, Redo } from "lucide-react";
import { ToolbarProps } from "../types";

export function Toolbar({ selectedTool, onToolSelect, tools }: ToolbarProps) {
  return (
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
          onClick={() => onToolSelect(tool.id)}
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
  );
}
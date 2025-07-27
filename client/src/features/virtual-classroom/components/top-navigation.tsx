import { Button } from "@/components/ui/button";
import { X, Settings, Users, MessageCircle, MoreHorizontal } from "lucide-react";
import { TopNavigationProps } from "../types";

export function TopNavigation({ activeTab, tabs, onTabChange }: TopNavigationProps) {
  return (
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
              onClick={() => onTabChange(tab.name)}
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
  );
}
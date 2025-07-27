import { 
  Home,
  Users,
  Calculator,
  Type,
  FileText,
  Edit,
  Minus,
  Square,
  MoreHorizontal,
  MousePointer,
  PenTool,
  Eraser
} from "lucide-react";
import { VirtualClassroomTab, VirtualClassroomTool } from "../types";
import { VIRTUAL_CLASSROOM } from "@/config/constants";

export const virtualClassroomTabs: VirtualClassroomTab[] = [
  { name: VIRTUAL_CLASSROOM.TABS.MAIN_ROOM, icon: Home, active: true },
  { name: VIRTUAL_CLASSROOM.TABS.TOUR, icon: Users, active: false },
  { name: VIRTUAL_CLASSROOM.TABS.MATHEMATICS, icon: Calculator, active: true },
  { name: VIRTUAL_CLASSROOM.TABS.LANGUAGE, icon: Type, active: false },
  { name: VIRTUAL_CLASSROOM.TABS.DOCUMENTS, icon: FileText, active: false },
  { name: VIRTUAL_CLASSROOM.TABS.FORMULAS_GRAPHS, icon: Edit, active: false },
  { name: VIRTUAL_CLASSROOM.TABS.LINES, icon: Minus, active: false },
  { name: VIRTUAL_CLASSROOM.TABS.CODE, icon: Square, active: false },
  { name: 'M...', icon: MoreHorizontal, active: false },
];

export const virtualClassroomTools: VirtualClassroomTool[] = [
  { id: VIRTUAL_CLASSROOM.TOOLS.POINTER, icon: MousePointer, name: 'Pointer' },
  { id: VIRTUAL_CLASSROOM.TOOLS.PEN, icon: PenTool, name: 'Pen' },
  { id: VIRTUAL_CLASSROOM.TOOLS.HIGHLIGHTER, icon: Edit, name: 'Highlighter' },
  { id: VIRTUAL_CLASSROOM.TOOLS.SHAPES, icon: Square, name: 'Shapes' },
  { id: VIRTUAL_CLASSROOM.TOOLS.TEXT, icon: Type, name: 'Text' },
  { id: VIRTUAL_CLASSROOM.TOOLS.ERASER, icon: Eraser, name: 'Eraser' },
];
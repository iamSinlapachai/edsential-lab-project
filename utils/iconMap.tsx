import { Globe, Layers, Code2, Database, Server, BookOpen } from "lucide-react";

// สร้าง Dictionary จับคู่ String -> Component
export const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
  Code2: <Code2 className="w-6 h-6" />,
  Database: <Database className="w-6 h-6" />,
  Server: <Server className="w-6 h-6" />,
  BookOpen: <BookOpen className="w-6 h-6" />,
  // เพิ่มให้ครบ...
};

// ฟังก์ชันเรียกใช้
export const getIcon = (name: string) => {
  return iconMap[name] || <Code2 className="w-6 h-6" />; // Default icon
};

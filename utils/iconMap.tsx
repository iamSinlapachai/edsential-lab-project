// utils/iconMap.tsx
import {
  Globe,
  Layers,
  Code2,
  BookOpen,
  Server,
  Database,
  Terminal,
  Cpu,
  Cloud,
  Smartphone,
} from "lucide-react";

export const getIcon = (iconName: string, className: string = "w-6 h-6") => {
  const icons: Record<string, React.ReactNode> = {
    Globe: <Globe className={className} />,
    Layers: <Layers className={className} />,
    Code2: <Code2 className={className} />,
    BookOpen: <BookOpen className={className} />,
    Server: <Server className={className} />,
    Database: <Database className={className} />,
    Terminal: <Terminal className={className} />,
    Cpu: <Cpu className={className} />,
    Cloud: <Cloud className={className} />,
    Smartphone: <Smartphone className={className} />,
    // เพิ่มไอคอนอื่นๆ ตามต้องการ
  };

  return icons[iconName] || <Code2 className={className} />; // Default Icon
};

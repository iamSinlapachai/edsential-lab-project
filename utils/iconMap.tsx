// utils/iconMap.tsx
//test

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
  // --- เพิ่มไอคอนใหม่สำหรับ AI ---
  Calculator,
  Brain,
  Network,
  FileSearch,
  Bot,
  Monitor,
  Box,
  AppWindow,
  Zap,
  CircleDollarSign,
  Music,
  FileSpreadsheet,
  BarChart3,
  PieChart,
  Sigma,
  BrainCircuit,
  Boxes,
  Workflow,
  Users,
  Lightbulb,
  LayoutTemplate,
  Palette,
  MousePointer2,
  Briefcase,
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

    // --- เพิ่ม Mapping ใหม่ ---
    Calculator: <Calculator className={className} />,
    Brain: <Brain className={className} />,
    Network: <Network className={className} />,
    FileSearch: <FileSearch className={className} />, // ใช้แทน SearchCheck
    Bot: <Bot className={className} />,
    Monitor: <Monitor className={className} />,
    Box: <Box className={className} />,
    AppWindow: <AppWindow className={className} />,
    Zap: <Zap className={className} />,
    CircleDollarSign: <CircleDollarSign className={className} />,
    Music: <Music className={className} />,
    FileSpreadsheet: <FileSpreadsheet className={className} />,
    BarChart3: <BarChart3 className={className} />, // ใช้ซ้ำได้ทั้ง PowerBI และ EDA
    PieChart: <PieChart className={className} />,
    Sigma: <Sigma className={className} />,
    BrainCircuit: <BrainCircuit className={className} />,
    Boxes: <Boxes className={className} />, // สำหรับ Docker
    Workflow: <Workflow className={className} />, // สำหรับ ETL
    Users: <Users className={className} />,
    Lightbulb: <Lightbulb className={className} />,
    LayoutTemplate: <LayoutTemplate className={className} />,
    Palette: <Palette className={className} />,
    MousePointer2: <MousePointer2 className={className} />,
    Briefcase: <Briefcase className={className} />,
  };

  return icons[iconName] || <Code2 className={className} />;
};

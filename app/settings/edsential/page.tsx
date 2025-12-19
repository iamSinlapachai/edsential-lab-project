// app/settings/Edsential/page.tsx

"use client";

import Link from "next/link";
import { 
    Settings, User, Globe, FileText, Lock, 
    BarChart3, CheckCircle2, Clock, Trophy, 
    Menu, X, Target, Zap
} from "lucide-react";
import { useState } from "react"; 
import GradientBG from "@/components/gradient-bg";

// *** 1. ข้อมูล Progress ตัวอย่าง ***
const progressStats = {
  overall: 75,
  completedTasks: 24,
  inProgress: 12,
  hoursSpent: 156,
  achievements: 8
};

const learningPath = [
  { id: 1, name: "Fundamentals of Web Development", progress: 100, status: "Completed" },
  { id: 2, name: "Advanced React Patterns", progress: 65, status: "In Progress" },
  { id: 3, name: "Backend Architecture & Database", progress: 20, status: "Started" },
  { id: 4, name: "DevOps & Cloud Deployment", progress: 0, status: "Locked" },
];

// *** 2. เมนู Sidebar (เหมือนเดิมเพื่อให้คงเส้นคงวา) ***
const menuGroups = [
  {
    title: "บัญชี",
    links: [
      { name: "โปรไฟล์", href: "/settings/profile", icon: User }, 
      { name: "Edsential Progress", href: "/settings/edsential", icon: BarChart3 }, 
      { name: "ตั้งค่า", href: "/settings/", icon: Settings },
    ],
  },
  {
    title: "ข้อมูลองค์กร",
    links: [
      { name: "เกี่ยวกับเรา", href: "/aboutus", icon: Globe },
      { name: "ข้อกำหนดในการให้บริการ", href: "/terms", icon: FileText },
      { name: "นโยบายความเป็นส่วนตัว", href: "/privacy", icon: Lock },
    ],
  },
];

const SidebarLink = ({ name, href, Icon, isActive, onClick }) => (
  <Link
    href={href}
    onClick={onClick}
    className={`flex items-center p-3 rounded-lg text-sm font-medium transition-colors duration-150
      ${isActive 
        ? "bg-purple-600/30 text-white shadow-inner border border-purple-500/50" 
        : "text-gray-400 hover:bg-[#1e222e] hover:text-white"
      }
    `}
  >
    <Icon className="w-5 h-5 mr-3" />
    {name}
  </Link>
);

export default function ProgressPage() {
  const currentPath = "/settings/edsential"; 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-[#0F1117] text-gray-300 selection:bg-[#7b4dff] selection:text-white">
      <GradientBG />

      {/* 1. Mobile Top Bar */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-[#161b22] border-b border-gray-800 sticky top-0 w-full">
        <h2 className="text-white font-bold flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-purple-400" /> ความคืบหน้า
        </h2>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-gray-400 hover:text-white transition-colors relative z-[101]"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row h-full relative z-10">
        
        {/* 2. Sidebar Navigation */}
        <aside className={`
          fixed inset-y-0 left-0 z-[90] w-64 bg-[#161b22] transition-transform duration-300 transform 
          lg:translate-x-0 lg:static lg:block lg:h-screen lg:rounded-3xl lg:my-6 lg:ml-4
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          border-r border-gray-800 flex flex-col p-4 shadow-2xl lg:shadow-none
        `}>
          <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-4 pt-2">
            <h2 className="text-lg font-bold text-white flex items-center">
                <Settings className="w-5 h-5 mr-2 text-purple-400" /> 
                เมนูบัญชี
            </h2>
            <button className="lg:hidden text-gray-400 p-1" onClick={() => setIsSidebarOpen(false)}>
                <X size={20} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto space-y-6">
            <div className="space-y-1">
                {menuGroups[0].links.map((link) => (
                    <SidebarLink
                      key={link.name}
                      name={link.name}
                      href={link.href}
                      Icon={link.icon}
                      isActive={currentPath === link.href}
                      onClick={() => setIsSidebarOpen(false)}
                    />
                ))}
            </div>
            
            <div className="pt-4 border-t border-gray-800">
                <h3 className="text-xs uppercase text-gray-500 font-semibold mb-2 tracking-wider">
                    {menuGroups[1].title}
                </h3>
                <div className="space-y-1">
                    {menuGroups[1].links.map((link) => (
                        <SidebarLink
                            key={link.name}
                            name={link.name}
                            href={link.href}
                            Icon={link.icon}
                            isActive={currentPath === link.href}
                            onClick={() => setIsSidebarOpen(false)}
                        />
                    ))}
                </div>
            </div>

            <div className="pt-6 border-t border-gray-800 mt-6">
                <p className="text-sm font-medium text-gray-500">มีคำถาม?</p>
                <Link href="/support" className="text-sm text-purple-400 hover:underline">
                    ศูนย์ช่วยเหลือ
                </Link>
            </div>
          </nav>
        </aside>

        {/* 3. Overlay */}
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black/60 z-[80] lg:hidden backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
        )}

        {/* 4. Main Content Area */}
        <main className="flex-1 p-6 md:p-12 overflow-x-hidden">
          
          <div className="flex justify-between items-center mb-10 border-b border-gray-800 pb-4">
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                ความคืบหน้าการเรียน
              </h1>
              <div className="flex items-center space-x-2 bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full border border-purple-500/30">
                  <Zap className="w-4 h-4 fill-current" />
                  <span className="text-sm font-bold">LV. 12</span>
              </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { label: "สำเร็จแล้ว", value: progressStats.completedTasks, icon: CheckCircle2, color: "text-green-400" },
              { label: "กำลังเรียน", value: progressStats.inProgress, icon: Clock, color: "text-blue-400" },
              { label: "ชั่วโมงเรียน", value: progressStats.hoursSpent, icon: BarChart3, color: "text-purple-400" },
              { label: "รางวัล", value: progressStats.achievements, icon: Trophy, color: "text-yellow-400" },
            ].map((stat, i) => (
              <div key={i} className="bg-[#161b22] border border-gray-800 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                <stat.icon className={`w-6 h-6 mb-2 ${stat.color}`} />
                <span className="text-2xl font-bold text-white">{stat.value}</span>
                <span className="text-xs text-gray-500 uppercase font-medium">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Main Progress Card */}
          <div className="bg-[#161b22] border border-gray-800 rounded-xl p-5 md:p-8 mb-10">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center">
                <Target className="w-5 h-5 mr-2 text-pink-500"/> เส้นทางการเรียนรู้ (Learning Path)
            </h2>
            
            <div className="space-y-8">
                {learningPath.map((item) => (
                    <div key={item.id} className="relative">
                        <div className="flex justify-between items-center mb-2">
                            <span className={`text-sm font-medium ${item.progress === 100 ? 'text-green-400' : 'text-gray-300'}`}>
                                {item.name}
                            </span>
                            <span className="text-xs text-gray-500 font-mono">{item.progress}%</span>
                        </div>
                        {/* Progress Bar Container */}
                        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                            <div 
                                className={`h-full transition-all duration-1000 ease-out ${
                                    item.progress === 100 
                                    ? 'bg-green-500' 
                                    : 'bg-gradient-to-r from-purple-500 to-pink-500'
                                }`}
                                style={{ width: `${item.progress}%` }}
                            />
                        </div>
                        <p className="text-[10px] mt-2 text-gray-500 font-medium uppercase tracking-wider italic">
                            Status: {item.status}
                        </p>
                    </div>
                ))}
            </div>
          </div>

          {/* Activity / Timeline Section */}
          <div className="bg-[#161b22] border border-gray-800 rounded-xl p-5 md:p-8">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-purple-500"/> กิจกรรมล่าสุด
            </h2>
            <div className="space-y-6">
                {[
                  { date: "วันนี้", task: "จบหัวข้อ Advanced React Patterns", xp: "+250 XP" },
                  { date: "เมื่อวาน", task: "เริ่มเรียน Backend Architecture", xp: "+50 XP" },
                  { date: "2 วันที่แล้ว", task: "ทำแบบทดสอบ Fundamentals ผ่าน", xp: "+500 XP" },
                ].map((log, i) => (
                    <div key={i} className="flex items-start space-x-4">
                        <div className="mt-1.5 w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                        <div className="flex-1 border-b border-gray-800/50 pb-4">
                            <p className="text-sm font-medium text-white">{log.task}</p>
                            <div className="flex justify-between items-center mt-1">
                                <span className="text-xs text-gray-500">{log.date}</span>
                                <span className="text-[10px] font-bold text-green-400">{log.xp}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
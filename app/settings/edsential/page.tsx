// app/settings/edsential/page.tsx

"use client";

import Link from "next/link";
import { 
    Settings, User, Lock, Bell, Moon, 
    Zap, Globe, FileText, Menu, X, ShieldCheck
} from "lucide-react";
import { useState } from "react"; 
import GradientBG from "@/components/gradient-bg";

const menuGroups = [
  {
    title: "บัญชี",
    links: [
      { name: "โปรไฟล์", href: "/settings/profile", icon: User }, 
      { name: "Edsential", href: "/settings/edsential", icon: User }, 
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
    <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
    <span className="truncate">{name}</span>
  </Link>
);

const ToggleSwitch = ({ label, description, isChecked, onChange }) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-800 last:border-b-0">
        <div className="pr-2">
            <p className="font-medium text-white text-sm md:text-base">{label}</p>
            <p className="text-[11px] md:text-sm text-gray-500 leading-relaxed">{description}</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 scale-10 md:scale-100">
            <input 
                type="checkbox" 
                checked={isChecked}
                onChange={onChange}
                className="sr-only peer" 
            />
            <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-focus:outline-none peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
        </label>
    </div>
);

export default function SettingsPage() {
  const currentPath = "/settings/edsential"; 
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0F1117] text-gray-300 selection:bg-[#7b4dff] selection:text-white overflow-x-hidden">
      <GradientBG />
      
      {/* 1. Mobile Top Bar - Sticky */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-[#161b22]/80 backdrop-blur-md border-b border-gray-800 sticky top-0 w-full">
        <h2 className="text-white font-bold flex items-center text-sm">
          <Settings className="w-4 h-4 mr-2 text-purple-400" /> ตั้งค่า
        </h2>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-1.5 text-gray-400 hover:text-white bg-gray-800/50 rounded-md transition-colors"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row h-full relative">
        
        {/* 2. Sidebar Navigation - Responsive Drawer */}
        <aside className={`
          fixed inset-y-0 left-0 z-[90] w-72 bg-[#161b22] transition-transform duration-300 transform 
          lg:translate-x-0 lg:static lg:block lg:w-64 lg:min-h-screen lg:bg-transparent lg:p-6
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          border-r border-gray-800 lg:border-none flex flex-col p-5 shadow-2xl lg:shadow-none
        `}>
          <div className="hidden lg:flex items-center mb-8 px-2">
            <h2 className="text-xl font-bold text-white flex items-center">
                <Settings className="w-5 h-5 mr-2 text-purple-400" /> 
                ตั้งค่าบัญชี
            </h2>
          </div>

          <nav className="flex-1 space-y-8 lg:bg-[#161b22] lg:p-4 lg:rounded-2xl lg:border lg:border-gray-800">
            <div>
                <p className="text-[10px] uppercase text-gray-500 font-bold mb-3 px-3 tracking-[0.1em]">บัญชีส่วนตัว</p>
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
            </div>
            
            <div className="pt-4">
                <p className="text-[10px] uppercase text-gray-500 font-bold mb-3 px-3 tracking-[0.1em]">{menuGroups[1].title}</p>
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
          </nav>
        </aside>

        {/* 3. Mobile Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/70 z-[80] lg:hidden backdrop-blur-sm transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
                    
        {/* 4. Main Content Area */}
        <main className="flex-1 p-5 md:p-8 lg:p-12 z-10">
          <header className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">ตั้งค่า</h1>
            <p className="text-xs md:text-base text-gray-400">
              จัดการความชอบส่วนตัวและความปลอดภัยของบัญชีคุณ
            </p>
          </header>

          <div className="space-y-6 md:space-y-10">
            
            {/* Appearance Section */}
            <section className="bg-[#161b22] border border-gray-800 rounded-2xl p-5 md:p-8 shadow-sm">
                <h2 className="text-base md:text-xl font-semibold text-white mb-5 flex items-center">
                    <Moon className="w-5 h-5 mr-2 text-pink-400" /> การแสดงผล
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button className="p-3 border border-gray-700 rounded-xl bg-[#0F1117] hover:border-purple-500 transition-all text-left group">
                        <div className="h-14 md:h-20 bg-gray-200 border border-gray-400 rounded-lg flex items-center justify-center mb-3">
                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Light</span>
                        </div>
                        <div className="flex items-center text-xs md:text-sm font-medium text-white">
                            <div className="w-3 h-3 rounded-full border border-gray-500 mr-2" /> System (Light)
                        </div>
                    </button>

                    <button 
                        onClick={() => setDarkModeEnabled(true)}
                        className={`p-3 rounded-xl transition-all text-left ${darkModeEnabled ? 'border-2 border-purple-500 bg-[#1e222e]' : 'border border-gray-700 bg-[#0F1117]'}`}
                    >
                        <div className="h-14 md:h-20 bg-gray-900 border border-gray-700 rounded-lg flex items-center justify-center mb-3">
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Dark</span>
                        </div>
                        <div className="flex items-center text-xs md:text-sm font-medium text-white">
                            <div className={`w-3 h-3 rounded-full mr-2 ${darkModeEnabled ? 'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]' : 'border border-gray-500'}`} />
                            System (Dark)
                        </div>
                    </button>
                </div>
            </section>

            {/* Notifications Section */}
            <section className="bg-[#161b22] border border-gray-800 rounded-2xl p-5 md:p-8 shadow-sm">
                <h2 className="text-base md:text-xl font-semibold text-white mb-2 flex items-center">
                    <Bell className="w-5 h-5 mr-2 text-purple-400" /> การแจ้งเตือน
                </h2>
                <ToggleSwitch
                    label="แจ้งเตือนกิจกรรม"
                    description="รับการแจ้งเตือนความคืบหน้าผ่านแอปและอีเมล"
                    isChecked={notificationsEnabled}
                    onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                />
            </section>

            {/* Security Section */}
            <section className="bg-[#161b22] border border-gray-800 rounded-2xl p-5 md:p-8 shadow-sm">
                <h2 className="text-base md:text-xl font-semibold text-white mb-4 flex items-center">
                    <Lock className="w-5 h-5 mr-2 text-cyan-400" /> ความปลอดภัย
                </h2>
                
                <div className="flex justify-between items-center py-4 border-b border-gray-800 last:border-b-0">
                    <div className="pr-4">
                        <p className="font-medium text-white text-sm md:text-base">รหัสผ่าน</p>
                        <p className="text-[11px] md:text-sm text-gray-500">เปลี่ยนรหัสผ่านล่าสุดเมื่อ 3 เดือนที่แล้ว</p>
                    </div>
                    <button className="flex-shrink-0 px-4 py-1.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-xs md:text-sm border border-gray-700 transition-colors">
                        เปลี่ยน
                    </button>
                </div>

                <div className="flex justify-between items-center py-4 border-b border-gray-800 last:border-b-0">
                    <div className="pr-4">
                        <p className="font-medium text-white text-sm md:text-base flex items-center">
                            <ShieldCheck className="w-4 h-4 mr-1 text-green-400 flex-shrink-0" /> ยืนยัน 2 ชั้น (2FA)
                        </p>
                        <p className="text-[11px] md:text-sm text-gray-500">เพิ่มความปลอดภัยอีกระดับ</p>
                    </div>
                    <button className="flex-shrink-0 px-4 py-1.5 bg-purple-600/10 hover:bg-purple-600/20 text-purple-400 border border-purple-500/30 rounded-lg text-xs md:text-sm transition-colors font-medium">
                        ตั้งค่า
                    </button>
                </div>
            </section>

            {/* Danger Zone */}
            <section className="bg-red-500/5 border border-red-500/20 rounded-2xl p-5 md:p-8 mb-10">
                <h2 className="text-base md:text-xl font-semibold text-red-500 mb-4 flex items-center">
                    <Zap className="w-4 h-4 mr-2" /> โซนอันตราย
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <p className="font-medium text-red-400 text-sm md:text-base">ลบบัญชีผู้ใช้</p>
                        <p className="text-[11px] md:text-sm text-gray-500">ข้อมูลทั้งหมดจะถูกลบถาวรและไม่สามารถกู้คืนได้</p>
                    </div>
                    <button className="w-full sm:w-auto px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs md:text-sm transition-all font-bold shadow-lg shadow-red-900/20">
                        ลบบัญชี
                    </button>
                </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}
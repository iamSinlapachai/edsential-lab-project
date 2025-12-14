// app/settings/edsential/page.tsx

"use client";

import Link from "next/link";
import { 
    Settings, User, Lock, Bell, Moon, 
    Zap, Globe, FileText, LayoutDashboard, Search, Mail, Code
} from "lucide-react";
import { useState } from "react"; 
import GradientBG from "@/components/gradient-bg";


// *** 1. ข้อมูลเมนูใน Sidebar (แก้ไข currentPath ให้ถูกต้อง) ***

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

// คอมโพเนนต์สำหรับลิงก์ใน Sidebar
const SidebarLink = ({ name, href, Icon, isActive }) => (
  <Link
    href={href}
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

// คอมโพเนนต์สำหรับปุ่มสลับ (Toggle Switch)
const ToggleSwitch = ({ label, description, isChecked, onChange }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-800 last:border-b-0">
        <div>
            <p className="font-medium text-white">{label}</p>
            <p className="text-sm text-gray-500">{description}</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
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


// *** 3. Main Component: SettingsPage ***

export default function SettingsPage() {
  // ตั้งค่าให้ Highlight เมนู "ตั้งค่า"
  const currentPath = "/settings/edsential"; 
  
  // สถานะจำลองสำหรับการตั้งค่า
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);

  return (
    <div className="min-h-screen bg-[#0F1117] text-gray-300 selection:bg-[#7b4dff] selection:text-white">
      <GradientBG></GradientBG>
      
      
      <div className="max-w-7xl mx-auto flex h-full z-10 relative ">
        
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-[#161b22] rounded-3xl mb-6  border-r border-gray-800 flex flex-col p-4 h-screen sticky top-0">
          {/* Account/Setting Header */}
          <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-4 pt-2">
            <h2 className="text-lg font-bold text-white flex items-center">
                <Settings className="w-5 h-5 mr-2 text-purple-400" /> 
                บัญชี
            </h2>
            <button className="text-gray-500 hover:text-white transition-colors">
                <Search className="w-5 h-5" />
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
                      isActive={currentPath === link.href} // ตั้งค่าให้ /settings/edsential Active
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
                        />
                    ))}
                </div>
            </div>

            <div className="pt-6 border-t border-gray-800 mt-6">
                <p className="text-sm font-medium text-gray-500">
                    มีคำถาม?
                </p>
                <Link href="/support" className="text-sm text-purple-400 hover:underline">
                    ศูนย์ช่วยเหลือ
                </Link>
            </div>
          </nav>
        </aside>
                    
        {/* Main Content Area: Setting Options */}
        <main className="flex-1 p-8 md:p-12">
          
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            ตั้งค่า
          </h1>
          <p className="text-gray-400 mb-8 border-b border-gray-800 pb-4">
            จัดการความชอบส่วนตัวและการแจ้งเตือนของคุณ
          </p>

          <div className="space-y-10">

            {/* Section 1: การแสดงผล (Appearance) */}
            <section className="bg-[#161b22] border border-gray-800 rounded-xl p-6 md:p-8">
                <h2 className="text-xl font-semibold text-white mb-4 border-b border-gray-800 pb-2 flex items-center">
                    <Moon className="w-5 h-5 mr-2 text-pink-400" /> 
                    การแสดงผล
                </h2>
                
                {/* Theme Selection - เหมือนในภาพตัวอย่าง Image of Setting panel */}
                <h3 className="text-md font-medium text-gray-300 mb-3">เลือกธีม</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* System (White Theme) Card */}
                    <div className="p-4 border border-gray-700 rounded-xl bg-[#0F1117] hover:border-purple-500 transition-colors cursor-pointer">
                        <div className="h-20 bg-gray-200 border border-gray-400 rounded-lg flex items-center justify-center mb-3 text-gray-600/70">
                            <span className="text-xs">System (White Theme) Preview</span>
                        </div>
                        <label className="flex items-center text-sm font-medium text-white cursor-pointer">
                            <input type="radio" name="theme" defaultChecked={false} className="w-4 h-4 text-purple-500 bg-gray-900 border-gray-700 focus:ring-purple-500 mr-2" />
                            System (White Theme)
                        </label>
                    </div>

                    {/* System (Dark Theme) Card - Selected */}
                    <div className={`p-4 rounded-xl shadow-xl transition-colors cursor-pointer ${darkModeEnabled ? 'border-2 border-purple-500 bg-[#1e222e]' : 'border border-gray-700 bg-[#0F1117]'}`}>
                        <div className="h-20 bg-gray-900 border border-gray-700 rounded-lg flex items-center justify-center mb-3 text-gray-500/70">
                            <span className="text-xs">System (Dark Theme) Preview</span>
                        </div>
                        <label className="flex items-center text-sm font-medium text-white cursor-pointer">
                            <input 
                                type="radio" 
                                name="theme" 
                                defaultChecked={true} 
                                onChange={() => setDarkModeEnabled(!darkModeEnabled)}
                                className="w-4 h-4 text-purple-500 bg-gray-900 border-gray-700 focus:ring-ring-purple-500 mr-2" 
                            />
                            System (Dark Theme)
                        </label>
                    </div>
                </div>
                
                {/* Date/Time Toggle (เหลือจากโค้ดเดิม) */}
                <h3 className="text-md font-medium text-gray-300 mb-3">การจัดรูปแบบวันที่และเวลา</h3>
                <select
                    className="w-full lg:w-1/2 px-4 py-2 bg-[#0F1117] border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition duration-150 outline-none"
                >
                    <option>DD/MM/YYYY (24-Hour)</option>
                    <option>MM/DD/YYYY (12-Hour)</option>
                </select>
            </section>

            {/* Section 2: การแจ้งเตือน (Notifications) */}
            <section className="bg-[#161b22] border border-gray-800 rounded-xl p-6 md:p-8">
                <h2 className="text-xl font-semibold text-white mb-4 border-b border-gray-800 pb-2 flex items-center">
                    <Bell className="w-5 h-5 mr-2 text-purple-400" /> 
                    การแจ้งเตือน
                </h2>
                
                <ToggleSwitch
                    label="เปิดใช้งานการแจ้งเตือนทั้งหมด"
                    description="รับการแจ้งเตือนเกี่ยวกับความคืบหน้าและกิจกรรมใหม่"
                    isChecked={notificationsEnabled}
                    onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                />
                
                <ToggleSwitch
                    label="แจ้งเตือนทางอีเมล"
                    description="รับการอัปเดตสถานะที่สำคัญผ่านทางอีเมล"
                    isChecked={false}
                    onChange={() => {}} 
                />
            </section>
            
            {/* Section 3: การจัดการบัญชี (Account Management) */}
            <section className="bg-[#161b22] border border-gray-800 rounded-xl p-6 md:p-8">
                <h2 className="text-xl font-semibold text-white mb-4 border-b border-gray-800 pb-2 flex items-center">
                    <Lock className="w-5 h-5 mr-2 text-pink-400" /> 
                    ความปลอดภัย
                </h2>
                
                <div className="flex justify-between items-center py-3">
                    <p className="font-medium text-white">เปลี่ยนรหัสผ่าน</p>
                    <button className="text-sm px-4 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors">
                        เปลี่ยน
                    </button>
                </div>

                <div className="pt-6 mt-4 border-t border-gray-800">
                    <h3 className="text-lg font-semibold text-red-500 mb-2">
                        <Zap className="w-5 h-5 inline mr-2"/>
                        จัดการบัญชี
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                        การดำเนินการนี้ไม่สามารถยกเลิกได้ โปรดดำเนินการด้วยความระมัดระวัง
                    </p>
                    <button className="text-sm px-4 py-2 bg-red-700 hover:bg-red-800 rounded-lg text-white transition-colors">
                        ลบบัญชีของฉัน
                    </button>
                </div>
            </section>

          </div>
          
        </main>
      </div>
      
    </div>
  );
}
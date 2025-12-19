"use client";

import Link from "next/link";
import {
  Settings,
  User,
  Lock,
  Bell,
  Moon,
  Zap,
  Globe,
  FileText,
  Menu,
  X,
  ShieldCheck,
  BarChart3,
} from "lucide-react";
import { useState, useEffect } from "react";
import GradientBG from "@/components/gradient-bg";
import { useTheme } from "next-themes";

// *** 1. ข้อมูลเมนูใน Sidebar (ใช้ชุดเดียวกับ Profile) ***
const menuGroups = [
  {
    title: "บัญชี",
    links: [
      { name: "โปรไฟล์", href: "/settings/profile", icon: User },
      {
        name: "Edsential Progress",
        href: "/settings/edsential",
        icon: BarChart3,
      },
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

// *** 2. Sidebar Link Component (สไตล์เดียวกับ Profile) ***
interface SidebarLinkProps {
  name: string;
  href: string;
  Icon: React.ElementType;
  isActive: boolean;
  onClick: () => void;
}

const SidebarLink = ({
  name,
  href,
  Icon,
  isActive,
  onClick,
}: SidebarLinkProps) => (
  <Link
    href={href}
    onClick={onClick}
    className={`flex items-center p-3 rounded-lg text-sm font-medium transition-colors duration-150
      ${
        isActive
          ? "bg-purple-600/30 text-white shadow-inner border border-purple-500/50"
          : "text-gray-400 hover:bg-[#1e222e] hover:text-white"
      }
    `}
  >
    <Icon className="w-5 h-5 mr-3" />
    {name}
  </Link>
);

interface ToggleSwitchProps {
  label: string;
  description: string;
  isChecked: boolean;
  onChange: () => void;
}

const ToggleSwitch = ({
  label,
  description,
  isChecked,
  onChange,
}: ToggleSwitchProps) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-800 last:border-b-0">
    <div className="pr-2">
      <p className="font-medium text-white text-sm md:text-base">{label}</p>
      <p className="text-[11px] md:text-sm text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
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
  const currentPath = "/settings/";
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // if (!mounted) {
  //   return null;
  // }

  return (
    <div className="min-h-screen bg-[#0F1117] text-gray-300 selection:bg-[#7b4dff] selection:text-white">
      <GradientBG />

      {/* 1. Mobile Top Bar (โครงสร้างเดียวกับ Profile) */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-[#161b22] border-b border-gray-800 sticky top-0 w-full z-[100]">
        <h2 className="text-white font-bold flex items-center">
          <Settings className="w-5 h-5 mr-2 text-purple-400" /> ตั้งค่า
        </h2>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-gray-400 hover:text-white transition-colors relative z-[101]"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row h-full relative z-10">
        {/* 2. Sidebar Navigation (โครงสร้างและขนาด w-64 เท่ากับ Profile) */}
        <aside
          className={`
          fixed inset-y-0 left-0 z-[90] w-64 bg-[#161b22] transition-transform duration-300 transform 
          lg:translate-x-0 lg:static lg:block lg:h-screen lg:rounded-3xl lg:my-6 lg:ml-4
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          border-r border-gray-800 flex flex-col p-4 shadow-2xl lg:shadow-none
        `}
        >
          <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-4 pt-2">
            <h2 className="text-lg font-bold text-white flex items-center">
              <Settings className="w-5 h-5 mr-2 text-purple-400" />
              เมนูบัญชี
            </h2>
            <button
              className="lg:hidden text-gray-400 p-1"
              onClick={() => setIsSidebarOpen(false)}
            >
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
              <Link
                href="/support"
                className="text-sm text-purple-400 hover:underline"
              >
                ศูนย์ช่วยเหลือ
              </Link>
            </div>
          </nav>
        </aside>

        {/* 3. Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-[80] lg:hidden backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* 4. Main Content Area (ปรับ Padding Bottom pb-32 เพื่อหนี Footer) */}
        <main className="flex-1 p-6 md:p-12 pb-24 md:pb-32 overflow-x-hidden">
          <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              ตั้งค่า
            </h1>
            <p className="hidden md:block text-sm text-gray-400">
              จัดการความชอบส่วนตัวและความปลอดภัย
            </p>
          </div>

          <div className="space-y-8">
            {/* Appearance Section */}
            <section className="bg-[#161b22] border border-gray-800 rounded-xl p-5 md:p-8">
              <h2 className="text-lg font-semibold text-white mb-5 flex items-center border-b border-gray-800 pb-2">
                <Moon className="w-4 h-4 mr-2 text-pink-500" /> การแสดงผล
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Light Mode */}
                <button
                  onClick={() => setTheme("light")}
                  className={`p-3 border rounded-xl transition-all text-left group ${
                    mounted && theme === "light"
                      ? "border-purple-500 bg-[#1e222e]"
                      : "border-gray-700 bg-[#0F1117] hover:border-purple-500/50"
                  }`}
                >
                  <div className="h-14 md:h-20 bg-gray-200 border border-gray-400 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">
                      Light
                    </span>
                  </div>
                  <div className="flex items-center text-xs md:text-sm font-medium text-white">
                    <div
                      className={`w-3 h-3 rounded-full mr-2 ${
                        mounted && theme === "light"
                          ? "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]"
                          : "border border-gray-500"
                      }`}
                    />{" "}
                    Light
                  </div>
                </button>

                {/* Dark Mode */}
                <button
                  onClick={() => setTheme("dark")}
                  className={`p-3 rounded-xl transition-all text-left ${
                    mounted && theme === "dark"
                      ? "border-2 border-purple-500 bg-[#1e222e]"
                      : "border border-gray-700 bg-[#0F1117] hover:border-purple-500/50"
                  }`}
                >
                  <div className="h-14 md:h-20 bg-gray-900 border border-gray-700 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                      Dark
                    </span>
                  </div>
                  <div className="flex items-center text-xs md:text-sm font-medium text-white">
                    <div
                      className={`w-3 h-3 rounded-full mr-2 ${
                        mounted && theme === "dark"
                          ? "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]"
                          : "border border-gray-500"
                      }`}
                    />
                    Dark
                  </div>
                </button>

                {/* System Mode */}
                <button
                  onClick={() => setTheme("system")}
                  className={`p-3 rounded-xl transition-all text-left ${
                    mounted && theme === "system"
                      ? "border-2 border-purple-500 bg-[#1e222e]"
                      : "border border-gray-700 bg-[#0F1117] hover:border-purple-500/50"
                  }`}
                >
                  <div className="h-14 md:h-20 bg-gradient-to-br from-gray-200 to-gray-900 border border-gray-500 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-[10px] text-gray-600 font-bold uppercase tracking-tighter bg-white/50 px-2 py-0.5 rounded">
                      System
                    </span>
                  </div>
                  <div className="flex items-center text-xs md:text-sm font-medium text-white">
                    <div
                      className={`w-3 h-3 rounded-full mr-2 ${
                        mounted && theme === "system"
                          ? "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]"
                          : "border border-gray-500"
                      }`}
                    />
                    System
                  </div>
                </button>
              </div>
            </section>

            {/* Notifications Section */}
            <section className="bg-[#161b22] border border-gray-800 rounded-xl p-5 md:p-8">
              <h2 className="text-lg font-semibold text-white mb-2 flex items-center border-b border-gray-800 pb-2">
                <Bell className="w-4 h-4 mr-2 text-purple-500" /> การแจ้งเตือน
              </h2>
              <ToggleSwitch
                label="แจ้งเตือนกิจกรรม"
                description="รับการแจ้งเตือนความคืบหน้าผ่านแอปและอีเมล"
                isChecked={notificationsEnabled}
                onChange={() => setNotificationsEnabled(!notificationsEnabled)}
              />
            </section>

            {/* Security Section */}
            <section className="bg-[#161b22] border border-gray-800 rounded-xl p-5 md:p-8">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center border-b border-gray-800 pb-2">
                <Lock className="w-4 h-4 mr-2 text-purple-500" /> ความปลอดภัย
              </h2>
              <div className="divide-y divide-gray-800">
                <div className="flex justify-between items-center py-4">
                  <div className="pr-4">
                    <p className="font-medium text-white text-sm md:text-base">
                      รหัสผ่าน
                    </p>
                    <p className="text-[11px] md:text-sm text-gray-500">
                      เปลี่ยนรหัสผ่านล่าสุดเมื่อ 3 เดือนที่แล้ว
                    </p>
                  </div>
                  <button className="flex-shrink-0 px-4 py-1.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-xs md:text-sm border border-gray-700 transition-colors">
                    เปลี่ยน
                  </button>
                </div>
                <div className="flex justify-between items-center py-4">
                  <div className="pr-4">
                    <p className="font-medium text-white text-sm md:text-base flex items-center">
                      <ShieldCheck className="w-4 h-4 mr-1 text-green-400 flex-shrink-0" />{" "}
                      ยืนยัน 2 ชั้น (2FA)
                    </p>
                    <p className="text-[11px] md:text-sm text-gray-500">
                      เพิ่มความปลอดภัยอีกระดับ
                    </p>
                  </div>
                  <button className="flex-shrink-0 px-4 py-1.5 bg-purple-600/10 hover:bg-purple-600/20 text-purple-400 border border-purple-500/30 rounded-lg text-xs md:text-sm transition-colors font-medium">
                    ตั้งค่า
                  </button>
                </div>
              </div>
            </section>

            {/* Danger Zone (เพิ่ม Margin Bottom mb-10 เพื่อความสมมาตร) */}
            <section className="bg-red-500/5 border border-red-500/20 rounded-xl p-5 md:p-8 mb-10">
              <h2 className="text-lg font-semibold text-red-500 mb-4 flex items-center border-b border-red-500/10 pb-2">
                <Zap className="w-4 h-4 mr-2" /> โซนอันตราย
              </h2>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-red-400 text-sm md:text-base">
                    ลบบัญชีผู้ใช้
                  </p>
                  <p className="text-[11px] md:text-sm text-gray-500">
                    ข้อมูลทั้งหมดจะถูกลบถาวร
                  </p>
                </div>
                <button className="w-full sm:w-auto px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs md:text-sm transition-all font-bold shadow-lg shadow-red-900/20">
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

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Settings,
  User,
  Lock,
  Globe,
  FileText,
  Menu,
  X,
  BarChart3,
} from "lucide-react";
import { useState } from "react";
import GradientBG from "@/components/gradient-bg";

// ข้อมูลเมนูใน Sidebar
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

// Sidebar Link Component
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

interface SettingsShellProps {
  children: React.ReactNode;
  title: string;
  description?: string; // Optional description for the page header
  hideHeader?: boolean; // Option to hide the default header if the page has its own custom one
}

export default function SettingsShell({
  children,
  title,
  description,
  hideHeader = false,
}: SettingsShellProps) {
  const currentPath = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Helper to determine if a link is active
  // Special check for /settings/ to avoid matching everything starting with /settings
  const isLinkActive = (href: string) => {
    if (href === "/settings/" && currentPath !== "/settings/") {
      return false;
    }
    // Strict match for aboutus, privacy, terms
    if (["/aboutus", "/privacy", "/terms"].includes(href)) {
      return currentPath === href;
    }
    return currentPath === href || currentPath.startsWith(href + "/");
  };

  return (
    <div className="min-h-screen bg-[#0F1117] text-gray-300 selection:bg-[#7b4dff] selection:text-white">
      <GradientBG />

      {/* 1. Mobile Top Bar */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-[#161b22] border-b border-gray-800 sticky top-0 w-full z-[100]">
        <h2 className="text-white font-bold flex items-center">
          {/* Show icon based on current section if possible, or generic Settings icon */}
          <Settings className="w-5 h-5 mr-2 text-purple-400" /> {title}
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
                  isActive={isLinkActive(link.href)}
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
                    isActive={isLinkActive(link.href)}
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

        {/* 4. Main Content Area */}
        <main className="flex-1 p-6 md:p-12 pb-24 md:pb-32 overflow-x-hidden">
          {!hideHeader && (
            <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                {title}
              </h1>
              {description && (
                <p className="hidden md:block text-sm text-gray-400">
                  {description}
                </p>
              )}
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}

// app/settings/profile/page.tsx

"use client";

import Link from "next/link";
import {
  Settings,
  User,
  Globe,
  FileText,
  Lock,
  Search,
  Mail,
  Github,
  Bookmark,
  Code,
  Menu,
  X,
  BarChart3,
} from "lucide-react";
import { useState } from "react";
import GradientBG from "@/components/gradient-bg";

// *** 1. ข้อมูล Profile เริ่มต้น ***
const userProfile = {
  name: "Username",
  title: "Full Stack Developer",
  bio: "Passionate developer focusing on scalable web applications and community contributions. Always learning new technologies.",
  email: "Email@example.com",
  github: "Hexx-dev",
  skills: [
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Node.js",
    "Python",
    "Docker",
    "AWS",
  ],
};

const getSkillStyle = (skill: string) => {
  if (["TypeScript", "React", "Next.js", "Tailwind CSS"].includes(skill)) {
    return "bg-purple-600/20 text-purple-300 border-purple-500/50";
  }
  return "bg-gray-700/50 text-gray-400 border-gray-600/50";
};

// *** 2. ข้อมูลเมนูใน Sidebar ***
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

// *** 3. คอมโพเนนต์สำหรับลิงก์ใน Sidebar ***
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

export default function ProfilePage() {
  const currentPath = "/settings/profile";
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0F1117] text-gray-300 selection:bg-[#7b4dff] selection:text-white">
      <GradientBG />

      {/* 1. Mobile Top Bar: เพิ่ม Hamburger Menu */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-[#161b22] border-b border-gray-800 sticky top-0 w-full">
        <h2 className="text-white font-bold flex items-center">
          <User className="w-5 h-5 mr-2 text-purple-400" /> โปรไฟล์
        </h2>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-gray-400 hover:text-white transition-colors relative z-[101]"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row h-full relative z-10">
        {/* 2. Sidebar Navigation: รองรับ Responsive */}
        <aside
          className={`
          fixed inset-y-0 left-0 z-[90] w-64 bg-[#161b22] transition-transform duration-300 transform 
          lg:translate-x-0 lg:static lg:block lg:h-screen lg:rounded-3xl lg:my-6 lg:ml-4
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          border-r border-gray-800 flex flex-col p-4 shadow-2xl lg:shadow-none
        `}
        >
          {/* ส่วนหัว Sidebar สำหรับมือถือ */}
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

        {/* 3. Overlay เมื่อเปิดเมนูในมือถือ */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-[80] lg:hidden backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* 4. Main Content Area */}
        <main className="flex-1 p-6 md:p-12 overflow-x-hidden">
          <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              โปรไฟล์
            </h1>
          </div>

          {/* Profile Hero Section */}
          <div className="flex justify-between items-start mb-10">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-4 border-purple-500 flex-shrink-0">
                <div className="w-full h-full bg-[#1e222e] flex items-center justify-center text-2xl md:text-3xl text-gray-500 font-bold">
                  {userProfile.name.substring(0, 2).toUpperCase()}
                </div>
              </div>
              <div>
                <p className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 tracking-tight">
                  {userProfile.name}
                </p>
                <p className="text-sm md:text-md text-gray-400">
                  {userProfile.title}
                </p>
              </div>
            </div>

            <Link
              href="/account/update-profile"
              className="text-xs px-3 py-1.5 bg-gray-800 border border-gray-700 text-gray-300 font-medium rounded-md hover:bg-gray-700 hover:text-white transition-all duration-200"
            >
              แก้ไขโปรไฟล์
            </Link>
          </div>

          <p className="max-w-4xl text-sm sm:text-base text-gray-400 leading-relaxed mb-10">
            {userProfile.bio}
          </p>

          {/* Content Card */}
          <div className="bg-[#161b22] border border-gray-800 rounded-xl p-5 md:p-8 space-y-8">
            {/* Skills */}
            <section>
              <h2 className="text-lg font-semibold text-white mb-4 border-b border-gray-800 pb-2 flex items-center">
                <Code className="w-4 h-4 mr-2 text-pink-500" /> ทักษะหลัก
              </h2>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {userProfile.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`text-[10px] md:text-xs font-medium px-3 py-1 rounded-full border shadow-md ${getSkillStyle(
                      skill
                    )}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Featured Projects */}
            <section>
              <h2 className="text-lg font-semibold text-white mb-4 border-b border-gray-800 pb-2 flex items-center">
                <Bookmark className="w-4 h-4 mr-2 text-purple-500" /> ผลงานเด่น
              </h2>
              <div className="space-y-3">
                <div className="group block bg-[#1e222e] border border-gray-800 rounded-lg p-4 transition-all duration-200 hover:border-purple-500/50 hover:shadow-lg">
                  <p className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                    Awesome Web App
                  </p>
                  <p className="text-sm text-gray-400">
                    Next.js, TypeScript, PostgreSQL
                  </p>
                </div>
              </div>
            </section>

            {/* Contact Info */}
            <section>
              <h2 className="text-lg font-semibold text-white mb-4 border-b border-gray-800 pb-2 flex items-center">
                <Mail className="w-4 h-4 mr-2 text-purple-500" /> ข้อมูลติดต่อ
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center text-gray-400 text-sm">
                  <Mail className="w-4 h-4 mr-2 text-gray-600 flex-shrink-0" />
                  อีเมล:{" "}
                  <span className="ml-2 font-medium text-white break-all">
                    {userProfile.email}
                  </span>
                </div>

                {/* <a
                  href={`https://github.com/${userProfile.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-400 hover:text-purple-400 transition-colors group text-sm"
                >
                  <Github className="w-4 h-4 mr-2 text-purple-500 group-hover:text-purple-400 flex-shrink-0" />
                  GitHub: <span className="ml-2">{userProfile.github}</span>
                </a> */}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

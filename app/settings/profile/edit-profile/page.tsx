"use client";

import Link from "next/link";
import {
  Settings,
  User,
  Globe,
  FileText,
  Lock,
  Mail,
  Github,
  Menu,
  X,
  Camera,
  Save,
  ArrowLeft,
  BarChart3,
  Check,
  Code,
} from "lucide-react";
import { useState } from "react";
import GradientBG from "@/components/gradient-bg";

// *** 1. ข้อมูลเมนูใน Sidebar (เหมือนหน้า Profile เป๊ะ) ***
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

const allSkills = [
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "Python",
  "Docker",
  "AWS",
  "SQL",
  "MongoDB",
];

// *** 2. คอมโพเนนต์ Sidebar Link (ถอดแบบจากหน้า Profile) ***
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

export default function EditProfilePage() {
  const currentPath = "/settings/profile"; // กำหนดให้โปรไฟล์เป็น Active
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "Username",
    title: "Full Stack Developer",
    bio: "Passionate developer focusing on scalable web applications and community contributions. Always learning new technologies.",
    email: "Email@example.com",
    github: "Hexx-dev",
  });

  const [selectedSkills, setSelectedSkills] = useState([
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
  ]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-[#0F1117] text-gray-300 selection:bg-[#7b4dff] selection:text-white">
      <GradientBG />

      {/* 1. Mobile Top Bar (เหมือนหน้า Profile) */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-[#161b22] border-b border-gray-800 sticky top-0 w-full z-50">
        <h2 className="text-white font-bold flex items-center">
          <User className="w-5 h-5 mr-2 text-purple-400" /> แก้ไขโปรไฟล์
        </h2>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-gray-400 hover:text-white transition-colors relative z-[101]"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row h-full relative z-10">
        {/* 2. Sidebar Navigation (เหมือนหน้า Profile เป๊ะ) */}
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

        {/* 3. Overlay (เหมือนหน้า Profile) */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-[80] lg:hidden backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* 4. Main Content Area */}
        <main className="flex-1 p-6 md:p-12 pb-32 overflow-x-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 border-b border-gray-800 pb-4 gap-4">
            <div>
              <Link
                href="/settings/profile"
                className="flex items-center text-sm text-purple-400 hover:underline mb-1 group transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" />{" "}
                กลับไปหน้าโปรไฟล์
              </Link>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                แก้ไขโปรไฟล์
              </h1>
            </div>
            <button className="flex items-center justify-center px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium rounded-lg shadow-lg hover:from-purple-600 hover:to-pink-700 transition duration-300 transform hover:-translate-y-0.5">
              <Save className="w-4 h-4 mr-2" /> บันทึกข้อมูล
            </button>
          </div>

          <div className="max-w-4xl space-y-8">
            {/* Profile Picture Section */}
            <section className="bg-[#161b22] border border-gray-800 rounded-xl p-6 shadow-xl">
              <h2 className="text-md font-semibold text-white mb-6 flex items-center">
                <Camera className="w-4 h-4 mr-2 text-purple-500" /> รูปโปรไฟล์
              </h2>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative group cursor-pointer">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-purple-500 bg-[#1e222e] flex items-center justify-center text-2xl text-gray-500 font-bold">
                    {formData.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera size={20} className="text-white" />
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-sm text-gray-200 font-medium mb-1">
                    เปลี่ยนรูปโปรไฟล์ของคุณ
                  </p>
                  <p className="text-xs text-gray-500">
                    แนะนำขนาด 400x400px (JPG, PNG)
                  </p>
                </div>
              </div>
            </section>

            {/* General Info Section */}
            <section className="bg-[#161b22] border border-gray-800 rounded-xl p-6 space-y-6 shadow-xl">
              <h2 className="text-md font-semibold text-white border-b border-gray-800 pb-2 mb-4 flex items-center">
                <User className="w-4 h-4 mr-2 text-purple-500" /> ข้อมูลทั่วไป
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-500 ml-1">
                    ชื่อผู้ใช้งาน
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#0F1117] border border-gray-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-500 ml-1">
                    ตำแหน่งงาน
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full bg-[#0F1117] border border-gray-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-500 ml-1">
                  เกี่ยวกับฉัน (Bio)
                </label>
                <textarea
                  name="bio"
                  rows={3}
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full bg-[#0F1117] border border-gray-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all resize-none text-sm leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-500 ml-1 flex items-center">
                    <Mail className="w-3.5 h-3.5 mr-1.5" /> อีเมลติดต่อ
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#0F1117] border border-gray-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-500 ml-1 flex items-center">
                    <Github className="w-3.5 h-3.5 mr-1.5" /> GitHub Username
                  </label>
                  <input
                    type="text"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    className="w-full bg-[#0F1117] border border-gray-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all text-sm"
                  />
                </div>
              </div>
            </section>

            {/* Skill Picker Section */}
            <section className="bg-[#161b22] border border-gray-800 rounded-xl p-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-gray-800 pb-2 mb-6">
                <h2 className="text-md font-semibold text-white flex items-center">
                  <Code className="w-4 h-4 mr-2 text-pink-500" /> ทักษะหลัก
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {allSkills.map((skill) => {
                  const isSelected = selectedSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`flex items-center space-x-2 px-4 py-1.5 rounded-full border text-xs font-medium transition-all duration-200
                            ${
                              isSelected
                                ? "bg-purple-600/20 border-purple-500 text-purple-300 shadow-md ring-1 ring-purple-500/30"
                                : "bg-[#0F1117] border-gray-800 text-gray-500 hover:border-gray-600"
                            }`}
                    >
                      <span>{skill}</span>
                      {isSelected && (
                        <Check size={12} className="text-purple-400" />
                      )}
                    </button>
                  );
                })}
              </div>
              <p className="text-[10px] text-gray-500 mt-4 italic">
                * คลิกเพื่อเลือกทักษะที่จะแสดงในหน้าโปรไฟล์
              </p>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

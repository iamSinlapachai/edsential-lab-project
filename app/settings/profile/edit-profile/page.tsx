"use client";

import Link from "next/link";
import {
  Camera,
  Save,
  ArrowLeft,
  Check,
  Code,
  User,
  Mail,
  Github,
} from "lucide-react";
import { useState } from "react";
import SettingsShell from "@/components/settings-shell";

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

export default function EditProfilePage() {
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
    <SettingsShell title="แก้ไขโปรไฟล์" hideHeader={true}>
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
                        ${isSelected
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
        <div className="flex justify-end">
          <button className="flex items-center justify-center px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium rounded-lg shadow-lg hover:from-purple-600 hover:to-pink-700 transition duration-300 transform hover:-translate-y-0.5">
            <Save className="w-4 h-4 mr-2" /> บันทึกข้อมูล
          </button>
        </div>

      </div>
    </SettingsShell>
  );
}

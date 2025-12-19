"use client";

import Link from "next/link";
import { Code, Bookmark, Mail } from "lucide-react";
import SettingsShell from "@/components/settings-shell";

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

export default function ProfilePage() {
  return (
    <SettingsShell title="โปรไฟล์">
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
          href="/settings/profile/edit-profile"
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

        

        {/* Contact Info */}
        <section >
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
    </SettingsShell>
  );
}

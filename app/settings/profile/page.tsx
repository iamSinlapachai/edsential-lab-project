//app\settings\profile\page.tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabaseServer"; // ใช้ Server Client
import { cookies } from "next/headers";
import { Code, Bookmark, Mail, Github } from "lucide-react";
import SettingsShell from "@/components/settings-shell";
import Image from "next/image";

// ฟังก์ชันช่วยกำหนดสีป้าย Skill
const getSkillStyle = (skill: string) => {
  const highlightSkills = [
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Supabase",
  ];
  if (highlightSkills.includes(skill)) {
    return "bg-purple-600/20 text-purple-300 border-purple-500/50";
  }
  return "bg-gray-700/50 text-gray-400 border-gray-600/50";
};

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // 1. ดึงข้อมูล User ปัจจุบัน (Authentication)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // 2. ดึงข้อมูล Profile จากตาราง (Database)
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // 3. กำหนดค่า Default หากข้อมูลใน DB ยังว่างอยู่
  const displayData = {
    name: profile?.full_name || "Unknown User",
    title: profile?.job_title || "No Job Title",
    bio: profile?.bio || "No bio available yet.",
    email: user.email, // Email ดึงจาก Auth User โดยตรง
    github: profile?.github_username,
    avatar_url: profile?.avatar_url,
    skills: profile?.skills || [], // ถ้าไม่มีให้เป็น array ว่าง
  };

  return (
    <SettingsShell title="โปรไฟล์">
      {/* Profile Hero Section */}
      <div className="flex justify-between items-start mb-10">
        <div className="flex items-center space-x-6">
          {/* Avatar Section */}
          <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-4 border-purple-500 flex-shrink-0">
            {displayData.avatar_url ? (
              <Image
                src={displayData.avatar_url}
                alt={displayData.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[#1e222e] flex items-center justify-center text-2xl md:text-3xl text-gray-500 font-bold">
                {displayData.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div>
            <p className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 tracking-tight">
              {displayData.name}
            </p>
            <p className="text-sm md:text-md text-gray-400">
              {displayData.title}
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

      <p className="max-w-4xl text-sm sm:text-base text-gray-400 leading-relaxed mb-10 whitespace-pre-line">
        {displayData.bio}
      </p>

      {/* Content Card */}
      <div className="bg-[#161b22] border border-gray-800 rounded-xl p-5 md:p-8 space-y-8">
        {/* Skills */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-4 border-b border-gray-800 pb-2 flex items-center">
            <Code className="w-4 h-4 mr-2 text-pink-500" /> ทักษะหลัก
          </h2>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {displayData.skills.length > 0 ? (
              displayData.skills.map((skill: string) => (
                <span
                  key={skill}
                  className={`text-[10px] md:text-xs font-medium px-3 py-1 rounded-full border shadow-md ${getSkillStyle(
                    skill
                  )}`}
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-500 italic">
                ยังไม่ได้ระบุทักษะ
              </span>
            )}
          </div>
        </section>

        {/* Featured Projects (Static Mockup - เพราะยังไม่มีตาราง Projects) */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-4 border-b border-gray-800 pb-2 flex items-center">
            <Bookmark className="w-4 h-4 mr-2 text-purple-500" /> ผลงานเด่น
          </h2>
          <div className="space-y-3">
            <div className="group block bg-[#1e222e] border border-gray-800 rounded-lg p-4 transition-all duration-200 hover:border-purple-500/50 hover:shadow-lg">
              <p className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                My First Project
              </p>
              <p className="text-sm text-gray-400">
                (ส่วนนี้ยังเป็นข้อมูลตัวอย่าง คุณสามารถสร้างตาราง projects
                เพิ่มเติมในอนาคต)
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
                {displayData.email}
              </span>
            </div>

            {displayData.github && (
              <a
                href={`https://github.com/${displayData.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-400 hover:text-purple-400 transition-colors group text-sm"
              >
                <Github className="w-4 h-4 mr-2 text-purple-500 group-hover:text-purple-400 flex-shrink-0" />
                GitHub: <span className="ml-2">{displayData.github}</span>
              </a>
            )}
          </div>
        </section>
      </div>
    </SettingsShell>
  );
}

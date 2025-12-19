"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js"; // Import Type User
import {
  Save,
  ArrowLeft,
  Check,
  Code,
  User as UserIcon,
  Mail,
  Github,
  Loader2,
  Camera, // เอาไว้ใช้ตกแต่ง Header ของ Section
} from "lucide-react";
import { useState, useEffect } from "react";
import SettingsShell from "@/components/settings-shell";
import AvatarUpload from "@/components/AvatarUpload"; // ✅ 1. Import Component ของเรามา

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
  "Supabase",
  "Figma",
];

export default function EditProfilePage() {
  const router = useRouter();
  const supabase = createClient();

  // --- States ---
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<User | null>(null); // ✅ 2. เก็บ User Object เต็มๆ เพื่อส่งให้ Component ลูก

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    bio: "",
    email: "",
    github: "",
  });

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  // 1. Fetch Data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push("/login");
          return;
        }

        setUser(user); // ✅ เก็บข้อมูล User ไว้ส่งต่อ

        const { data: profile, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) throw error;

        if (profile) {
          setFormData({
            name: profile.full_name || "",
            title: profile.job_title || "",
            bio: profile.bio || "",
            email: user.email || "",
            github: profile.github_username || "",
          });
          setSelectedSkills(profile.skills || []);
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [supabase, router]);

  // --- Handlers ---

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

  // ✅ 3. ฟังก์ชันบันทึก เหลือแค่ Text Data (เพราะรูปบันทึกใน Component ลูกแล้ว)
  const handleSave = async () => {
    if (!user) return;
    setSaving(true);

    try {
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          full_name: formData.name,
          job_title: formData.title,
          bio: formData.bio,
          github_username: formData.github,
          skills: selectedSkills,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (updateError) throw updateError;

      router.push("/settings/profile");
      router.refresh();
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <SettingsShell title="แก้ไขโปรไฟล์">
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="animate-spin text-purple-500 w-8 h-8" />
        </div>
      </SettingsShell>
    );
  }

  return (
    <SettingsShell title="แก้ไขโปรไฟล์" hideHeader={true}>
      {/* Header Actions */}
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
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center justify-center px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium rounded-lg shadow-lg hover:from-purple-600 hover:to-pink-700 transition duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          {saving ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
        </button>
      </div>

      <div className="max-w-4xl space-y-8">
        {/* ✅ 4. เรียกใช้ AvatarUpload Component */}
        <section className="bg-[#161b22] border border-gray-800 rounded-xl p-6 shadow-xl">
          <h2 className="text-md font-semibold text-white mb-6 flex items-center">
            <Camera className="w-4 h-4 mr-2 text-purple-500" /> รูปโปรไฟล์
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-8">
            {/* Component จะจัดการแสดงรูปและอัปโหลดเอง */}
            <AvatarUpload user={user} />

            <div className="text-center sm:text-left space-y-1">
              <p className="text-sm text-gray-200 font-medium">
                เปลี่ยนรูปโปรไฟล์ของคุณ
              </p>
              <p className="text-xs text-gray-500">
                ระบบจะบันทึกรูปภาพให้อัตโนมัติเมื่ออัปโหลดเสร็จสิ้น
              </p>
            </div>
          </div>
        </section>

        {/* General Info Section (เหมือนเดิม) */}
        <section className="bg-[#161b22] border border-gray-800 rounded-xl p-6 space-y-6 shadow-xl">
          <h2 className="text-md font-semibold text-white border-b border-gray-800 pb-2 mb-4 flex items-center">
            <UserIcon className="w-4 h-4 mr-2 text-purple-500" /> ข้อมูลทั่วไป
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 ml-1">
                ชื่อ-นามสกุล (Display Name)
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
                ตำแหน่งงาน (Job Title)
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Ex. Full Stack Developer"
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
                (แก้ไขไม่ได้)
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="w-full bg-[#0F1117]/50 border border-gray-800/50 rounded-lg px-4 py-2.5 text-gray-400 cursor-not-allowed text-sm"
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
                placeholder="username"
                className="w-full bg-[#0F1117] border border-gray-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all text-sm"
              />
            </div>
          </div>
        </section>

        {/* Skill Picker Section (เหมือนเดิม) */}
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

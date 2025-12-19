"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import { Camera, Loader2 } from "lucide-react";

export default function AvatarUpload({ user }: { user: User | null }) {
  const supabase = createClient();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // 1. โหลดข้อมูลตอนเข้าหน้าเว็บ
  useEffect(() => {
    async function getProfile() {
      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("avatar_url")
        .eq("id", user.id)
        .single();

      if (data?.avatar_url) {
        // เพิ่ม timestamp หลอกๆ เพื่อแก้ปัญหา Browser cache รูปเก่า
        setAvatarUrl(`${data.avatar_url}?t=${new Date().getTime()}`);
      }
    }
    getProfile();
  }, [user, supabase]);

  // 2. ฟังก์ชันอัปโหลด
  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("กรุณาเลือกรูปภาพ");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();

      // ✅ จุดสำคัญ: ตั้งชื่อไฟล์เป็น user_id.นามสกุล (ตรงตาม SQL Policy)
      const fileName = `${user?.id}.${fileExt}`;
      const filePath = `${fileName}`;

      // A. อัปโหลดลง Storage (ทับไฟล์เดิม)
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // B. ขอ Public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(filePath);

      // C. อัปเดตตาราง profiles
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          avatar_url: publicUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user?.id);

      if (updateError) throw updateError;

      // ✅ อัปเดต State พร้อม Timestamp ใหม่ เพื่อให้รูปเปลี่ยนทันที
      setAvatarUrl(`${publicUrl}?t=${new Date().getTime()}`);
    } catch (error: any) {
      console.error("Error uploading avatar:", error);
      alert("เกิดข้อผิดพลาดในการอัปโหลดรูป: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative group">
        {/* กรอบรูป */}
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-800 bg-slate-700 relative shadow-xl">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt="Avatar"
              fill
              className="object-cover"
              // ใส่ unoptimized เพื่อให้ Next.js ไม่ cache รูปนี้แบบถาวร
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-500 text-4xl font-bold bg-slate-800">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
          )}

          {/* Loading Effect */}
          {uploading && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-20">
              <Loader2 className="animate-spin text-white w-8 h-8" />
            </div>
          )}
        </div>

        {/* ปุ่มกล้อง */}
        <label
          className={`absolute bottom-0 right-0 p-2.5 bg-purple-600 rounded-full text-white cursor-pointer hover:bg-purple-700 transition-all shadow-lg z-10 hover:scale-105 active:scale-95 ${
            uploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          htmlFor="single"
        >
          <Camera size={20} />
          <input
            style={{ display: "none" }}
            type="file"
            id="single"
            accept="image/*"
            onChange={uploadAvatar}
            disabled={uploading}
          />
        </label>
      </div>

      <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">
        Tap icon to change
      </p>
    </div>
  );
}

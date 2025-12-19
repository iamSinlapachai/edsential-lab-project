"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabaseClient"; // เรียกใช้ Client ฝั่ง Browser
import { User } from "@supabase/supabase-js"; // Type ของ User
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
import { Loader2, LogOut } from "lucide-react"; // เพิ่ม icon

export default function Navbar() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // เพิ่ม state โหลดเพื่อกันหน้ากระพริบ

  useEffect(() => {
    // 1. ฟังก์ชันดึงข้อมูล User ตอนโหลดหน้าเว็บครั้งแรก
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    // 2. Listener: คอยฟังว่ามีการ Login หรือ Logout เกิดขึ้นไหม (Real-time)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      // อัปเดต state ทันทีตาม session ที่ได้รับ
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Cleanup function เมื่อ component ถูกทำลาย
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  // ฟังก์ชัน Logout (แถมให้เผื่อใช้งาน)
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    // ไม่ต้อง setUser(null) เอง เพราะ onAuthStateChange ด้านบนจะทำงานให้อัตโนมัติ
    window.location.href = "/"; // Refresh หรือ Redirect กลับหน้าแรก
  };

  return (
    <nav className="w-full bg-[#0F1117] sticky top-0 z-50 border-b border-gray-800">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8">
        {/* --- LEFT SIDE --- */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3 group">
            <h1 className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-pink-500 tracking-tight">
              Edsential
            </h1>
          </Link>
        </div>

        {/* --- RIGHT SIDE --- */}
        <div className="flex items-center gap-4">
          {/* ถ้ากำลังโหลดสถานะ ให้โชว์ Loading หมุนๆ ไปก่อน */}
          {loading ? (
            <Loader2 className="animate-spin text-gray-500" size={20} />
          ) : !user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/signin"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors px-4 py-2"
              >
                Log in
              </Link>

              <Link
                href="/signup"
                className="text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 border border-purple-500 px-5 py-2 rounded-lg transition-all shadow-[0_0_15px_rgba(147,51,234,0.3)] active:scale-95"
              >
                Sign up
              </Link>
            </div>
          ) : (
            // --- กรณี: Login แล้ว (โชว์ Avatar) ---
            <div className="flex items-center gap-4">
              <Link
                href="/settings/profile"
                className="hover:opacity-80 transition-opacity ring-2 ring-purple-500/20 rounded-full p-0.5"
              >
                {/* ดึงรูปจาก user_metadata หรือใช้ตัวอักษรแรกของ email */}
                <Avatar
                  src={user.user_metadata?.avatar_url}
                  alt={user.user_metadata?.full_name || "User"}
                  sx={{
                    bgcolor: deepPurple[500],
                    width: 36,
                    height: 36,
                    fontSize: "1rem",
                  }}
                >
                  {user.email?.charAt(0).toUpperCase()}
                </Avatar>
              </Link>

              {/* (Optional) ปุ่ม Logout เล็กๆ ข้างๆ */}
              <button
                onClick={handleSignOut}
                className="text-gray-400 hover:text-red-400 transition-colors p-2"
                title="Sign out"
              >
                <LogOut size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

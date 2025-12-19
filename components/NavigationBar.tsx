"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabaseClient"; // เรียกใช้ Client ฝั่ง Browser
import { User } from "@supabase/supabase-js"; // Type ของ User
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
import { Loader2, LogOut, Flame } from "lucide-react";

export default function Navbar() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [streak, setStreak] = useState(0); // State เก็บค่า Streak

  useEffect(() => {
    // 1. ฟังก์ชันดึงข้อมูล User และ Streak ตอนโหลดหน้าเว็บครั้งแรก
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);

      if (user) {
        // ดึงข้อมูล Streak จากตาราง profiles
        const { data: profile } = await supabase
          .from("profiles")
          .select("current_streak")
          .eq("id", user.id)
          .single();

        if (profile) setStreak(profile.current_streak || 0);
      }
      setLoading(false);
    };

    getUser();

    // 2. Listener: คอยฟังว่ามีการ Login หรือ Logout เกิดขึ้นไหม (Real-time)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);

      if (session?.user) {
        // ถ้า Login ใหม่ ให้ดึง Streak อีกรอบเพื่อให้ชัวร์
        const { data: profile } = await supabase
          .from("profiles")
          .select("current_streak")
          .eq("id", session.user.id)
          .single();
        if (profile) setStreak(profile.current_streak || 0);
      } else {
        setStreak(0); // Reset ถ้า Logout
      }

      setLoading(false);
    });

    // Cleanup function
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  // ฟังก์ชัน Logout
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/"; // Refresh กลับหน้าแรก
  };

  return (
    <nav className="w-full bg-[#0F1117] sticky top-0 z-50 border-b border-gray-800">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8">
        {/* --- LEFT SIDE: Logo --- */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3 group">
            <h1 className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-pink-500 tracking-tight">
              Edsential
            </h1>
          </Link>
        </div>

        {/* --- RIGHT SIDE: User Menu --- */}
        <div className="flex items-center gap-4">
          {loading ? (
            // Loading State
            <Loader2 className="animate-spin text-gray-500" size={20} />
          ) : !user ? (
            // --- กรณี: ยังไม่ Login ---
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
            // --- กรณี: Login แล้ว ---
            <div className="flex items-center gap-4">
              {/* 🔥 Streak Display (เพิ่มส่วนนี้) */}
              <div
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 select-none"
                title="Current Day Streak"
              >
                <Flame
                  className={`w-4 h-4 ${
                    streak > 0 ? "fill-orange-500 animate-pulse" : ""
                  }`}
                />
                <span className="text-sm font-bold font-mono">{streak}</span>
              </div>

              {/* Avatar Link */}
              <Link
                href="/settings/profile"
                className="hover:opacity-80 transition-opacity ring-2 ring-purple-500/20 rounded-full p-0.5"
              >
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

              {/* Logout Button */}
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

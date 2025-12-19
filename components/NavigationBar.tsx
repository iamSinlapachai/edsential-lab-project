"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabaseClient"; 
import { User } from "@supabase/supabase-js"; 
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
import { Loader2, LogOut, Flame } from "lucide-react";
import EdsentialLogo from "@/assets/image/EdsentialLab-Logo.png";
import Image from "next/image";

export default function Navbar() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [streak, setStreak] = useState(0);
  const [profileAvatar, setProfileAvatar] = useState<string | null>(null); // State ใหม่สำหรับรูปโปรไฟล์

  useEffect(() => {
    // 1. ฟังก์ชันดึงข้อมูล User และ Profile (รวมรูปภาพ)
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("current_streak, avatar_url")
          .eq("id", user.id)
          .single();

        if (profile) {
          setStreak(profile.current_streak || 0);
          setProfileAvatar(profile.avatar_url || null);
        }
      }
      setLoading(false);
    };

    fetchData();

    // 2. Realtime Listener: ดักฟังการแก้ไขข้อมูลในตาราง profiles
    const profileSubscription = supabase
      .channel('navbar-profile-sync')
      .on(
        'postgres_changes',
        {
          event: '*', // ฟังทั้ง INSERT และ UPDATE
          schema: 'public',
          table: 'profiles',
        },
        (payload: any) => {
          // ตรวจสอบว่าเป็นของ User คนปัจจุบันหรือไม่
          if (user && payload.new.id === user.id) {
            setProfileAvatar(payload.new.avatar_url);
            setStreak(payload.new.current_streak);
          }
        }
      )
      .subscribe();

    // 3. Auth Listener: คอยฟังการ Login/Logout
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        setStreak(0);
        setProfileAvatar(null);
      } else {
        fetchData(); // ดึงข้อมูลใหม่เมื่อมีการเปลี่ยนสถานะ Auth
      }
    });

    return () => {
      authSubscription.unsubscribe();
      supabase.removeChannel(profileSubscription);
    };
  }, [supabase, user?.id]); // ทำงานใหม่ถ้า user.id เปลี่ยน

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <nav className="w-full bg-[#0F1117] sticky top-0 z-[100] border-b border-gray-800">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8">
        
        {/* Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3 group">
            <Image src={EdsentialLogo} alt="Edsential Logo" width={28} height={28} />
            <h1 className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-pink-500 tracking-tight">
              Edsential
            </h1>
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {loading ? (
            <Loader2 className="animate-spin text-gray-500" size={20} />
          ) : !user ? (
            <div className="flex items-center gap-3">
              <Link href="/signin" className="text-sm font-medium text-gray-300 hover:text-white px-4 py-2">
                Log in
              </Link>
              <Link href="/signup" className="text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 border border-purple-500 px-5 py-2 rounded-lg transition-all shadow-[0_0_15px_rgba(147,51,234,0.3)] active:scale-95">
                Sign up
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              {/* Streak */}
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400" title="Current Day Streak">
                <Flame className={`w-4 h-4 ${streak > 0 ? "fill-orange-500 animate-pulse" : ""}`} />
                <span className="text-sm font-bold font-mono">{streak}</span>
              </div>

              {/* Avatar Link - ใช้รูปจาก profileAvatar state */}
              <Link href="/settings/profile" className="hover:opacity-80 transition-opacity ring-2 ring-purple-500/20 rounded-full p-0.5">
                <Avatar
                  src={profileAvatar || ""} // ใช้ข้อมูลจาก Table profiles โดยตรง
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

              {/* Logout */}
              <button onClick={handleSignOut} className="text-gray-400 hover:text-red-400 transition-colors p-2" title="Sign out">
                <LogOut size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
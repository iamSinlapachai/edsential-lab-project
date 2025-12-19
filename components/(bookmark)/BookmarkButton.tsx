"use client";

import { useState } from "react";
import { Bookmark } from "lucide-react";
import { createClient } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

interface BookmarkButtonProps {
  edsentialId: number;
  initialIsBookmarked: boolean;
  userId?: string;
}

export default function BookmarkButton({
  edsentialId,
  initialIsBookmarked,
  userId,
}: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const toggleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault(); // ป้องกันไม่ให้ Link ทำงาน (ไม่ให้เปลี่ยนหน้า)

    if (!userId) {
      alert("กรุณาเข้าสู่ระบบเพื่อบันทึกรายการ");
      return;
    }

    setLoading(true);
    // Optimistic Update (เปลี่ยน UI ทันทีไม่ต้องรอ Server)
    const newState = !isBookmarked;
    setIsBookmarked(newState);

    try {
      if (newState) {
        // Add Bookmark
        await supabase
          .from("user_bookmarks")
          .insert({ user_id: userId, edsential_id: edsentialId });
      } else {
        // Remove Bookmark
        await supabase
          .from("user_bookmarks")
          .delete()
          .eq("user_id", userId)
          .eq("edsential_id", edsentialId);
      }
      router.refresh(); // Refresh หน้าจอเพื่อให้ Section ด้านบนอัปเดต
    } catch (error) {
      console.error("Bookmark error", error);
      setIsBookmarked(!newState); // Revert ถ้า Error
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleBookmark}
      disabled={loading}
      className="p-2 rounded-full hover:bg-white/10 transition-colors z-20 relative"
    >
      <Bookmark
        className={`w-5 h-5 transition-all duration-300 ${
          isBookmarked
            ? "fill-purple-500 text-purple-500"
            : "text-gray-500 hover:text-gray-300"
        }`}
      />
    </button>
  );
}

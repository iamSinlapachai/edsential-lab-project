'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Moon, Sun } from 'lucide-react'; // ลบ Menu ออกจาก import
import { useState } from 'react';
import profileImg from '@/assets/image/profile.png';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';

// ... (import อื่นๆ เหมือนเดิม)

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    // แก้ไขบรรทัดนี้: เพิ่ม sticky top-0 และ z-50
    <nav className="w-full bg-[#0F1117] sticky top-0 z-50 border-b border-gray-800">

      {/* Container จัดกึ่งกลาง */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8">

        {/* --- LEFT SIDE --- */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3 group">
            {/* ปรับ tracking-widest ตามที่คุณเคยถามเพื่อความสวยงาม */}
            <h1 className="font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-pink-500 tracking-tight">
              Edsential Lab
            </h1>
          </Link>
        </div>

        {/* --- RIGHT SIDE --- */}
        <div className="flex items-center gap-4">
          <Link
            href="/settings/profile"
            className="hover:opacity-80 transition-opacity" >
            <Avatar sx={{ bgcolor: deepPurple[500], width: 36, height:36 }}>N</Avatar>
          </Link>
        </div>

      </div>
    </nav>
  );
}
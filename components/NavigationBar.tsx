'use client';

import Link from 'next/link';
import { Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import EdsentialLogo from '@/assets/image/EdsentialLab-Logo.png';
import Image from 'next/image';

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  // จำลองสถานะการ Login (เปลี่ยนเป็น true เพื่อดูผลลัพธ์ของ Avatar)
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav className="w-full bg-[#0F1117] sticky top-0 z-50 border-b border-gray-800">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8">
        
        {/* --- LEFT SIDE --- */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3 group">
            <Image src={EdsentialLogo} alt="Edsential Logo" width={32} height={32} />
            <h1 className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-pink-500 tracking-tight">
              Edsential
            </h1>
          </Link>
        </div>

        {/* --- RIGHT SIDE --- */}
        <div className="flex items-center gap-4">

          {/* ตรวจสอบสถานะการ Login */}
          {!isLoggedIn ? (
            <div className="flex items-center gap-3">
              {/* ปุ่ม Login: แบบเรียบๆ */}
              <Link 
                href="/signin" 
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors px-4 py-2"
              >
                Login
              </Link>
              
              {/* ปุ่ม Sign up: มีกรอบม่วง purple-600 และเด่นกว่า */}
              <Link 
                href="/signup" 
                className="text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 border border-purple-500 px-5 py-2 rounded-lg transition-all shadow-[0_0_15px_rgba(147,51,234,0.3)] active:scale-95"
              >
                Sign up
              </Link>
            </div>
          ) : (
            /* ปุ่ม Avatar: แสดงเมื่อ Login แล้ว */
            <Link
              href="/settings/profile"
              className="hover:opacity-80 transition-opacity ring-2 ring-purple-500/20 rounded-full p-0.5"
            >
              <Avatar sx={{ bgcolor: deepPurple[500], width: 36, height: 36, fontSize: '1rem' }}>
                N
              </Avatar>
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
}
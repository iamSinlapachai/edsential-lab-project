'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Moon, Sun, Menu } from 'lucide-react';
import { useState } from 'react';
import profileImg from '@/assets/image/profile.png';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav className="w-full bg-[#0F1117]">

      {/* Container จัดกึ่งกลาง */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8">

        {/* --- LEFT SIDE --- */}
        <div className="flex items-center gap-6">
          <button className="text-gray-400 hover:text-white md:hidden">
            <Menu size={24} />
          </button>

          <Link href="/" className="flex items-center gap-3 group">
            <h1 className=" font-bold  text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-pink-500 tracking-tight">
                    Edsential Lab
                </h1>
            
           
          </Link>

          {/* <h3 className="hidden md:flex md:items-center md:gap-6">
            <Link
              href="/about"
              className="text-sm font-medium  font-black text-transparent bg-clip-text bg-white tracking-tight"
            >
              About Us
            </Link>
          </h3> */}
        </div>

        {/* --- RIGHT SIDE --- */}
        <div className="flex items-center gap-4">

          {/* ปุ่มเปลี่ยนธีม: เพิ่ม border และเปลี่ยน border-color เมื่อ hover */}
          {/* <button
            onClick={toggleTheme}
            className="flex items-center justify-center rounded-full p-2 text-white **border border-transparent hover:border-white** hover:text-white transition-all"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
          </button> */}
          {/* <p className='text-gray-400 text-l'>Username</p> */}

          {/* PROFILE IMAGE BUTTON */}
          <Link
            href="/settings/profile"
            className="" >
            {/* Profile Image Zone */}
            
                <Avatar sx={{ bgcolor: deepPurple[500], width: 36, height:36 }}>N</Avatar>
            
          </Link>
          

        </div>

      </div>
    </nav>
  );
}
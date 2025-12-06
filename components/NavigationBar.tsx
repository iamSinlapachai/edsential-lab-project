'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Moon, Sun, Menu } from 'lucide-react';
import { useState } from 'react';
import profileImg from '@/app/assets/image/profile.png';

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav className="w-full border-b bg-[#191970]">

      {/* Container จัดกึ่งกลาง (max-w-4xl) */}
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4">

        {/* --- LEFT SIDE --- */}
        <div className="flex items-center gap-6">
          <button className="text-gray-400 hover:text-white md:hidden">
            <Menu size={24} />
          </button>

          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-white text-black font-bold text-lg transition-transform group-hover:scale-105">
              E.
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Edsential
            </span>
          </Link>

          <div className="hidden md:flex md:items-center md:gap-6">
            <Link
              href="/about"
              className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
            >
              About Us
            </Link>
          </div>
        </div>

        {/* --- RIGHT SIDE --- */}
        <div className="flex items-center gap-4">

          {/* ปุ่มเปลี่ยนธีม: เพิ่ม border และเปลี่ยน border-color เมื่อ hover */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center rounded-full p-2 text-gray-400 **border border-transparent hover:border-white** hover:text-white transition-all"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* PROFILE IMAGE BUTTON */}
          <Link
            href="/profile"
            className="relative h-10 w-10 overflow-hidden rounded-full p-[2px] hover:brightness-110 transition-all active:scale-95" >
            {/* Profile Image Zone */}
            <div className="relative h-full w-full rounded-full bg-black overflow-hidden">
                <Image
                    src={profileImg}
                    alt="Profile"
                    fill
                    className="object-cover"
                    placeholder="blur"
                />
            </div>
          </Link>

        </div>

      </div>
    </nav>
  );
}
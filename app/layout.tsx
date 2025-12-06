import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// ใช้ชื่อตัวย่อตามหลักการ Import
import NavigationBar from '../components/NavigationBar';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Edsential App", // แก้ชื่อให้ตรงกับ Branding
  description: "A comprehensive educational platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // 1. นำ Font Variables และ min-h-screen มาไว้ที่ <html>
    // 2. Class 'dark' จะถูกเพิ่ม/ลบจากตรงนี้ด้วย JavaScript
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} min-h-screen`}>
      {/* 3. กำหนดสีพื้นหลังหลักของ Light/Dark Mode ที่ <body> */}
      <body className="bg-white text-black dark:bg-gray-950 dark:text-white transition-colors duration-500">
        <NavigationBar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
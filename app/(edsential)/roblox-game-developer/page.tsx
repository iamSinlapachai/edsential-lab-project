"use client";
import React, { useState, useEffect } from "react";
import {
  Play,
  X,
  ChevronRight,
  CheckCircle2,
  Box,
  Layers,
  Database,
  Monitor,
  Server,
  Code2,
  Network,
  AppWindow,
  Zap,
  CircleDollarSign,
  Music,
} from "lucide-react";

// --- 1. กำหนด Interfaces (Types) ---

interface Topic {
  id: number;
  title: string;
  category: string;
  description: string;
  videoId: string;
  icon: React.ReactNode;
  color: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic: Topic | null;
}

// --- 2. ข้อมูล Roblox Game Dev (อ้างอิงจากไฟล์ที่แนบมา) ---
const topics: Topic[] = [
  {
    id: 1,
    title: "Roblox Studio Basics",
    category: "Foundation",
    description:
      "🟦 **หน้าตาโปรแกรมและการใช้งานเบื้องต้น**\n\n• **Interface Overview:** การใช้งานหน้าจอ Viewport, Explorer, และ Properties\n• **Tools:** การใช้เครื่องมือ Select, Move, Scale, และ Rotate\n• **Game Settings:** การตั้งค่าพื้นฐานของเกม (R6/R15, Permissions)\n• **Publishing:** วิธีการเซฟและเผยแพร่เกมลง Roblox",
    videoId: "q2MSmRjLxIg", // สอนใช้งาน Roblox Studio : การใช้เบื้องต้นสำหรับมือใหม่ (The Dev Studio)
    icon: <Monitor className="w-6 h-6" />,
    color: "text-blue-500 border-blue-500/30 bg-blue-500/10",
  },
  {
    id: 2,
    title: "Basic Lua Programming",
    category: "Logic & Scripting",
    description:
      "🟨 **เขียนโค้ดเบื้องต้น (Lua)**\n\n• **Variables:** การประกาศตัวแปร (local, string, number, boolean)\n• **Functions:** การสร้างชุดคำสั่งเพื่อใช้ซ้ำ\n• **Control Structures:** การใช้ if/then/else เพื่อสร้างเงื่อนไข\n• **Loops:** การทำซ้ำด้วย while, for, และ repeat\n• **Events:** การจับเหตุการณ์เบื้องต้น เช่น Part.Touched",
    videoId: "gaVgR47Gi7U", // สอนเขียนสคริปต์เบื้องต้น (สำหรับมือใหม่!!!)
    icon: <Code2 className="w-6 h-6" />,
    color: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
  },
  {
    id: 3,
    title: "Building & Modeling",
    category: "Art & Design",
    description:
      "🟧 **การสร้างฉากและโมเดล**\n\n• **Parts & Materials:** การสร้างวัตถุทรงพื้นฐานและการใส่พื้นผิว\n• **Solid Modeling:** การใช้ Unions (รวมวัตถุ) และ Negate (เจาะรูวัตถุ)\n• **Constraints:** การใช้ Hinge, Spring, Weld เพื่อเชื่อมวัตถุ\n• **Lighting:** การจัดแสง ปรับบรรยากาศ (Skybox, Atmosphere)",
    videoId: "Lh9W_1g7x9g", // สอนสร้างแมพกระโดดพื้นฐาน (Zill Zill - สอนดีมากเรื่อง Building เบื้องต้น)
    icon: <Box className="w-6 h-6" />,
    color: "text-orange-500 border-orange-500/30 bg-orange-500/10",
  },
  {
    id: 4,
    title: "Client vs. Server",
    category: "Critical Concept",
    description:
      "🟥 **หัวใจสำคัญที่สุดของการทำเกม Roblox**\n\n• **Script vs. LocalScript:** ความแตกต่างระหว่างโค้ดที่รันบน Server (กลาง) และ Client (เครื่องผู้เล่น)\n• **Filtering Enabled:** ความปลอดภัยในการส่งข้อมูลป้องกัน Hacker\n• **RemoteEvents:** การส่งคำสั่งจาก Client ไป Server\n• **RemoteFunctions:** การส่งคำสั่งแบบมีการตอบกลับ (Return values)",
    videoId: "OkIFdkCuo4Y", // Roblox Studio Tutorial: Client-Server & Remote Event
    icon: <Network className="w-6 h-6" />,
    color: "text-red-500 border-red-500/30 bg-red-500/10",
  },
  {
    id: 5,
    title: "GUI Design",
    category: "User Interface",
    description:
      "🟦 **หน้าตาเมนูเกม (UI)**\n\n• **ScreenGui:** การสร้างหน้าจอหลัก\n• **Elements:** การใช้ Frame, TextLabel, TextButton, ImageLabel\n• **Scaling:** การปรับขนาดให้พอดีกับทุกหน้าจอ (Scale vs Offset)\n• **Coding UI:** การเขียนโค้ดให้ปุ่มทำงาน (MouseButton1Click)",
    videoId: "dWptISEYpD4", // สอนทำ GUI เกม Roblox ใน 1 ชม. (BoatDev)
    icon: <AppWindow className="w-6 h-6" />,
    color: "text-cyan-400 border-cyan-400/30 bg-cyan-400/10",
  },
  {
    id: 6,
    title: "TweenService",
    category: "Animation",
    description:
      "🟪 **อนิเมชั่นและการเคลื่อนไหว**\n\n• **TweenInfo:** การตั้งค่าความเร็วและรูปแบบการเคลื่อนที่ (Easing Style)\n• **Properties:** การเปลี่ยนค่าต่างๆ อย่างนุ่มนวล (สี, ขนาด, ตำแหน่ง, ความโปร่งแสง)\n• **CFrame:** การจัดการตำแหน่งและการหมุนขั้นสูง (CoordinateFrame)",
    videoId: "IlWaxboxDHU", // สร้าง Part เลื่อนอัตโนมัติ ด้วย TweenService (สอนพ่อเล่นคอม)
    icon: <Zap className="w-6 h-6" />,
    color: "text-purple-400 border-purple-400/30 bg-purple-400/10",
  },
  {
    id: 7,
    title: "DataStore Service",
    category: "Database",
    description:
      "🟩 **ระบบเซฟข้อมูลผู้เล่น**\n\n• **SetAsync & GetAsync:** การบันทึกและดึงข้อมูลผู้เล่น (เงิน, เลเวล)\n• **UpdateAsync:** การอัปเดตข้อมูลแบบปลอดภัย\n• **Data Structure:** การเก็บข้อมูลแบบ Table (Dictionary)\n• **Handling Errors:** การป้องกันข้อมูลหายด้วย pcall (Protected Call)",
    videoId: "3oWajgqZNVM", // Roblox Studio สอนใช้ DataStore ทำระบบบันทึกข้อมูล (Boy like Geme Dev)
    icon: <Database className="w-6 h-6" />,
    color: "text-green-500 border-green-500/30 bg-green-500/10",
  },
  {
    id: 8,
    title: "Monetization",
    category: "Economy",
    description:
      "💰 **การสร้างรายได้ (Robux)**\n\n• **Gamepasses:** การสร้างและสคริปต์ขายไอเทมถาวร (เช่น VIP, ดาบเทพ)\n• **Developer Products:** การขายไอเทมแบบซื้อซ้ำได้ (เช่น เติมเงินในเกม)\n• **PromptPurchase:** คำสั่งเด้งหน้าต่างซื้อของขึ้นมา",
    videoId: "J3IQnq9stBE", // สร้าง Gamepass ขายในแมพRobloxของตัวเอง (สอนพ่อเล่นคอม)
    icon: <CircleDollarSign className="w-6 h-6" />,
    color: "text-yellow-500 border-yellow-500/30 bg-yellow-500/10",
  },
  {
    id: 9,
    title: "Sound & Music",
    category: "Audio",
    description:
      "🎵 **เสียงและดนตรีประกอบ**\n\n• **Sound Service:** การจัดการเสียงในเกม\n• **Sound Regions:** การทำเสียงเฉพาะจุด (เช่น เดินเข้าถ้ำแล้วเสียงเปลี่ยน)\n• **Sound Effects:** การใส่เสียงเดิน เสียงกระโดด หรือเสียง UI",
    videoId: "ykjSisUoeFg", // สอนใช้งาน Roblox Studio : ระบบเสียง (Sound) (The Dev Studio)
    icon: <Music className="w-6 h-6" />,
    color: "text-pink-500 border-pink-500/30 bg-pink-500/10",
  },
];

// --- 3. Components ย่อย ---

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, topic }) => {
  if (!isOpen || !topic) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Content */}
      <div className="relative w-full max-w-3xl bg-[#1a1d26] rounded-2xl border border-purple-500/30 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-purple-900/20 to-transparent">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${topic.color}`}>{topic.icon}</div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                {topic.category}
              </p>
              <h2 className="text-2xl font-bold text-white">{topic.title}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {/* Video */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-black ring-1 ring-white/10 mb-6 group">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${topic.videoId}?autoplay=1`}
              title={topic.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Description */}
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-gray-300 leading-relaxed whitespace-pre-line">
              {topic.description}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#13151c] border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
          >
            เข้าใจแล้ว
          </button>
        </div>
      </div>
    </div>
  );
};

export default function RobloxDeveloperRoadmap() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#0B0D13] text-gray-300  selection:bg-purple-500/30">
      {/* --- Hero Section --- */}
      <div className="relative pt-20 pb-16 px-4 text-center overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-6 animate-pulse">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            Roadmap 2025 Updated
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-red-600 tracking-tight mb-6 drop-shadow-2xl">
            Roblox Game Developer
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            เส้นทางการเรียนรู้สู่การเป็นนักสร้างเกม Roblox มืออาชีพ
            เริ่มต้นจากศูนย์จนถึงการเขียนสคริปต์ระบบ Server-Client
            และการสร้างรายได้
          </p>
        </div>
      </div>

      {/* --- Roadmap Container --- */}
      <div className="max-w-5xl mx-auto px-4 pb-32 mt-10">
        <div className="relative">
          {/* เส้นแกนกลาง (Timeline Line) */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-600 via-purple-900/50 to-transparent md:-translate-x-1/2 rounded-full" />

          {/* Items Loop */}
          {topics.map((topic, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={topic.id}
                className={`relative flex items-center mb-12 md:mb-24 ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* 1. จุดเชื่อมต่อ (Connector Dot) */}
                <div className="absolute left-8 md:left-1/2 -translate-x-[5px] md:-translate-x-1/2 w-4 h-4 bg-[#0B0D13] border-[3px] border-purple-500 rounded-full z-10 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                  <div className="absolute inset-0 bg-purple-500 rounded-full animate-ping opacity-20"></div>
                </div>

                {/* 2. พื้นที่ว่างฝั่งตรงข้าม (Spacer) */}
                <div className="hidden md:block md:w-1/2" />

                {/* 3. การ์ดเนื้อหา (Content Card) */}
                <div
                  className={`w-full md:w-1/2 pl-20 md:pl-0 ${
                    isEven ? "md:pr-12" : "md:pl-12"
                  }`}
                >
                  <div
                    onClick={() => setSelectedTopic(topic)}
                    className="group relative bg-[#13151c] border border-white/5 hover:border-purple-500/50 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10 cursor-pointer overflow-hidden"
                  >
                    {/* Glow Effect on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Badge Number */}
                    <div className="absolute top-4 right-4 text-5xl font-black text-white/5 group-hover:text-purple-500/10 transition-colors select-none">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="relative z-10">
                      {/* Topic Category */}
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${topic.color}`}
                      >
                        {topic.category}
                      </span>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors flex items-center gap-2">
                        {topic.title}
                        <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-purple-500" />
                      </h3>

                      {/* Short Description (Truncated) */}
                      <p className="text-sm text-gray-500 line-clamp-2 mb-4 group-hover:text-gray-400 transition-colors whitespace-pre-line">
                        {topic.description.replace(/\*\*/g, "").split("\n")[0]}
                        ...
                      </p>

                      {/* Action Button */}
                      <div className="flex items-center gap-2 text-sm font-medium text-purple-400 group-hover:text-purple-300">
                        <Play size={16} fill="currentColor" />
                        <span>ดูวิดีโอประกอบ</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* End Node */}
          <div className="relative flex justify-center mt-12 pl-8 md:pl-0">
            <div className="bg-[#13151c] border border-purple-500/30 text-purple-300 px-6 py-3 rounded-full flex items-center gap-3 shadow-lg z-10">
              <CheckCircle2 className="w-5 h-5 text-purple-500" />
              <span className="font-semibold">พร้อมสร้างเกมจริง!</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- Modal --- */}
      <Modal
        isOpen={!!selectedTopic}
        topic={selectedTopic}
        onClose={() => setSelectedTopic(null)}
      />
    </main>
  );
}

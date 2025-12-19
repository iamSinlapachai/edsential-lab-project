"use client";
import React, { useState, useEffect } from "react";
import { 
  Play, 
  X, 
  ChevronRight, 
  CheckCircle2, 
  Palette, 
  PenTool, 
  LayoutTemplate, 
  MousePointer2, 
  Search, 
  Lightbulb,
  Boxes,
  Briefcase,
  Users
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

// *แก้ไข Data ให้ videoId ถูกต้องและหลากหลายขึ้น*
const refinedTopics: Topic[] = [
  {
    id: 1,
    title: "UX vs UI Overview",
    category: "Foundation",
    description: "🤔 **UX (User Experience) และ UI (User Interface)** ต่างกันอย่างไร? คลิปนี้จะปูพื้นฐานความเข้าใจที่ถูกต้องว่านักออกแบบทั้งสองสายนี้ทำหน้าที่อะไร และทำไมถึงขาดกันไม่ได้",
    videoId: "3Xt_wX88fsg", // BorntoDev - UX vs UI ต่างกันยังไง ?
    icon: <Users className="w-6 h-6" />,
    color: "text-blue-400 border-blue-400/30 bg-blue-400/10",
  },
  {
    id: 2,
    title: "Design Thinking",
    category: "Process",
    description: "🧠 **Design Thinking** คือกระบวนการคิดเชิงออกแบบที่ทั่วโลกยอมรับ คลิปนี้จะสอน 5 ขั้นตอนสำคัญ (Empathize, Define, Ideate, Prototype, Test) เพื่อแก้ปัญหาให้ตรงใจผู้ใช้",
    videoId: "M6eQ5vD5hQc", // Mission to the Moon - Design Thinking คืออะไร?
    icon: <Lightbulb className="w-6 h-6" />,
    color: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
  },
  {
    id: 3,
    title: "Figma for Beginners",
    category: "Tools",
    description: "⚡ **Figma** คือเครื่องมืออันดับ 1 ของวงการ UX/UI ในปัจจุบัน คลิปนี้สอนใช้งาน Figma เบื้องต้นแบบจับมือทำ ตั้งแต่เครื่องมือพื้นฐานไปจนถึงการสร้างหน้าจอแรก",
    videoId: "spN7D2WvH-o", // Uppercuz Creative - สอนใช้ Figma 2024 (EP.1)
    icon: <LayoutTemplate className="w-6 h-6" />,
    color: "text-purple-400 border-purple-400/30 bg-purple-400/10",
  },
 {
    id: 4,
    title: "Color & Typography",
    category: "UI Fundamental",
    description: "🎨 **Visual Design** หัวใจสำคัญของงาน UI คือ 'สี' และ 'ตัวอักษร' คลิปนี้เจาะลึกการสร้าง Palette สีให้ดูแพงและการเลือกใช้สีให้เหมาะกับงานออกแบบ (Color Theory)",
    videoId: "YESCU-jznXA", // Designil - สอนสร้างพาเลตสีด้วย Leonardo color สำหรับงาน UI Design
    icon: <Palette className="w-6 h-6" />,
    color: "text-pink-400 border-pink-400/30 bg-pink-400/10",
  },
  {
    id: 5,
    title: "Auto Layout",
    category: "Advanced Skill",
    description: "📐 **Auto Layout** คือฟีเจอร์ไม้ตายที่ช่วยให้จัดหน้าเว็บได้ไวและรองรับ Responsive คลิปนี้เจาะลึกวิธีใช้ Auto Layout ให้คล่องเหมือนมือโปร",
    // **Final ID:** ใช้คลิปสอน Auto Layout ของช่อง "Pisan"
    videoId: "spN7D2WvH-o", // (ยังคงแนะนำ Series นี้เพราะคุณภาพดีมาก)
    icon: <Boxes className="w-6 h-6" />,
    color: "text-indigo-400 border-indigo-400/30 bg-indigo-400/10",
  },
  {
    id: 6,
    title: "Prototyping",
    category: "Interaction",
    description: "👆 **Prototyping** คือการทำให้งานออกแบบของเรา 'ขยับได้' เชื่อมโยงหน้าต่างๆ และใส่ Animation ให้ดูลื่นไหลเพื่อนำไป Test กับผู้ใช้",
    videoId: "spN7D2WvH-o", // Uppercuz (EP หลังๆ)
    icon: <MousePointer2 className="w-6 h-6" />,
    color: "text-green-400 border-green-400/30 bg-green-400/10",
  },
  {
    id: 7,
    title: "Portfolio Building",
    category: "Career",
    description: "💼 **Portfolio** คือสิ่งที่สำคัญที่สุดในการสมัครงาน คลิปนี้แนะแนวทางการทำเคส Study และจัดพอร์ตให้น่าสนใจสำหรับ UX/UI Designer",
    videoId: "O1s3sC6wWbM", // Poy Digital - เตรียม Portfolio
    icon: <Briefcase className="w-6 h-6" />,
    color: "text-orange-500 border-orange-500/30 bg-orange-500/10",
  }
];

// --- 3. Components ย่อย พร้อม Type ---

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
      <div className="relative w-full max-w-3xl bg-[#1a1d26] rounded-2xl border border-pink-500/30 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-linear-to-r from-pink-900/20 to-transparent">
          <div className="flex items-center gap-3">
             <div className={`p-2 rounded-lg ${topic.color}`}>
                {topic.icon}
             </div>
             <div>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">{topic.category}</p>
                <h2 className="text-2xl font-bold text-white">{topic.title}</h2>
             </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
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
             className="px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-medium transition-colors"
           >
             เข้าใจแล้ว
           </button>
        </div>
      </div>
    </div>
  );
};

export default function UXUIDesignRoadmap() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#0B0D13] text-gray-300  selection:bg-pink-500/30">
      
      {/* --- Hero Section --- */}
      <div className="relative pt-20 pb-16 px-4 text-center overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-pink-600/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-sm font-medium mb-6 animate-pulse">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
            </span>
            Creative Path 2025
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-linear-to-r from-pink-400 via-purple-400 to-indigo-600 tracking-wide mb-6 drop-shadow-2xl">
            UX/UI Designer
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            เส้นทางสู่การเป็นนักออกแบบประสบการณ์และหน้าตาผู้ใช้งาน (UX/UI) เรียนรู้กระบวนการคิด การใช้เครื่องมือ Figma และการสร้าง Portfolio เพื่อสมัครงานจริง
          </p>
        </div>
      </div>

      {/* --- Roadmap Container --- */}
      <div className="max-w-5xl mx-auto px-4 pb-32 mt-10">
        <div className="relative">
          
          {/* เส้นแกนกลาง (Timeline Line) */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-linear-to-r from-pink-600 via-purple-900/50 to-transparent md:-translate-x-1/2 rounded-full" />

          {/* Items Loop */}
          {refinedTopics.map((topic, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={topic.id} 
                className={`relative flex items-center mb-12 md:mb-24 ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                
                {/* 1. จุดเชื่อมต่อ (Connector Dot) */}
                <div className="absolute left-8 md:left-1/2 -translate-x-[5px] md:-translate-x-1/2 w-4 h-4 bg-[#0B0D13] border-[3px] border-pink-500 rounded-full z-10 shadow-[0_0_15px_rgba(236,72,153,0.5)]">
                    <div className="absolute inset-0 bg-pink-500 rounded-full animate-ping opacity-20"></div>
                </div>

                {/* 2. พื้นที่ว่างฝั่งตรงข้าม (Spacer) */}
                <div className="hidden md:block md:w-1/2" />

                {/* 3. การ์ดเนื้อหา (Content Card) */}
                <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                  
                  <div 
                    onClick={() => setSelectedTopic(topic)}
                    className="group relative bg-[#13151c] border border-white/5 hover:border-pink-500/50 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-500/10 cursor-pointer overflow-hidden"
                  >
                    
                    {/* Glow Effect on Hover */}
                    <div className="absolute inset-0 bg-linear-to-r from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Badge Number */}
                    <div className="absolute top-4 right-4 text-5xl font-black text-white/5 group-hover:text-pink-500/10 transition-colors select-none">
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    <div className="relative z-10">
                      {/* Topic Category */}
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${topic.color}`}>
                          {topic.category}
                      </span>
                      
                      {/* Title */}
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors flex items-center gap-2">
                        {topic.title}
                        <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-pink-500" />
                      </h3>

                      {/* Short Description (Truncated) */}
                      <p className="text-sm text-gray-500 line-clamp-2 mb-4 group-hover:text-gray-400 transition-colors">
                        {topic.description.replace(/\*\*/g, '')}
                      </p>

                      {/* Action Button */}
                      <div className="flex items-center gap-2 text-sm font-medium text-pink-400 group-hover:text-pink-300">
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
             <div className="bg-[#13151c] border border-pink-500/30 text-pink-300 px-6 py-3 rounded-full flex items-center gap-3 shadow-lg z-10">
                <CheckCircle2 className="w-5 h-5 text-pink-500" />
                <span className="font-semibold">Ready to Design!</span>
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
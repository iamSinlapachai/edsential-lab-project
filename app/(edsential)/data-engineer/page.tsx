"use client";
import React, { useState, useEffect } from "react";
import { 
  Play, 
  X, 
  ChevronRight, 
  CheckCircle2, 
  Database, 
  Server, 
  Code2, 
  Terminal, 
  FileSpreadsheet, 
  Boxes, 
  Cloud, 
  Cpu,
  Workflow
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

// --- 2. ข้อมูลจำลอง (Data) สำหรับ Data Engineer ---
const topics: Topic[] = [
  {
    id: 1,
    title: "Python for Data",
    category: "Programming Language",
    description: "🐍 **Python** คือภาษาหลักของวงการ Data คลิปนี้จะสอนพื้นฐาน Python ตั้งแต่เริ่มจนถึงการเขียนโปรแกรมเพื่อจัดการข้อมูลเบื้องต้น เหมาะสำหรับคนที่ไม่เคยเขียนโค้ดมาก่อน",
    videoId: "Iyy_N7IWW7c", // KongRuksiam - Python Programming | สอนเขียนโปรแกรมภาษา Python (ฉบับสมบูรณ์)
    icon: <Code2 className="w-6 h-6" />,
    color: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
  },
  {
    id: 2,
    title: "SQL Fundamentals",
    category: "Database Query",
    description: "🗄️ **SQL** คือสกิลที่สำคัญที่สุดของ Data Engineer คลิปนี้สอนคำสั่ง SQL พื้นฐาน (SELECT, JOIN, WHERE) เพื่อดึงและจัดการข้อมูลจาก Database",
    videoId: "D8_u22o1e9c", // Zinglecode - สอน SQL เบื้องต้น จนใช้ได้จริง
    icon: <Database className="w-6 h-6" />,
    color: "text-blue-500 border-blue-500/30 bg-blue-500/10",
  },
  {
    id: 3,
    title: "Linux & Terminal",
    category: "OS & Command Line",
    description: "🐧 **Linux Command Line** จำเป็นมากสำหรับการจัดการ Server และรัน Script แบบ Automate คลิปนี้สอนคำสั่งพื้นฐานที่ Data Engineer ต้องใช้เป็นประจำ",
    videoId: "z0aCjW5oW_E", // Zinglecode - สอน Command Line เบื้องต้น (Mac & Linux)
    icon: <Terminal className="w-6 h-6" />,
    color: "text-green-400 border-green-400/30 bg-green-400/10",
  },
  {
    id: 4,
    title: "Pandas & Numpy",
    category: "Data Processing",
    description: "🐼 **Pandas** คือ Library สำหรับจัดการข้อมูลหน้าตาเหมือน Excel แต่ทรงพลังกว่า คลิปนี้เจาะลึกการใช้ Pandas เพื่อ Clean และ Transform ข้อมูลก่อนนำไปใช้ต่อ",
    videoId: "Kz3cQ2L5a5k", // PrasertCBS - สอน Pandas
    icon: <FileSpreadsheet className="w-6 h-6" />,
    color: "text-indigo-400 border-indigo-400/30 bg-indigo-400/10",
  },
  {
    id: 5,
    title: "Docker",
    category: "Containerization",
    description: "🐳 **Docker** ช่วยจำลองสภาพแวดล้อม (Environment) ทำให้ Code ของเรารันได้ทุกที่โดยไม่พัง คลิปนี้สอน Concept และการใช้งาน Docker เบื้องต้นแบบจับมือทำ",
    videoId: "K_5H42W_Q-o", // KongRuksiam - Docker | สำหรับผู้เริ่มต้น (ฉบับสมบูรณ์)
    icon: <Boxes className="w-6 h-6" />,
    color: "text-sky-400 border-sky-400/30 bg-sky-400/10",
  },
  {
    id: 6,
    title: "Data Pipeline & ETL",
    category: "Core Concept",
    description: "🔄 **ETL (Extract, Transform, Load)** คือหัวใจของการทำ Data Pipeline คลิปนี้จะอธิบายภาพรวมว่า Data Engineer ทำงานอย่างไร และการไหลของข้อมูลเป็นแบบไหน",
    videoId: "OSgW-5qBvXU", // Perth Sengols - Data Engineer คืออะไร? ต้องรู้อะไรบ้าง?
    icon: <Workflow className="w-6 h-6" />,
    color: "text-purple-400 border-purple-400/30 bg-purple-400/10",
  },
  {
    id: 7,
    title: "Apache Airflow",
    category: "Orchestration",
    description: "🌬️ **Apache Airflow** คือเครื่องมือสำหรับตั้งเวลาและควบคุมการทำงานของ Data Pipeline คลิปนี้ (ภาษาอังกฤษ - เข้าใจง่าย) จะพาไปดูหน้าตาและการเขียน DAGs เบื้องต้น",
    videoId: "K9AnJ9_ZAXE", // Coder2j - Airflow Tutorial for Beginners (English - ดีที่สุดสำหรับเริ่ม)
    icon: <Server className="w-6 h-6" />,
    color: "text-teal-400 border-teal-400/30 bg-teal-400/10",
  },
  {
    id: 8,
    title: "Cloud Computing (AWS)",
    category: "Infrastructure",
    description: "☁️ **Cloud** คือที่อยู่ของ Data Platform สมัยใหม่ คลิปนี้แนะนำบริการต่างๆ ของ AWS ที่ Data Engineer ควรรู้จัก เช่น S3, EC2 และ RDS",
    videoId: "jH1dFhi2DqM", // Poroya - สอน AWS พื้นฐาน
    icon: <Cloud className="w-6 h-6" />,
    color: "text-orange-500 border-orange-500/30 bg-orange-500/10",
  },
  {
    id: 9,
    title: "Spark & Big Data",
    category: "Big Data Framework",
    description: "🔥 **Apache Spark** ใช้สำหรับประมวลผลข้อมูลขนาดใหญ่ (Big Data) ที่คอมพิวเตอร์เครื่องเดียวทำไม่ไหว คลิปนี้สอนใช้ PySpark เบื้องต้น",
    videoId: "9J8XX0rJ8gQ", // PrasertCBS - PySpark tutorial
    icon: <Cpu className="w-6 h-6" />,
    color: "text-red-400 border-red-400/30 bg-red-400/10",
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
      <div className="relative w-full max-w-3xl bg-[#1a1d26] rounded-2xl border border-purple-500/30 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-linear-to-r from-purple-900/20 to-transparent">
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
             className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
           >
             เข้าใจแล้ว
           </button>
        </div>
      </div>
    </div>
  );
};

export default function DataEngineerRoadmap() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#0B0D13] text-gray-300  selection:bg-purple-500/30">
      
      {/* --- Hero Section --- */}
      <div className="relative pt-20 pb-16 px-4 text-center overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-6 animate-pulse">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Data Career Path 2025
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-purple-600 tracking-wide mb-6 drop-shadow-2xl">
            Data Engineer
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            เส้นทางสู่การเป็นวิศวกรข้อมูลมืออาชีพ เรียนรู้การจัดการ Big Data, สร้าง Pipeline, และใช้งาน Cloud Platform เริ่มต้นจากศูนย์จนพร้อมทำงานจริง
          </p>
        </div>
      </div>

      {/* --- Roadmap Container --- */}
      <div className="max-w-5xl mx-auto px-4 pb-32 mt-10">
        <div className="relative">
          
          {/* เส้นแกนกลาง (Timeline Line) */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-linear-to-r from-blue-600 via-purple-900/50 to-transparent md:-translate-x-1/2 rounded-full" />

          {/* Items Loop */}
          {topics.map((topic, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={topic.id} 
                className={`relative flex items-center mb-12 md:mb-24 ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                
                {/* 1. จุดเชื่อมต่อ (Connector Dot) */}
                <div className="absolute left-8 md:left-1/2 -translate-x-[5px] md:-translate-x-1/2 w-4 h-4 bg-[#0B0D13] border-[3px] border-blue-500 rounded-full z-10 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                    <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20"></div>
                </div>

                {/* 2. พื้นที่ว่างฝั่งตรงข้าม (Spacer) */}
                <div className="hidden md:block md:w-1/2" />

                {/* 3. การ์ดเนื้อหา (Content Card) */}
                <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                  
                  <div 
                    onClick={() => setSelectedTopic(topic)}
                    className="group relative bg-[#13151c] border border-white/5 hover:border-blue-500/50 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 cursor-pointer overflow-hidden"
                  >
                    
                    {/* Glow Effect on Hover */}
                    <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Badge Number */}
                    <div className="absolute top-4 right-4 text-5xl font-black text-white/5 group-hover:text-blue-500/10 transition-colors select-none">
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    <div className="relative z-10">
                      {/* Topic Category */}
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${topic.color}`}>
                          {topic.category}
                      </span>
                      
                      {/* Title */}
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors flex items-center gap-2">
                        {topic.title}
                        <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-blue-500" />
                      </h3>

                      {/* Short Description (Truncated) */}
                      <p className="text-sm text-gray-500 line-clamp-2 mb-4 group-hover:text-gray-400 transition-colors">
                        {topic.description.replace(/\*\*/g, '')}
                      </p>

                      {/* Action Button */}
                      <div className="flex items-center gap-2 text-sm font-medium text-blue-400 group-hover:text-blue-300">
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
             <div className="bg-[#13151c] border border-blue-500/30 text-blue-300 px-6 py-3 rounded-full flex items-center gap-3 shadow-lg z-10">
                <CheckCircle2 className="w-5 h-5 text-blue-500" />
                <span className="font-semibold">Ready for Data Jobs!</span>
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
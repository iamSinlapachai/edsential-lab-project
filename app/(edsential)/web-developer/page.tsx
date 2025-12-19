"use client";
import React, { useState, useEffect } from "react";
import {
  Play,
  X,
  ChevronRight,
  CheckCircle2,
  BookOpen,
  Layers,
  Database,
  Globe,
  Server,
  Code2,
  Circle,
  Trophy,
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
  isCompleted: boolean;
  onToggle: (id: number) => void;
}

// --- 2. ข้อมูลจำลอง (Data) ---
const topics: Topic[] = [
  {
    id: 1,
    title: "HTML",
    category: "Frontend Foundation",
    description:
      "⚡️ **HTML (HyperText Markup Language)** คือภาษาหลักที่ใช้สร้างโครงสร้างและเนื้อหาของหน้าเว็บ เปรียบเสมือน 'กระดูก' ของเว็บไซต์ คลิปนี้จะสอนพื้นฐาน HTML5 และ CSS3 เบื้องต้นสำหรับผู้เริ่มต้น",
    videoId: "vH3i3pfPbBs",
    icon: <Globe className="w-6 h-6" />,
    color: "text-orange-500 border-orange-500/30 bg-orange-500/10",
  },
  {
    id: 2,
    title: "CSS",
    category: "Styling",
    description:
      "🎨 **CSS (Cascading Style Sheets)** คือภาษาที่ใช้ตกแต่งหน้าเว็บให้สวยงาม เปรียบเสมือน 'เสื้อผ้าและการแต่งหน้า' คลิปนี้จะเจาะลึก HTML5 & CSS3 Phase 1 เพื่อการตกแต่งเว็บไซต์อย่างมืออาชีพ",
    videoId: "HcInSUzhaUc",
    icon: <Layers className="w-6 h-6" />,
    color: "text-blue-500 border-blue-500/30 bg-blue-500/10",
  },
  {
    id: 3,
    title: "JavaScript",
    category: "Programming Logic",
    description:
      "🧠 **JavaScript (JS)** คือหัวใจสำคัญของการทำเว็บให้มีลูกเล่น (Interactive) คลิปนี้คือคอร์สจัดเต็ม 8 ชั่วโมงจบในคลิปเดียว ครอบคลุมทุกพื้นฐานที่จำเป็น",
    videoId: "AbjY-ajKgSI",
    icon: <Code2 className="w-6 h-6" />,
    color: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
  },
  {
    id: 4,
    title: "NPM",
    category: "Package Manager",
    description:
      "📦 **NPM (Node Package Manager)** คือเครื่องมือจัดการแพ็กเกจของ Node.js ที่ช่วยให้เราติดตั้ง Library ต่างๆ ได้ง่ายดาย คลิปนี้สอนการใช้ NPM และเข้าใจ package.json",
    videoId: "BQvVhzffVoE",
    icon: <BookOpen className="w-6 h-6" />,
    color: "text-red-500 border-red-500/30 bg-red-500/10",
  },
  {
    id: 5,
    title: "Git & GitHub",
    category: "Version Control",
    description:
      "💾 **Git & GitHub** คือระบบเก็บเวอร์ชันของโค้ดที่โปรแกรมเมอร์ทั่วโลกต้องใช้ คลิปนี้สอนตั้งแต่ติดตั้งจนถึงการ Push/Pull โค้ดขึ้น Cloud แบบจับมือทำ",
    videoId: "gqCzYy7mA3E",
    icon: <Server className="w-6 h-6" />,
    color: "text-gray-400 border-gray-500/30 bg-gray-500/10",
  },
  {
    id: 6,
    title: "Tailwind CSS",
    category: "CSS Framework",
    description:
      "💨 **Tailwind CSS** คือ Utility-first Framework ที่มาแรงที่สุด ช่วยให้จัดหน้าเว็บได้ไวโดยไม่ต้องเขียน CSS เองเยอะ คลิปนี้ปูพื้นฐาน Tailwind เวอร์ชันใหม่",
    videoId: "wwY9cdTzgoE",
    icon: <Layers className="w-6 h-6" />,
    color: "text-cyan-400 border-cyan-400/30 bg-cyan-400/10",
  },
  {
    id: 7,
    title: "React",
    category: "Frontend Library",
    description:
      "⚛️ **React** คือ Library ยอดนิยมจาก Facebook สำหรับสร้าง UI คลิปนี้สอน React เบื้องต้นจนถึงการนำไปใช้งานจริง เข้าใจ Concept Component-based",
    videoId: "ojT758BNvqg",
    icon: <Code2 className="w-6 h-6" />,
    color: "text-blue-400 border-blue-400/30 bg-blue-400/10",
  },
  {
    id: 8,
    title: "Node.js",
    category: "Backend Runtime",
    description:
      "🖥️ **Node.js** ช่วยให้เราเขียน JavaScript บนฝั่ง Server ได้ คลิปนี้ปูพื้นฐาน Node.js สำหรับการพัฒนาเว็บสมัยใหม่ เข้าใจการทำงานของ Backend",
    videoId: "QgDFVaIl-l8",
    icon: <Server className="w-6 h-6" />,
    color: "text-green-500 border-green-500/30 bg-green-500/10",
  },
  {
    id: 9,
    title: "PostgreSQL",
    category: "Database",
    description:
      "🗄️ **PostgreSQL** คือฐานข้อมูลระดับ Enterprise ที่ฟรีและทรงพลัง คลิปนี้สอนการใช้งานเบื้องต้นและการจัดการข้อมูลด้วย SQL",
    videoId: "o--rsYuxBhg",
    icon: <Database className="w-6 h-6" />,
    color: "text-indigo-400 border-indigo-400/30 bg-indigo-400/10",
  },
  {
    id: 10,
    title: "RESTful API",
    category: "Communication",
    description:
      "🔗 **RESTful API** คือมาตรฐานการส่งข้อมูลระหว่างหน้าเว็บ (Frontend) และหลังบ้าน (Backend) คลิปนี้สอนออกแบบและพัฒนา API ด้วย Express.js",
    videoId: "Zpsccboc_QE",
    icon: <Globe className="w-6 h-6" />,
    color: "text-teal-400 border-teal-400/30 bg-teal-400/10",
  },
  {
    id: 11,
    title: "Supabase",
    category: "Backend as a Service",
    description:
      "🚀 **Supabase** คือทางเลือก Open Source แทน Firebase ที่มี Database, Auth, Storage ครบจบในที่เดียว คลิปนี้แนะนำการเริ่มต้นใช้งานสำหรับมือใหม่",
    videoId: "uKTxcfFkwZg",
    icon: <Database className="w-6 h-6" />,
    color: "text-purple-400 border-purple-400/30 bg-purple-400/10",
  },
];

// --- 3. Components ย่อย ---

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  topic,
  isCompleted,
  onToggle,
}) => {
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
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-linear-to-br from-purple-900/20 to-transparent">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${topic.color}`}>{topic.icon}</div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                {topic.category}
              </p>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                {topic.title}
                {isCompleted && (
                  <CheckCircle2 className="text-green-500 w-6 h-6" />
                )}
              </h2>
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

        {/* Footer with Action Buttons (รวมปุ่ม Toggle จาก Code 2) */}
        <div className="p-4 bg-[#13151c] border-t border-white/10 flex justify-between items-center">
          <button
            onClick={() => onToggle(topic.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              isCompleted
                ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            {isCompleted ? <CheckCircle2 size={20} /> : <Circle size={20} />}
            {isCompleted ? "เรียนจบแล้ว" : "ยังไม่เรียนจบ"}
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};

export default function WebDeveloperRoadmap() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  // --- Logic การเก็บ Progress (จาก Code ชุดที่ 2) ---
  const [completedIds, setCompletedIds] = useState<number[]>([]);

  useEffect(() => {
    // โหลดข้อมูลจาก LocalStorage
    const saved = localStorage.getItem("web_dev_progress");
    if (saved) {
      setCompletedIds(JSON.parse(saved));
    }
  }, []);

  const toggleProgress = (id: number) => {
    // หา index ของ topic ปัจจุบันใน array
    const currentIndex = topics.findIndex((t) => t.id === id);

    // ถ้าไม่ใช่ตัวแรก และสถานะปัจจุบันยังไม่เสร็จ (กำลังจะกดให้เสร็จ)
    if (currentIndex > 0 && !completedIds.includes(id)) {
      const prevTopic = topics[currentIndex - 1];
      // ตรวจสอบว่าตัวก่อนหน้าเสร็จหรือยัง
      if (!completedIds.includes(prevTopic.id)) {
        alert(`ควรเรียนรู้ตามลำดับเส้นทาง เพื่อให้ได้ผลลัพธ์ที่ดีที่สุด`);
        return;
      }
    }

    setCompletedIds((prev) => {
      const newIds = prev.includes(id)
        ? prev.filter((tid) => tid !== id)
        : [...prev, id];

      // บันทึกกลับลง LocalStorage
      localStorage.setItem("web_dev_progress", JSON.stringify(newIds));
      return newIds;
    });
  };

  const progressPercent = Math.round(
    (completedIds.length / topics.length) * 100
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#0B0D13] text-gray-300 selection:bg-purple-500/30">
      {/* --- Sticky Progress Bar (จาก Code ชุดที่ 2) --- */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-[#0B0D13]/90 backdrop-blur-md border-b border-white/5 px-4 py-3 shadow-lg">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <div className="flex-1">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Your Progress</span>
              <span className="text-purple-400 font-bold">
                {progressPercent}% Completed
              </span>
            </div>
            <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ease-out ${
                  progressPercent === 100
                    ? "bg-linear-to-br from-green-400 to-green-600"
                    : "bg-linear-to-br from-purple-500 to-pink-500"
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          {progressPercent === 100 && (
            <div className="flex items-center gap-2 text-yellow-500 animate-pulse font-bold text-sm whitespace-nowrap">
              <Trophy size={16} />
              <span className="hidden sm:inline">Certified!</span>
            </div>
          )}
        </div>
      </div>

      {/* --- Hero Section (จาก Code ชุดที่ 1) --- */}
      <div className="relative pt-28 pb-16 px-4 text-center overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-6 animate-pulse">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            Edsential 2025 Updated
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-linear-to-br from-purple-400 via-pink-400 to-purple-600 tracking-wide mb-6 drop-shadow-2xl">
            Full Stack Developer
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            เส้นทางการเรียนรู้สู่การเป็นนักพัฒนาเว็บมืออาชีพ
            เริ่มต้นจากศูนย์จนถึงการสร้างแอปพลิเคชันที่ใช้งานได้จริง
            เรียงลำดับความสำคัญไว้ให้คุณแล้ว
          </p>
        </div>
      </div>

      {/* --- Roadmap Container --- */}
      <div className="max-w-5xl mx-auto px-4 pb-32 mt-10">
        <div className="relative">
          {/* เส้นแกนกลาง (Timeline Line) */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-linear-to-br from-purple-600 via-purple-900/50 to-transparent md:-translate-x-1/2 rounded-full" />

          {/* Items Loop */}
          {topics.map((topic, index) => {
            const isEven = index % 2 === 0;
            const isCompleted = completedIds.includes(topic.id); // เช็คสถานะ

            return (
              <div
                key={topic.id}
                className={`relative flex items-center mb-12 md:mb-24 ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* 1. จุดเชื่อมต่อ (Connector Dot) - เปลี่ยนสีตามสถานะ */}
                <div
                  className={`absolute left-8 md:left-1/2 -translate-x-[5px] md:-translate-x-1/2 w-4 h-4 rounded-full z-10 shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all duration-500 border-[3px]
                   ${
                     isCompleted
                       ? "bg-green-500 border-green-500 scale-125"
                       : "bg-[#0B0D13] border-purple-500"
                   }
                `}
                >
                  {!isCompleted && (
                    <div className="absolute inset-0 bg-purple-500 rounded-full animate-ping opacity-20"></div>
                  )}
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
                    className={`group relative p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden border
                        ${
                          isCompleted
                            ? "bg-[#13151c] border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.1)]"
                            : "bg-[#13151c] border-white/5 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10"
                        }
                    `}
                  >
                    {/* Glow Effect */}
                    <div
                      className={`absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500
                        ${
                          isCompleted
                            ? "from-green-500/5 to-transparent"
                            : "from-purple-500/5 to-transparent"
                        }
                    `}
                    />

                    {/* Badge Number / Check */}

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
                      <h3
                        className={`text-2xl font-bold mb-2 transition-colors flex items-center gap-2
                        ${
                          isCompleted
                            ? "text-gray-200"
                            : "text-white group-hover:text-purple-400"
                        }
                      `}
                      >
                        {topic.title}
                        {!isCompleted && (
                          <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-purple-500" />
                        )}
                      </h3>

                      {/* Short Description */}
                      <p className="text-sm text-gray-500 line-clamp-2 mb-4 group-hover:text-gray-400 transition-colors">
                        {topic.description.replace(/\*\*/g, "")}
                      </p>

                      {/* Action Button Row */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-purple-400 group-hover:text-purple-300">
                          <Play size={16} fill="currentColor" />
                          <span>ดูวิดีโอประกอบ</span>
                        </div>

                        {/* Quick Toggle Button (ปุ่มวงกลม/ติ๊กถูก บนการ์ด) */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleProgress(topic.id);
                          }}
                          className={`z-20 p-2 rounded-full transition-all ${
                            isCompleted
                              ? "text-green-500 bg-green-500/10"
                              : "text-gray-600 hover:bg-white/10 hover:text-gray-300"
                          }`}
                          title={
                            isCompleted
                              ? "Mark as Incomplete"
                              : "Mark as Completed"
                          }
                        >
                          {isCompleted ? (
                            <CheckCircle2 size={20} />
                          ) : (
                            <Circle size={20} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* End Node */}
          <div className="relative flex justify-center mt-12 pl-8 md:pl-0">
            <div
              className={`px-6 py-3 rounded-full flex items-center gap-3 shadow-lg z-10 border transition-all duration-500
                ${
                  progressPercent === 100
                    ? "bg-green-500/10 border-green-500/50 text-green-400 shadow-green-500/20"
                    : "bg-[#13151c] border-purple-500/30 text-purple-300"
                }
             `}
            >
              {progressPercent === 100 ? (
                <Trophy className="w-5 h-5" />
              ) : (
                <CheckCircle2 className="w-5 h-5" />
              )}
              <span className="font-semibold">
                {progressPercent === 100 ? "Ready to Work!" : "พร้อมทำงานจริง!"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- Modal --- */}
      <Modal
        isOpen={!!selectedTopic}
        topic={selectedTopic}
        onClose={() => setSelectedTopic(null)}
        isCompleted={
          selectedTopic ? completedIds.includes(selectedTopic.id) : false
        }
        onToggle={toggleProgress}
      />
    </main>
  );
}

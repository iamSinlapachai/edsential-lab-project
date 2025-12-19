"use client";
import React, { useState, useEffect } from "react";
import {
    Play,
    X,
    ChevronRight,
    CheckCircle2,
    BookOpen,
    Database,
    Code2,
    FileSpreadsheet,
    BarChart3,
    BrainCircuit,
    Sigma,
    PieChart
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

// --- 2. ข้อมูลจำลอง (Data) สำหรับ Data Analyst ---
const topics: Topic[] = [
    {
        id: 1,
        title: "Excel & Spreadsheets",
        category: "Foundation",
        description: "📊 **Excel** คือเครื่องมือพื้นฐานที่สุดแต่ทรงพลังมากสำหรับ Data Analyst คลิปนี้จะสอนเทคนิคที่จำเป็น เช่น Pivot Table, VLOOKUP, และฟังก์ชันจัดการข้อมูลต่างๆ ที่ต้องใช้จริง",
        videoId: "c8y-R8rC02k", // Thep Excel - สอน Excel เบื้องต้น
        icon: <FileSpreadsheet className="w-6 h-6" />,
        color: "text-green-500 border-green-500/30 bg-green-500/10",
    },
    {
        id: 2,
        title: "SQL",
        category: "Database Querying",
        description: "🗄️ **SQL (Structured Query Language)** คือภาษาที่ใช้ดึงและจัดการข้อมูลจากฐานข้อมูล เป็นทักษะที่ขาดไม่ได้ คลิปนี้สอนตั้งแต่ SELECT พื้นฐานไปจนถึงการ JOIN ตาราง",
        videoId: "3oZzXQ3o3h0", // DataTH - สอน SQL พื้นฐาน 1 ชั่วโมงจบ
        icon: <Database className="w-6 h-6" />,
        color: "text-blue-500 border-blue-500/30 bg-blue-500/10",
    },
    {
        id: 3,
        title: "Data Visualization Logic",
        category: "Communication",
        description: "🎨 **Data Visualization** ไม่ใช่แค่การทำกราฟสวย แต่คือการเลือกกราฟให้ถูกกับข้อมูลเพื่อสื่อสาร Insight ให้เข้าใจง่าย คลิปนี้จะปูพื้นฐานหลักการทำ Visualization ที่ถูกต้อง",
        videoId: "Wz25sJdEq8c", // Data Rockie - หลักการ Data Visualization
        icon: <PieChart className="w-6 h-6" />,
        color: "text-pink-500 border-pink-500/30 bg-pink-500/10",
    },
    {
        id: 4,
        title: "Power BI / Tableau",
        category: "BI Tools",
        description: "📈 **Business Intelligence Tools** ช่วยให้เราสร้าง Dashboard แบบ Interactive ได้ คลิปนี้สอนใช้งาน Power BI ตั้งแต่ import ข้อมูลจนถึงสร้างรายงานสรุปผู้บริหาร",
        videoId: "M7zK2C8wK7U", // 9Expert - Power BI Desktop สำหรับผู้เริ่มต้น
        icon: <BarChart3 className="w-6 h-6" />,
        color: "text-yellow-500 border-yellow-500/30 bg-yellow-500/10",
    },
    {
        id: 5,
        title: "Python for Data",
        category: "Programming",
        description: "🐍 **Python** คือภาษาเขียนโปรแกรมยอดนิยมสำหรับงาน Data คลิปนี้จะสอน Python พื้นฐานที่จำเป็น เพื่อเตรียมพร้อมสำหรับการจัดการข้อมูลที่ซับซ้อนกว่า Excel",
        videoId: "I3FBJdiExVQ", // KongRuksiam - Python for Beginners
        icon: <Code2 className="w-6 h-6" />,
        color: "text-blue-400 border-blue-400/30 bg-blue-400/10",
    },
    {
        id: 6,
        title: "Pandas & NumPy",
        category: "Data Wrangling",
        description: "🐼 **Pandas** คือ Library ใน Python ที่เป็นหัวใจของการทำ Data Cleaning และ Manipulation คลิปนี้จะสอนวิธีจัดการ DataFrame เปลี่ยนข้อมูลดิบให้พร้อมใช้งาน",
        videoId: "0P7QnIQDBJY", // KongRuksiam - สอน Pandas Data Analysis
        icon: <BookOpen className="w-6 h-6" />,
        color: "text-purple-400 border-purple-400/30 bg-purple-400/10",
    },
    {
        id: 7,
        title: "Statistics",
        category: "Math & Logic",
        description: "📐 **Statistics** หรือสถิติ คือแก่นแท้ของการวิเคราะห์ข้อมูล คลิปนี้จะทบทวนสถิติเบื้องต้นที่ Data Analyst ต้องรู้ เช่น Mean, Median, Mode และ Standard Deviation",
        videoId: "Pj_9K-K3HwI", // Nattapon Bua-in - สถิติเบื้องต้นเพื่อการวิจัย (ใกล้เคียงงาน Data)
        icon: <Sigma className="w-6 h-6" />,
        color: "text-red-400 border-red-400/30 bg-red-400/10",
    },
    {
        id: 8,
        title: "Exploratory Data Analysis (EDA)",
        category: "Analysis Process",
        description: "🔍 **EDA** คือกระบวนการทำความเข้าใจข้อมูลก่อนเริ่มสร้างโมเดลหรือทำรายงาน คลิปนี้จะพาทำ Workshop วิเคราะห์ข้อมูลจริงเพื่อหา Insight ที่ซ่อนอยู่",
        videoId: "6tQ-hD7v6R8", // Ultimate Python - เริ่มต้นวิเคราะห์ข้อมูลด้วย Python (EDA)
        icon: <BarChart3 className="w-6 h-6" />,
        color: "text-orange-400 border-orange-400/30 bg-orange-400/10",
    },
    {
        id: 9,
        title: "Intro to Machine Learning",
        category: "Advanced Analysis",
        description: "🤖 **Machine Learning** ช่วยให้เราทำนายอนาคตจากข้อมูลได้ คลิปนี้ปูพื้นฐาน Concept ของ ML แบบเข้าใจง่ายๆ สำหรับผู้เริ่มต้นสาย Data",
        videoId: "u6C-e8k2V4E", // KongRuksiam - Machine Learning คืออะไร?
        icon: <BrainCircuit className="w-6 h-6" />,
        color: "text-cyan-400 border-cyan-400/30 bg-cyan-400/10",
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
            <div className="relative w-full max-w-3xl bg-[#1a1d26] rounded-2xl border border-blue-500/30 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-blue-900/20 to-transparent">
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
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                        เข้าใจแล้ว
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function DataAnalystRoadmap() {
    // กำหนด Type ของ State ให้เป็น Topic หรือ null
    const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

    // Scroll to top on load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="min-h-screen bg-[#0B0D13] text-gray-300 selection:bg-blue-500/30">

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

                    <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 tracking-wide mb-6 drop-shadow-2xl">
                        Data Analyst Roadmap
                    </h1>

                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        เส้นทางสู่การเป็นนักวิเคราะห์ข้อมูลมืออาชีพ ตั้งแต่ Excel พื้นฐาน สู่ SQL, Python และ Business Intelligence พร้อมคลิปสอนภาษาไทยที่คัดมาแล้ว
                    </p>
                </div>
            </div>

            {/* --- Roadmap Container --- */}
            <div className="max-w-5xl mx-auto px-4 pb-32 mt-10">
                <div className="relative">

                    {/* เส้นแกนกลาง (Timeline Line) */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-r from-blue-600 via-blue-900/50 to-transparent md:-translate-x-1/2 rounded-full" />

                    {/* Items Loop */}
                    {topics.map((topic, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <div
                                key={topic.id}
                                className={`relative flex items-center mb-12 md:mb-24 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'
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
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

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
                            <span className="font-semibold">พร้อมเป็น Data Analyst!</span>
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
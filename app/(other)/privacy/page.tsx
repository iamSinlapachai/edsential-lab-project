// app/(other)/privacy/page.tsx

import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";

// เนื้อหาจำลองสำหรับ Privacy Policy (เหมือนเดิม)
const privacyContent = {
    effectiveDate: "1 ธันวาคม 2568",
    sections: [
        // ... (เนื้อหาส่วนต่างๆ เหมือนเดิม) ...
        {
            title: "1. ข้อมูลที่เราเก็บรวบรวม",
            summary: "เราเก็บรวบรวมข้อมูลหลายประเภทเพื่อวัตถุประสงค์ที่หลากหลายในการให้บริการและปรับปรุงบริการของเราแก่คุณ",
            details: [
                {
                    subtitle: "1.1 ข้อมูลส่วนบุคคล (Personal Data)",
                    content: "รวมถึงแต่ไม่จำกัดเพียง ชื่อ, ที่อยู่อีเมล, ตำแหน่งงาน, และประวัติการใช้งานที่คุณให้มาเมื่อลงทะเบียนหรือแก้ไขโปรไฟล์",
                },
                {
                    subtitle: "1.2 ข้อมูลการใช้งาน (Usage Data)",
                    content: "ข้อมูลนี้จะถูกรวบรวมโดยอัตโนมัติ ซึ่งอาจรวมถึงที่อยู่ IP, ประเภทเบราว์เซอร์, หน้าบริการที่เราเข้าชม, เวลาและวันที่ของการเข้าชม และเวลาที่ใช้ในหน้าเหล่านั้น",
                },
            ],
        },
        {
            title: "2. การใช้ข้อมูล",
            summary: "เราใช้ข้อมูลที่รวบรวมเพื่อวัตถุประสงค์ต่อไปนี้:",
            details: [
                { content: "เพื่อให้และบำรุงรักษาบริการของเรา" },
                { content: "แจ้งให้คุณทราบเกี่ยวกับการเปลี่ยนแปลงบริการของเรา" },
                { content: "ให้การสนับสนุนลูกค้า" },
                { content: "ปรับปรุงบริการของเราและมอบประสบการณ์ที่เป็นส่วนตัวมากขึ้น" },
                { content: "ติดตามการใช้งานบริการ" },
            ],
        },
        {
            title: "3. การรักษาความปลอดภัยของข้อมูล",
            summary: "ความปลอดภัยของข้อมูลของคุณมีความสำคัญต่อเรา แต่โปรดจำไว้ว่าไม่มีวิธีการส่งข้อมูลทางอินเทอร์เน็ตหรือวิธีการจัดเก็บทางอิเล็กทรอนิกส์ใดที่ปลอดภัย 100% เรามุ่งมั่นที่จะใช้วิธีการที่ยอมรับในเชิงพาณิชย์เพื่อปกป้องข้อมูลส่วนบุคคลของคุณ",
        },
        {
            title: "4. สิทธิของคุณภายใต้ GDPR (ถ้ามี)",
            summary: "หากคุณเป็นผู้อยู่อาศัยในเขตเศรษฐกิจยุโรป (EEA) คุณมีสิทธิ์ในการป้องกันข้อมูลบางประการ",
            details: [
                { content: "สิทธิ์ในการเข้าถึงข้อมูล (The right to access)" },
                { content: "สิทธิ์ในการแก้ไขข้อมูล (The right to rectification)" },
                { content: "สิทธิ์ในการลบข้อมูล (The right to erasure)" },
            ],
        },
    ],
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[#0F1117] text-gray-300  selection:bg-[#7b4dff] selection:text-white pb-10 md:pb-20">
            
            <div className='flex flex-col items-center justify-center'>
            
                {/* Header และ Back Button Area */}
                {/* ปรับให้ใช้ max-w-7xl และ px-8 เหมือนส่วนใหญ่ของเว็บคุณ */}
                <div className="max-w-7xl w-full pt-8 md:pt-12 px-4 md:px-8">
                    <Link 
                        // แก้ไข href ให้กลับไปยังพาธหลักของ Settings (เช่น /settings) หากไม่มีโฟลเดอร์อื่นซ้อนทับ
                        href="/settings/profile" // กลับไปยังหน้าตั้งค่า 
                        className="inline-flex items-center text-gray-400 hover:text-purple-400 transition-colors mb-6"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        กลับไปที่โปรไฟล์
                    </Link>
                    
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2 tracking-tight">
                        นโยบายความเป็นส่วนตัว
                    </h1>
                    <p className="text-sm text-gray-500 mb-8 border-b border-gray-800 pb-4">
                        อัปเดตล่าสุด: {privacyContent.effectiveDate}
                    </p>
                </div>

                {/* Content Area */}
                {/* ใช้ max-w-7xl/4xl และจัดกึ่งกลางให้สอดคล้องกัน */}
                <div className="max-w-4xl w-full px-4 md:px-8 space-y-8">
                    {privacyContent.sections.map((section, index) => (
                        <section key={index} className="bg-[#161b22] border border-gray-800 rounded-xl p-5 md:p-6 shadow-lg">
                            <h2 className="text-xl font-semibold text-white mb-3 border-b border-gray-700/50 pb-2 flex items-center">
                                <Lock className="w-5 h-5 mr-2 text-pink-500" />
                                {section.title}
                            </h2>
                            
                            <p className="text-gray-400 leading-relaxed text-sm mb-4">
                                {section.summary}
                            </p>

                            {/* แสดงรายละเอียด (details) ถ้ามี */}
                            {section.details && (
                                <ul className="space-y-3 pt-2">
                                    {section.details.map((detail, detailIndex) => (
                                        <li key={detailIndex}>
                                            {detail.subtitle && (
                                                <h4 className="font-semibold text-gray-300 text-sm mb-1">{detail.subtitle}</h4>
                                            )}
                                            {detail.content && (
                                                <p className={`text-gray-400 text-sm ${detail.subtitle ? 'pl-4' : ''}`}>
                                                    {detail.content}
                                                </p>
                                            )}
                                            {/* ใช้ list-disc สำหรับรายการย่อย (เช่นใน Section 4) */}
                                            {!detail.subtitle && detail.content && (
                                                <div className="flex items-start">
                                                     <span className="text-purple-400 mr-2">•</span>
                                                     <p className="text-gray-400 text-sm">{detail.content}</p>
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </section>
                    ))}

                    <div className="pt-6 text-center text-gray-500 text-sm">
                        การใช้บริการเว็บไซต์นี้ของคุณถือว่าเป็นการยอมรับนโยบายความเป็นส่วนตัวนี้
                    </div>
                </div>
            </div>
        </div>
    );
}
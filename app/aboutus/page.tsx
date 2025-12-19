// app/aboutus/page.tsx

"use client";

import React from 'react';
import Image from 'next/image';
// แก้ไข Error โดยการ import สองส่วนนี้เพิ่ม
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import VectorImage1 from "./../../assets/image/VecterImage_1.png";
import "aos/dist/aos.css";

export default function AboutUs() {
  return (
    <main className="bg-[#0F1117] text-gray-300 py-10 md:py-10 min-h-screen">
      {/* Container สำหรับปุ่มย้อนกลับ */}
      <div className="max-w-7xl mx-auto w-full pt-4 md:pt-8 px-6 md:px-8">
        <Link
          href="/settings/profile"
          className="inline-flex items-center text-sm text-gray-400 hover:text-purple-400 transition-colors mb-6 group"
        >
          {/* เพิ่มไอคอน ArrowLeft ที่ import มาจาก lucide-react */}
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          กลับไปที่โปรไฟล์
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center">
        {/* ส่วนเนื้อหาหลัก */}
        <div className="max-w-4xl px-8 text-center md:text-left" data-aos="fade-up">

          <h1 className="font-bold text-3xl md:text-4xl text-white text-center mb-10 leading-tight">
            "การเรียนรู้ไม่ควรหยุดอยู่แค่ห้องเรียน"
          </h1>

          <div className="space-y-6 text-base text-gray-400 leading-relaxed">
            <p>
              โดยชื่อของเว็บไซต์เรามาจากคำว่า Essential + Education
              เพื่อสื่อถึงการเรียนรู้ที่จำเป็นสำหรับสายอาชีพนั้น ๆ
            </p>
            <p>
              เราเชื่อมั่นในประโยคนี้เสมอมา เพราะพวกเราเองก็เคยเป็นนักศึกษาที่เต็มไปด้วยคำถาม
              ไม่รู้เส้นทาง ไม่รู้ว่าควรเริ่มต้นจากตรงไหน และไม่รู้ว่าทักษะอะไรจำเป็นต่อการทำงานจริงในอนาคต
            </p>

            <p>
              จากประสบการณ์การหลงทางนั้น ทำให้เรามองเห็นปัญหาสามัญที่เกิดขึ้นกับคนจำนวนมาก
              ระบบการเรียนแบบเดิมอาจให้ความรู้พื้นฐาน แต่ยังไม่เพียงพอที่จะช่วยให้เห็น “ภาพรวมของอาชีพ”
              หรือวิธีเดินหน้าอย่างถูกทิศทาง
            </p>

            <p>
              เราจึงสร้างแพลตฟอร์ม <span className="text-purple-400 font-semibold">Edsential Lab</span> นี้ขึ้นมา
              เพื่อเป็นพื้นที่ที่รวมความรู้ตั้งแต่พื้นฐานจนถึงระดับที่สามารถนำไปใช้ทำงานจริงได้
              พร้อมทั้งแผนผังเส้นทางอาชีพ ที่ช่วยให้ทุกคนมองเห็นภาพตั้งแต่
              <span className="text-white"> จุดเริ่มต้น → ทักษะที่ต้องมี → เครื่องมือที่ต้องใช้ → งานที่ทำได้จริง</span>
            </p>
          </div>

          <hr className="w-32 md:w-64 mx-auto border-gray-700 my-12" />

          <p className="text-center font-bold text-white text-lg" data-aos="fade-up">
            เพราะโลกเปลี่ยนเร็วขึ้นทุกวัน เราจึงอยากเป็นแรงสนับสนุนให้คุณเตรียมพร้อม <br className="hidden md:block" />
            สร้างความรู้ ทักษะ และโอกาสใหม่ ๆ ที่ไม่จำกัดอยู่แค่ในห้องเรียนอีกต่อไป
          </p>
        </div>

        {/* รูปภาพประกอบ */}
        <div className="mt-16 flex justify-center px-6" data-aos="fade-up" data-aos-delay="200">
          <Image
            src={VectorImage1}
            alt="NeverStopLearning"
            width={500}
            height={350} // เพิ่ม height เพื่อความเสถียรของ layout
            className="opacity-90 w-full max-w-[450px] md:max-w-[500px] h-auto"
          />
        </div>

      </div>
    </main>
  );
}
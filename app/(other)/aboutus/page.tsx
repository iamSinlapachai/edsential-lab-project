'use client';

import React from "react";
import Image from "next/image";
import VectorImage1 from "@/assets/image/VecterImage_1.png";
import "aos/dist/aos.css";
import SettingsShell from "@/components/settings-shell";

export default function AboutUs() {
  return (
    <SettingsShell
      title="เกี่ยวกับเรา"
      description="ข้อมูลเกี่ยวกับ Edsential Lab"
    >
      <div className="flex flex-col items-center justify-center pt-8">
        {/* ส่วนเนื้อหาหลัก - ปรับปรุงให้อยู่ในกล่อง */}
        <div
          className="max-w-5xl w-full"
          data-aos="fade-up"
        >
          {/* กล่องเนื้อหาหลักแบบเดียวกับหน้า Terms */}
          <div className="bg-[#161b22] border border-gray-800 rounded-2xl p-6 md:p-10 shadow-xl">
            <h1 className="font-bold text-3xl md:text-4xl text-white text-center mb-10 leading-tight">
              "การเรียนรู้ไม่ควรหยุดอยู่แค่ห้องเรียน"
            </h1>

            <div className="space-y-6 text-base text-gray-400 leading-relaxed">
              <p>
                โดยชื่อของเว็บไซต์เรามาจากคำว่า <span className="text-white font-medium">Essential + Education</span> เพื่อสื่อถึงการเรียนรู้ที่จำเป็นสำหรับสายอาชีพนั้น ๆ
              </p>

              <p>
                เราเชื่อมั่นในประโยคนี้เสมอมา เพราะพวกเราเองก็เคยเป็นนักศึกษาที่เต็มไปด้วยคำถาม ไม่รู้เส้นทาง ไม่รู้ว่าควรเริ่มต้นจากตรงไหน และไม่รู้ว่าทักษะอะไรจำเป็นต่อการทำงานจริงในอนาคต
              </p>
              <p className="mb-4">
                จากประสบการณ์การหลงทางนั้น ทำให้เรามองเห็นปัญหาสามัญที่เกิดขึ้นกับคนจำนวนมาก ระบบการเรียนแบบเดิมอาจให้ความรู้พื้นฐาน แต่ยังไม่เพียงพอที่จะช่วยให้เห็น “ภาพรวมของอาชีพ” หรือวิธีเดินหน้าอย่างถูกทิศทาง
              </p>
              <p>
                เราจึงสร้างแพลตฟอร์ม{" "}
                <span className="text-purple-400 font-semibold  ">
                  Edsential Lab
                </span>{" "}
                นี้ขึ้นมา เพื่อเป็นพื้นที่ที่รวมความรู้ตั้งแต่พื้นฐานจนถึงระดับที่สามารถนำไปใช้ทำงานจริงได้ พร้อมทั้งแผนผังเส้นทางอาชีพ ที่ช่วยให้ทุกคนมองเห็นภาพตั้งแต่:
              </p>
              <div className="bg-[#0F1117] border border-gray-700/30 rounded-xl p-6 my-8">

                <div className="flex flex-wrap justify-center items-center gap-2 text-sm md:text-base">
                  <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20">จุดเริ่มต้น</span>
                  <span className="text-gray-600">→</span>
                  <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20">ทักษะที่ต้องมี</span>
                  <span className="text-gray-600">→</span>
                  <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20">เครื่องมือ</span>
                  <span className="text-gray-600">→</span>
                  <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full border border-green-500/20">งานที่ทำได้จริง</span>
                </div>
              </div>
            </div>

            <hr className="w-32 mx-auto border-gray-700 my-10" />

            <p className="text-center font-bold text-white text-lg">
              เพราะโลกเปลี่ยนเร็วขึ้นทุกวัน เราจึงอยากเป็นแรงสนับสนุนให้คุณเตรียมพร้อม{" "}
              <br className="hidden md:block" />
              สร้างความรู้ ทักษะ และโอกาสใหม่ ๆ ที่ไม่จำกัดอยู่แค่ในห้องเรียนอีกต่อไป
            </p>
          </div>
        </div>

        {/* รูปภาพประกอบ */}
        {/* <div
          className="mt-12 flex justify-center px-6"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <Image
            src={VectorImage1}
            alt="NeverStopLearning"
            width={500}
            height={350}
            className="opacity-80 w-full max-w-[400px] md:max-w-[450px] h-auto drop-shadow-[0_0_20px_rgba(168,85,247,0.2)]"
          />
        </div> */}
      </div>
    </SettingsShell>
  );
}
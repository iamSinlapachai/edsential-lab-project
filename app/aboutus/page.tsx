import React from 'react'
import Image from 'next/image'
import VectorImage1 from "./../../assets/image/VecterImage_1.png"
import "aos/dist/aos.css";

export default function AboutUs() {
  return (
    <main className='bg-[#0F1117] text-gray-300 py-20'>
      <div className='flex flex-col items-center justify-center'>

        <div className='text-l max-w-7xl px-8'  data-aos="fade-up" >
          <h1 className='font-bold text-4xl text-center mb-10'>"การเรียนรู้ไม่ควรหยุดอยู่แค่ห้องเรียน"</h1>

          <p>เราเชื่อมั่นในประโยคนี้เสมอมา เพราะพวกเราเองก็เคยเป็นนักศึกษาที่เต็มไปด้วยคำถาม  ไม่รู้เส้นทาง ไม่รู้ว่าควรเริ่มต้นจากตรงไหน และไม่รู้ว่าทักษะอะไรจำเป็นต่อการทำงานจริงในอนาคต</p>
          <br />
          <p>จากประสบการณ์การหลงทางนั้น ทำให้เรามองเห็นปัญหาเดียวกันที่เกิดขึ้นกับคนจำนวนมาก ระบบการเรียนแบบเดิมอาจให้ความรู้พื้นฐาน แต่ยังไม่เพียงพอที่จะช่วยให้เห็น “ภาพรวมของอาชีพ” หรือวิธีเดินหน้าอย่างถูกทิศทาง</p>
          <br />
          <p>เราจึงสร้างแพลตฟอร์ม Edsential Lab นี้ขึ้นมา เพื่อเป็นพื้นที่ที่รวมความรู้ตั้งแต่พื้นฐานจนถึงระดับที่สามารถนำไปใช้ทำงานจริงได้ พร้อมทั้งแผนผังเส้นทางอาชีพ ที่ช่วยให้ทุกคนมองเห็นภาพตั้งแต่ จุดเริ่มต้น → ทักษะที่ต้องมี → เครื่องมือที่ต้องใช้ → งานที่ทำได้จริง</p>
          <hr className="w-64 mx-auto border-gray-300 my-12"  />
          <p className='text-center font-bold' data-aos="fade-up">เพราะโลกเปลี่ยนเร็วขึ้นทุกวัน เราจึงอยากเป็นแรงสนับสนุนให้คุณเตรียมพร้อม <br /> สร้างความรู้ ทักษะ และโอกาสใหม่ ๆ ที่ไม่จำกัดอยู่แค่ในห้องเรียนอีกต่อไป</p>

        </div>
        <div className='mt-10' data-aos="fade-up" data-aos-delay="200">
          <Image src={VectorImage1} alt="NeverStopLearning" width={500} />
        </div>

      </div>
    </main>
  )
}

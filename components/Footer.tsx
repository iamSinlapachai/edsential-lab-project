import React from "react";
import Link from "next/link";
import Image from "next/image";
import saulogo from "@/assets/image/logosau-01.png";

export default function Footer() {
  const TheNewStackLogo = "https://roadmap.sh/img/tns-sm.png";

  return (
    <footer className="bg-[#161b21] text-gray-300 py-15 ">
      <div className="container mx-auto px-8 max-w-7xl flex flex-col ">
        <div className="mx-auto mb-8 font-semibold grid grid-cols-2 gap-y-4 gap-x-6 text-center sm:grid-cols-3 md:flex md:gap-x-8 md:justify-center">
          <div>
            <Link href={"/"} className="hover:underline">
              Edsential
            </Link>
          </div>
          <div>
            <Link href={"/aboutus"} className="hover:underline">
              About Us
            </Link>
          </div>
          <div>
            <Link href={"/"} className="hover:underline">
              Guides
            </Link>
          </div>
          <div>
            <Link href={"/"} className="hover:underline">
              FAQs
            </Link>
          </div>
          <div>
            <Link href={"/"} className="hover:underline">
              Youtube
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row mx-auto md:mx-0 text-center md:text-start justify-center md:justify-between ">
          {/* Column 1 */}
          <div className="mt-5">
            <div className="text-white">
              <span className="font-bold">Edsential</span>{" "}
              <span className="mx-2"> by </span>
              <span className="bg-purple-600 text-white p-1.5 rounded-xl">
                @Edsential Team
              </span>
            </div>
            <div className="font-light mt-6 ">
              Edsential ถูกสร้างขึ้นเพื่อรวบรวมแนวทางปฏิบัติที่ดีที่สุด <br />  โปรเจกต์ บทความ แหล่งเรียนรู้ และเส้นทางการเรียนรู้ต่าง ๆ <br /> เพื่อช่วยให้คุณเลือกเส้นทางที่เหมาะกับตัวเอง <br /> และเติบโตในสายอาชีพของคุณ
            </div>
            <div className="mt-5 text-xs font-medium text-gray-500 tracking-wide uppercase">
              © Edsential •{" "}
              <Link href={"/terms"} className="hover:underline">
                Terms of Service
              </Link>{" "}
              •{" "}
              <Link href={"/privacy"} className="hover:underline">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Column 2 */}
          <div className="text-center md:text-right flex flex-col mt-6 md:mt-0 items-center md:items-end">
            <div className="flex bg-white p-3 rounded-2xl w-fit  ">
              <Image src={saulogo} alt="" width={50} height={50} />
            </div>
            <div className="my-5">
              สถาบันอุดมศึกษาชั้นนำที่มุ่งเน้นการผลิตบัณฑิตด้าน <br /> เทคโนโลยีและนวัตกรรม
              มุ่งสร้างผู้เชี่ยวชาญ <br /> ที่มีทักษะตอบโจทย์ตลาดงานสมัยใหม่ <br />
              พร้อมขับเคลื่อนสังคมด้วยความรู้ที่เป็นเลิศ
            </div>
            <div className=" text-xs font-medium text-gray-500 tracking-wide uppercase">Technology • Innovation • Excellence</div>
          </div>
          
        </div>
      </div>
    </footer>
  );
}

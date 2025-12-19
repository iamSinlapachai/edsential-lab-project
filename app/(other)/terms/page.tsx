"use client";

// app/(other)/terms/page.tsx

import SettingsShell from "@/components/settings-shell";

// เนื้อหาจำลองสำหรับ Terms of Service (เหมือนเดิม)
const termsContent = {
  effectiveDate: "1 ธันวาคม 2568",
  sections: [
    {
      title: "1. การยอมรับข้อกำหนด",
      content:
        "เมื่อเข้าถึงหรือใช้บริการของเรา คุณยอมรับที่จะผูกพันตามข้อกำหนดและเงื่อนไขเหล่านี้ หากคุณไม่เห็นด้วยกับข้อกำหนดใดๆ คุณจะไม่ได้รับอนุญาตให้เข้าถึงบริการ",
    },
    {
      title: "2. การเปลี่ยนแปลงข้อกำหนด",
      content:
        "เราสงวนสิทธิ์ในการแก้ไขหรือแทนที่ข้อกำหนดเหล่านี้ได้ตลอดเวลา หากการแก้ไขเป็นการเปลี่ยนแปลงที่มีนัยสำคัญ เราจะพยายามแจ้งให้ทราบล่วงหน้าอย่างน้อย 30 วัน การใช้งานบริการอย่างต่อเนื่องหลังจากการเปลี่ยนแปลงถือเป็นการยอมรับข้อกำหนดใหม่",
    },
    {
      title: "3. บัญชีผู้ใช้งาน",
      content: [
        "คุณต้องให้ข้อมูลที่ถูกต้องและสมบูรณ์ในระหว่างการลงทะเบียน",
        "คุณมีหน้าที่รับผิดชอบในการรักษาความลับของรหัสผ่านและกิจกรรมทั้งหมดที่เกิดขึ้นภายใต้บัญชีของคุณ",
        "คุณต้องแจ้งให้เราทราบทันทีเมื่อเกิดการละเมิดความปลอดภัยหรือการใช้งานบัญชีของคุณโดยไม่ได้รับอนุญาต",
      ],
    },
    {
      title: "4. การยุติบริการ",
      content:
        "เราอาจยุติหรือระงับการเข้าถึงบริการของเราได้ทันที โดยไม่มีการแจ้งให้ทราบล่วงหน้าหรือรับผิดชอบใดๆ ด้วยเหตุผลใดก็ตาม โดยเฉพาะอย่างยิ่งหากคุณละเมิดข้อกำหนดเหล่านี้",
    },
    {
      title: "5. ข้อจำกัดความรับผิดชอบ",
      content:
        "บริการของเรามีให้ 'ตามที่เป็นอยู่' (AS IS) เราไม่รับประกันใดๆ ไม่ว่าโดยชัดแจ้งหรือโดยนัย ในเรื่องความถูกต้อง ความน่าเชื่อถือ หรือความพร้อมใช้งานของบริการ",
    },
  ],
};

export default function TermsPage() {
  return (
    <SettingsShell title="ข้อกำหนดในการให้บริการ">
      <div className="space-y-8">
        <p className="text-sm text-gray-500 border-b border-gray-800 pb-4">
          อัปเดตล่าสุด: {termsContent.effectiveDate}
        </p>

        {termsContent.sections.map((section, index) => (
          <section
            key={index}
            className="bg-[#161b22] border border-gray-800 rounded-xl p-5 md:p-6 shadow-lg"
          >
            <h2 className="text-xl font-semibold text-white mb-3 border-b border-gray-700/50 pb-2">
              {section.title}
            </h2>
            {/* ตรวจสอบว่า content เป็น array หรือ string */}
            {Array.isArray(section.content) ? (
              <ul className="list-disc list-inside space-y-2 text-gray-400 text-sm pl-4">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 leading-relaxed text-sm">
                {section.content}
              </p>
            )}
          </section>
        ))}

        <div className="pt-6 text-center text-gray-500 text-sm">
          หากมีคำถามใดๆ เกี่ยวกับข้อกำหนดเหล่านี้
          โปรดติดต่อเราผ่านศูนย์ช่วยเหลือ
        </div>
      </div>
    </SettingsShell>
  );
}

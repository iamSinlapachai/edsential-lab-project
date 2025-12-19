"use client";

import { Bell, Moon, Zap, Lock, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import SettingsShell from "@/components/settings-shell";

interface ToggleSwitchProps {
  label: string;
  description: string;
  isChecked: boolean;
  onChange: () => void;
}

const ToggleSwitch = ({
  label,
  description,
  isChecked,
  onChange,
}: ToggleSwitchProps) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-800 last:border-b-0">
    <div className="pr-2">
      <p className="font-medium text-white text-sm md:text-base">{label}</p>
      <p className="text-[11px] md:text-sm text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-focus:outline-none peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
    </label>
  </div>
);

export default function SettingsPage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <SettingsShell
      title="ตั้งค่า"
      description="จัดการความชอบส่วนตัวและความปลอดภัย"
    >
      <div className="space-y-8">
        

        {/* Notifications Section */}
        <section className="bg-[#161b22] border border-gray-800 rounded-xl p-5 md:p-8">
          <h2 className="text-lg font-semibold text-white mb-2 flex items-center border-b border-gray-800 pb-2">
            <Bell className="w-4 h-4 mr-2 text-purple-500" /> การแจ้งเตือน
          </h2>
          <ToggleSwitch
            label="แจ้งเตือนกิจกรรม"
            description="รับการแจ้งเตือนความคืบหน้าผ่านแอปและอีเมล"
            isChecked={notificationsEnabled}
            onChange={() => setNotificationsEnabled(!notificationsEnabled)}
          />
        </section>

        {/* Security Section */}
        <section className="bg-[#161b22] border border-gray-800 rounded-xl p-5 md:p-8">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center border-b border-gray-800 pb-2">
            <Lock className="w-4 h-4 mr-2 text-purple-500" /> ความปลอดภัย
          </h2>
          <div className="divide-y divide-gray-800">
            <div className="flex justify-between items-center py-4">
              <div className="pr-4">
                <p className="font-medium text-white text-sm md:text-base">
                  รหัสผ่าน
                </p>
                <p className="text-[11px] md:text-sm text-gray-500">
                  เปลี่ยนรหัสผ่านล่าสุดเมื่อ 3 เดือนที่แล้ว
                </p>
              </div>
              <button className="flex-shrink-0 px-4 py-1.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-xs md:text-sm border border-gray-700 transition-colors">
                เปลี่ยน
              </button>
            </div>
            <div className="flex justify-between items-center py-4">
              <div className="pr-4">
                <p className="font-medium text-white text-sm md:text-base flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-1 text-green-400 flex-shrink-0" />{" "}
                  ยืนยัน 2 ชั้น (2FA)
                </p>
                <p className="text-[11px] md:text-sm text-gray-500">
                  เพิ่มความปลอดภัยอีกระดับ
                </p>
              </div>
              <button className="flex-shrink-0 px-4 py-1.5 bg-purple-600/10 hover:bg-purple-600/20 text-purple-400 border border-purple-500/30 rounded-lg text-xs md:text-sm transition-colors font-medium">
                ตั้งค่า
              </button>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="bg-red-500/5 border border-red-500/20 rounded-xl p-5 md:p-8 mb-10">
          <h2 className="text-lg font-semibold text-red-500 mb-4 flex items-center border-b border-red-500/10 pb-2">
            <Zap className="w-4 h-4 mr-2" /> โซนอันตราย
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-medium text-red-400 text-sm md:text-base">
                ลบบัญชีผู้ใช้
              </p>
              <p className="text-[11px] md:text-sm text-gray-500">
                ข้อมูลทั้งหมดจะถูกลบถาวร
              </p>
            </div>
            <button className="w-full sm:w-auto px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs md:text-sm transition-all font-bold shadow-lg shadow-red-900/20">
              ลบบัญชี
            </button>
          </div>
        </section>
      </div>
    </SettingsShell>
  );
}

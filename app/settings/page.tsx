// app/settings/page.tsx
"use client";

import { Bell, Zap, Lock, ShieldCheck, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import SettingsShell from "@/components/settings-shell";
import WarningModal from "@/components/WarningModal";

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
  const supabase = createClient();
  const router = useRouter();

  const [loadingReset, setLoadingReset] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [email, setEmail] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // --- Modal States ---
  const [showResetSuccess, setShowResetSuccess] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // Step 1
  const [showDeleteInput, setShowDeleteInput] = useState(false); // Step 2
  const [deleteInputValue, setDeleteInputValue] = useState("");

  // 1. Fetch User Data
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user?.email) setEmail(user.email);
    };
    getUser();
  }, [supabase]);

  // 2. Logic: Reset Password
  const handleResetPassword = async () => {
    if (!email) return;
    setLoadingReset(true);
    setResetError(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });

    setLoadingReset(false);

    if (error) {
      setResetError(error.message);
    } else {
      setShowResetSuccess(true);
    }
  };

  // 3. Logic: Delete Account
  const confirmFirstStep = () => {
    setShowDeleteConfirm(false);
    setShowDeleteInput(true);
    setDeleteInputValue("");
  };

  const handleFinalDelete = async () => {
    if (deleteInputValue !== "DELETE") {
      // Should handle validation in UI, but safe guard here
      return;
    }

    setLoadingDelete(true);

    try {
      // Step C: Call API
      const res = await fetch("/api/auth/delete-account", {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "ลบบัญชีไม่สำเร็จ");
      }

      // Step D: Sign out & Redirect
      await supabase.auth.signOut();

      // No alert needed, just redirect
      router.push("/");
      router.refresh();
    } catch (error: any) {
      console.error(error);
      setResetError(error.message); // Reuse Error Modal
    } finally {
      setLoadingDelete(false);
      setShowDeleteInput(false);
    }
  };

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
            {/* Password Reset */}
            <div className="flex justify-between items-center py-4">
              <div className="pr-4">
                <p className="font-medium text-white text-sm md:text-base">
                  เปลี่ยนรหัสผ่าน
                </p>
                <p className="text-[11px] md:text-sm text-gray-500">
                  ส่งลิงก์รีเซ็ตรหัสผ่านไปที่อีเมลของคุณ
                </p>
              </div>
              <button
                onClick={handleResetPassword}
                disabled={loadingReset}
                className="flex items-center justify-center flex-shrink-0 px-4 py-1.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-xs md:text-sm border border-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[80px]"
              >
                {loadingReset ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "เปลี่ยน"
                )}
              </button>
            </div>

            {/* 2FA Placeholder */}
            <div className="flex justify-between items-center py-4">
              <div className="pr-4">
                <p className="font-medium text-white text-sm md:text-base flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-1 text-green-400 flex-shrink-0" />{" "}
                  ยืนยัน 2 ชั้น (2FA)
                </p>
                <p className="text-[11px] md:text-sm text-gray-500">
                  (Coming Soon) เพิ่มความปลอดภัยอีกระดับ
                </p>
              </div>
              <button
                disabled
                className="flex-shrink-0 px-4 py-1.5 bg-gray-800/50 text-gray-500 border border-gray-700/50 rounded-lg text-xs md:text-sm cursor-not-allowed"
              >
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
                ข้อมูลทั้งหมดจะถูกลบถาวรและไม่สามารถกู้คืนได้
              </p>
            </div>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              disabled={loadingDelete}
              className="w-full sm:w-auto px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs md:text-sm transition-all font-bold shadow-lg shadow-red-900/20 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingDelete ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> กำลังลบ...
                </>
              ) : (
                "ลบบัญชี"
              )}
            </button>
          </div>
        </section>
      </div>

      {/* --- Modals --- */}

      {/* 1. Reset Password Success */}
      <WarningModal
        isOpen={showResetSuccess}
        onClose={() => setShowResetSuccess(false)}
        title="ตรวจสอบอีเมล"
        message={`ส่งลิงก์เปลี่ยนรหัสผ่านไปที่ ${email} เรียบร้อยแล้ว\nกรุณาเช็คกล่องจดหมาย (หรือ Junk/Spam)`}
        variant="success"
      />

      {/* 2. Generic Error Modal (for Reset or Delete error) */}
      <WarningModal
        isOpen={!!resetError}
        onClose={() => setResetError(null)}
        title="แจ้งเตือน"
        message={resetError || "เกิดข้อผิดพลาด"}
        variant="danger"
      />

      {/* 3. Delete Account Step 1: Confirm */}
      <WarningModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        title="ยืนยันการลบบัญชี"
        message="⚠️ คำเตือน: ข้อมูลโปรไฟล์, ความคืบหน้าการเรียน, และ Bookmark ทั้งหมดจะหายไปถาวรและกู้คืนไม่ได้ คุณแน่ใจหรือไม่?"
        variant="danger"
        confirmLabel="ลบข้อมูล"
        onConfirm={confirmFirstStep}
      />

      {/* 4. Delete Account Step 2: Type Confirmation */}
      <WarningModal
        isOpen={showDeleteInput}
        onClose={() => setShowDeleteInput(false)}
        title="ป้อนคำยืนยัน"
        message="พิมพ์คำว่า 'DELETE' ในช่องด้านล่างเพื่อยืนยันการลบ"
        variant="danger"
        confirmLabel={loadingDelete ? "กำลังลบ..." : "ลบทันที"}
        onConfirm={handleFinalDelete}
      >
        <input
          type="text"
          value={deleteInputValue}
          onChange={(e) => setDeleteInputValue(e.target.value)}
          placeholder="DELETE"
          className="w-full bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block p-2.5 text-center font-bold tracking-widest"
        />
        {deleteInputValue !== "DELETE" && deleteInputValue !== "" && (
          <p className="text-red-500 text-xs mt-2">
            * กรุณาพิมพ์ให้ถูกต้อง (ตัวพิมพ์ใหญ่ทั้งหมด)
          </p>
        )}
      </WarningModal>
    </SettingsShell>
  );
}

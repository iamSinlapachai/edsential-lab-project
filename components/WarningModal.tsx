// components/WarningModal.tsx
import React from "react";
import { AlertTriangle, CheckCircle2, Info } from "lucide-react"; // ใช้ไอคอนจาก lucide เพื่อความสวยงาม

interface WarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  onConfirm?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "danger" | "success";
  children?: React.ReactNode;
}

export default function WarningModal({
  isOpen,
  onClose,
  title = "แจ้งเตือน",
  message,
  onConfirm,
  confirmLabel = "ตกลง",
  cancelLabel = "ยกเลิก",
  variant = "default",
  children,
}: WarningModalProps) {
  if (!isOpen) return null;

  // 1. กำหนดค่าสีตาม Variant ให้เข้ากับธีมมืด
  let iconColor = "text-purple-400";
  let iconBg = "bg-purple-500/10";
  let accentColor = "bg-purple-600 hover:bg-purple-700 shadow-purple-600/20";
  let Icon = AlertTriangle;

  if (variant === "danger") {
    iconColor = "text-red-400";
    iconBg = "bg-red-500/10";
    accentColor = "bg-red-600 hover:bg-red-700 shadow-red-600/20";
    Icon = AlertTriangle;
  } else if (variant === "success") {
    iconColor = "text-purple-400";
    iconBg = "bg-purple-500/10";
    accentColor = "bg-purple-600 hover:bg-purple-700 shadow-purple-600/20";
    Icon = CheckCircle2;
  } else {
    Icon = Info;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="relative bg-slate-900 border border-slate-700/50 rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* แสงฟุ้งด้านหลังไอคอน */}
        <div className={`absolute -top-10 left-1/2 -translate-x-1/2 h-32 w-32 rounded-full blur-3xl opacity-20 pointer-events-none ${variant === 'danger' ? 'bg-red-600' : variant === 'success' ? 'bg-green-600' : 'bg-purple-600'}`} />

        {/* Header: แสดงไอคอนตามประเภท */}
        <div className="pt-8 pb-4 flex justify-center relative z-10">
          <div className={`${iconBg} ${iconColor} rounded-2xl p-4 border border-white/5`}>
            <Icon size={40} />
          </div>
        </div>

        {/* Content */}
        <div className="px-8 pb-8 text-center relative z-10">
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line mb-6">
            {message}
          </p>

          {/* ถ้ามี Children (เช่น Input เพิ่มเติม) */}
          {children && <div className="mb-6 text-left">{children}</div>}

          {/* ปุ่มกด */}
          <div className="flex gap-3 justify-center">
            {onConfirm ? (
              <>
                <button
                  onClick={onClose}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-3 px-4 rounded-xl transition-all active:scale-95 border border-slate-700"
                >
                  {cancelLabel}
                </button>
                <button
                  onClick={onConfirm}
                  className={`flex-1 text-white font-semibold py-3 px-4 rounded-xl transition-all active:scale-95 shadow-lg ${accentColor}`}
                >
                  {confirmLabel}
                </button>
              </>
            ) : (
              <button
                onClick={onClose}
                className={`w-full text-white font-semibold py-3 px-4 rounded-xl transition-all active:scale-95 shadow-lg ${accentColor}`}
              >
                {confirmLabel || "เข้าใจแล้ว"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
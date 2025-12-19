// components/WarningModal.tsx
import React from "react";

interface WarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
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
}: {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  onConfirm?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "danger" | "success";
  children?: React.ReactNode;
}) {
  if (!isOpen) return null;

  // Determine styles based on variant
  let headerBg = "bg-amber-100";
  let iconBg = "bg-amber-500";
  let buttonColor = "bg-gray-900 hover:bg-gray-800";

  if (variant === "danger") {
    headerBg = "bg-red-100";
    iconBg = "bg-red-500";
    buttonColor = "bg-red-600 hover:bg-red-700";
  } else if (variant === "success") {
    headerBg = "bg-green-100";
    iconBg = "bg-green-500";
    buttonColor = "bg-green-600 hover:bg-green-700";
  }

  return (
    // 1. Overlay: พื้นหลังสีดำจางๆ เต็มจอ
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      {/* 2. Modal Box: กล่องข้อความ */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header: ส่วนหัวใส่สี หรือไอคอน */}
        <div className={`${headerBg} p-4 flex justify-center`}>
          <div className={`${iconBg} text-white rounded-full p-2`}>
            {/* Icon Based on Variant */}
            {variant === "success" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
            )}
          </div>
        </div>

        {/* Content: เนื้อหา */}
        <div className="p-6 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 mb-4 leading-relaxed whitespace-pre-line">
            {message}
          </p>

          {/* Custom Input or Content */}
          {children && <div className="mb-6">{children}</div>}

          {/* Buttons */}
          <div className="flex gap-3 justify-center">
            {onConfirm ? (
              <>
                <button
                  onClick={onClose}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2.5 px-4 rounded-lg transition-colors"
                >
                  {cancelLabel}
                </button>
                <button
                  onClick={onConfirm}
                  className={`flex-1 text-white font-medium py-2.5 px-4 rounded-lg transition-colors ${buttonColor}`}
                >
                  {confirmLabel}
                </button>
              </>
            ) : (
              <button
                onClick={onClose}
                className={`w-full text-white font-medium py-2.5 px-4 rounded-lg transition-colors ${buttonColor}`}
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

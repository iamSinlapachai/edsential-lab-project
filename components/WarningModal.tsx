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
}: WarningModalProps) {
  if (!isOpen) return null;

  return (
    // 1. Overlay: พื้นหลังสีดำจางๆ เต็มจอ
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      {/* 2. Modal Box: กล่องข้อความ */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header: ส่วนหัวใส่สี หรือไอคอน */}
        <div className="bg-amber-100 p-4 flex justify-center">
          <div className="bg-amber-500 text-white rounded-full p-2">
            {/* Icon ตกใจ (Exclamation) */}
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
          </div>
        </div>

        {/* Content: เนื้อหา */}
        <div className="p-6 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">{message}</p>

          {/* Button: ปุ่มปิด */}
          <button
            onClick={onClose}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
          >
            เข้าใจแล้ว
          </button>
        </div>
      </div>
    </div>
  );
}

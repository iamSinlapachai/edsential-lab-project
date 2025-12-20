import React from "react";
import { X, CheckCircle2, Circle, Loader2 } from "lucide-react";
import { getIcon } from "@/utils/iconMap";

interface EdsentialNode {
  id: number;
  sequence_order: number;
  title: string;
  category: string;
  description: string;
  video_id: string;
  icon_name: string;
  color_class: string;
}

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  node: EdsentialNode | null;
  isCompleted: boolean;
  onToggle: (id: number) => void;
  isLoading: boolean;
}

const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  node,
  isCompleted,
  onToggle,
  isLoading,
}) => {
  if (!isOpen || !node) return null;

  return (
    /* ✅ Container หลัก: scroll ได้ทั้งหน้า */
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* ✅ Modal */}
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#1a1d26] rounded-2xl border border-purple-500/30 shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header (fixed) */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-linear-to-br from-purple-900/20 to-transparent shrink-0">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${node.color_class}`}>
              {getIcon(node.icon_name)}
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                {node.category}
              </p>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                {node.title}
                {isCompleted && (
                  <CheckCircle2 className="text-green-500 w-6 h-6" />
                )}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* ✅ Body (scroll ได้) */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-black ring-1 ring-white/10 mb-6">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${node.video_id}`}
              allowFullScreen
              title={node.title}
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-gray-300 whitespace-pre-line leading-relaxed">
              {node.description}
            </p>
          </div>
        </div>

        {/* Footer (fixed) */}
        <div className="p-4 bg-[#13151c] border-t border-white/10 flex justify-between items-center shrink-0">
          <button
            onClick={() => onToggle(node.id)}
            disabled={isLoading}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              isCompleted
                ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isLoading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : isCompleted ? (
              <CheckCircle2 size={20} />
            ) : (
              <Circle size={20} />
            )}
            {isCompleted ? "เรียนจบแล้ว" : "ยังไม่เรียนจบ"}
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;

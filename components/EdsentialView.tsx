"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient"; // Client-side client
import { User } from "@supabase/supabase-js";
import { getIcon } from "@/utils/iconMap"; // เรียกใช้ Utility ที่สร้างตะกี้
import {
  Play,
  X,
  ChevronRight,
  CheckCircle2,
  Circle,
  Trophy,
  Loader2,
} from "lucide-react";

// Types ที่ตรงกับ Database ใหม่
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

interface EdsentialViewProps {
  title: string;
  description: string;
  nodes: EdsentialNode[]; // รับข้อมูล Nodes มาจาก Server Component
}

// Modal Component (ใส่ไว้ในไฟล์เดียวกันหรือแยกก็ได้)
const Modal = ({
  isOpen,
  onClose,
  node,
  isCompleted,
  onToggle,
  isLoading,
}: any) => {
  if (!isOpen || !node) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-3xl bg-[#1a1d26] rounded-2xl border border-purple-500/30 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-linear-to-br from-purple-900/20 to-transparent">
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
            className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>
        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-black ring-1 ring-white/10 mb-6">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${node.video_id}?autoplay=1`}
              allowFullScreen
            ></iframe>
          </div>
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-gray-300 whitespace-pre-line">
              {node.description}
            </p>
          </div>
        </div>
        {/* Footer */}
        <div className="p-4 bg-[#13151c] border-t border-white/10 flex justify-between items-center">
          <button
            onClick={() => onToggle(node.id)}
            disabled={isLoading}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              isCompleted
                ? "bg-green-500/10 text-green-500"
                : "bg-white/5 text-gray-400"
            } ${isLoading ? "opacity-50" : ""}`}
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
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};

export default function EdsentialView({
  title,
  description,
  nodes,
}: EdsentialViewProps) {
  const router = useRouter();
  const supabase = createClient();

  const [selectedNode, setSelectedNode] = useState<EdsentialNode | null>(null);
  const [completedIds, setCompletedIds] = useState<number[]>([]); // เก็บ node_id
  const [user, setUser] = useState<User | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  // 1. Initial Load
  useEffect(() => {
    const initData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        // เปลี่ยนจาก topic_id เป็น node_id ตามตาราง user_progress ใหม่
        const { data } = await supabase
          .from("user_progress")
          .select("node_id")
          .eq("user_id", user.id);

        if (data) setCompletedIds(data.map((item) => item.node_id));
      }
    };
    initData();
  }, [supabase]);

  // 2. Toggle Logic
  const toggleProgress = async (nodeId: number) => {
    if (!user) {
      if (confirm("กรุณาเข้าสู่ระบบเพื่อบันทึกความคืบหน้า"))
        router.push("/login");
      return;
    }

    // Check Sequence
    const currentIndex = nodes.findIndex((n) => n.id === nodeId);
    if (currentIndex > 0 && !completedIds.includes(nodeId)) {
      const prevNode = nodes[currentIndex - 1];
      if (!completedIds.includes(prevNode.id)) {
        alert("ควรเรียนรู้ตามลำดับเส้นทาง เพื่อให้ได้ผลลัพธ์ที่ดีที่สุด");
        return;
      }
    }

    setActionLoading(true);
    const isAlreadyCompleted = completedIds.includes(nodeId);

    // Optimistic UI
    setCompletedIds((prev) =>
      isAlreadyCompleted
        ? prev.filter((id) => id !== nodeId)
        : [...prev, nodeId]
    );

    try {
      if (isAlreadyCompleted) {
        // Delete by node_id
        await supabase
          .from("user_progress")
          .delete()
          .eq("user_id", user.id)
          .eq("node_id", nodeId);
      } else {
        // Insert node_id
        await supabase
          .from("user_progress")
          .insert({ user_id: user.id, node_id: nodeId });
      }
    } catch (error) {
      console.error("Error:", error);
      // Revert if error
      setCompletedIds((prev) =>
        isAlreadyCompleted
          ? [...prev, nodeId]
          : prev.filter((id) => id !== nodeId)
      );
    } finally {
      setActionLoading(false);
    }
  };

  const progressPercent = Math.round(
    (completedIds.length / nodes.length) * 100
  );

  return (
    <main className="min-h-screen bg-[#0B0D13] text-gray-300 selection:bg-purple-500/30">
      {/* Sticky Progress Bar */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-[#0B0D13]/90 backdrop-blur-md border-b border-white/5 px-4 py-3 shadow-lg">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <div className="flex-1">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Your Progress</span>
              <span className="text-purple-400 font-bold">
                {progressPercent}% Completed
              </span>
            </div>
            <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ease-out ${
                  progressPercent === 100 ? "bg-green-500" : "bg-purple-500"
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          {progressPercent === 100 && (
            <Trophy className="text-yellow-500 animate-pulse" />
          )}
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative pt-28 pb-16 px-4 text-center">
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-linear-to-br from-purple-400 via-pink-400 to-purple-600 mb-6">
            {title}
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {description}
          </p>
        </div>
      </div>

      {/* Nodes Loop */}
      <div className="max-w-5xl mx-auto px-4 pb-32 mt-10 relative">
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-purple-900/50 md:-translate-x-1/2 rounded-full" />

        {nodes.map((node, index) => {
          const isEven = index % 2 === 0;
          const isCompleted = completedIds.includes(node.id);
          return (
            <div
              key={node.id}
              className={`relative flex items-center mb-12 md:mb-24 ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Connector Dot */}
              <div
                className={`absolute left-8 md:left-1/2 -translate-x-[5px] md:-translate-x-1/2 w-4 h-4 rounded-full z-10 border-[3px] ${
                  isCompleted
                    ? "bg-green-500 border-green-500 scale-125"
                    : "bg-[#0B0D13] border-purple-500"
                }`}
              />

              {/* Spacer */}
              <div className="hidden md:block md:w-1/2" />

              {/* Card */}
              <div
                className={`w-full md:w-1/2 pl-20 md:pl-0 ${
                  isEven ? "md:pr-12" : "md:pl-12"
                }`}
              >
                <div
                  onClick={() => setSelectedNode(node)}
                  className={`group relative p-6 rounded-2xl cursor-pointer border ${
                    isCompleted
                      ? "bg-[#13151c] border-green-500/30"
                      : "bg-[#13151c] border-white/5 hover:border-purple-500/50"
                  }`}
                >
                  <div className="absolute top-4 right-4 text-5xl font-black text-white/5">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="relative z-10">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${node.color_class}`}
                    >
                      {node.category}
                    </span>
                    <h3
                      className={`text-2xl font-bold mb-2 flex items-center gap-2 ${
                        isCompleted ? "text-gray-200" : "text-white"
                      }`}
                    >
                      {node.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                      {node.description.replace(/\*\*/g, "")}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2 text-sm text-purple-400">
                        <Play size={16} />
                        <span>ดูวิดีโอ</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleProgress(node.id);
                        }}
                        disabled={actionLoading}
                        className={`z-20 p-2 rounded-full ${
                          isCompleted
                            ? "text-green-500 bg-green-500/10"
                            : "text-gray-600 hover:bg-white/10"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 size={20} />
                        ) : (
                          <Circle size={20} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Modal
        isOpen={!!selectedNode}
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
        isCompleted={
          selectedNode ? completedIds.includes(selectedNode.id) : false
        }
        onToggle={toggleProgress}
        isLoading={actionLoading}
      />
    </main>
  );
}

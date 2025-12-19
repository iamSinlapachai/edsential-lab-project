"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";
import { getIcon } from "@/utils/iconMap";
import {
  Play,
  X,
  ChevronRight,
  CheckCircle2,
  Circle,
  Trophy,
  Loader2,
} from "lucide-react";

// --- Types ---
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
  nodes: EdsentialNode[];
}

// --- Modal Component ---
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
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Content */}
      <div className="relative w-full max-w-3xl bg-[#1a1d26] rounded-2xl border border-purple-500/30 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-br from-purple-900/20 to-transparent">
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

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-black ring-1 ring-white/10 mb-6">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              // ลบ ?autoplay=1 ออกเพื่อให้ User กดเล่นเอง
              src={`https://www.youtube.com/embed/${node.video_id}`}
              allowFullScreen
              title={node.title}
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-gray-300 whitespace-pre-line leading-relaxed">
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

// --- Main Component ---
export default function EdsentialView({
  title,
  description,
  nodes,
}: EdsentialViewProps) {
  const router = useRouter();
  const supabase = createClient();

  const [selectedNode, setSelectedNode] = useState<EdsentialNode | null>(null);
  const [completedIds, setCompletedIds] = useState<number[]>([]);
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
        const { data } = await supabase
          .from("user_progress")
          .select("node_id")
          .eq("user_id", user.id);

        if (data) setCompletedIds(data.map((item) => item.node_id));
      }
    };
    initData();
  }, [supabase]);

  // ฟังก์ชันช่วยอัปเดต Streak
  const updateStreak = async (userId: string) => {
    const { data: profile } = await supabase
      .from("profiles")
      .select("current_streak, last_activity_date")
      .eq("id", userId)
      .single();

    const today = new Date().toISOString().split("T")[0];
    const lastDate = profile?.last_activity_date;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    let newStreak = profile?.current_streak || 0;

    if (lastDate === today) {
      return;
    } else if (lastDate === yesterdayStr) {
      newStreak += 1;
    } else {
      newStreak = 1;
    }

    await supabase
      .from("profiles")
      .update({
        current_streak: newStreak,
        last_activity_date: today,
      })
      .eq("id", userId);
  };

  // 2. Toggle Logic
  const toggleProgress = async (nodeId: number) => {
    if (!user) {
      if (confirm("กรุณาเข้าสู่ระบบเพื่อบันทึกความคืบหน้า"))
        router.push("/login");
      return;
    }

    // Check Sequence Logic
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

    // Optimistic UI Update
    setCompletedIds((prev) =>
      isAlreadyCompleted
        ? prev.filter((id) => id !== nodeId)
        : [...prev, nodeId]
    );

    try {
      if (isAlreadyCompleted) {
        // กรณีลบ (Uncheck)
        await supabase
          .from("user_progress")
          .delete()
          .eq("user_id", user.id)
          .eq("node_id", nodeId);
      } else {
        // กรณีเพิ่ม (Check)
        await supabase
          .from("user_progress")
          .insert({ user_id: user.id, node_id: nodeId });

        // ✅ อัปเดต Streak เมื่อเรียนจบ
        await updateStreak(user.id);
      }

      // ✅ สั่ง Refresh เพื่อให้หน้า Home และ Navbar รับรู้ข้อมูลใหม่ทันที
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
      // Revert state if error
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
      <div className="fixed top-16 left-0 right-0 z-40 bg-[#0B0D13]/90 backdrop-blur-md border-b border-white/5 px-4 py-3 shadow-lg transition-all">
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
            <div className="flex items-center gap-2 text-yellow-500 animate-pulse font-bold text-sm whitespace-nowrap">
              <Trophy size={16} />
              <span className="hidden sm:inline">Certified!</span>
            </div>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative pt-28 pb-16 px-4 text-center">
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-400 via-pink-400 to-purple-600 mb-6 drop-shadow-2xl">
            {title}
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Nodes Loop */}
      <div className="max-w-5xl mx-auto px-4 pb-32 mt-10 relative">
        {/* Center Line */}
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
                className={`absolute left-8 md:left-1/2 -translate-x-[5px] md:-translate-x-1/2 w-4 h-4 rounded-full z-10 border-[3px] shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all duration-500 ${
                  isCompleted
                    ? "bg-green-500 border-green-500 scale-125"
                    : "bg-[#0B0D13] border-purple-500"
                }`}
              >
                {!isCompleted && (
                  <div className="absolute inset-0 bg-purple-500 rounded-full animate-ping opacity-20"></div>
                )}
              </div>

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
                  className={`group relative p-6 rounded-2xl cursor-pointer border transition-all duration-300 hover:-translate-y-1 overflow-hidden ${
                    isCompleted
                      ? "bg-[#13151c] border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.1)]"
                      : "bg-[#13151c] border-white/5 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10"
                  }`}
                >
                  {/* Glow Effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                      isCompleted
                        ? "from-green-500/5 to-transparent"
                        : "from-purple-500/5 to-transparent"
                    }`}
                  />

                  <div className="absolute top-4 right-4 text-5xl font-black text-white/5 group-hover:text-purple-500/10 transition-colors select-none">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="relative z-10">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${node.color_class}`}
                    >
                      {node.category}
                    </span>
                    <h3
                      className={`text-2xl font-bold mb-2 flex items-center gap-2 transition-colors ${
                        isCompleted
                          ? "text-gray-200"
                          : "text-white group-hover:text-purple-400"
                      }`}
                    >
                      {node.title}
                      {!isCompleted && (
                        <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-purple-500" />
                      )}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-4 group-hover:text-gray-400 transition-colors">
                      {node.description.replace(/\*\*/g, "")}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2 text-sm text-purple-400 group-hover:text-purple-300">
                        <Play size={16} fill="currentColor" />
                        <span>ดูวิดีโอประกอบ</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleProgress(node.id);
                        }}
                        disabled={actionLoading}
                        className={`z-20 p-2 rounded-full transition-all ${
                          isCompleted
                            ? "text-green-500 bg-green-500/10"
                            : "text-gray-600 hover:bg-white/10 hover:text-gray-300"
                        } ${
                          actionLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        title={
                          isCompleted
                            ? "Mark as Incomplete"
                            : "Mark as Completed"
                        }
                      >
                        {actionLoading && selectedNode?.id === node.id ? (
                          <Loader2 size={20} className="animate-spin" />
                        ) : isCompleted ? (
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

        {/* End Node */}
        <div className="relative flex justify-center mt-12 pl-8 md:pl-0">
          <div
            className={`px-6 py-3 rounded-full flex items-center gap-3 shadow-lg z-10 border transition-all duration-500 ${
              progressPercent === 100
                ? "bg-green-500/10 border-green-500/50 text-green-400 shadow-green-500/20"
                : "bg-[#13151c] border-purple-500/30 text-purple-300"
            }`}
          >
            {progressPercent === 100 ? (
              <Trophy className="w-5 h-5" />
            ) : (
              <CheckCircle2 className="w-5 h-5" />
            )}
            <span className="font-semibold">
              {progressPercent === 100 ? "Ready to Work!" : "พร้อมทำงานจริง!"}
            </span>
          </div>
        </div>
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

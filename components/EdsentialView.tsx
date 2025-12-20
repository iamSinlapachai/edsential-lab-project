"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";
import { getIcon } from "@/utils/iconMap";
import {
  Play,
  ChevronRight,
  CheckCircle2,
  Circle,
  Trophy,
  Loader2,
} from "lucide-react";
import WarningModal from "@/components/WarningModal";
import VideoModal from "@/components/VideoModal";

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

  // --- Warning Modal State ---
  const [warningConfig, setWarningConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm?: () => void;
    confirmLabel?: string;
    variant?: "default" | "danger" | "success";
  }>({
    isOpen: false,
    title: "",
    message: "",
  });

  const closeWarning = () => {
    setWarningConfig((prev) => ({ ...prev, isOpen: false }));
  };

  // 1. Initial Load: ดึงข้อมูล User และ Progress
  useEffect(() => {
    const initData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        // ดึง node_id ที่จบแล้วทั้งหมดของผู้ใช้ (รวมทุกคอร์ส)
        const { data } = await supabase
          .from("user_progress")
          .select("node_id")
          .eq("user_id", user.id);

        if (data) setCompletedIds(data.map((item) => item.node_id));
      }
    };
    initData();
  }, [supabase]);

  // --- Helper: Update Streak Logic ---
  const updateStreak = async (userId: string) => {
    const { data: profile } = await supabase
      .from("profiles")
      .select("current_streak, last_activity_date")
      .eq("id", userId)
      .single();

    const now = new Date();
    const todayStr = now.toISOString().split("T")[0];

    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    const lastDate = profile?.last_activity_date;
    let newStreak = profile?.current_streak || 0;

    if (lastDate === todayStr) {
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
        last_activity_date: todayStr,
      })
      .eq("id", userId);
  };

  // 2. Toggle Logic (Save/Unsave)
  const toggleProgress = async (nodeId: number) => {
    if (!user) {
      setWarningConfig({
        isOpen: true,
        title: "กรุณาเข้าสู่ระบบ",
        message: "คุณต้องเข้าสู่ระบบก่อนจึงจะสามารถบันทึกความคืบหน้าได้",
        confirmLabel: "เข้าสู่ระบบ",
        onConfirm: () => router.push("/login"),
      });
      return;
    }

    const currentIndex = nodes.findIndex((n) => n.id === nodeId);
    if (currentIndex > 0 && !completedIds.includes(nodeId)) {
      const prevNode = nodes[currentIndex - 1];
      if (!completedIds.includes(prevNode.id)) {
        setWarningConfig({
          isOpen: true,
          title: "เรียนข้ามขั้นตอน?",
          message:
            "แนะนำให้เรียนรู้ตามลำดับเส้นทาง เพื่อให้ได้ผลลัพธ์ที่ดีที่สุด",
          variant: "default",
        });
        return;
      }
    }

    setActionLoading(true);
    const isAlreadyCompleted = completedIds.includes(nodeId);

    setCompletedIds((prev) =>
      isAlreadyCompleted
        ? prev.filter((id) => id !== nodeId)
        : [...prev, nodeId]
    );

    try {
      if (isAlreadyCompleted) {
        await supabase
          .from("user_progress")
          .delete()
          .eq("user_id", user.id)
          .eq("node_id", nodeId);
      } else {
        await supabase
          .from("user_progress")
          .insert({ user_id: user.id, node_id: nodeId });

        await updateStreak(user.id);
      }
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
      setCompletedIds((prev) =>
        isAlreadyCompleted
          ? [...prev, nodeId]
          : prev.filter((id) => id !== nodeId)
      );
    } finally {
      setActionLoading(false);
    }
  };

  // ✅ แก้ไขการคำนวณ Progress ตรงนี้
  // กรองเฉพาะ completedIds ที่มีอยู่ใน nodes ของคอร์สปัจจุบัน
  const currentCourseCompletedIds = completedIds.filter((id) =>
    nodes.some((n) => n.id === id)
  );

  const progressPercent = nodes.length > 0 
    ? Math.round((currentCourseCompletedIds.length / nodes.length) * 100)
    : 0;

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
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-linear-to-br from-purple-400 via-pink-400 to-purple-600 mb-6 drop-shadow-2xl">
            {title}
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
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

              <div className="hidden md:block md:w-1/2" />

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
                  <div
                    className={`absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
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

      <VideoModal
        isOpen={!!selectedNode}
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
        isCompleted={
          selectedNode ? completedIds.includes(selectedNode.id) : false
        }
        onToggle={toggleProgress}
        isLoading={actionLoading}
      />

      <WarningModal
        isOpen={warningConfig.isOpen}
        onClose={closeWarning}
        title={warningConfig.title}
        message={warningConfig.message}
        onConfirm={warningConfig.onConfirm}
        confirmLabel={warningConfig.confirmLabel}
        variant={warningConfig.variant}
      />
    </main>
  );
}

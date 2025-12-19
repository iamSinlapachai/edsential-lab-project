//app\settings\edsential-progress\page.tsx
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import {
  CheckCircle2,
  Trophy,
  Zap,
  Flame,
  Target,
  BrainCircuit,
  Loader2,
} from "lucide-react";
import SettingsShell from "@/components/settings-shell";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// --- Types ---
type CategoryStat = {
  name: string;
  completed: number;
  total: number;
  percentage: number;
};

export default function EdsentialProgressPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);

  // State สำหรับข้อมูลจริง
  const [stats, setStats] = useState({
    xp: 0,
    level: 1,
    streak: 0,
    totalCompleted: 0,
  });

  const [categoryStats, setCategoryStats] = useState<CategoryStat[]>([]);
  const [weeklyActivity, setWeeklyActivity] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      // 1. ดึงข้อมูล Profile (XP, Streak)
      const { data: profile } = await supabase
        .from("profiles")
        .select("xp, level, current_streak")
        .eq("id", user.id)
        .single();

      // 2. ดึงข้อมูล Progress ทั้งหมดที่ User เคยทำ
      // join กับ edsential_nodes เพื่อเอา category
      const { data: progress } = await supabase
        .from("user_progress")
        .select(
          `
          created_at,
          edsential_nodes (
            category
          )
        `
        )
        .eq("user_id", user.id);

      if (progress) {
        // --- Logic A: คำนวณ Category Breakdown ---
        const catMap: Record<string, number> = {};
        progress.forEach((p: any) => {
          const cat = p.edsential_nodes?.category || "General";
          catMap[cat] = (catMap[cat] || 0) + 1;
        });

        // แปลงเป็น Array สำหรับกราฟ (สมมติ Total เป็น 10 หรือดึงจริงจาก DB ก็ได้)
        const categories = Object.keys(catMap).map((key) => ({
          name: key,
          completed: catMap[key],
          total: 20, // (ในระบบจริงควร query count ของแต่ละหมวดมา)
          percentage: Math.min(100, Math.round((catMap[key] / 20) * 100)),
        }));

        setCategoryStats(categories);

        // --- Logic B: คำนวณ Weekly Activity (7 วันล่าสุด) ---
        const last7Days = [...Array(7)]
          .map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return d.toISOString().split("T")[0]; // YYYY-MM-DD
          })
          .reverse();

        const activityData = last7Days.map((date) => ({
          date: new Date(date).toLocaleDateString("en-US", {
            weekday: "short",
          }), // Mon, Tue
          count: progress.filter((p: any) => p.created_at.startsWith(date))
            .length,
        }));

        setWeeklyActivity(activityData);

        // Update State รวม
        setStats({
          xp: profile?.xp || 0,
          level: profile?.level || 1,
          streak: profile?.current_streak || 0,
          totalCompleted: progress.length,
        });
      }
      setLoading(false);
    }

    fetchData();
  }, [supabase]);

  if (loading) {
    return (
      <SettingsShell title="ความคืบหน้า">
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="animate-spin text-purple-500 w-8 h-8" />
        </div>
      </SettingsShell>
    );
  }

  return (
    <SettingsShell title="ความคืบหน้าการเรียน" hideHeader={true}>
      {/* --- Header & Level --- */}
      <div className="flex justify-between items-end mb-8 border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400 text-sm">สถิติการเรียนรู้ของคุณ</p>
        </div>

        {/* Level Badge */}
        <div className="flex flex-col items-end">
          <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-1.5 rounded-full shadow-lg shadow-purple-500/20 border border-purple-400/30">
            <Zap className="w-5 h-5 fill-yellow-300 text-yellow-300" />
            <span className="text-base font-bold">LV. {stats.level}</span>
          </div>
          <p className="text-xs text-purple-400 mt-2 font-mono">
            XP: {stats.xp}
          </p>
        </div>
      </div>

      {/* --- 1. Top Stats Grid --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={CheckCircle2}
          value={stats.totalCompleted}
          label="บทเรียนที่จบ"
          color="text-green-400"
          bg="bg-green-500/10"
        />
        <StatCard
          icon={Flame}
          value={stats.streak}
          label="Day Streak"
          color="text-orange-500"
          bg="bg-orange-500/10"
        />
        <StatCard
          icon={Trophy}
          value={Math.floor(stats.xp / 1000)}
          label="Achievements"
          color="text-yellow-400"
          bg="bg-yellow-500/10"
        />
        <StatCard
          icon={BrainCircuit}
          value={categoryStats.length}
          label="Skills Learned"
          color="text-cyan-400"
          bg="bg-cyan-500/10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- 2. Skill Breakdown (ใช้ Progress Bar แทน Radar Chart เพื่อความคลีน) --- */}
        <div className="lg:col-span-2 bg-[#161b22] border border-gray-800 rounded-xl p-6 shadow-xl">
          <h2 className="text-lg font-semibold text-white mb-6 flex items-center">
            <Target className="w-5 h-5 mr-2 text-pink-500" /> ทักษะรายหมวดหมู่
          </h2>
          <div className="space-y-6">
            {categoryStats.length > 0 ? (
              categoryStats.map((cat, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-300">
                      {cat.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {cat.completed} บทเรียน
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      style={{ width: `${Math.min(cat.percentage, 100)}%` }} // สมมติว่าเต็มคือ 100%
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                ยังไม่มีข้อมูลการเรียน
              </p>
            )}
          </div>
        </div>

        {/* --- 3. Weekly Activity (Bar Chart) --- */}
        <div className="bg-[#161b22] border border-gray-800 rounded-xl p-6 shadow-xl">
          <h2 className="text-lg font-semibold text-white mb-6">
            Activity (7 วัน)
          </h2>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyActivity}>
                <XAxis
                  dataKey="date"
                  stroke="#6b7280"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    borderColor: "#374151",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {weeklyActivity.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.count > 0 ? "#a855f7" : "#374151"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-center text-gray-500 mt-4">
            จำนวนบทเรียนที่ทำสำเร็จในแต่ละวัน
          </p>
        </div>
      </div>
    </SettingsShell>
  );
}

// Sub-component for small stat cards
function StatCard({ icon: Icon, value, label, color, bg }: any) {
  return (
    <div className="bg-[#161b22] border border-gray-800 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:border-gray-700 transition-all">
      <div className={`p-3 rounded-full mb-3 ${bg}`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <span className="text-2xl font-bold text-white">{value}</span>
      <span className="text-xs text-gray-500 uppercase font-medium mt-1">
        {label}
      </span>
    </div>
  );
}

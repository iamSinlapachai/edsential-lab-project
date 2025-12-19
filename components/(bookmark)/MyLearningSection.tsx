import Link from "next/link";
import { createClient } from "@/lib/supabaseServer";
import { cookies } from "next/headers";
import { PlayCircle, Award } from "lucide-react";
import { getIcon } from "@/utils/iconMap"; // อย่าลืม import iconMap ที่เราทำไว้

export default async function MyLearningSection() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // 1. เช็ค User
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  // 2. ดึงรายการที่ Bookmark ไว้
  const { data: bookmarks } = await supabase
    .from("user_bookmarks")
    .select(
      `
      edsential_id,
      edsentials (
        id, slug, title, description, color_theme,
        edsential_nodes (count)
      )
    `
    )
    .eq("user_id", user.id);

  if (!bookmarks || bookmarks.length === 0) return null;

  // 3. ดึง Progress ที่เรียนไปแล้วของ User คนนี้
  const { data: progressData } = await supabase
    .from("user_progress")
    .select("node_id, edsential_nodes(edsential_id)")
    .eq("user_id", user.id);

  return (
    <div className="max-w-7xl mx-auto px-4 mb-16" data-aos="fade-up">
      <div className="flex items-center gap-3 mb-6">
        <PlayCircle className="w-6 h-6 text-purple-400" />
        <h2 className="text-2xl font-bold text-white">My Learning Paths</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookmarks.map((item: any) => {
          const course = item.edsentials;

          // คำนวณ Progress
          // A. จำนวนบทเรียนทั้งหมด
          const totalNodes = course.edsential_nodes[0]?.count || 0;

          // B. จำนวนที่เรียนจบแล้ว (Filter จาก progressData)
          const completedNodes =
            progressData?.filter(
              (p: any) => p.edsential_nodes?.edsential_id === course.id
            ).length || 0;

          // C. เปอร์เซ็นต์
          const percent =
            totalNodes > 0
              ? Math.round((completedNodes / totalNodes) * 100)
              : 0;

          return (
            <Link
              key={course.id}
              href={`/edsential/${course.slug}`}
              className="block bg-[#161b22] border border-purple-500/30 rounded-xl p-5 hover:border-purple-500 transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-lg text-white group-hover:text-purple-300 transition-colors">
                  {course.title}
                </h3>
                {percent === 100 && (
                  <Award className="text-yellow-500 w-6 h-6" />
                )}
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Progress</span>
                  <span className="text-purple-400 font-bold">{percent}%</span>
                </div>
                <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {completedNodes} / {totalNodes} บทเรียน
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

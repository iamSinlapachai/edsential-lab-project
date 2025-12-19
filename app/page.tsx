import Link from "next/link";
import "aos/dist/aos.css";
import { createClient } from "@/lib/supabaseServer"; // ใช้ Server Client
import { cookies } from "next/headers";
import BookmarkButton from "@/components/(bookmark)/BookmarkButton";
import MyLearningSection from "@/components/(bookmark)/MyLearningSection";

// เปลี่ยนเป็น async function เพราะเป็น Server Component
export default async function Home() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // 1. ดึงข้อมูล User (เพื่อเช็คว่า Bookmark อันไหนไว้แล้ว)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 2. ดึงข้อมูล Courses ทั้งหมดจาก Database
  const { data: courses } = await supabase
    .from("edsentials")
    .select("id, slug, title, description");

  // 3. ดึงรายการ Bookmark ของ User คนนี้ (ถ้ามี)
  let userBookmarks: number[] = [];
  if (user) {
    const { data } = await supabase
      .from("user_bookmarks")
      .select("edsential_id")
      .eq("user_id", user.id);
    if (data) userBookmarks = data.map((b) => b.edsential_id);
  }

  return (
    <div className="min-h-screen bg-[#0F1117] text-gray-300 selection:bg-[#7b4dff] selection:text-white pb-10 md:pb-20 z-10 relative">
      {/* Hero Section */}
      <div
        className="pt-12 md:pt-20 pb-8 md:pb-12 flex flex-col items-center text-center px-4 md:px-6"
        data-aos="fade-up"
      >
        {/* Background (เหมือนเดิม) */}
        <div className="absolute inset-0 -z-10 h-full w-full pointer-events-none">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 h-[600px] w-[500px] rounded-full bg-purple-600/20 blur-[150px]" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-[600px] w-[500px] rounded-full bg-fuchsia-600/20 blur-[150px]" />
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4 md:mb-6 tracking-wide">
          Careers Roadmaps
        </h1>
        <p className="max-w-2xl text-sm sm:text-base md:text-xl text-gray-400 leading-relaxed">
          เป็นตัวนำทางให้กับนักศึกษาในการเลือกเส้นทางเรียนรู้ ไปสู่สายอาชีพในฝัน
        </p>
      </div>

      {/* ✅ ส่วนแสดงผล My Learning (Bookmark + Progress) */}
      <MyLearningSection />

      {/* Filter Section */}
      <div className="flex justify-center mb-8 md:mb-10" data-aos="fade-up">
        <div className="bg-[#1e222e] border border-gray-800 rounded-lg px-4 py-1.5 text-xs sm:text-sm font-medium text-gray-300 shadow-sm cursor-default">
          All Roadmaps
        </div>
      </div>

      {/* Grid Section (ดึงจาก DB) */}
      <div
        className="max-w-7xl mx-auto px-4 md:px-4 sm:px-4"
        data-aos="fade-up"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {courses?.map((course) => (
            <Link
              key={course.id}
              href={`/edsential/${course.slug}`}
              className="group block bg-[#161b22] border border-gray-800 rounded-xl p-4 md:p-5 transition-all duration-200 hover:border-gray-600 hover:shadow-lg hover:-translate-y-0.5 relative"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-200 group-hover:text-white transition-colors text-sm sm:text-base">
                  {course.title}
                </span>

                {/* ✅ ใส่ปุ่ม Bookmark ที่เราสร้าง */}
                <BookmarkButton
                  edsentialId={course.id}
                  initialIsBookmarked={userBookmarks.includes(course.id)}
                  userId={user?.id}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

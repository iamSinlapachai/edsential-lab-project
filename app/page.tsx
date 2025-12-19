"use client";
import Link from "next/link";
import "aos/dist/aos.css"; // อย่าลืม import AOS.init ใน useEffect ถ้าจะใช้ animation

export default function Home() {
  const roles = [
    "AI Engineer",
    "Roblox Game Developer",
    "Web Developer",
    "Data Analyst",
    "Data Engineer",
    "UX UI Design",
  ];
  {
    /* "Affiliate Marketing", "Digital Marketing", "Marketing", "Graphic Design", "Video Editor", "Content Creator"*/
  }

  // ฟังก์ชันแปลงชื่อ Role ให้เป็น Slug (URL Friendly)
  const getSlug = (role: string) => {
    return role.toLowerCase().replace(/ /g, "-");
  };

  return (
    <div className="min-h-screen bg-[#0F1117] text-gray-300 selection:bg-[#7b4dff] selection:text-white pb-10 md:pb-20 z-10 relative">
      {/* Hero Section */}
      <div
        className="pt-12 md:pt-20 pb-8 md:pb-12 flex flex-col items-center text-center px-4 md:px-6 "
        data-aos="fade-up"
      >
        {/* Background */}
        <div className="absolute inset-0 -z-10 h-full w-full pointer-events-none">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 h-[600px] w-[500px] rounded-full bg-purple-600/20 blur-[150px]" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-[600px] w-[500px] rounded-full bg-fuchsia-600/20 blur-[150px]" />
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-600 mb-4 md:mb-6 tracking-wide">
          Careers Roadmaps
        </h1>
        <p className="max-w-2xl text-sm sm:text-base md:text-xl text-gray-400 leading-relaxed">
          เป็นตัวนำทางให้กับนักศึกษาในการเลือกเส้นทางเรียนรู้ ไปสู่สายอาชีพในฝัน
        </p>
      </div>

      {/* Filter Section */}
      <div className="flex justify-center mb-8 md:mb-10" data-aos="fade-up">
        <div className="bg-[#1e222e] border border-gray-800 rounded-lg px-4 py-1.5 text-xs sm:text-sm font-medium text-gray-300 shadow-sm cursor-default">
          Role-based Roadmaps
        </div>
      </div>

      {/* Grid Section */}
      <div
        className="max-w-7xl  mx-auto px-4 md:px-8 sm:px-8"
        data-aos="fade-up"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {roles.map((role) => (
            <Link
              key={role}
              // ✅ แก้ไขตรงนี้: เพิ่ม /edsential/ นำหน้า slug
              href={`/edsential/${getSlug(role)}`}
              className="group block bg-[#161b22] border border-gray-800 rounded-xl p-4 md:p-5 transition-all duration-200 hover:border-gray-600 hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-200 group-hover:text-white transition-colors text-sm sm:text-base">
                  {role}
                </span>

                {/* Save Icon (Bookmark) */}
                <button className="text-gray-600 hover:text-gray-300 transition-colors p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                  </svg>
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

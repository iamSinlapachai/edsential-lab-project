// หน้าแรกของเว็บไซต์
import Link from "next/link";

export default function Home() {
  const roles = [
    "AI Engineer", "Roblox Game Developer", "Web Developer"
  ];

  const getSlug = (role: string) => {
    return role.toLowerCase().replace(/ /g, "-");
  };

  return (
    <div className="min-h-screen bg-[#0F1117] text-gray-300 font-sans selection:bg-[#7b4dff] selection:text-white pb-10  md:pb-20">
      
      {/* Hero Section */}
      <div className="pt-12 md:pt-20 pb-8 md:pb-12 flex flex-col items-center text-center px-4 md:px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4 md:mb-6 tracking-tight">
          Developer Roadmaps
        </h1>
        <p className="max-w-2xl text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed">
          roadmap.sh is a community effort to create roadmaps, guides and other educational content to help guide developers in picking up a path and guide their learnings.
        </p>
      </div>

      {/* Filter Section */}
      <div className="flex justify-center mb-8 md:mb-10">
        <div className="bg-[#1e222e] border border-gray-800 rounded-lg px-4 py-1.5 text-xs sm:text-sm font-medium text-gray-300 shadow-sm cursor-default">
          Role-based Roadmaps
        </div>
      </div>

      {/* Grid Section */}
      <div className="max-w-7xl  mx-auto px-8 md:px-8 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {roles.map((role) => (
            <Link
              key={role}
              href={`/${getSlug(role)}`}
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

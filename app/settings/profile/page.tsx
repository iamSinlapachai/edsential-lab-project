// app/settings/profile/page.tsx

"use client"; 

import Link from "next/link";
// หากใช้ Context API: import { useProfile } from '../../context/ProfileContext'; 

import { 
    Settings, User, Globe, FileText, Lock, 
    LayoutDashboard, Search, Mail, Github, Linkedin, Briefcase, Code, Bookmark
} from "lucide-react";


// *** 1. ข้อมูล Profile เริ่มต้น (ลบ LinkedIn ออก) ***

const userProfile = {
  name: "Username", 
  title: "Full Stack Developer",
  bio: "Passionate developer focusing on scalable web applications and community contributions. Always learning new technologies.",
  email: "Email@example.com", 
  github: "Hexx-dev",
  // ลบ linkedin ออกแล้ว
  skills: [
    "TypeScript", "React", "Next.js", "Tailwind CSS",
    "Node.js", "Python", "Docker", "AWS",
  ],
};

const getSkillStyle = (skill: string) => {
  if (["TypeScript", "React", "Next.js", "Tailwind CSS"].includes(skill)) {
    return "bg-purple-600/20 text-purple-300 border-purple-500/50";
  }
  return "bg-gray-700/50 text-gray-400 border-gray-600/50";
};


// *** 2. ข้อมูลเมนูใน Sidebar (เหมือนเดิม) ***

const menuGroups = [
  {
    title: "บัญชี",
    links: [
      { name: "โปรไฟล์", href: "/settings/profile", icon: User }, 
      { name: "ตั้งค่า", href: "/settings/edsential", icon: Settings },
    ],
  },
  {
    title: "ข้อมูลองค์กร",
    links: [
      { name: "เกี่ยวกับเรา", href: "/aboutus", icon: Globe },
      { name: "ข้อกำหนดในการให้บริการ", href: "/terms", icon: FileText },
      { name: "นโยบายความเป็นส่วนตัว", href: "/privacy", icon: Lock },
    ],
  },
];

// *** 3. คอมโพเนนต์สำหรับลิงก์ใน Sidebar ***

const SidebarLink = ({ name, href, Icon, isActive }) => (
  <Link
    href={href}
    className={`flex items-center p-3 rounded-lg text-sm font-medium transition-colors duration-150
      ${isActive 
        ? "bg-purple-600/30 text-white shadow-inner border border-purple-500/50" 
        : "text-gray-400 hover:bg-[#1e222e] hover:text-white"
      }
    `}
  >
    <Icon className="w-5 h-5 mr-3" />
    {name}
  </Link>
);


// *** 4. Main Component: ProfilePage ***

export default function ProfilePage() {
  const currentPath = "/settings/profile"; 
  
  return (
    <div className="min-h-screen bg-[#0F1117] text-gray-300 selection:bg-[#7b4dff] selection:text-white">
      
      <div className="max-w-7xl mx-auto flex h-full">
        
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-[#161b22] border-r border-gray-800 flex flex-col p-4 h-screen sticky top-0">
          
          {/* Account/Setting Header */}
          <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-4 pt-2">
            <h2 className="text-lg font-bold text-white flex items-center">
                <Settings className="w-5 h-5 mr-2 text-purple-400" /> 
                บัญชี
            </h2>
            <button className="text-gray-500 hover:text-white transition-colors">
                <Search className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto space-y-6">
            <div className="space-y-1">
                {menuGroups[0].links.map((link) => (
                    <SidebarLink
                      key={link.name}
                      name={link.name}
                      href={link.href}
                      Icon={link.icon}
                      isActive={currentPath === link.href}
                    />
                ))}
            </div>
            
            <div className="pt-4 border-t border-gray-800">
                <h3 className="text-xs uppercase text-gray-500 font-semibold mb-2 tracking-wider">
                    {menuGroups[1].title}
                </h3>
                <div className="space-y-1">
                    {menuGroups[1].links.map((link) => (
                        <SidebarLink
                            key={link.name}
                            name={link.name}
                            href={link.href}
                            Icon={link.icon}
                            isActive={currentPath === link.href}
                        />
                    ))}
                </div>
            </div>

            <div className="pt-6 border-t border-gray-800 mt-6">
                <p className="text-sm font-medium text-gray-500">
                    มีคำถาม?
                </p>
                <Link href="/support" className="text-sm text-purple-400 hover:underline">
                    ศูนย์ช่วยเหลือ
                </Link>
            </div>
          </nav>
        </aside>

        {/* Main Content Area: Profile Details */}
        <main className="flex-1 p-8 md:p-12">
          
          <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                โปรไฟล์
              </h1>
              <Link
                href="/account/update-profile" 
                className="text-sm px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium rounded-lg shadow-lg hover:from-purple-600 hover:to-pink-700 transition duration-300 transform hover:-translate-y-0.5"
              >
                  แก้ไขโปรไฟล์
              </Link>
          </div>

          {/* Profile Hero Section */}
          <div className="flex items-center space-x-6 mb-10">
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-purple-500">
                <div className="w-full h-full bg-[#1e222e] flex items-center justify-center text-3xl text-gray-500">US</div> 
            </div>
            <div>
              <p className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 tracking-tight">
                {userProfile.name}
              </p>
              <p className="text-md text-gray-400">{userProfile.title}</p>
            </div>
          </div>
          
          <p className="max-w-4xl text-sm sm:text-base text-gray-400 leading-relaxed mb-10">
            {userProfile.bio}
          </p>

          {/* Content Card (Full Width for Skills and Contact) */}
          <div className="bg-[#161b22] border border-gray-800 rounded-xl p-5 md:p-6">
            
            {/* Header: Skills */}
            <h2 className="text-lg font-semibold text-white mb-4 border-b border-gray-800 pb-2 flex items-center">
                <Code className="w-4 h-4 mr-2 text-pink-500"/> ทักษะหลัก
            </h2>
            <div className="flex flex-wrap gap-3 mb-8">
                {userProfile.skills.map((skill) => (
                    <span 
                      key={skill}
                      className={`text-xs font-medium px-3 py-1 rounded-full border shadow-md ${getSkillStyle(skill)}`}
                    >
                      {skill}
                    </span>
                ))}
            </div>

            {/* >>>>>>>>>>>>>>>> ส่วนผลงานเด่นที่เพิ่มกลับมา <<<<<<<<<<<<<<<< */}
            <h2 className="text-lg font-semibold text-white mt-8 mb-4 border-b border-gray-800 pb-2 flex items-center">
                <Bookmark className="w-4 h-4 mr-2 text-purple-500"/> ผลงานเด่น
            </h2>
            <div className="space-y-4 mb-8">
                <div className="group block bg-[#1e222e] border border-gray-800 rounded-lg p-3 transition-all duration-200 hover:border-gray-600 hover:shadow-md">
                    <p className="font-semibold text-white group-hover:text-purple-300 transition-colors">Awesome Web App</p>
                    <p className="text-sm text-gray-400">Next.js, TypeScript, PostgreSQL</p>
                </div>
            </div>
            {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}


            {/* Header: Contact/Social */}
            <h2 className="text-lg font-semibold text-white mb-4 border-b border-gray-800 pb-2 pt-4 flex items-center">
                <Mail className="w-4 h-4 mr-2 text-purple-500"/> ข้อมูลติดต่อ
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email (Non-link) */}
                <div className="flex items-center text-gray-400 text-sm">
                    <Mail className="w-4 h-4 mr-2 text-gray-600"/>
                    อีเมล: <span className="ml-2 font-medium text-white">{userProfile.email}</span>
                </div>
                
                {/* GitHub (LinkedIn ถูกลบออกไปแล้ว) */}
                <a 
                    href={`https://github.com/${userProfile.github}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-400 hover:text-purple-400 transition-colors group text-sm"
                >
                    <Github className="w-4 h-4 mr-2 text-purple-500 group-hover:text-purple-400" />
                    GitHub
                </a>
                
            </div>
            
          </div>
          
        </main>
      </div>
    </div>
  );
}
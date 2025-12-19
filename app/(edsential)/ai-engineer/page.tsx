"use client";
import React, { useState, useEffect } from "react";
import { Play, X, ChevronRight, CheckCircle2, Brain, Database, Calculator, Bot, Layers, Network, Server, Code2, Cpu, ShieldCheck } from "lucide-react";

// --- 1. กำหนด Interfaces (Types) ---

interface Topic {
  id: number;
  title: string;
  category: string;
  description: string;
  videoId: string;
  icon: React.ReactNode;
  color: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic: Topic | null;
}

// --- 2. ข้อมูล AI Engineer Roadmap (อ้างอิง roadmap.sh/ai-engineer) ---
const topics: Topic[] = [
  {
    id: 1,
    title: "Foundations (Math & Python)",
    category: "Prerequisites",
    description: "📐 **พื้นฐานคณิตศาสตร์และการเขียนโปรแกรม**\n\n• **Mathematics:** Linear Algebra (พีชคณิตเชิงเส้น), Calculus, และ Statistics (สถิติ) คือหัวใจสำคัญของ AI\n• **Python:** ภาษาหลักของวงการ AI ต้องแม่นยำเรื่อง Data Structures และ Algorithms\n• **Environment:** การใช้ Jupyter Notebook, VS Code และการจัดการ Virtual Environments",
    videoId: "--I7QwRuAaU", // การเขียนโปรแกรมภาษา Python: การคำนวณทางคณิตศาสตร์ (ClassStart Academy)
    icon: <Calculator className="w-6 h-6" />,
    color: "text-blue-500 border-blue-500/30 bg-blue-500/10",
  },
  {
    id: 2,
    title: "Data Engineering Basics",
    category: "Data Processing",
    description: "🗄️ **การจัดการและเตรียมข้อมูล**\n\n• **Libraries:** ฝึกใช้ Pandas และ NumPy ในการจัดการข้อมูลมหาศาล\n• **SQL:** การดึงข้อมูลจาก Database\n• **EDA (Exploratory Data Analysis):** การวิเคราะห์และทำความสะอาดข้อมูล (Data Cleaning) ก่อนนำไปเทรนโมเดล",
    videoId: "SPdwqEPZ_EE", // สอน Python & Pandas | สำหรับจัดการและวิเคราะห์ข้อมูล (KongRuksiam Official)
    icon: <Database className="w-6 h-6" />,
    color: "text-green-500 border-green-500/30 bg-green-500/10",
  },
  {
    id: 3,
    title: "Machine Learning Concepts",
    category: "Core AI",
    description: "🤖 **หลักการเรียนรู้ของเครื่อง**\n\n• **Supervised Learning:** การเรียนรู้แบบมีผู้สอน (Regression, Classification)\n• **Unsupervised Learning:** การเรียนรู้แบบไม่มีผู้สอน (Clustering)\n• **Scikit-learn:** Library มาตรฐานสำหรับการทำ ML เบื้องต้น\n• **Evaluation:** การวัดผลโมเดล (Accuracy, Precision, Recall)",
    videoId: "UgUMk5DiGX8", // Introduction to Machine Learning (AIAT)
    icon: <Brain className="w-6 h-6" />,
    color: "text-orange-500 border-orange-500/30 bg-orange-500/10",
  },
  {
    id: 4,
    title: "Deep Learning & Neural Networks",
    category: "Advanced AI",
    description: "🧠 **โครงข่ายประสาทเทียม**\n\n• **Neural Networks:** เข้าใจการทำงานของ Neuron, Layers, และ Activation Functions\n• **Frameworks:** เลือกฝึกฝน PyTorch หรือ TensorFlow\n• **Architectures:** รู้จัก CNN (สำหรับรูปภาพ) และ RNN/LSTM (สำหรับข้อมูลลำดับ)",
    videoId: "kIL6UqHfnA8", // Deep Learning - Introduction (Itthi Chatnuntawech)
    icon: <Network className="w-6 h-6" />,
    color: "text-purple-500 border-purple-500/30 bg-purple-500/10",
  },
  {
    id: 5,
    title: "Transformers & NLP",
    category: "Modern AI Architecture",
    description: "📝 **จุดเปลี่ยนสู่ยุค AI ปัจจุบัน**\n\n• **Attention Mechanism:** กลไกที่ช่วยให้ AI โฟกัสส่วนสำคัญของข้อมูลได้\n• **Transformer Architecture:** โครงสร้างเบื้องหลัง ChatGPT และ LLMs ทั้งหลาย\n• **NLP Tasks:** การทำ Tokenization, Embeddings และ Sentiment Analysis",
    videoId: "DLcEztn4vHM", // Transformer-based Encoder-Decoder Model (Thai NLP)
    icon: <Layers className="w-6 h-6" />,
    color: "text-indigo-400 border-indigo-400/30 bg-indigo-400/10",
  },
  {
    id: 6,
    title: "Prompt Engineering",
    category: "Interacting with LLMs",
    description: "💬 **ศิลปะการสั่งงาน AI**\n\n• **Techniques:** Zero-shot, Few-shot, Chain-of-Thought prompting\n• **Best Practices:** การเขียนคำสั่งให้ชัดเจนและปลอดภัย\n• **Tools:** การใช้งาน OpenAI API และ Playground\n• **Optimization:** การลดต้นทุนและเพิ่มความแม่นยำของคำตอบ",
    videoId: "45Fpid-yACE", // มารู้จักกับ Prompt Engineering กัน (Mikelopster)
    icon: <Code2 className="w-6 h-6" />,
    color: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
  },
  {
    id: 7,
    title: "RAG (Retrieval-Augmented Generation)",
    category: "GenAI Applications",
    description: "🔍 **การเชื่อมต่อ AI กับข้อมูลภายนอก**\n\n• **Concept:** การแก้ปัญหา Hallucination โดยให้ AI ค้นหาข้อมูลก่อนตอบ\n• **Vector Databases:** การเก็บข้อมูลแบบ Vector (Pinecone, ChromaDB)\n• **Orchestration:** การใช้ LangChain หรือ LlamaIndex ในการเชื่อมต่อ Flow",
    videoId: "n5YcZnTLXX0", // LangChain เบื้องต้น - RAG (KongRuksiam Official)
    icon: <SearchCheck className="w-6 h-6" />,
    color: "text-teal-400 border-teal-400/30 bg-teal-400/10",
  },
  {
    id: 8,
    title: "AI Agents",
    category: "Autonomous Systems",
    description: "🤖 **ตัวแทน AI อัจฉริยะ**\n\n• **Concept:** AI ที่สามารถ 'คิด' และ 'ลงมือทำ' (ใช้ Tools) ได้เอง\n• **ReAct:** Reasoning + Acting loops\n• **Function Calling:** การสอนให้ LLM เรียกใช้ API ภายนอก (เช่น ค้น Google, ส่งเมล)",
    videoId: "0MeXKrFAoME", // วิธีสร้าง AI Agents: คู่มือสำหรับผู้เริ่มต้นอย่างสมบูรณ์ (Metics Media | ไทย)
    icon: <Bot className="w-6 h-6" />,
    color: "text-pink-500 border-pink-500/30 bg-pink-500/10",
  },
  {
    id: 9,
    title: "MLOps & Deployment",
    category: "Production",
    description: "🚀 **การนำ AI ไปใช้งานจริง**\n\n• **Deployment:** การสร้าง API ด้วย FastAPI หรือ Flask\n• **Containerization:** การใช้ Docker เพื่อรันโมเดล\n• **Monitoring:** การติดตามผลลัพธ์และดู Drift ของข้อมูล\n• **Ethics:** ความปลอดภัยและความรับผิดชอบในการใช้ AI",
    videoId: "qa2Sxesdr7Y", // Prototype Deployment (AI Builders)
    icon: <Server className="w-6 h-6" />,
    color: "text-red-500 border-red-500/30 bg-red-500/10",
  }
];

// Icon component helper for RAG (SearchCheck is not in standard lucide import list above, using FileSearch instead or defined)
import { FileSearch as SearchCheck } from "lucide-react"; 

// --- 3. Components ย่อย ---

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, topic }) => {
  if (!isOpen || !topic) return null;

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
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-purple-900/20 to-transparent">
          <div className="flex items-center gap-3">
             <div className={`p-2 rounded-lg ${topic.color}`}>
                {topic.icon}
             </div>
             <div>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">{topic.category}</p>
                <h2 className="text-2xl font-bold text-white">{topic.title}</h2>
             </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {/* Video */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-black ring-1 ring-white/10 mb-6 group">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${topic.videoId}?autoplay=1`}
              title={topic.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Description */}
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-gray-300 leading-relaxed whitespace-pre-line">
              {topic.description}
            </p>
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-4 bg-[#13151c] border-t border-white/10 flex justify-end">
           <button 
             onClick={onClose}
             className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
           >
             เข้าใจแล้ว
           </button>
        </div>
      </div>
    </div>
  );
};

export default function AIEngineerRoadmap() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#0B0D13] text-gray-300  selection:bg-purple-500/30">
      
      {/* --- Hero Section --- */}
      <div className="relative pt-20 pb-16 px-4 text-center overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-6 animate-pulse">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            Roadmap 2025 Updated
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-600 tracking-tight mb-6 drop-shadow-2xl">
            AI Engineer
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            เส้นทางสู่การเป็นวิศวกร AI มืออาชีพ ตั้งแต่พื้นฐานคณิตศาสตร์ การสร้างโมเดล จนถึงการประยุกต์ใช้ LLMs และ RAG ในระดับ Production
          </p>
        </div>
      </div>

      {/* --- Roadmap Container --- */}
      <div className="max-w-5xl mx-auto px-4 pb-32 mt-10">
        <div className="relative">
          
          {/* เส้นแกนกลาง (Timeline Line) */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-600 via-purple-900/50 to-transparent md:-translate-x-1/2 rounded-full" />

          {/* Items Loop */}
          {topics.map((topic, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={topic.id} 
                className={`relative flex items-center mb-12 md:mb-24 ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                
                {/* 1. จุดเชื่อมต่อ (Connector Dot) */}
                <div className="absolute left-8 md:left-1/2 -translate-x-[5px] md:-translate-x-1/2 w-4 h-4 bg-[#0B0D13] border-[3px] border-purple-500 rounded-full z-10 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                    <div className="absolute inset-0 bg-purple-500 rounded-full animate-ping opacity-20"></div>
                </div>

                {/* 2. พื้นที่ว่างฝั่งตรงข้าม (Spacer) */}
                <div className="hidden md:block md:w-1/2" />

                {/* 3. การ์ดเนื้อหา (Content Card) */}
                <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                  
                  <div 
                    onClick={() => setSelectedTopic(topic)}
                    className="group relative bg-[#13151c] border border-white/5 hover:border-purple-500/50 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10 cursor-pointer overflow-hidden"
                  >
                    
                    {/* Glow Effect on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Badge Number */}
                    <div className="absolute top-4 right-4 text-5xl font-black text-white/5 group-hover:text-purple-500/10 transition-colors select-none">
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    <div className="relative z-10">
                      {/* Topic Category */}
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${topic.color}`}>
                         {topic.category}
                      </span>
                      
                      {/* Title */}
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors flex items-center gap-2">
                        {topic.title}
                        <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-purple-500" />
                      </h3>

                      {/* Short Description (Truncated) */}
                      <p className="text-sm text-gray-500 line-clamp-2 mb-4 group-hover:text-gray-400 transition-colors whitespace-pre-line">
                        {topic.description.replace(/\*\*/g, '').split('\n')[0]}...
                      </p>

                      {/* Action Button */}
                      <div className="flex items-center gap-2 text-sm font-medium text-purple-400 group-hover:text-purple-300">
                        <Play size={16} fill="currentColor" />
                        <span>ดูวิดีโอประกอบ</span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}

          {/* End Node */}
          <div className="relative flex justify-center mt-12 pl-8 md:pl-0">
             <div className="bg-[#13151c] border border-purple-500/30 text-purple-300 px-6 py-3 rounded-full flex items-center gap-3 shadow-lg z-10">
                <ShieldCheck className="w-5 h-5 text-purple-500" />
                <span className="font-semibold">Future Ready!</span>
             </div>
          </div>

        </div>
      </div>

      {/* --- Modal --- */}
      <Modal 
        isOpen={!!selectedTopic} 
        topic={selectedTopic} 
        onClose={() => setSelectedTopic(null)} 
      />

    </main>
  );
}
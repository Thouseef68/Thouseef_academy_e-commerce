import React from 'react';
import { motion } from 'framer-motion';
import { 
  Map, BrainCircuit, Globe, 
  Zap, Mail, Share2, Code, Database, Shield, 
  Terminal, Layout, Layers, Cpu, Search, 
  MessageSquare, ListChecks, Activity, Briefcase 
} from 'lucide-react';

const categories = [
  {
    title: "01. Career Roadmaps",
    icon: <Map size={18} />,
    color: "from-blue-600 to-cyan-400",
    items: [
      { id: "r1", name: "AI & GenAI Engineer", price: 1, type: "PDF", icon: <Cpu size={20} />, url: "https://drive.google.com/file/d/1ISexBgUN7eTG2Am6iGrrIvDQ3TDVVcAG/view?usp=sharing" },
      { id: "r2", name: "Modern Data Engineer", price: 1, type: "PDF", icon: <Database size={20} />, url: "https://drive.google.com/file/d/1YYv9lm2CGd1HDQGYjbBfpZp_MX0eUWvB/view?usp=sharing" },
      { id: "r3", name: "Data Analytics Pro", price: 1, type: "PDF", icon: <Search size={20} />, url: "https://drive.google.com/file/d/1eCcgUzF7W07F3BWPxfAKVTg46Ige0sef/view?usp=sharing" },
      { id: "r4", name: "Frontend (React/Next.js)", price: 1, type: "PDF", icon: <Layout size={20} />, url: "https://drive.google.com/file/d/1qXGV_UxPZmz7ZnKvAYsJXsVzB9vOgUdW/view?usp=sharing" },
      { id: "r5", name: "Backend (Node/Python)", price: 1, type: "PDF", icon: <Terminal size={20} />, url: "https://drive.google.com/file/d/11NgTeuhg49_P01oqZg7UcQv8D5Y7RX3W/view?usp=sharing" },
      { id: "r6", name: "Python Mastery", price: 1, type: "PDF", icon: <Code size={20} />, url: "https://drive.google.com/file/d/1fUNRv3AwX8T2K7F9vKXNj_E9fhiLwOZN/view?usp=sharing" },
      { id: "r7", name: "SQL & DB Mastery", price: 1, type: "PDF", icon: <Layers size={20} />, url: "https://drive.google.com/file/d/1FBdjjsnN9BW8TWuLcT_te3ZbFHzF2e9o/view?usp=sharing" },
      { id: "r8", name: "Cyber Security", price: 1, type: "PDF", icon: <Shield size={20} />, url: "https://drive.google.com/file/d/1r5R6DA6zp-yBhk6pHfVPNtpEGDvfvI7o/view?usp=sharing" },
      { id: "r9", name: "Full Stack Product Eng.", price: 1, type: "PDF", icon: <Zap size={20} />, url: "https://drive.google.com/file/d/1XFXnMOuZq1bWCwbPl3IeJGtLzcd31UDk/view?usp=sharing" },
      { id: "r10", name: "Cloud & DevOps", price: 1, type: "PDF", icon: <Activity size={20} />, url: "https://drive.google.com/file/d/1zwHEl_9rFJ-hTaiI_CZAr8BBtr0KN6Oh/view?usp=sharing" },
    ]
  },
  {
    title: "02. Premium Course Direct Links",
    icon: <Globe size={18} />,
    color: "from-emerald-500 to-teal-400",
    items: [
      { id: "c1", name: "Google Data Analytics", price: 1, type: "Link", icon: <Globe size={20} />, url: "https://www.coursera.org/professional-certificates/google-data-analytics" },
      { id: "c2", name: "Meta Front-End Developer", price: 1, type: "Link", icon: <Layout size={20} />, url: "https://www.coursera.org/professional-certificates/meta-front-end-developer" },
      { id: "c3", name: "Harvard CS50 (Official)", price: 1, type: "Link", icon: <Terminal size={20} />, url: "https://www.edx.org/course/introduction-computer-science-harvard-cs50x" },
      { id: "c4", name: "IBM Data Science", price: 1, type: "Link", icon: <Database size={20} />, url: "https://www.coursera.org/professional-certificates/ibm-data-science" },
      { id: "c5", name: "AI For Everyone (Andrew Ng)", price: 1, type: "Link", icon: <BrainCircuit size={20} />, url: "https://www.coursera.org/learn/ai-for-everyone" },
    ]
  },
  {
    title: "03. Career Growth Packs",
    icon: <Zap size={18} />,
    color: "from-purple-600 to-pink-500",
    items: [
      { id: "ai_tool", name: "AI Resume Analyzer Tool", price: 1, type: "Live Access", icon: <BrainCircuit size={20} />, url: "https://ai-agent-f12q.onrender.com/" },
      { id: "vault", name: "AI Master Prompt Vault", price: 1, type: "PDF", icon: <MessageSquare size={20} />, url: "https://drive.google.com/file/d/1n-zcLr3vryt8IJm18zAvFvleOXCHh_3Z/view?usp=sharing" },
      { id: "email", name: "Cold Email & Cover Letter Pack", price: 1, type: "PDF", icon: <Mail size={20} />, url: "https://drive.google.com/file/d/1LukPfgwrJ8UIlPM_rL4aZUvHhYex_rI1/view?usp=sharing" },
      { id: "linkedin", name: "LinkedIn 5-Star Blueprint", price: 1, type: "PDF", icon: <Briefcase size={20} />, url: "https://drive.google.com/file/d/1E7_AilcvQ2MwGnsLhuv-sFT0kmRKxUdH/view?usp=sharing" },
    ]
  },
  {
    title: "04. Mastery Bundle",
    icon: <Share2 size={18} />,
    color: "from-orange-500 to-red-500",
    items: [
      { id: "cheat_master", name: "The Master Syntax Cheat Sheet", price: 1, type: "Master PDF", icon: <ListChecks size={20} />, url: "https://drive.google.com/file/d/1xK0XQ1wPWaHiNTXJGDTgB81mATALjtK_/view?usp=sharing" },
    ]
  }
];

const ProductStore = ({ onAddToCart }) => {
  return (
    <div className="w-full h-full flex flex-col p-6 lg:p-10 overflow-hidden">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-4xl font-black uppercase italic text-white tracking-tighter">
          Thouseef's <span className="text-[#00f2ff]">Academy</span>
        </h2>
        <p className="text-[10px] text-white/30 uppercase tracking-[0.5em] font-bold mt-2">
          Premium Career Assets • ₹1 Each
        </p>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-12 no-scrollbar pb-24">
        {categories.map((cat, idx) => (
          <div key={idx} className="space-y-6">
            <div className="flex items-center gap-4 ml-2">
              <div className={`p-2.5 rounded-2xl bg-gradient-to-br ${cat.color} text-white shadow-lg`}>
                {cat.icon}
              </div>
              <h3 className="text-xs font-black uppercase text-white/60 tracking-[0.3em]">
                {cat.title}
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {cat.items.map((item) => (
                <motion.div 
                  key={item.id}
                  whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.04)" }}
                  className="p-5 bg-white/[0.02] border border-white/5 rounded-[2.5rem] flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-[1.2rem] bg-white/5 flex items-center justify-center text-white/20 group-hover:text-[#00f2ff] group-hover:bg-[#00f2ff]/10 transition-all duration-500">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-black text-xs uppercase tracking-tight group-hover:text-[#00f2ff] transition-colors">
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[8px] text-white/20 uppercase font-black px-2 py-0.5 border border-white/10 rounded-full">
                          {item.type}
                        </span>
                        <span className="text-[#00f2ff] font-black text-[10px]">₹{item.price}</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => onAddToCart(item)}
                    className="p-3 px-6 bg-white/5 hover:bg-[#00f2ff] hover:text-black rounded-2xl text-[10px] font-black uppercase transition-all border border-white/10 hover:border-[#00f2ff] active:scale-95 shadow-xl"
                  >
                    Add
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductStore;
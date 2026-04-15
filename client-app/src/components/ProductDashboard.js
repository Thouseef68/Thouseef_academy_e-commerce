import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Star, Globe, Zap, Cpu, Database, 
  Search, Layout, Terminal, Code, Layers, Shield, Activity, 
  Briefcase, MessageSquare, Mail, ListChecks, BrainCircuit, Heart 
} from 'lucide-react';

const ProductDashboard = ({ setIsOpen, onAddToCart, onToggleWishlist, wishlist = [] }) => {
  // ✅ FEATURE 1 & 2: Search and Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const sections = [
    {
      id: "roadmaps",
      title: "01. Career Roadmaps",
      subtitle: "Tactical blueprints for high-tier engineering roles",
      color: "from-blue-600 to-cyan-400",
      items: [
        { id: "r1", name: "AI & GenAI Engineer", price: 15, icon: <Cpu />, rating: 5.0, reviews: 450, courseLink: "https://drive.google.com/file/d/1ISexBgUN7eTG2Am6iGrrIvDQ3TDVVcAG/view?usp=sharing" },
        { id: "r2", name: "Modern Data Engineer", price: 11, icon: <Database />, rating: 4.8, reviews: 210, courseLink: "https://drive.google.com/file/d/1YYv9lm2CGd1HDQGYjbBfpZp_MX0eUWvB/view?usp=sharing" },
        { id: "r3", name: "Data Analytics Pro", price: 16, icon: <Search />, rating: 4.9, reviews: 180, courseLink: "https://drive.google.com/file/d/1eCcgUzF7W07F3BWPxfAKVTg46Ige0sef/view?usp=sharing" },
        { id: "r4", name: "Frontend (React/Next)", price: 16, icon: <Layout />, rating: 4.9, reviews: 320, courseLink: "https://drive.google.com/file/d/1qXGV_UxPZmz7ZnKvAYsJXsVzB9vOgUdW/view?usp=sharing" },
        { id: "r5", name: "Backend (Node/Python)", price: 16, icon: <Terminal />, rating: 4.8, reviews: 140, courseLink: "https://drive.google.com/file/d/11NgTeuhg49_P01oqZg7UcQv8D5Y7RX3W/view?usp=sharing" },
        { id: "r6", name: "Python Mastery", price: 20, icon: <Code />, rating: 5.0, reviews: 560, courseLink: "https://drive.google.com/file/d/1fUNRv3AwX8T2K7F9vKXNj_E9fhiLwOZN/view?usp=sharing" },
        { id: "r7", name: "SQL & DB Mastery", price: 10, icon: <Layers />, rating: 4.7, reviews: 88, courseLink: "https://drive.google.com/file/d/1FBdjjsnN9BW8TWuLcT_te3ZbFHzF2e9o/view?usp=sharing" },
        { id: "r8", name: "Cyber Security", price: 10, icon: <Shield />, rating: 4.9, reviews: 112, courseLink: "https://drive.google.com/file/d/1r5R6DA6zp-yBhk6pHfVPNtpEGDvfvI7o/view?usp=sharing" },
        { id: "r9", name: "Full Stack Product", price: 12, icon: <Zap />, rating: 4.9, reviews: 410, courseLink: "https://drive.google.com/file/d/1XFXnMOuZq1bWCwbPl3IeJGtLzcd31UDk/view?usp=sharing" },
        { id: "r10", name: "Cloud & DevOps", price: 15, icon: <Activity />, rating: 4.8, reviews: 94, courseLink: "https://drive.google.com/file/d/1zwHEl_9rFJ-hTaiI_CZAr8BBtr0KN6Oh/view?usp=sharing" },
      ]
    },
    {
      id: "courses",
      title: "02. Premium Courses",
      subtitle: "Verified certifications & deep-dive modules",
      color: "from-emerald-500 to-teal-400",
      items: [
        { id: "c1", name: "Google Data Analytics", price: 15, icon: <Globe />, rating: 4.8, reviews: "2.4k", courseLink: "https://www.coursera.org/professional-certificates/google-data-analytics" },
        { id: "c2", name: "Meta Front-End Dev", price: 16, icon: <Layout />, rating: 4.9, reviews: "1.8k", courseLink: "https://www.coursera.org/professional-certificates/meta-front-end-developer" },
        { id: "c3", name: "Harvard CS50 Mastery", price: 20, icon: <Terminal />, rating: 5.0, reviews: "10k+", courseLink: "https://www.edx.org/course/introduction-computer-science-harvard-cs50x" },
        { id: "c4", name: "IBM Data Science", price: 12, icon: <Database />, rating: 4.7, reviews: "1.2k", courseLink: "https://www.coursera.org/professional-certificates/ibm-data-science" },
        { id: "c5", name: "AI For Everyone", price: 10, icon: <BrainCircuit />, rating: 5.0, reviews: "5k+", courseLink: "https://www.coursera.org/learn/ai-for-everyone" },
      ]
    },
    {
      id: "growth",
      title: "03. Career & Mastery",
      subtitle: "High-end AI tools & essential cheat sheets",
      color: "from-purple-600 to-pink-500",
      items: [
        { id: "ai_tool", name: "AI Resume Intelligence", price: 10, icon: <Activity />, rating: 4.9, reviews: 890, courseLink: "https://ai-agent-f12q.onrender.com/" },
        { id: "vault", name: "AI Master Prompt Vault", price: 10, icon: <MessageSquare />, rating: 4.8, reviews: 156, courseLink: "https://drive.google.com/file/d/1n-zcLr3vryt8IJm18zAvFvleOXCHh_3Z/view?usp=sharing" },
        { id: "email", name: "Gold Email Pack", price: 11, icon: <Mail />, rating: 4.9, reviews: 230, courseLink: "https://drive.google.com/file/d/1LukPfgwrJ8UIlPM_rL4aZUvHhYex_rI1/view?usp=sharing" },
        { id: "linkedin", name: "LinkedIn 5-Star Blueprint", price: 12, icon: <Briefcase />, rating: 4.7, reviews: 145, courseLink: "https://drive.google.com/file/d/1E7_AilcvQ2MwGnsLhuv-sFT0kmRKxUdH/view?usp=sharing" },
        { id: "cheat", name: "Master Syntax (3-in-1)", price: 12, icon: <ListChecks />, rating: 5.0, reviews: 540, courseLink: "https://drive.google.com/file/d/1xK0XQ1wPWaHiNTXJGDTgB81mATALjtK_/view?usp=sharing" },
      ]
    }
  ];

  // ✅ LOGIC: Filtered Rendering
  const filteredSections = sections.map(section => ({
    ...section,
    items: section.items.filter(item => 
      (activeFilter === "all" || section.id === activeFilter) &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.items.length > 0);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-[#050112]/98 backdrop-blur-[100px] flex items-center justify-center p-6 md:p-12"
    >
      <button onClick={() => setIsOpen(false)} className="absolute top-8 right-12 text-white/20 hover:text-[#00f2ff] transition-all"><X size={48} /></button>

      <div className="w-full h-full max-w-[1600px] flex flex-col overflow-hidden">
        
        {/* HEADER & SEARCH BARS */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-8">
          <div className="text-left">
            <h1 className="text-5xl font-black uppercase italic text-white tracking-tighter leading-none">
              PRODUCTION <span className="text-[#00f2ff]">VAULT</span>
            </h1>
            <p className="text-white/30 tracking-[0.6em] text-[10px] mt-2 uppercase font-black">Elite Career Acceleration Assets</p>
          </div>

          {/* SEARCH & FILTERS UI */}
          <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyan-400 transition-colors" size={18} />
              <input 
                type="text"
                placeholder="Search Assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-sm font-bold text-white outline-none focus:border-cyan-400/40 w-full md:w-64 transition-all"
              />
            </div>
            
            <div className="flex gap-2">
              {["all", "roadmaps", "courses", "growth"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-4 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border ${activeFilter === filter ? 'bg-cyan-400 text-black border-cyan-400' : 'bg-white/5 text-white/40 border-white/5 hover:border-white/20'}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mapped Sections */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 overflow-y-auto no-scrollbar pb-20 px-2">
          {filteredSections.map((section) => (
            <div key={section.id} className="flex flex-col gap-6">
              <div className={`p-6 rounded-[3rem] bg-gradient-to-br ${section.color} shadow-xl shadow-black/40 text-left`}>
                <h2 className="text-xl font-black uppercase italic text-white">{section.title}</h2>
                <p className="text-white/80 text-[9px] uppercase font-bold mt-1 tracking-widest">{section.subtitle}</p>
              </div>

              <div className="space-y-4">
                {section.items.map((item) => {
                  const isSaved = wishlist && wishlist.some(w => w.id === item.id);
                  
                  return (
                    <motion.div
                      key={item.id}
                      layout
                      whileHover={{ scale: 1.02 }}
                      className="p-5 bg-white/[0.03] border border-white/5 rounded-[2.5rem] hover:border-[#00f2ff]/30 transition-all group relative"
                    >
                      {/* ❤️ WISHLIST BUTTON */}
                      <button 
                        onClick={() => onToggleWishlist({ ...item, type: section.id })}
                        className={`absolute top-6 right-6 p-3 rounded-full transition-all z-10 ${isSaved ? 'text-pink-500 bg-pink-500/10' : 'text-white/20 hover:text-white hover:bg-white/5'}`}
                      >
                        <Heart size={18} fill={isSaved ? "currentColor" : "none"} />
                      </button>

                      <div className="flex justify-between items-start">
                        <div className="p-3.5 rounded-2xl bg-white/5 text-[#00f2ff] group-hover:bg-[#00f2ff] group-hover:text-black transition-all">
                          {React.cloneElement(item.icon, { size: 24 })}
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-yellow-400 justify-end">
                            <Star size={10} fill="currentColor" />
                            <span className="text-[10px] font-black">{item.rating}</span>
                          </div>
                          <p className="text-[7px] text-white/20 uppercase font-black">{item.reviews} Reviews</p>
                        </div>
                      </div>

                      <h4 className="text-white font-black uppercase text-xs mt-5 tracking-wide text-left group-hover:text-[#00f2ff]">{item.name}</h4>
                      
                      <div className="mt-6 flex justify-between items-center">
                        <div className="flex flex-col items-start">
                          <span className="text-[8px] text-white/20 uppercase font-black tracking-widest">Market Price</span>
                          <span className="text-xl font-black text-white/90">₹{item.price}</span>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            onAddToCart({ ...item });
                          }}
                          className="px-5 py-2 bg-[#00f2ff] text-black font-black uppercase text-[9px] rounded-xl hover:scale-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,242,255,0.4)]"
                        >
                          ADD TO CART
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDashboard;
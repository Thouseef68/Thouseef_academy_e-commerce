import React from 'react';
import { motion } from 'framer-motion';
import { 
  X, Star, Globe, Zap, Cpu, Database, 
  Search, Layout, Terminal, Code, Layers, Shield, Activity, 
  Briefcase, MessageSquare, Mail, ListChecks, BrainCircuit 
} from 'lucide-react';

const ProductDashboard = ({ setIsOpen, onAddToCart }) => {
  const sections = [
    {
      id: "roadmaps",
      title: "01. Career Roadmaps (10)",
      subtitle: "Step-by-step blueprints to land high-paying roles",
      color: "from-blue-600 to-cyan-400",
      items: [
        { id: "r1", name: "AI & GenAI Engineer", icon: <Cpu />, rating: 5.0, reviews: 450, url: "https://drive.google.com/file/d/1ISexBgUN7eTG2Am6iGrrIvDQ3TDVVcAG/view?usp=sharing" },
        { id: "r2", name: "Modern Data Engineer", icon: <Database />, rating: 4.8, reviews: 210, url: "https://drive.google.com/file/d/1YYv9lm2CGd1HDQGYjbBfpZp_MX0eUWvB/view?usp=sharing" },
        { id: "r3", name: "Data Analytics Pro", icon: <Search />, rating: 4.9, reviews: 180, url: "https://drive.google.com/file/d/1eCcgUzF7W07F3BWPxfAKVTg46Ige0sef/view?usp=sharing" },
        { id: "r4", name: "Frontend (React/Next)", icon: <Layout />, rating: 4.9, reviews: 320, url: "https://drive.google.com/file/d/1qXGV_UxPZmz7ZnKvAYsJXsVzB9vOgUdW/view?usp=sharing" },
        { id: "r5", name: "Backend (Node/Python)", icon: <Terminal />, rating: 4.8, reviews: 140, url: "https://drive.google.com/file/d/11NgTeuhg49_P01oqZg7UcQv8D5Y7RX3W/view?usp=sharing" },
        { id: "r6", name: "Python Mastery", icon: <Code />, rating: 5.0, reviews: 560, url: "https://drive.google.com/file/d/1fUNRv3AwX8T2K7F9vKXNj_E9fhiLwOZN/view?usp=sharing" },
        { id: "r7", name: "SQL & DB Mastery", icon: <Layers />, rating: 4.7, reviews: 88, url: "https://drive.google.com/file/d/1FBdjjsnN9BW8TWuLcT_te3ZbFHzF2e9o/view?usp=sharing" },
        { id: "r8", name: "Cyber Security", icon: <Shield />, rating: 4.9, reviews: 112, url: "https://drive.google.com/file/d/1r5R6DA6zp-yBhk6pHfVPNtpEGDvfvI7o/view?usp=sharing" },
        { id: "r9", name: "Full Stack Product", icon: <Zap />, rating: 4.9, reviews: 410, url: "https://drive.google.com/file/d/1XFXnMOuZq1bWCwbPl3IeJGtLzcd31UDk/view?usp=sharing" },
        { id: "r10", name: "Cloud & DevOps", icon: <Activity />, rating: 4.8, reviews: 94, url: "https://drive.google.com/file/d/1zwHEl_9rFJ-hTaiI_CZAr8BBtr0KN6Oh/view?usp=sharing" },
      ]
    },
    {
      id: "courses",
      title: "02. Premium Courses (5)",
      subtitle: "Verified direct links to top certifications",
      color: "from-emerald-500 to-teal-400",
      items: [
        { id: "c1", name: "Google Data Analytics", icon: <Globe />, rating: 4.8, reviews: "2.4k", url: "https://www.coursera.org/professional-certificates/google-data-analytics" },
        { id: "c2", name: "Meta Front-End Dev", icon: <Layout />, rating: 4.9, reviews: "1.8k", url: "https://www.coursera.org/professional-certificates/meta-front-end-developer" },
        { id: "c3", name: "Harvard CS50", icon: <Terminal />, rating: 5.0, reviews: "10k+", url: "https://www.edx.org/course/introduction-computer-science-harvard-cs50x" },
        { id: "c4", name: "IBM Data Science", icon: <Database />, rating: 4.7, reviews: "1.2k", url: "https://www.coursera.org/professional-certificates/ibm-data-science" },
        { id: "c5", name: "AI For Everyone", icon: <BrainCircuit />, rating: 5.0, reviews: "5k+", url: "https://www.coursera.org/learn/ai-for-everyone" },
      ]
    },
    {
      id: "growth",
      title: "03. Career & Mastery (5)",
      subtitle: "AI tools and master cheat sheets",
      color: "from-purple-600 to-pink-500",
      items: [
        { id: "ai_tool", name: "AI Resume Intelligence", icon: <Activity />, rating: 4.9, reviews: 890, url: "https://ai-agent-f12q.onrender.com/" },
        { id: "vault", name: "AI Master Prompt Vault", icon: <MessageSquare />, rating: 4.8, reviews: 156, url: "https://drive.google.com/file/d/1n-zcLr3vryt8IJm18zAvFvleOXCHh_3Z/view?usp=sharing" },
        { id: "email", name: "Gold Email Pack", icon: <Mail />, rating: 4.9, reviews: 230, url: "https://drive.google.com/file/d/1LukPfgwrJ8UIlPM_rL4aZUvHhYex_rI1/view?usp=sharing" },
        { id: "linkedin", name: "LinkedIn 5-Star Blueprint", icon: <Briefcase />, rating: 4.7, reviews: 145, url: "https://drive.google.com/file/d/1E7_AilcvQ2MwGnsLhuv-sFT0kmRKxUdH/view?usp=sharing" },
        { id: "cheat", name: "Master Syntax (3-in-1)", icon: <ListChecks />, rating: 5.0, reviews: 540, url: "https://drive.google.com/file/d/1xK0XQ1wPWaHiNTXJGDTgB81mATALjtK_/view?usp=sharing" },
      ]
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-[#050112]/98 backdrop-blur-[100px] flex items-center justify-center p-6 md:p-12"
    >
      <button onClick={() => setIsOpen(false)} className="absolute top-8 right-12 text-white/20 hover:text-[#00f2ff] transition-all"><X size={48} /></button>

      <div className="w-full h-full max-w-[1600px] flex flex-col overflow-hidden">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-5xl font-black uppercase italic text-white tracking-tighter">
            PRODUCTION <span className="text-[#00f2ff]">VAULT</span>
          </h1>
          <p className="text-white/30 tracking-[0.6em] text-[10px] mt-2 uppercase font-bold">Standardized Career Acceleration Assets</p>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 overflow-y-auto no-scrollbar pb-20 px-2">
          {sections.map((section) => (
            <div key={section.id} className="flex flex-col gap-6">
              <div className={`p-6 rounded-[3rem] bg-gradient-to-br ${section.color} shadow-xl shadow-black/40`}>
                <h2 className="text-xl font-black uppercase italic text-white">{section.title}</h2>
                <p className="text-white/80 text-[9px] uppercase font-bold mt-1 tracking-widest">{section.subtitle}</p>
              </div>

              <div className="space-y-4">
                {section.items.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.05, translateZ: 40, rotateX: -5, rotateY: 5 }}
                    style={{ transformStyle: 'preserve-3d' }}
                    className="p-5 bg-white/[0.03] border border-white/5 rounded-[2.5rem] hover:border-[#00f2ff]/30 transition-all group"
                  >
                    <div className="flex justify-between items-start">
                      <div className="p-3.5 rounded-2xl bg-white/5 text-[#00f2ff] group-hover:bg-[#00f2ff] group-hover:text-black transition-all">
                        {React.cloneElement(item.icon, { size: 24 })}
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-yellow-400 justify-end">
                          <Star size={10} fill="currentColor" />
                          <span className="text-[10px] font-black">{item.rating}</span>
                        </div>
                        <p className="text-[7px] text-white/20 uppercase font-black">{item.reviews} Verified Reviews</p>
                      </div>
                    </div>
                    <h4 className="text-white font-black uppercase text-xs mt-5 tracking-wide group-hover:text-[#00f2ff]">{item.name}</h4>
                    <div className="mt-6 flex justify-between items-center">
                      <span className="text-xl font-black text-white/90">₹1</span>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation(); 
                            
                            // We create a "Clean" object with NO React components/icons
                            const cleanItem = {
                              id: item.id,
                              name: item.name,
                              price: 1, // Or item.price
                              url: item.url, // This is the most important part!
                              type: section.title.split('.')[1].trim() // e.g., "Career Roadmaps"
                            };

                            console.log("🚀 Adding Clean Item to Cart:", cleanItem); 
                            onAddToCart(cleanItem);
                          }}
                        // Added 'transform: translateZ(100px)' to ensure it's above the 3D card surface
                        style={{ transform: 'translateZ(100px)' }}
                        className="relative z-[100] px-5 py-2 bg-[#00f2ff] text-black font-black uppercase text-[9px] rounded-xl hover:scale-110 active:scale-95 transition-all pointer-events-auto cursor-pointer shadow-[0_0_20px_rgba(0,242,255,0.4)]"
                        >
                        ADD TO CART
                        </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDashboard;
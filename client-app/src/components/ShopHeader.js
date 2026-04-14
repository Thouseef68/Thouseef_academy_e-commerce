import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Star, Zap, Users, Globe, Flame, Quote } from 'lucide-react';

const ShopHeader = () => {
  const [showAbout, setShowAbout] = useState(false);

  const bubbleFloat = (delay = 0) => ({
    y: [0, -15, 0],
    x: [0, 8, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut", delay }
  });

  const dotColors = ['#F472B6', '#A78BFA', '#60A5FA', '#22D3EE', '#34D399', '#FBBF24', '#F87171', '#818CF8', '#2DD4BF'];

  const navItems = [
    { name: 'HOME', path: '/', grad: 'from-[#F472B6]/80 to-[#DB2777]/80', isAction: false },
    { name: 'ABOUT', path: '#', grad: 'from-[#A78BFA]/80 to-[#7C3AED]/80', isAction: true },
    { name: 'PROFILE', path: '/login', grad: 'from-[#60A5FA]/80 to-[#2563EB]/80', isAction: false },
  ];

  // 💎 THE EXECUTIVE LEADERSHIP
  const team = [
    { 
      name: "Sathvik BR", 
      role: "Chief Technology Officer", 
      bio: "Sathvik is the master of logical infrastructure. He engineered the algorithmic precision of our roadmaps, ensuring that every byte of data serves a tactical career purpose. He doesn't just build systems; he optimizes human potential through technology.",
      stat: "10+ Framework Masteries"
    },
    { 
      name: "Pavan R", 
      role: "Chief Operating Officer", 
      bio: "The strategist of excellence. Pavan oversees the entire quality control protocol of the Academy. Every certification link and asset vault is personally vetted by him to ensure it meets the rigorous demands of Fortune 500 standards.",
      stat: "100% Quality Assurance"
    },
    { 
      name: "Zaki Faisal", 
      role: "Chief Creative Officer", 
      bio: "Zaki is the architect of the Academy's visual soul. He believes that elite tech skills deserve an elite interface. He bridges the gap between high-end aesthetic design and functional psychology, creating an immersive neural experience for every user.",
      stat: "Visual Brand Pioneer"
    }
  ];

  return (
    <header className="fixed top-0 w-full z-[100] px-16 py-12 flex justify-between items-center pointer-events-none font-sans">
      
      {/* BRANDING */}
      <div className="flex items-center gap-8 pointer-events-auto cursor-pointer" onClick={() => window.location.href="/"}>
        <motion.div animate={bubbleFloat(0)} className="relative h-24 w-24 flex items-center justify-center">
           <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-24 pointer-events-none">
             {dotColors.map((color, i) => (
               <motion.div key={i} animate={{ y: [0, -12, 0], opacity: [0.4, 1, 0.4] }} transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.2 }} className="absolute w-2 h-2 rounded-sm" style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}`, left: `${5 + (i * 11)}%`, top: `${Math.sin(i * 0.5) * 20 + 20}px` }}/>
             ))}
           </div>
           <div className="relative w-20 h-20">
             <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#A855F7]/40 to-[#3B82F6]/40 blur-md animate-pulse" />
             <div className="absolute inset-1 rounded-full border border-white/30 bg-white/10 backdrop-blur-md shadow-inner" />
             <div className="absolute inset-2 rounded-full border-[1.5px] border-white/50 bg-gradient-to-br from-white/40 via-transparent to-[#3B82F6]/30 flex items-center justify-center overflow-hidden">
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#FBCFE8] via-[#A855F7] to-[#3B82F6] shadow-[0_0_15px_white]" />
             </div>
           </div>
        </motion.div>

        <motion.h1 animate={bubbleFloat(0.5)} className="text-5xl font-black italic tracking-tighter uppercase">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] via-[#00D4FF] to-[#3B82F6] filter drop-shadow-[0_0_15px_rgba(0,212,255,0.5)]">
            THOUSEEF'F..😎
          </span>
        </motion.h1>
      </div>

      {/* NAV BUBBLES */}
      <nav className="flex items-center gap-6 pointer-events-auto">
        {navItems.map((item, idx) => (
          item.isAction ? (
            <motion.div
              key={item.name}
              onClick={() => setShowAbout(true)}
              animate={bubbleFloat(idx * 0.4)}
              whileHover={{ scale: 1.15 }}
              className={`w-20 h-20 rounded-full bg-gradient-to-br ${item.grad} border border-white/50 shadow-2xl flex items-center justify-center relative overflow-hidden backdrop-blur-lg group cursor-pointer`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent opacity-80" />
              <span className="text-[10px] font-black tracking-widest text-white relative z-10">{item.name}</span>
            </motion.div>
          ) : (
            <Link key={item.name} to={item.path}>
              <motion.div animate={bubbleFloat(idx * 0.4)} whileHover={{ scale: 1.15 }} className={`w-20 h-20 rounded-full bg-gradient-to-br ${item.grad} border border-white/50 shadow-2xl flex items-center justify-center relative overflow-hidden backdrop-blur-lg group`}>
                <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent opacity-80" />
                <span className="text-[10px] font-black tracking-widest text-white relative z-10">{item.name}</span>
              </motion.div>
            </Link>
          )
        ))}
      </nav>

      {/* 🌌 BORDERLESS CINEMATIC OVERLAY */}
      <AnimatePresence>
        {showAbout && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#050112] flex flex-col items-center justify-start overflow-y-auto overflow-x-hidden no-scrollbar pointer-events-auto"
          >
            {/* Edge-to-Edge Mesh Gradients */}
            <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-[#A855F7]/10 to-transparent pointer-events-none" />
            <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/20 blur-[200px] rounded-full" />
            <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-purple-600/20 blur-[200px] rounded-full" />

            <button onClick={() => setShowAbout(false)} className="fixed top-12 right-12 p-4 bg-white/5 hover:bg-white/10 rounded-full text-white/40 hover:text-white transition-all z-[210] border border-white/10">
              <X size={32} />
            </button>
            
            <div className="w-full max-w-7xl px-8 py-32 flex flex-col gap-32">
               
               {/* 👑 THE VISIONARY FOUNDER (THOUSEEF F) */}
               <motion.div 
                 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
                 className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
               >
                  <div className="lg:col-span-5 relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#A855F7] to-[#00D4FF] rounded-[5rem] blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                    <div className="relative w-full aspect-square rounded-[4.5rem] bg-black border border-white/10 flex items-center justify-center overflow-hidden">
                       <Flame size={180} className="text-white/5" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                       <div className="absolute bottom-10 left-10 flex items-center gap-4">
                          <div className="p-4 bg-cyan-400 rounded-3xl shadow-[0_0_20px_rgba(0,242,255,0.4)]"><ShieldCheck size={32} className="text-black" /></div>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400">Founder Signature</p>
                            <h4 className="text-2xl font-black italic uppercase text-white tracking-tighter">THOUSEEF F</h4>
                          </div>
                       </div>
                    </div>
                  </div>

                  <div className="lg:col-span-7 text-left">
                    <h2 className="text-8xl md:text-9xl font-black italic uppercase tracking-tighter leading-none mb-10">
                      THE <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] via-[#00D4FF] to-[#3B82F6]">ARCHITECT.</span>
                    </h2>
                    <div className="space-y-8 max-w-2xl">
                       <p className="text-xl text-white/70 leading-relaxed font-medium">
                         Thouseef F didn't just build a shop; he built a **Career Weaponization Protocol**. 
                         Recognizing that the modern education system was failing the ambitious, he conceptualized Thouseef Academy 
                         as a tactical vault for the "1% Engineers."
                       </p>
                       <p className="text-lg text-white/40 leading-relaxed italic">
                         "My mission is simple: To give you the unfair advantage. We provide the blueprints, 
                         we provide the assets, and we provide the clarity. Your only job is to execute."
                       </p>
                       <div className="flex gap-12 pt-8">
                          <div><p className="text-4xl font-black text-white">500+</p><p className="text-[9px] uppercase font-black tracking-widest text-cyan-400">Careers Shifted</p></div>
                          <div><p className="text-4xl font-black text-white">20+</p><p className="text-[9px] uppercase font-black tracking-widest text-purple-500">Neural Assets</p></div>
                       </div>
                    </div>
                  </div>
               </motion.div>

               {/* 🏢 THE EXECUTIVE BOARD */}
               <div className="space-y-20">
                  <div className="flex items-center gap-6">
                    <h3 className="text-5xl font-black italic uppercase tracking-tighter">THE <span className="text-white/20">COUNCIL</span></h3>
                    <div className="h-[2px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {team.map((member, i) => (
                      <motion.div 
                        key={member.name}
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                        className="p-12 bg-white/[0.02] border border-white/5 rounded-[5rem] hover:bg-white/[0.04] transition-all group text-left relative overflow-hidden"
                      >
                         <div className="absolute top-0 left-0 w-1 h-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-all" />
                         <div className="mb-10 text-cyan-400 opacity-30 group-hover:opacity-100 transition-opacity">
                            {member.name === "Sathvik BR" ? <Zap size={40} /> : member.name === "Pavan R" ? <Globe size={40} /> : <Users size={40} />}
                         </div>
                         <h4 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-2">{member.name}</h4>
                         <p className="text-cyan-400 font-black uppercase text-[10px] tracking-widest mb-6">{member.role}</p>
                         <p className="text-white/40 text-sm leading-relaxed mb-10">{member.bio}</p>
                         <div className="pt-6 border-t border-white/5">
                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 group-hover:text-cyan-400 transition-colors">{member.stat}</span>
                         </div>
                      </motion.div>
                    ))}
                  </div>
               </div>

               {/* FINAL QUOTE */}
               <div className="py-40 text-center relative">
                  <Quote size={80} className="mx-auto mb-10 text-white/5" />
                  <h2 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter text-white/90 leading-tight">
                    "WE ARE NOT A SCHOOL.<br/>WE ARE AN <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] to-[#00D4FF]">EVOLUTION."</span>
                  </h2>
                  <p className="mt-8 text-[10px] text-white/20 font-black uppercase tracking-[1em]">Thouseef Academy Neural Link Protocol</p>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default ShopHeader;
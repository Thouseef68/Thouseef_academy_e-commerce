import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ShopHeader = () => {
  const bubbleFloat = (delay = 0) => ({
    y: [0, -15, 0],
    x: [0, 8, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut", delay }
  });

  const dotColors = [
    '#F472B6', '#A78BFA', '#60A5FA', '#22D3EE', 
    '#34D399', '#FBBF24', '#F87171', '#818CF8', '#2DD4BF'
  ];

  const navItems = [
    { name: 'HOME', path: '/', grad: 'from-[#F472B6]/80 to-[#DB2777]/80' },
    { name: 'ABOUT', path: '/about', grad: 'from-[#A78BFA]/80 to-[#7C3AED]/80' },
    { name: 'PROFILE', path: '/profile', grad: 'from-[#60A5FA]/80 to-[#2563EB]/80' },
    
  ];

  return (
    <header className="fixed top-0 w-full z-50 px-16 py-12 flex justify-between items-center pointer-events-none">
      
      {/* BRANDING: Triple Glass Bubble + SHINING Gradient Name */}
      <div className="flex items-center gap-8 pointer-events-auto cursor-pointer">
        <motion.div animate={bubbleFloat(0)} className="relative h-24 w-24 flex items-center justify-center">
          
          {/* COLORED DOTS (Untouched - Perfect as requested) */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-24 pointer-events-none">
             {dotColors.map((color, i) => (
               <motion.div
                 key={i}
                 animate={{ y: [0, -12, 0], opacity: [0.4, 1, 0.4] }}
                 transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.2 }}
                 className="absolute w-2 h-2 rounded-sm"
                 style={{
                   backgroundColor: color,
                   boxShadow: `0 0 10px ${color}`,
                   left: `${5 + (i * 11)}%`,
                   top: `${Math.sin(i * 0.5) * 20 + 20}px`,
                 }}
               />
             ))}
          </div>

          {/* TRIPLE GLASS BUBBLE (Untouched - Perfect as requested) */}
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#A855F7]/40 to-[#3B82F6]/40 blur-md animate-pulse" />
            <div className="absolute inset-1 rounded-full border border-white/30 bg-white/10 backdrop-blur-md shadow-inner" />
            <div className="absolute inset-2 rounded-full border-[1.5px] border-white/50 bg-gradient-to-br from-white/40 via-transparent to-[#3B82F6]/30 flex items-center justify-center overflow-hidden">
                <div className="absolute top-1 left-3 w-10 h-5 bg-gradient-to-b from-white/70 to-transparent blur-[1px] rounded-full -rotate-12" />
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#FBCFE8] via-[#A855F7] to-[#3B82F6] shadow-[0_0_15px_white]" />
            </div>
          </div>
        </motion.div>

        {/* SHINING GRADIENT NAME: High-visibility Purple & Neon Blue */}
        <motion.h1 
          animate={bubbleFloat(0.5)}
          className="text-5xl font-black italic tracking-tighter uppercase"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] via-[#00D4FF] to-[#3B82F6] filter drop-shadow-[0_0_15px_rgba(0,212,255,0.5)]">
            THOUSEEF'F..😎
          </span>
        </motion.h1>
      </div>

      {/* NAV BUBBLES */}
      <nav className="flex items-center gap-6 pointer-events-auto">
        {navItems.map((item, idx) => (
          <Link key={item.name} to={item.path}>
            <motion.div
              animate={bubbleFloat(idx * 0.4)}
              whileHover={{ scale: 1.15 }}
              className={`w-20 h-20 rounded-full bg-gradient-to-br ${item.grad} border border-white/50 shadow-2xl flex items-center justify-center relative overflow-hidden backdrop-blur-lg group`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent opacity-80" />
              <div className="absolute top-2 left-4 w-8 h-4 bg-white/30 blur-[1px] rounded-full -rotate-12" />
              <span className="text-[10px] font-black tracking-widest text-white drop-shadow-md relative z-10">
                {item.name}
              </span>
            </motion.div>
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default ShopHeader;
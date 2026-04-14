import React, { useState } from 'react';
import { MessageSquare, Send, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SupportBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-10 right-10 z-[500] pointer-events-auto">
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="w-80 h-96 bg-[#120129] border border-cyan-400/30 rounded-[3rem] mb-6 shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
              <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Neural Support</span>
              <button onClick={() => setIsOpen(false)}><X size={16} className="text-white/20"/></button>
            </div>
            <div className="flex-1 p-6 text-[11px] text-white/40 italic">System: How can I assist your mission today, Operative?</div>
            <div className="p-4 bg-black/40 flex items-center gap-2">
              <input type="text" placeholder="Type message..." className="flex-1 bg-transparent outline-none text-[11px] text-white" />
              <button className="text-cyan-400"><Send size={16}/></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={() => setIsOpen(!isOpen)} className="w-16 h-16 bg-cyan-400 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,242,255,0.4)] hover:scale-110 transition-all">
        <MessageSquare className="text-black" size={28} />
      </button>
    </div>
  );
};

export default SupportBot;
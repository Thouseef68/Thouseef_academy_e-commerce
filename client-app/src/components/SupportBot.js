import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, Zap, ShieldCheck } from 'lucide-react';

const SupportBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Neural Link established. I am the Academy AI. How can I assist your career mission today?" }
  ]);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add User Message
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // Simulated Bot Response (Tactical Tone)
    setTimeout(() => {
      const botMsg = { 
        role: 'bot', 
        text: "Analyzing protocols... Accessing roadmap database. For specific deployment issues, please verify your Order ID in the Profile Vault." 
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-10 right-10 z-[1000] pointer-events-auto font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[350px] h-[500px] bg-[#050112]/90 border border-white/10 rounded-[3rem] mb-6 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-3xl flex flex-col overflow-hidden relative"
          >
            {/* 🤖 CHAT HEADER */}
            <div className="p-6 bg-gradient-to-r from-[#A855F7]/20 to-[#00D4FF]/20 border-b border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-400 rounded-xl shadow-[0_0_15px_rgba(0,212,255,0.4)]">
                  <Bot size={18} className="text-black" />
                </div>
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-white">Neural Support</h4>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[8px] text-white/30 uppercase font-bold">System Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/20 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* 💬 MESSAGE CENTER */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar"
            >
              {messages.map((msg, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-2xl text-[11px] font-medium leading-relaxed ${
                    msg.role === 'user' 
                    ? 'bg-cyan-400 text-black rounded-tr-none' 
                    : 'bg-white/5 text-white/70 border border-white/5 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ⌨️ INPUT AREA */}
            <form 
              onSubmit={handleSendMessage}
              className="p-4 bg-black/40 border-t border-white/5 flex items-center gap-3"
            >
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Query Academy AI..." 
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[11px] text-white outline-none focus:border-cyan-400/50 transition-all placeholder:text-white/10"
              />
              <button 
                type="submit"
                className="p-3 bg-cyan-400 text-black rounded-xl hover:scale-110 active:scale-95 transition-all shadow-lg shadow-cyan-400/20"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🚀 TOGGLE BUBBLE */}
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#A855F7] to-[#00D4FF] flex items-center justify-center shadow-[0_0_30px_rgba(0,212,255,0.4)] relative group"
      >
        <div className="absolute inset-1 rounded-full border border-white/30 animate-pulse" />
        {isOpen ? <X className="text-black" size={28} /> : <MessageSquare className="text-black" size={28} />}
        
        {/* Unread Indicator */}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-[#050112] flex items-center justify-center text-[10px] font-black text-white">
            1
          </div>
        )}
      </motion.button>
    </div>
  );
};

export default SupportBot;
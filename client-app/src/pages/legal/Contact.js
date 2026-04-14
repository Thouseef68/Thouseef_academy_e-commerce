import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Globe, Clock, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="min-h-screen bg-[#050112] text-white p-8 md:p-24"
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl font-black uppercase italic tracking-tighter mb-2">Mission <span className="text-cyan-400">Control</span></h1>
        <p className="text-white/30 uppercase tracking-[0.6em] text-[10px] mb-16 font-bold">Thouseef Academy Technical Support</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1: Email */}
          <div className="group p-10 bg-white/5 border border-white/10 rounded-[3rem] hover:bg-cyan-400/5 hover:border-cyan-400/50 transition-all duration-500">
            <Mail className="text-cyan-400 mb-6 group-hover:scale-110 transition-transform" size={40} />
            <h3 className="text-2xl font-black uppercase mb-4 italic">Direct Email</h3>
            <a href="mailto:thouseefthouseef1234@gmail.com" className="text-cyan-400 font-black text-sm tracking-tight break-all">thouseefthouseef1234@gmail.com</a>
          </div>

          {/* Card 2: Phone (CRITICAL FOR RAZORPAY) */}
          <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem]">
            <Phone className="text-cyan-400 mb-6" size={40} />
            <h3 className="text-2xl font-black uppercase mb-4 italic">Helpline</h3>
            <p className="text-cyan-400 font-black text-sm tracking-tight">+91 [8015228296]</p>
            <p className="text-[10px] text-white/30 uppercase mt-2">Active Mon-Sat</p>
          </div>

          {/* Card 3: Response Time */}
          <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem]">
            <Clock className="text-cyan-400 mb-6" size={40} />
            <h3 className="text-2xl font-black uppercase mb-4 italic">Response</h3>
            <p className="text-white/50 text-sm">Agents active 10 AM - 8 PM IST. Average: 4 Hours.</p>
          </div>

          {/* Card 4: Location */}
          <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem]">
            <Globe className="text-cyan-400 mb-6" size={40} />
            <h3 className="text-2xl font-black uppercase mb-4 italic">Location</h3>
            <p className="text-white/50 text-sm italic uppercase font-bold tracking-widest">Bengaluru, Karnataka, India</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
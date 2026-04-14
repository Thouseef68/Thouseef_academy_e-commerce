import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, RefreshCcw } from 'lucide-react';

const Refund = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-[#050112] text-white p-8 md:p-24"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-cyan-400/10 rounded-2xl text-cyan-400">
            <RefreshCcw size={32} />
          </div>
          <h1 className="text-5xl font-black uppercase italic tracking-tighter">
            Refund & <span className="text-cyan-400">Cancellation</span>
          </h1>
        </div>

        <div className="p-1 w-full bg-gradient-to-r from-cyan-400/50 to-transparent mb-12" />

        <div className="space-y-12 text-white/70 font-medium leading-relaxed">
          <section className="bg-white/5 p-8 rounded-[2rem] border border-white/10 hover:border-cyan-400/30 transition-all">
            <h3 className="text-white text-xl font-black uppercase mb-4 flex items-center gap-2">
              <ShieldAlert size={20} className="text-cyan-400" /> Digital Asset Policy
            </h3>
            <p>
              At Thouseef Academy, we provide high-value digital roadmaps and course materials. 
              <span className="text-white font-bold ml-1">Due to the digital nature of these products, all sales are final.</span> 
              Once the access link is transmitted to your registered email, the order is considered "Consumed" and cannot be cancelled or refunded.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem]">
              <h4 className="text-cyan-400 font-black uppercase text-xs tracking-widest mb-2">Non-Receipt of Assets</h4>
              <p className="text-sm">If you haven't received your link within 24 hours of payment, please check your spam folder or contact support.</p>
            </div>
            <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem]">
              <h4 className="text-cyan-400 font-black uppercase text-xs tracking-widest mb-2">Duplicate Payments</h4>
              <p className="text-sm">In case of double-deduction, the excess amount will be refunded to the original source within 5-7 working days.</p>
            </div>
          </div>

          <div className="text-center pt-10 border-t border-white/5">
            <p className="text-[10px] uppercase tracking-[0.4em] mb-2">Assistance Required?</p>
            <p className="text-cyan-400 font-black italic">thouseefthouseef1234@gmail.com</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Refund;
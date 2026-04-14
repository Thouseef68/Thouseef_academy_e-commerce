import React from 'react';
import { Mail, MessageSquare, ShieldAlert, Clock } from 'lucide-react';

const Support = () => {
  return (
    <div className="min-h-screen bg-[#050112] text-white p-12 font-sans">
      <h1 className="text-5xl font-black uppercase italic mb-2">Technical <span className="text-cyan-400">Support</span></h1>
      <p className="text-white/40 uppercase tracking-[0.5em] text-[10px] mb-12">Mission Control Assistance</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
        {/* Contact Card */}
        <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem]">
          <Mail className="text-cyan-400 mb-6" size={40} />
          <h3 className="text-2xl font-bold mb-2">Email Us</h3>
          <p className="text-white/60 text-sm mb-6">For payment issues or access link recovery.</p>
          <a href="mailto:thouseefthouseef1234@gmail.com" className="text-xl font-black text-cyan-400 hover:underline">
            support@yourdomain.com
          </a>
        </div>

        {/* Info Card */}
        <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem]">
          <Clock className="text-cyan-400 mb-6" size={40} />
          <h3 className="text-2xl font-bold mb-2">Response Time</h3>
          <p className="text-white/60 text-sm">Our team is active from 10 AM - 8 PM IST. Expect a response within 2-4 hours.</p>
        </div>
      </div>

      {/* Legal Footer Links (Required by Razorpay) */}
      <div className="mt-20 pt-10 border-t border-white/5 flex flex-wrap gap-8 opacity-30 text-[10px] font-bold uppercase tracking-widest">
        <a href="/terms" className="hover:text-cyan-400">Terms & Conditions</a>
        <a href="/privacy" className="hover:text-cyan-400">Privacy Policy</a>
        <a href="/refund" className="hover:text-cyan-400">Refund & Cancellation</a>
        <a href="/delivery" className="hover:text-cyan-400">Shipping & Delivery</a>
      </div>
    </div>
  );
};

export default Support;
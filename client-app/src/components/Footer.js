import React from 'react';
import { Link } from 'react-router-dom'; // Use Link to keep the app fast

const Footer = () => {
  return (
    <footer className="py-20 border-t border-white/5 bg-[#050112] text-center">
      <div className="flex flex-wrap justify-center gap-8 mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
        <Link to="/contact" className="hover:text-cyan-400 transition-colors">Contact Us</Link>
        <Link to="/refund" className="hover:text-cyan-400 transition-colors">Refund Policy</Link>
        <Link to="/privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link>
        <Link to="/terms" className="hover:text-cyan-400 transition-colors">Terms of Service</Link>
      </div>
      
      <p className="text-[9px] text-white/20 uppercase font-black tracking-widest">
        © 2026 Thouseef Academy. All Rights Reserved.
      </p>
      <div className="mt-4 text-[8px] text-cyan-400/20 uppercase font-bold italic">
        Secured by Razorpay Gateway
      </div>
    </footer>
  );
};

export default Footer;
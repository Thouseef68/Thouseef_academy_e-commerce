import React from "react";
import { Link } from "react-router-dom";
import { LayoutGrid, ShoppingCart, User } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = ({ cartCount }) => {
  const floatAnim = (delay = 0) => ({
    y: [0, -5, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay }
  });

  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-10 py-6 bg-[#1e1b4b]/40 backdrop-blur-xl border-b border-white/10 text-white">
      {/* LOGO */}
      <Link to="/" className="flex items-center space-x-3 group">
        <motion.div animate={floatAnim(0)} className="bg-pink-500 p-2 rounded-xl shadow-lg shadow-pink-500/40 rotate-12">
          <LayoutGrid size={24} />
        </motion.div>
        <span className="font-black tracking-widest uppercase text-xl">NEON STORE</span>
      </Link>

      {/* FLOATING BUBBLE NAV LINKS */}
      <div className="hidden md:flex space-x-4">
        {["HOME", "COLLECTIONS", "ABOUT"].map((item, idx) => (
          <motion.div
            key={item}
            animate={floatAnim(idx * 0.2)}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
            className="px-6 py-2 bg-white/5 rounded-full border border-white/10 text-[10px] font-bold tracking-widest cursor-pointer transition-all"
          >
            {item}
          </motion.div>
        ))}
      </div>

      {/* ACTIONS */}
      <div className="flex items-center space-x-4">
        <Link to="/checkout" className="relative p-3 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition">
          <ShoppingCart size={20} />
          {cartCount > 0 && (
            <motion.span 
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-pink-500 text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold border-2 border-[#1e1b4b]"
            >
              {cartCount}
            </motion.span>
          )}
        </Link>
        <Link to="/login" className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full font-black text-[10px] tracking-widest hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all">
          <User size={16} />
          <span>LOGIN / JOIN</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
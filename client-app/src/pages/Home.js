import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileDashboard from '../components/ProfileDashboard';
import ProductDashboard from '../components/ProductDashboard';
import CartDashboard from '../components/CartDashboard'; 
import { Link } from 'react-router-dom';

const Home = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); 
  const [cart, setCart] = useState([]);
  
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('activeUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Cart Logic
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        alert(`${product.name} is already in your vault!`);
        return prev;
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 relative overflow-hidden bg-[#0d0221]">
      
      {/* Background Neon Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#00f2ff]/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[70%] bg-[#7000ff]/20 blur-[150px] rounded-full" />
      </div>

      {/* Main Interactive Boxes */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="w-[85vw] h-[80vh] relative z-10 mt-10"
      >
        <div className="w-full h-full bg-white/[0.02] backdrop-blur-[80px] border border-white/10 rounded-[10rem] shadow-2xl relative overflow-hidden flex items-center justify-center px-10">
          
          {/* MARKET BOX */}
          <motion.div 
            onClick={() => setIsProductOpen(true)}
            whileHover={{ scale: 1.02, y: -10 }}
            className="flex-1 h-[78%] bg-white/[0.05] border border-white/20 rounded-[10rem] cursor-pointer flex flex-col items-center justify-center group"
          >
            <h3 className="text-5xl font-black uppercase tracking-[0.2em] italic text-transparent bg-clip-text bg-gradient-to-br from-[#bc00ff] to-[#7000ff]">
              Market
            </h3>
            <p className="text-[10px] text-cyan-400 mt-4 tracking-[0.5em] font-bold opacity-60">EXPLORE VAULT</p>
          </motion.div>

          {/* CART BOX */}
          <motion.div 
            onClick={() => setIsCartOpen(true)}
            whileHover={{ scale: 1.05, y: -10 }}
            className="flex-1 h-[62%] -ml-48 z-10 bg-white/[0.1] border border-[#00f2ff]/30 rounded-[8rem] flex flex-col items-center justify-center cursor-pointer group shadow-[0_0_30px_rgba(0,242,255,0.1)]"
          >
            <h3 className="text-3xl font-black uppercase tracking-[0.2em] italic text-transparent bg-clip-text bg-gradient-to-br from-[#00f2ff] to-[#0066ff]">
              Cart ({cart.reduce((acc, item) => acc + item.qty, 0)})
            </h3>
            <p className="text-[8px] text-white/20 mt-2 uppercase font-black tracking-widest group-hover:text-white transition-colors">View Items</p>
          </motion.div>

          {/* PROFILE BOX */}
          <motion.div 
            onClick={() => setIsProfileOpen(true)}
            whileHover={{ scale: 1.02, y: -10 }}
            className="flex-1 h-[55%] -ml-48 z-20 bg-white/[0.08] border border-[#00f2ff]/30 rounded-[7rem] cursor-pointer flex flex-col items-center justify-center"
          >
            <h3 className="text-4xl font-black uppercase italic text-white/80 tracking-tighter">
              {currentUser ? currentUser.name.split(' ')[0] : "Profile"}
            </h3>
          </motion.div>
        </div>
      </motion.div>

      {/* SECRET ADMIN LINK - Moved outside overlays for cleaner UI */}
      <footer className="w-full py-8 text-center relative z-20">
        <Link 
          to="/admin-vault-007" 
          className="text-[10px] text-white/20 hover:text-cyan-400 uppercase tracking-[0.5em] font-black transition-all"
        >
          — Admin Control Center —
        </Link>
      </footer>

      {/* FULL SCREEN OVERLAYS */}
      <AnimatePresence>
        {isProductOpen && (
          <ProductDashboard setIsOpen={setIsProductOpen} onAddToCart={addToCart} />
        )}

        {isCartOpen && (
          <CartDashboard 
            setIsOpen={setIsCartOpen} 
            cart={cart} 
            updateQty={updateQty} 
            removeFromCart={removeFromCart} 
            userEmail={currentUser?.email || "guest@academy.com"}
          />
        )}

        {isProfileOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#050112]/95 backdrop-blur-[60px] flex items-center justify-center p-8"
          >
             <button onClick={() => setIsProfileOpen(false)} className="absolute top-8 right-12 text-[#00f2ff]/30 hover:text-[#00f2ff] text-4xl font-black z-[110]">✕</button>
             <motion.div 
               initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
               className="w-full h-full max-w-7xl bg-black/20 border border-white/10 rounded-[6rem] overflow-hidden shadow-2xl"
             >
                <ProfileDashboard user={currentUser} setUser={setCurrentUser} setIsOpen={setIsProfileOpen} />
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
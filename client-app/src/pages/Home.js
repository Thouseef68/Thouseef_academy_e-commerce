import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileDashboard from '../components/ProfileDashboard';
import ProductDashboard from '../components/ProductDashboard';
import CartDashboard from '../components/CartDashboard'; 
import { Link, useNavigate } from 'react-router-dom';
import { syncWishlistToCloud } from "../services/userService"; // ✅ ADDED

const Home = ({ cart, setCart, wishlist, setWishlist }) => { // ✅ Props from App.js
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); 
  
  // 👤 USER STATE
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem('userEmail'));

  // Sync state if localStorage changes
  useEffect(() => {
    const handleStorage = () => {
      setUserEmail(localStorage.getItem('userEmail'));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // --- LOGIC SECTOR ---

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        alert(`${product.name} is already in your payload!`);
        return prev;
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  // ✅ UPDATED: Cloud-Synced Wishlist Logic
  const toggleWishlist = async (product) => {
    if (!userEmail) {
      alert("Please login to save items to your vault.");
      navigate("/login");
      return;
    }

    const isInWishlist = wishlist.some(item => item.id === product.id);
    
    if (isInWishlist) {
      // 1. Remove Locally
      setWishlist(prev => prev.filter(item => item.id !== product.id));
      // 2. Sync to Firebase
      await syncWishlistToCloud(userEmail, product, "remove");
    } else {
      // 1. Add Locally
      setWishlist(prev => [...prev, product]);
      // 2. Sync to Firebase
      await syncWishlistToCloud(userEmail, product, "add");
    }
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

  const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 relative overflow-hidden bg-[#050112] font-sans">
      
      {/* NEON AMBIENCE */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-cyan-500/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[70%] bg-purple-600/20 blur-[150px] rounded-full animate-pulse" />
      </div>

      {/* MAIN INTERACTIVE CORE */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="w-[90vw] h-[85vh] relative z-10"
      >
        <div className="w-full h-full bg-white/[0.01] backdrop-blur-[100px] border border-white/5 rounded-[12rem] shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative overflow-hidden flex items-center justify-center px-12">
          
          {/* MARKET BOX */}
          <motion.div 
            onClick={() => setIsProductOpen(true)}
            whileHover={{ scale: 1.03, y: -10, backgroundColor: "rgba(255,255,255,0.05)" }}
            className="flex-1 h-[80%] bg-white/[0.03] border border-white/10 rounded-[10rem] cursor-pointer flex flex-col items-center justify-center group transition-all"
          >
            <h3 className="text-6xl font-black uppercase tracking-tighter italic text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-blue-600">
              Market
            </h3>
            <p className="text-[10px] text-cyan-400 mt-6 tracking-[0.6em] font-black opacity-40 group-hover:opacity-100 transition-all">ACCESS PRODUCTS</p>
          </motion.div>

          {/* CART BOX */}
          <motion.div 
            onClick={() => setIsCartOpen(true)}
            whileHover={{ scale: 1.05, y: -15, boxShadow: "0 0 50px rgba(0,242,255,0.15)" }}
            className="flex-1 h-[65%] -ml-40 z-10 bg-white/[0.08] border border-cyan-400/20 rounded-[8rem] flex flex-col items-center justify-center cursor-pointer group shadow-2xl relative"
          >
            <div className="absolute top-10 right-10 bg-cyan-400 text-black text-[10px] font-black px-3 py-1 rounded-full shadow-[0_0_15px_rgba(0,242,255,0.5)]">
               {totalQty}
            </div>
            <h3 className="text-3xl font-black uppercase tracking-widest italic text-white/90">
              Cart
            </h3>
            <p className="text-[9px] text-white/20 mt-3 uppercase font-black tracking-[0.4em] group-hover:text-cyan-400 transition-colors">Review Payload</p>
          </motion.div>

          {/* PROFILE BOX */}
          <motion.div 
            onClick={() => {
              if (!userEmail) navigate("/login");
              else setIsProfileOpen(true);
            }}
            whileHover={{ scale: 1.03, y: -10, backgroundColor: "rgba(255,255,255,0.1)" }}
            className="flex-1 h-[58%] -ml-40 z-20 bg-white/[0.05] border border-white/10 rounded-[7rem] cursor-pointer flex flex-col items-center justify-center group transition-all"
          >
            <h3 className="text-4xl font-black uppercase italic text-white/80 tracking-tighter text-center px-8">
              {userEmail ? (userEmail.split('@')[0].toUpperCase()) : "Authorize"}
            </h3>
            <div className="mt-3 flex items-center gap-2">
               <div className={`w-1.5 h-1.5 rounded-full ${userEmail ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
               <p className="text-[9px] text-white/30 font-black tracking-widest uppercase">
                  {userEmail ? "Neural Link Active" : "Locked"}
               </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* FOOTER CONTROL */}
      <footer className="w-full py-10 text-center relative z-20">
        <Link 
          to="/admin-vault-007" 
          className="text-[10px] text-white/10 hover:text-cyan-400 uppercase tracking-[0.8em] font-black transition-all hover:tracking-[1em]"
        >
          — System Administrator —
        </Link>
      </footer>

      {/* OVERLAYS */}
      <AnimatePresence>
        {isProductOpen && (
          <ProductDashboard 
             setIsOpen={setIsProductOpen} 
             onAddToCart={addToCart} 
             onToggleWishlist={toggleWishlist}
             wishlist={wishlist} // ✅ Using global wishlist
          />
        )}

        {isCartOpen && (
          <CartDashboard 
            setIsOpen={setIsCartOpen} 
            cart={cart} 
            updateQty={updateQty} 
            removeFromCart={removeFromCart} 
            userEmail={userEmail || "guest@academy.com"}
            clearCart={() => setCart([])} // ✅ Pass clearCart helper
          />
        )}

        {isProfileOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#050112]/98 backdrop-blur-[100px] flex items-center justify-center p-6 md:p-12"
          >
             <button onClick={() => setIsProfileOpen(false)} className="absolute top-10 right-10 text-white/20 hover:text-cyan-400 text-5xl font-black z-[110] transition-colors">✕</button>
             <motion.div 
               initial={{ scale: 0.95, y: 30 }} animate={{ scale: 1, y: 0 }}
               className="w-full h-full max-w-7xl bg-black/40 border border-white/5 rounded-[5rem] overflow-hidden shadow-2xl relative"
             >
                <ProfileDashboard 
                   userEmail={userEmail} 
                   setIsOpen={setIsProfileOpen} 
                   wishlist={wishlist} // ✅ Now the wishlist prop is passed correctly
                />
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
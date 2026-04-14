import React, { useEffect, useState } from 'react';
import { saveUserProfile, getUserProfile } from "../services/userService";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, Heart, Ticket, MapPin, Mail, UserPen, LogOut, 
  ChevronLeft, ShieldCheck, CheckCircle, ShoppingCart, Activity
} from 'lucide-react';

const ProfileDashboard = ({ userEmail, setIsOpen, wishlist = [], onAddToCart }) => {
  const [activeTab, setActiveTab] = useState("grid");
  const [userOrders, setUserOrders] = useState([]);
  const [address, setAddress] = useState("");
  const [deliveryEmail, setDeliveryEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingOrders, setFetchingOrders] = useState(false);

  // ✅ 1. FETCH PROFILE DATA
  useEffect(() => {
    const fetchProfile = async () => {
      if (!userEmail) return;
      const data = await getUserProfile(userEmail);
      if (data) {
        setAddress(data.actualAddress || "");
        setDeliveryEmail(data.deliveryEmail || userEmail);
        setPhone(data.phoneNumber || "");
      }
    };
    fetchProfile();
  }, [userEmail]);

  // ✅ 2. FETCH ORDERS (DUAL-QUERY LOGIC)
  useEffect(() => {
    const fetchMyOrders = async () => {
      if (!userEmail || activeTab !== "orders") return;
      
      setFetchingOrders(true);
      try {
        const ordersRef = collection(db, "orders");
        const q1 = query(ordersRef, where("customerEmail", "==", userEmail));
        const q2 = query(ordersRef, where("email", "==", userEmail));

        const [snap1, snap2] = await Promise.all([getDocs(q1), getDocs(q2)]);
        
        const combined = [...snap1.docs, ...snap2.docs].map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        const uniqueOrders = Array.from(new Map(combined.map(o => [o.id, o])).values());
        const sorted = uniqueOrders.sort((a, b) => {
          const dateA = a.createdAt?.seconds || 0;
          const dateB = b.createdAt?.seconds || 0;
          return dateB - dateA;
        });

        setUserOrders(sorted);
      } catch (err) {
        console.error("Critical Vault Error:", err);
      } finally {
        setFetchingOrders(false);
      }
    };

    fetchMyOrders();
  }, [userEmail, activeTab]);

  // ✅ 3. SAVE PROFILE
  const handleSave = async () => {
    if (!userEmail) return;
    setLoading(true);
    const result = await saveUserProfile(userEmail, {
      actualAddress: address,
      deliveryEmail: deliveryEmail || userEmail,
      phoneNumber: phone,
      updatedAt: new Date()
    });
    setLoading(false);
    if (result.success) {
      alert("Neural Profile Updated! 🚀");
      setActiveTab("grid");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsOpen(false);
    window.location.reload();
  };

  const displayName = userEmail ? userEmail.split('@')[0].toUpperCase() : "OPERATIVE";
  if (!userEmail) return null;

  return (
    <div className="w-full h-full p-12 flex flex-col bg-[#050112] overflow-y-auto no-scrollbar relative font-sans text-left">
      
      {/* HEADER SECTION */}
      <div className="flex items-center justify-between mb-16">
        <div className="flex items-center gap-6">
          {activeTab !== "grid" && (
            <button onClick={() => setActiveTab("grid")} className="p-4 bg-white/5 rounded-full text-white/40 hover:text-white transition-all border border-white/5">
              <ChevronLeft size={24} />
            </button>
          )}
          <div>
            <h2 className="text-6xl font-black text-white italic uppercase tracking-tighter">
              {activeTab === "grid" ? displayName : activeTab}
            </h2>
            <p className="text-cyan-400 font-bold uppercase text-[10px] mt-1 tracking-[0.4em]">Vault Access Authorized</p>
          </div>
        </div>

        <button onClick={handleLogout} className="flex items-center gap-2 px-6 py-3 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-[0_0_20px_rgba(239,68,68,0.1)]">
          <LogOut size={14} /> Terminate Link
        </button>
      </div>

      <AnimatePresence mode="wait">
        {/* MAIN GRID VIEW */}
        {activeTab === "grid" && (
          <motion.div key="grid" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Tile icon={<Package className="text-blue-400"/>} label="Missions" sub={`${userOrders.length} Order History`} onClick={() => setActiveTab("orders")} />
            <Tile icon={<Heart className="text-pink-500"/>} label="Wishlist" sub={`${wishlist.length} Saved Assets`} onClick={() => setActiveTab("wishlist")} />
            <Tile icon={<Ticket className="text-yellow-400"/>} label="Rewards" sub="Claim Coupons" />
            <Tile icon={<MapPin className="text-green-400"/>} label="Drop Zone" sub={address || "Add physical coordinates"} onClick={() => setActiveTab("settings")} />
            <Tile icon={<Mail className="text-purple-400"/>} label="Comms" sub={deliveryEmail || userEmail} onClick={() => setActiveTab("settings")} />
            <Tile icon={<UserPen className="text-orange-400"/>} label="Neural Link" sub="Edit Protocols" onClick={() => setActiveTab("settings")} />
          </motion.div>
        )}

        {/* MISSIONS / ORDERS VIEW */}
        {activeTab === "orders" && (
          <motion.div key="orders" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            {fetchingOrders ? (
              <p className="text-cyan-400 animate-pulse font-black uppercase tracking-widest text-center py-20">Scanning Database...</p>
            ) : userOrders.length === 0 ? (
              <div className="py-20 text-center border border-white/5 rounded-[4rem] bg-white/[0.02]">
                <Package className="mx-auto mb-4 text-white/10" size={48} />
                <p className="text-white/20 font-bold uppercase tracking-widest text-center">No missions recorded</p>
              </div>
            ) : (
              userOrders.map(order => (
                <div key={order.id} className="p-10 bg-white/[0.03] border border-white/10 rounded-[4rem] hover:bg-white/[0.05] transition-all group border-l-4 border-l-cyan-400/50">
                  <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
                    <div className="flex-1 space-y-6">
                      <div>
                        <p className="text-[9px] text-cyan-400 font-black uppercase tracking-[0.3em] mb-4">ORD-ID: {order.id.slice(-10).toUpperCase()}</p>
                        <div className="space-y-3">
                          <p className="text-[8px] text-white/30 uppercase font-black tracking-widest">Active Roadmap Assets:</p>
                          {order.items && order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4">
                              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                              <h4 className="text-2xl font-black text-white uppercase italic leading-none">{item.name}</h4>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 🚀 INTERACTIVE PROGRESS TRACKER (FEATURE 3) */}
                      <div className="p-6 bg-black/40 rounded-3xl border border-white/5 max-w-md">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-[8px] font-black uppercase text-cyan-400 tracking-widest">Training Progress</span>
                          <span className="text-[10px] text-white/40">Acquired</span>
                        </div>
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mb-4">
                           <div className="h-full w-[40%] bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
                        </div>
                        <div className="flex items-center gap-2">
                           <ShieldCheck size={12} className="text-green-500" />
                           <span className="text-[9px] text-white/40 uppercase font-bold tracking-widest italic">Digital Link Dispatched to {order.customerEmail || userEmail}</span>
                        </div>
                      </div>
                    </div>

                    <div className="lg:text-right w-full lg:w-auto flex flex-col justify-between h-full space-y-4">
                      <p className="text-5xl font-black text-white italic tracking-tighter leading-none">₹{order.totalAmount}</p>
                      <span className={`inline-block px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest border ${order.status === 'paid' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-cyan-400/10 text-cyan-400 border-cyan-400/20'}`}>
                        {order.status || "Verified"}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </motion.div>
        )}

        {/* ❤️ WISHLIST VIEW */}
        {activeTab === "wishlist" && (
          <motion.div key="wishlist" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {wishlist.length === 0 ? (
              <div className="py-20 text-center border border-white/5 rounded-[4rem] bg-white/[0.02]">
                <Heart className="mx-auto mb-4 text-white/10" size={48} />
                <p className="text-white/20 font-bold uppercase tracking-widest">Your wishlist is offline</p>
              </div>
            ) : (
              wishlist.map((item) => (
                <div key={item.id} className="p-8 bg-white/[0.03] border border-white/5 rounded-[3rem] flex flex-col md:flex-row justify-between items-center gap-6 group hover:bg-white/[0.05] transition-all">
                   <div className="flex items-center gap-6 w-full">
                      <div className="p-5 bg-pink-500/10 rounded-2xl text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-all">
                         <Heart size={24} fill="currentColor" />
                      </div>
                      <div className="text-left">
                         <h4 className="text-3xl font-black text-white uppercase italic leading-none group-hover:text-pink-400 transition-colors">{item.name}</h4>
                         <p className="text-cyan-400/60 font-black text-[9px] mt-2 uppercase tracking-[0.3em]">Status: Ready for Deployment</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-6 w-full md:w-auto">
                      <span className="text-3xl font-black text-white">₹{item.price}</span>
                      <button 
                        onClick={() => onAddToCart && onAddToCart(item)}
                        className="flex-1 md:flex-none px-10 py-5 bg-white text-black font-black uppercase text-[10px] tracking-[0.3em] rounded-2xl hover:bg-cyan-400 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/40"
                      >
                        Deploy to Cart
                      </button>
                   </div>
                </div>
              ))
            )}
          </motion.div>
        )}

        {/* SETTINGS VIEW */}
        {activeTab === "settings" && (
          <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-4xl mx-auto">
            <div className="p-12 bg-white/[0.02] border border-white/5 rounded-[4rem] space-y-8 backdrop-blur-3xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] text-white/30 font-black uppercase ml-4 tracking-[0.2em]">Delivery Email</label>
                    <input value={deliveryEmail} onChange={(e) => setDeliveryEmail(e.target.value)} placeholder="Enter Encrypted Email" className="w-full p-6 bg-black/40 border border-white/10 rounded-2xl text-white outline-none focus:border-cyan-400 transition-all font-bold placeholder:text-white/10" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] text-white/30 font-black uppercase ml-4 tracking-[0.2em]">Contact Node (Phone)</label>
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter Contact ID" className="w-full p-6 bg-black/40 border border-white/10 rounded-2xl text-white outline-none focus:border-cyan-400 transition-all font-bold placeholder:text-white/10" />
                  </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] text-white/30 font-black uppercase ml-4 tracking-[0.2em]">Deployment Address (Drop Zone)</label>
                <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter physical coordinates for hardware delivery..." rows="4" className="w-full p-6 bg-black/40 border border-white/10 rounded-2xl text-white outline-none focus:border-cyan-400 transition-all resize-none font-bold placeholder:text-white/10" />
              </div>
              <button onClick={handleSave} disabled={loading} className="group relative bg-cyan-400 hover:bg-cyan-300 text-black font-black uppercase tracking-[0.3em] py-6 w-full rounded-2xl transition-all shadow-2xl shadow-cyan-400/20 active:scale-[0.98]">
                {loading ? "UPLOADING PROTOCOLS..." : "UPDATE NEURAL VAULT"}
                <Activity size={20} className="absolute right-8 top-1/2 -translate-y-1/2 opacity-20 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Tile = ({ icon, label, sub, onClick }) => (
  <motion.div 
    whileHover={{ y: -8, backgroundColor: "rgba(255,255,255,0.06)", borderColor: "rgba(34,211,238,0.2)" }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick} 
    className="p-10 bg-white/[0.03] border border-white/5 rounded-[4rem] cursor-pointer transition-all flex flex-col items-center justify-center text-center group shadow-xl hover:shadow-cyan-400/5"
  >
    <div className="mb-8 p-6 bg-white/5 rounded-[2rem] group-hover:scale-110 group-hover:bg-cyan-400/10 transition-all duration-500 group-hover:rotate-6">
      {React.cloneElement(icon, { size: 40 })}
    </div>
    <h4 className="text-2xl font-black text-white uppercase italic mb-2 tracking-tighter group-hover:text-cyan-400 transition-colors">{label}</h4>
    <p className="text-[9px] text-white/20 font-black uppercase tracking-[0.4em] group-hover:text-white/40 transition-colors">{sub}</p>
  </motion.div>
);

export default ProfileDashboard;
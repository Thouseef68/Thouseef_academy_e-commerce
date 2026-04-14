import React, { useState, useEffect } from 'react';
import { saveUserProfile, getUserProfile } from "../services/userService";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, Heart, Ticket, MapPin, Mail, UserPen, LogOut, Lock, 
  User as UserIcon, Eye, EyeOff, ChevronLeft, Clock, ShieldCheck, CheckCircle, XCircle 
} from 'lucide-react';

const ProfileDashboard = ({ user, setUser }) => {
  const [activeTab, setActiveTab] = useState("grid");
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [userOrders, setUserOrders] = useState([]);
  const [address, setAddress] = useState("");
  const [deliveryEmail, setDeliveryEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  // --- 1. FETCH ORDERS LOGIC (Real-time tracking) ---
  useEffect(() => {
    const fetchMyOrders = async () => {
      if (!user?.email) return;
      try {
        const q = query(collection(db, "orders"), where("customerEmail", "==", user.email));
        const snapshot = await getDocs(q);
        // Sort by newest first
        const ordersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUserOrders(ordersData.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds));
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchMyOrders();
  }, [user, activeTab]);

  // --- 2. LOAD PROFILE DATA ---
  useEffect(() => {
    const fetchProfile = async () => {
      if (user?.email) {
        const data = await getUserProfile(user.email);
        if (data) {
          setAddress(data.actualAddress || "");
          setDeliveryEmail(data.deliveryEmail || "");
          setPhone(data.phoneNumber || "");
        }
      }
    };
    fetchProfile();
  }, [user]);

  const handleSave = async () => {
    setLoading(true);
    const result = await saveUserProfile(user.email, {
      name: user.name,
      actualAddress: address,
      deliveryEmail: deliveryEmail,
      phoneNumber: phone,
      updatedAt: new Date()
    });
    setLoading(false);
    if (result.success) {
      alert("Vault Profile Updated! 🚀");
      setActiveTab("grid");
    }
  };

  const handleAuth = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('platform_users') || "[]");
    if (isRegistering) {
      if (users.find(u => u.email === form.email)) {
        setError("Email already registered!");
        return;
      }
      users.push(form);
      localStorage.setItem('platform_users', JSON.stringify(users));
      setUser(form);
    } else {
      const found = users.find(u => u.email === form.email && u.password === form.password);
      if (found) setUser(found);
      else setError("Invalid email or password!");
    }
  };

  if (!user) {
    return (
      <div className="w-full h-full flex flex-col md:flex-row bg-[#0f172a] overflow-hidden">
        <div className="w-full md:w-[45%] p-12 flex flex-col justify-center bg-black/40 border-r border-white/5">
            <div className="mb-10 flex flex-col items-center">
                <div className="p-4 bg-white/5 rounded-full border border-white/10 mb-6">
                    <UserIcon size={40} className="text-white/80" />
                </div>
                <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-none text-center">
                    {isRegistering ? "Register Agent" : "Access Vault"}
                </h2>
            </div>
            <form onSubmit={handleAuth} className="space-y-4">
                {isRegistering && (
                    <AuthInput icon={<UserIcon size={18}/>} placeholder="Full Name" onChange={(v) => setForm({...form, name: v})} />
                )}
                <AuthInput icon={<Mail size={18}/>} placeholder="Email Address" type="email" onChange={(v) => setForm({...form, email: v})} />
                <div className="relative">
                    <AuthInput icon={<Lock size={18}/>} placeholder="Password" type={showPassword ? "text" : "password"} onChange={(v) => setForm({...form, password: v})} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-4 text-white/20 hover:text-white transition-colors">
                        {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                    </button>
                </div>
                {error && <p className="text-red-500 text-[10px] font-black uppercase text-center tracking-[0.2em]">{error}</p>}
                <button className="w-full py-5 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-black rounded-2xl uppercase tracking-[0.2em] text-xs mt-6 shadow-xl">
                    {isRegistering ? "Join Academy" : "Authenticate"}
                </button>
            </form>
            <p className="mt-8 text-center text-white/30 text-[10px] font-bold uppercase tracking-widest">
              {isRegistering ? "Already registered?" : "New Student?"}
              <span onClick={() => {setIsRegistering(!isRegistering); setError("");}} className="ml-2 text-pink-400 cursor-pointer hover:text-pink-300">
                {isRegistering ? "Login Here" : "Create Account"}
              </span>
            </p>
        </div>
        <div className="hidden md:flex flex-1 relative flex-col items-center justify-center p-20 bg-gradient-to-br from-[#1e1b4b] to-[#0f172a]">
            <h1 className="text-[7rem] font-black text-white leading-[0.8] tracking-tighter mb-4 text-center">
                Dream <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-400 italic">Bigger.</span>
            </h1>
            <p className="text-xl text-white/30 font-medium max-w-sm tracking-wide text-center">The future of academy commerce is here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-12 flex flex-col bg-[#0a0a0a] overflow-y-auto no-scrollbar">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-16">
        <div className="flex items-center gap-6 text-left">
          {activeTab !== "grid" && (
            <button onClick={() => setActiveTab("grid")} className="p-4 bg-white/5 rounded-full text-white/40 hover:text-white transition-all">
              <ChevronLeft size={24} />
            </button>
          )}
          <div>
            <h2 className="text-6xl font-black text-white italic uppercase tracking-tighter">
              {activeTab === "grid" ? user.name : activeTab}
            </h2>
            <p className="text-cyan-400 font-bold uppercase tracking-[0.5em] text-[10px] mt-1">
              {activeTab === "grid" ? "Vault Access Authorized" : "Sub-System Active"}
            </p>
          </div>
        </div>
        <button onClick={() => setUser(null)} className="flex items-center gap-2 text-white/20 hover:text-red-500 transition-colors uppercase font-black text-xs tracking-widest">
          <LogOut size={18} /> Exit Vault
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "grid" ? (
          <motion.div key="grid" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Tile icon={<Package/>} label="Orders" sub={`${userOrders.length} Recent Missions`} onClick={() => setActiveTab("orders")} />
            <Tile icon={<Heart/>} label="Wishlist" sub="Saved Items" onClick={() => setActiveTab("grid")} />
            <Tile icon={<Ticket/>} label="Coupons" sub="Active Rewards" onClick={() => setActiveTab("grid")} />
            <Tile icon={<MapPin/>} label="Address" sub={address || "Click to set"} onClick={() => setActiveTab("settings")} />
            <Tile icon={<Mail/>} label="Delivery ID" sub={deliveryEmail || user.email} onClick={() => setActiveTab("settings")} />
            <Tile icon={<UserPen/>} label="Settings" sub="Update Profile" onClick={() => setActiveTab("settings")} />
          </motion.div>
        ) : activeTab === "orders" ? (
          /* --- ENHANCED TRACKING SYSTEM --- */
          <motion.div key="orders" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 max-w-4xl">
            {userOrders.length === 0 ? (
                <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-[4rem]">
                    <p className="text-white/20 font-black uppercase tracking-widest italic">Your order history is empty</p>
                </div>
            ) : (
                userOrders.map(order => (
                    <div key={order.id} className="p-8 bg-white/5 border border-white/10 rounded-[3rem] flex flex-col md:flex-row justify-between items-center gap-8 hover:border-cyan-400/30 transition-all text-left">
                        <div className="flex items-center gap-6 w-full md:w-auto">
                            <div className={`p-5 rounded-2xl ${
                              order.status === 'delivered' ? 'bg-cyan-400 text-black' : 
                              order.status === 'verified' ? 'bg-green-500/10 text-green-500' : 
                              'bg-yellow-500/10 text-yellow-500'
                            }`}>
                                {order.status === 'delivered' ? <CheckCircle size={30}/> : 
                                 order.status === 'verified' ? <ShieldCheck size={30}/> : <Clock size={30}/>}
                            </div>
                            <div>
                                <p className="text-[10px] font-mono text-white/20 uppercase">MISSION ID: {order.id.slice(0,14)}</p>
                                <h4 className="font-black uppercase text-xl text-white tracking-tight">{order.items[0]?.title || "Bundle Package"}</h4>
                                <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-[0.3em] mt-1">Delivery Channel: Email</p>
                            </div>
                        </div>
                        
                        <div className="text-center md:text-right w-full md:w-auto">
                            <span className={`text-[10px] font-black uppercase px-6 py-2 rounded-full border transition-all
                                ${order.status === 'pending' ? 'border-yellow-500/30 text-yellow-500 bg-yellow-500/5' : 
                                  order.status === 'verified' ? 'border-green-500/30 text-green-500 bg-green-500/5' : 
                                  order.status === 'delivered' ? 'border-cyan-400 text-black bg-cyan-400 shadow-[0_0_20px_rgba(0,242,255,0.3)]' :
                                  'border-red-500/30 text-red-500 bg-red-500/5'}`}>
                                {order.status === 'pending' ? 'Verifying Proof' : 
                                 order.status === 'verified' ? 'Payment Verified' : 
                                 order.status === 'delivered' ? 'Product Delivered' :
                                 'Payment Failed'}
                            </span>
                            <p className="text-[9px] text-white/40 mt-3 font-bold uppercase tracking-widest">
                                {order.status === 'pending' ? 'ETA: 4-5 Hours' : 
                                 order.status === 'verified' ? 'Preparing Shipment' : 
                                 order.status === 'delivered' ? 'Check Inbox & Spam' : 
                                 'Please re-upload proof'}
                            </p>
                        </div>
                    </div>
                ))
            )}
          </motion.div>
        ) : activeTab === "settings" ? (
          <motion.div key="settings" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-4xl space-y-8 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-white/20 text-[10px] font-black uppercase ml-2 tracking-widest">Delivery Email (For Digital Files)</label>
                <input value={deliveryEmail} onChange={(e) => setDeliveryEmail(e.target.value)} className="w-full p-6 bg-white/5 border border-white/10 rounded-[2rem] text-white outline-none focus:border-cyan-400/50" placeholder="your@email.com" />
              </div>
              <div className="space-y-2">
                <label className="text-white/20 text-[10px] font-black uppercase ml-2 tracking-widest">WhatsApp Contact</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-6 bg-white/5 border border-white/10 rounded-[2rem] text-white outline-none focus:border-cyan-400/50" placeholder="+91 00000 00000" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-white/20 text-[10px] font-black uppercase ml-2 tracking-widest">Permanent Physical Address</label>
              <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="w-full p-8 bg-white/5 border border-white/10 rounded-[3rem] text-white outline-none h-40 resize-none focus:border-cyan-400/50" placeholder="Required for records..." />
            </div>
            <button onClick={handleSave} disabled={loading} className="w-full py-6 bg-cyan-400 text-black font-black uppercase rounded-[2.5rem] shadow-[0_0_50px_rgba(0,242,255,0.2)] hover:bg-white transition-all">
              {loading ? "SYNCING..." : "UPDATE VAULT PROFILE"}
            </button>
          </motion.div>
        ) : (
          <div className="text-white/20 italic text-2xl uppercase font-black py-20">Sub-System Initializing...</div>
        )}
      </AnimatePresence>
    </div>
  );
};

// HELPER COMPONENTS
const AuthInput = ({ icon, placeholder, type = "text", onChange }) => (
  <div className="relative">
    <div className="absolute left-4 top-4 text-white/20">{icon}</div>
    <input type={type} placeholder={placeholder} required onChange={(e) => onChange(e.target.value)} className="w-full p-4 pl-12 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-cyan-400 transition-all text-sm" />
  </div>
);

const Tile = ({ icon, label, sub, onClick }) => (
  <motion.div onClick={onClick} whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }} className="p-10 bg-white/5 border border-white/10 rounded-[4rem] flex flex-col justify-between h-56 cursor-pointer transition-all group text-left">
    <div className="p-4 bg-white/10 rounded-2xl w-fit text-white group-hover:text-cyan-400 transition-colors">{icon}</div>
    <div>
      <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter">{label}</h4>
      <p className="text-white/30 text-[9px] uppercase font-bold tracking-widest mt-1 line-clamp-1">{sub}</p>
    </div>
  </motion.div>
);

export default ProfileDashboard;
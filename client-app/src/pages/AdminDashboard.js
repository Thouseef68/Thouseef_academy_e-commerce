import React, { useEffect, useState, useMemo } from 'react';
import { getActiveOrders, approveOrder, declineOrder, markAsDelivered } from '../services/adminService';
import { 
  RefreshCw, ShieldCheck, LogOut, XCircle, 
  CheckCircle, Lock, Timer, TrendingUp, AlertTriangle, Check 
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // ✅ FIX: Added missing timeLeft state
  const [timeLeft, setTimeLeft] = useState(300); 

  // ✅ FIX: Added Timer logic to handle the countdown and auto-logout
  useEffect(() => {
    let timer;
    if (isAdmin && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (isAdmin && timeLeft === 0) {
      handleLogout();
    }
    return () => clearTimeout(timer);
  }, [isAdmin, timeLeft]);

  // STATS CALCULATION (Real-time)
  const stats = useMemo(() => {
    const success = orders.filter(o => o.status === 'paid' || o.status === 'delivered').length;
    const pending = orders.filter(o => o.status === 'pending' || o.status === 'verified').length;
    const failed = orders.filter(o => o.status === 'failed' || o.status === 'declined').length;
    const revenue = orders
      .filter(o => o.status === 'paid' || o.status === 'delivered')
      .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

    return { success, pending, failed, revenue };
  }, [orders]);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (passwordInput === "ADMIN123") {
      setIsAdmin(true);
      setTimeLeft(300); // Reset timer on login
    } else {
      alert("Invalid Access ID");
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setPasswordInput("");
    setTimeLeft(300);
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getActiveOrders();
      setOrders(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) fetchOrders();
  }, [isAdmin]);

  const handleApprove = async (order) => {
    const confirm = window.confirm(`Send ALL assets to ${order.customerEmail}?`);
    if (!confirm) return;

    setLoading(true);
    try {
      const res = await approveOrder(order.id);
      if (res.success) {
        const allLinks = order.items.map(item => `• ${item.name}\nLink: ${item.courseLink || item.url}`).join('\n\n');

        await emailjs.send(
          process.env.REACT_APP_EMAILJS_SERVICE_ID,
          process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
          {
            user_email: order.customerEmail,
            user_name: order.customerEmail.split('@')[0],
            product_details: allLinks, 
            order_id: order.id
          },
          process.env.REACT_APP_EMAILJS_PUBLIC_KEY
        );

        alert("Deployment Successful! Email Sent. 📧");
        await markAsDelivered(order.id);
        fetchOrders();
      }
    } catch (error) {
      alert("Encryption Error: Check EmailJS configuration.");
    }
    setLoading(false);
  };

  const handleDecline = async (id) => {
    if (window.confirm("Abort this Mission? Order will be cancelled.")) {
      await declineOrder(id);
      fetchOrders();
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#050112] flex items-center justify-center p-6 text-white">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white/5 p-12 rounded-[4rem] border border-white/10 w-full max-w-md text-center backdrop-blur-3xl">
          <Lock className="mx-auto mb-8 text-cyan-400" size={50} />
          <h2 className="text-4xl font-black uppercase italic mb-8 tracking-tighter">Vault Lock</h2>
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="SECRET AUTH KEY"
              className="w-full bg-black/40 border border-white/10 p-6 rounded-3xl text-center focus:border-cyan-400 outline-none transition-all font-black"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
            <button className="w-full py-6 bg-cyan-400 text-black font-black uppercase rounded-3xl shadow-[0_20px_40px_rgba(34,211,238,0.2)] hover:scale-[1.02] transition-all">
              Initiate Access
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050112] p-8 md:p-16 text-white font-sans text-left overflow-x-hidden">
      
      {/* 1. TOP INTELLIGENCE BAR (STATS) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
        <StatCard icon={<TrendingUp size={20}/>} label="Total Inflow" value={`₹${stats.revenue}`} color="text-cyan-400" />
        <StatCard icon={<Check size={20}/>} label="Success Missions" value={stats.success} color="text-green-400" />
        <StatCard icon={<Timer size={20}/>} label="Pending Intel" value={stats.pending} color="text-yellow-500" />
        <StatCard icon={<AlertTriangle size={20}/>} label="Aborted" value={stats.failed} color="text-red-500" />
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
        <div>
          <div className="flex items-center gap-4 mb-4">
             <button onClick={handleLogout} className="text-[10px] text-white/40 uppercase font-black tracking-widest hover:text-red-500 flex items-center gap-2 transition-all">
                <LogOut size={12} /> Terminate Session
             </button>
             <div className="flex items-center gap-2 px-4 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full text-red-500 text-[9px] font-black uppercase tracking-widest">
                <Timer size={12} /> Expiry: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
             </div>
          </div>
          <h1 className="text-7xl font-black italic uppercase tracking-tighter leading-none">Command <span className="text-cyan-400">Vault</span></h1>
          <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.5em] mt-4">Active Database: {orders.length} Records Detected</p>
        </div>
        
        <button onClick={fetchOrders} className="p-6 bg-white/5 border border-white/10 rounded-3xl flex items-center gap-4 hover:bg-white/10 transition-all shadow-xl">
          <span className="text-[10px] font-black uppercase tracking-widest">Neural Sync</span>
          <RefreshCw size={24} className={loading ? "animate-spin text-cyan-400" : "text-white/40"} />
        </button>
      </div>

      {/* 2. ORDER GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {orders.map(order => (
          <div key={order.id} className="bg-white/5 border border-white/10 p-10 rounded-[4rem] flex flex-col justify-between group hover:border-cyan-400/30 transition-all backdrop-blur-xl relative overflow-hidden">
            
            <div className="flex justify-between items-center mb-8">
              <span className={`text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border ${
                order.status === 'paid' || order.status === 'delivered' 
                  ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                  : order.status === 'failed' ? 'bg-red-500/10 text-red-400 border-red-500/20'
                  : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
              }`}>
                {(order.status || 'pending').toUpperCase()}
              </span>
              <span className="text-white/10 text-[10px] font-mono">ID: {order.id.slice(-8)}</span>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 truncate">{order.customerEmail ? order.customerEmail.split('@')[0] : 'Unknown'}</h3>
              <p className="text-white/30 text-xs mb-6 font-medium">{order.customerEmail}</p>
              
              <div className="space-y-2 mb-8">
                {order.items && order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/60">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                    <span className="truncate">{item.name}</span>
                  </div>
                ))}
              </div>

              <p className="text-cyan-400 text-4xl font-black italic tracking-tighter">₹{order.totalAmount}</p>
            </div>

            <div className="space-y-3">
              {order.status === 'pending' && (
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleApprove(order)} 
                    className="flex-1 py-5 bg-white text-black font-black uppercase text-[10px] rounded-2xl hover:bg-cyan-400 transition-all flex items-center justify-center gap-2"
                  >
                    <ShieldCheck size={16} /> Deploy Assets
                  </button>
                  <button 
                    onClick={() => handleDecline(order.id)} 
                    className="px-6 py-5 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl hover:bg-red-500 hover:text-white transition-all"
                  >
                    <XCircle size={20} />
                  </button>
                </div>
              )}
              
              {(order.status === 'paid' || order.status === 'delivered') && (
                <div className="flex items-center justify-center py-5 bg-green-500/5 border border-green-500/20 rounded-2xl text-green-400 font-black text-[10px] uppercase tracking-widest gap-2">
                  <CheckCircle size={16} /> Mission Successful
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-white/5 border border-white/10 p-8 rounded-[3rem] backdrop-blur-xl">
    <div className={`mb-4 ${color} opacity-80`}>{icon}</div>
    <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-2">{label}</p>
    <p className={`text-4xl font-black tracking-tighter italic ${color}`}>{value}</p>
  </div>
);

export default AdminDashboard;
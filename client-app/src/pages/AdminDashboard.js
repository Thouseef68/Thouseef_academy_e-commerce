import React, { useEffect, useState } from 'react';
import { getActiveOrders, approveOrder, declineOrder, markAsDelivered } from '../services/adminService';
import { ExternalLink, RefreshCw, ShieldCheck, LogOut, XCircle, Mail, CheckCircle, Lock, Timer } from 'lucide-react';
import emailjs from '@emailjs/browser';

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); 

  // 1. SESSION MANAGEMENT
  useEffect(() => {
    const auth = sessionStorage.getItem('admin_auth');
    if (auth === 'true') setIsAdmin(true);
  }, []);

  // 2. AUTO-LOGOUT TIMER (30 Seconds)
  useEffect(() => {
    let timer;
    if (isAdmin && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (isAdmin && timeLeft === 0) {
      handleLogout();
    }
    return () => clearTimeout(timer);
  }, [isAdmin, timeLeft]);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    // Prioritizes .env but has a backup key if .env fails to load
    const secretKey = process.env.REACT_APP_ADMIN_PASSWORD || "ADMIN123";
    
    if (passwordInput === secretKey) {
      setIsAdmin(true);
      setTimeLeft(30); 
      sessionStorage.setItem('admin_auth', 'true');
    } else {
      alert("Access Denied: Invalid Authentication Key");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setIsAdmin(false);
    setTimeLeft(30);
    alert("Vault Locked: Session Expired.");
  };

  // 3. FETCHING DATA
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
    const confirm = window.confirm(`Send links to ${order.customerEmail}?`);
    if (!confirm) return;

    setLoading(true);
    try {
        const res = await approveOrder(order.id);
        
        if (res.success) {
        // Create a clean, readable list of links for the email
        const allLinks = order.items.map(item => {
            const name = item.name || "Product";
            const link = item.url || "https://thouseef-academy.com/support"; 
            return `• ${name}\nAccess Link: ${link}`;
        }).join('\n\n');

        const templateParams = {
            user_email: order.customerEmail,
            user_name: order.customerEmail.split('@')[0],
            product_name: order.items.map(i => i.name).join(", "),
            access_link: allLinks, 
        };

        await emailjs.send(
            process.env.REACT_APP_EMAILJS_SERVICE_ID,
            process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
            templateParams,
            process.env.REACT_APP_EMAILJS_PUBLIC_KEY
        );

        alert("Email Sent Successfully! 📧");
        await markAsDelivered(order.id);
        fetchOrders();
        }
    } catch (error) {
        console.error("Email Error:", error);
        alert("Check your EmailJS keys in the .env file!");
    }
    setLoading(false);
    };

  const handleDecline = async (id) => {
    if (window.confirm("Reject this payment?")) {
      await declineOrder(id);
      fetchOrders();
    }
  };

  const handleMarkDelivered = async (id) => {
    await markAsDelivered(id);
    fetchOrders();
  };

  // --- UI: LOGIN SCREEN ---
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#0d0221] flex items-center justify-center p-6 text-white font-sans">
        <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10 w-full max-w-md text-center shadow-2xl">
          <Lock className="mx-auto mb-6 text-cyan-400" size={40} />
          <h2 className="text-3xl font-black uppercase italic mb-6">Vault Access</h2>
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="ENTER ADMIN KEY"
              className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl text-center focus:border-cyan-400 outline-none transition-all"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
            <button className="w-full py-5 bg-cyan-400 text-black font-black uppercase rounded-2xl shadow-[0_0_20px_rgba(34,211,238,0.3)]">
              Unlock Workspace
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- UI: DASHBOARD ---
  return (
    <div className="min-h-screen bg-[#0d0221] p-6 md:p-12 text-white font-sans text-left">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <div className="flex items-center gap-4 mb-4">
             <button onClick={handleLogout} className="text-[10px] text-white/40 uppercase font-black tracking-widest hover:text-red-500 flex items-center gap-2 transition-all">
                <LogOut size={12} /> Logout
             </button>
             <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-500 text-[10px] font-black uppercase tracking-widest">
                <Timer size={12} /> Session: {timeLeft}s
             </div>
          </div>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none">Control <span className="text-cyan-400">Center</span></h1>
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.5em] mt-2">Managing {orders.length} Active Missions</p>
        </div>
        
        <button onClick={fetchOrders} className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3 hover:bg-white/10 transition-all">
          <span className="text-[10px] font-black uppercase tracking-widest">Sync</span>
          <RefreshCw size={18} className={loading ? "animate-spin text-cyan-400" : ""} />
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.length === 0 && !loading && (
          <div className="col-span-full py-20 opacity-20 uppercase text-center border-2 border-dashed border-white/5 rounded-[3rem]">No Active Requests</div>
        )}

        {orders.map(order => (
          <div key={order.id} className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] flex flex-col justify-between group hover:border-white/20 transition-all">
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                  order.status === 'verified' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-500'
                }`}>
                  {order.status === 'verified' ? 'Ready to Email' : 'Verification Pending'}
                </span>
                <span className="text-white/10 text-[9px] font-mono italic">#{order.id.slice(-6)}</span>
              </div>
              
              <h3 className="text-lg font-black uppercase mb-1 truncate">{order.customerEmail}</h3>
              <p className="text-cyan-400 text-xl font-black mb-6 italic">₹{order.totalAmount}</p>
              
              <a href={order.screenshotUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full p-4 bg-white/5 rounded-2xl text-[10px] font-black uppercase border border-white/5 hover:bg-white/10 transition-all mb-4">
                <ExternalLink size={14} /> View Proof
              </a>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              {order.status === 'pending' ? (
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleApprove(order)} 
                    className="flex-1 py-4 bg-white text-black font-black uppercase text-[10px] rounded-xl hover:bg-cyan-400 transition-all flex items-center justify-center gap-2"
                  >
                    <ShieldCheck size={14} /> Verify & Email
                  </button>
                  <button 
                    onClick={() => handleDecline(order.id)} 
                    className="px-4 py-4 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                  >
                    <XCircle size={18} />
                  </button>
                </div>
              ) : order.status === 'verified' ? (
                <div className="space-y-2">
                   <a 
                    href={`mailto:${order.customerEmail}?subject=Academy Delivery&body=Hello!`}
                    className="flex items-center justify-center gap-2 w-full py-4 bg-white/5 border border-white/20 text-white font-black uppercase text-[10px] rounded-xl hover:bg-white hover:text-black transition-all"
                  >
                    <Mail size={14} /> Manual Email
                  </a>
                  <button 
                    onClick={() => handleMarkDelivered(order.id)} 
                    className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black uppercase text-[10px] rounded-xl shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={14} /> Finish Delivery
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
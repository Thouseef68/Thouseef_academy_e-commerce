import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { TrendingUp, Users, ShoppingBag, DollarSign, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

const AdminAnalytics = () => {
  const [stats, setStats] = useState({ totalRevenue: 0, totalOrders: 0, totalUsers: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const ordersSnap = await getDocs(collection(db, "orders"));
      const usersSnap = await getDocs(collection(db, "users"));
      
      let revenue = 0;
      ordersSnap.forEach(doc => revenue += Number(doc.data().totalAmount || 0));
      
      setStats({
        totalRevenue: revenue,
        totalOrders: ordersSnap.size,
        totalUsers: usersSnap.size
      });
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-[#050112] text-white p-20 font-sans">
      <Link to="/admin-vault-007" className="flex items-center gap-2 text-cyan-400/40 mb-10"><ChevronLeft size={20}/> Back to Admin</Link>
      <h2 className="text-6xl font-black italic uppercase tracking-tighter mb-16">Founder <span className="text-cyan-400">Analytics</span></h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard icon={<DollarSign/>} label="Total Revenue" value={`₹${stats.totalRevenue}`} color="text-green-400" />
        <StatCard icon={<ShoppingBag/>} label="Successful Missions" value={stats.totalOrders} color="text-cyan-400" />
        <StatCard icon={<Users/>} label="Active Operatives" value={stats.totalUsers} color="text-purple-400" />
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }) => (
  <div className="p-12 bg-white/5 border border-white/10 rounded-[4rem] text-left">
    <div className={`mb-6 p-4 bg-white/5 rounded-2xl inline-block ${color}`}>{icon}</div>
    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-2">{label}</p>
    <h4 className="text-5xl font-black italic uppercase tracking-tighter">{value}</h4>
  </div>
);

export default AdminAnalytics;
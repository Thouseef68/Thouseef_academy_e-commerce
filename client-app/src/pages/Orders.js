import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore"; // Removed orderBy
import { Package, ChevronLeft } from "lucide-react"; // Removed Clock and CheckCircle
import { Link } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userEmail) {
        setLoading(false);
        return;
      }
      try {
        const ordersRef = collection(db, "orders");
        
        // 🛠️ FIX: We search BOTH 'customerEmail' and 'email' just in case
        const q1 = query(ordersRef, where("customerEmail", "==", userEmail));
        const q2 = query(ordersRef, where("email", "==", userEmail));

        const [snap1, snap2] = await Promise.all([getDocs(q1), getDocs(q2)]);
        
        // Combine results and remove duplicates
        const combined = [...snap1.docs, ...snap2.docs].map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Filter duplicates by ID
        const uniqueOrders = Array.from(new Map(combined.map(o => [o.id, o])).values());

        // Sort manually since we combined two queries
        setOrders(uniqueOrders.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)));
      } catch (err) {
        console.error("Order Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [userEmail]);

  if (loading) return <div className="p-20 text-center text-cyan-400 font-black">SCANNING VAULT...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen bg-[#050112] text-white">
      <Link to="/" className="flex items-center gap-2 text-white/20 hover:text-cyan-400 mb-10 transition-all font-black uppercase text-[10px] tracking-widest">
        <ChevronLeft size={14} /> Home
      </Link>
      
      <h2 className="text-4xl font-black italic uppercase mb-10 flex items-center gap-4">
        <Package className="text-cyan-400" /> My Missions
      </h2>

      {orders.length === 0 ? (
        <div className="bg-white/5 border border-white/10 p-20 rounded-[3rem] text-center text-white/10 font-bold uppercase tracking-widest">
          No missions detected. Purchase assets to begin.
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center hover:border-cyan-400/30 transition-all">
              <div className="flex-1">
                <p className="text-[9px] text-cyan-400 font-black uppercase tracking-[0.3em] mb-2">ORD-ID: {order.id.slice(-8).toUpperCase()}</p>
                <div className="space-y-1">
                   {order.items?.map((item, i) => (
                     <h3 key={i} className="text-lg font-black text-white italic uppercase">• {item.name}</h3>
                   ))}
                </div>
                <p className="text-xs text-white/30 font-bold mt-4">Authorized Link: {order.status === 'paid' ? "Sent to Email ✅" : "Pending Verification ⏳"}</p>
              </div>
              
              <div className="text-right mt-6 md:mt-0">
                <p className="text-2xl font-black text-white mb-3">₹{order.totalAmount}</p>
                <span className={`px-5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                  order.status === "paid" || order.status === "verified" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
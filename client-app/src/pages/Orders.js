import React, { useEffect, useState } from "react";
import { db } from "../firebase"; // Your Firebase config
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { Package, Clock, CheckCircle, XCircle } from "lucide-react";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userEmail = localStorage.getItem("userEmail"); // Saved during Login

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userEmail) return;
      try {
        const q = query(
          collection(db, "orders"),
          where("customerEmail", "==", userEmail),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const ordersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(ordersData);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [userEmail]);

  if (loading) return <div className="p-20 text-center text-white">Loading your vault...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
        <Package className="text-blue-500" /> My Orders
      </h2>

      {orders.length === 0 ? (
        <div className="bg-white/5 border border-white/10 p-10 rounded-2xl text-center text-gray-400">
          No orders found. Start your journey in the shop!
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex justify-between items-center">
              <div>
                <p className="text-xs text-blue-400 font-bold uppercase tracking-widest mb-1">Order ID: {order.id.slice(0, 8)}</p>
                <h3 className="text-lg font-bold text-white">
                  {order.items.map(item => item.name).join(", ")}
                </h3>
                <p className="text-sm text-gray-400 mt-1">Total: ₹{order.totalAmount}</p>
              </div>
              
              <div className="text-right">
                <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter flex items-center gap-2 ${
                  order.status === "verified" ? "bg-green-500/20 text-green-400" : 
                  order.status === "failed" ? "bg-red-500/20 text-red-400" : "bg-yellow-500/20 text-yellow-400"
                }`}>
                  {order.status === "verified" ? <CheckCircle size={12}/> : order.status === "failed" ? <XCircle size={12}/> : <Clock size={12}/>}
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
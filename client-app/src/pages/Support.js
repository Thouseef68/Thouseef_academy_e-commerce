import React, { useState } from "react";
import { CreditCard, MapPin, ShoppingCart, ChevronLeft, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { placeOrder } from "../services/orderService"; 
import emailjs from "@emailjs/browser"; 

const Checkout = ({ cart }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const userEmail = localStorage.getItem("userEmail");
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handlePayment = async () => {
    // 🛡️ SECURITY CHECK 1: Environment Variables
    console.log("🔍 SYSTEM CHECK: Verifying Keys...");
    console.log("Service ID Status:", process.env.REACT_APP_EMAILJS_SERVICE_ID ? "LOADED ✅" : "MISSING ❌");
    console.log("Template ID Status:", process.env.REACT_APP_EMAILJS_TEMPLATE_ID ? "LOADED ✅" : "MISSING ❌");
    console.log("Public Key Status:", process.env.REACT_APP_EMAILJS_PUBLIC_KEY ? "LOADED ✅" : "MISSING ❌");

    if (!process.env.REACT_APP_EMAILJS_SERVICE_ID || !process.env.REACT_APP_EMAILJS_PUBLIC_KEY) {
      alert("CRITICAL ERROR: Keys not found in .env file. Restart your terminal!");
      setLoading(false);
      return;
    }

    if (!userEmail) {
      alert("Unauthorized: Please login.");
      navigate("/login");
      return;
    }

    setLoading(true);

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID, 
      amount: total * 100, 
      currency: "INR",
      name: "Thouseef Academy",
      description: "Secure Asset Acquisition",
      handler: async function (response) {
        setLoading(true); 
        console.log("💳 PAYMENT VERIFIED. Syncing Vault...");

        try {
          const allLinks = cart
            .map((item) => `• ${item.name.toUpperCase()}\nAccess Link: ${item.courseLink || "Verify in Profile"}`)
            .join("\n\n");

          // 1. SAVE TO DATABASE
          const result = await placeOrder(userEmail, cart, total, response.razorpay_payment_id);

          if (result.success) {
            console.log("✅ DATABASE SECURED. ID:", result.id);

            // 2. DISPATCH EMAIL
            try {
              console.log("📧 Sending Email to:", userEmail);
              
              const emailParams = {
                to_email: userEmail,
                customer_name: userEmail.split("@")[0].toUpperCase(),
                course_links: allLinks, 
                order_id: response.razorpay_payment_id,
                total_paid: `₹${total}`,
              };

              // Use await to make sure we don't move on until EmailJS finishes
              const emailRes = await emailjs.send(
                process.env.REACT_APP_EMAILJS_SERVICE_ID,
                process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
                emailParams,
                process.env.REACT_APP_EMAILJS_PUBLIC_KEY
              );

              console.log("✅ EMAILJS RESPONSE:", emailRes.status, emailRes.text);
              
              // Only redirect AFTER the user clicks "OK" on the success message
              alert("MISSION ACCOMPLISHED!\n\nYour assets are now available in your vault and email.");
              localStorage.removeItem('cart'); 
              window.location.href = "/orders"; 

            } catch (emailErr) {
              console.error("❌ EMAILJS ERROR:", emailErr);
              alert("DATABASE SAVED, but Email delivery failed. Check your Spam folder or Console.");
              window.location.href = "/orders"; 
            }
          }
        } catch (error) {
          console.error("🔥 SUCCESS LOOP CRASH:", error);
          alert("Neural link failure. Contact support with Payment ID: " + response.razorpay_payment_id);
        } finally {
          setLoading(false);
        }
      },
      prefill: { email: userEmail },
      theme: { color: "#00f2ff" },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div className="min-h-screen bg-[#050112] text-white py-12 px-4 relative overflow-hidden font-sans">
      {/* Background and UI code (same as before) */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-6 text-left">
          <div>
            <Link to="/" className="flex items-center gap-2 text-cyan-400/40 hover:text-cyan-400 transition mb-4">
              <ChevronLeft size={20}/>
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Back to Hub</span>
            </Link>
            <h2 className="text-6xl font-black italic uppercase tracking-tighter">Secure <span className="text-cyan-400">Checkout</span></h2>
          </div>
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-8 py-4 rounded-3xl backdrop-blur-3xl">
            <ShieldCheck className="text-green-400" size={24} />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Neural link Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white/[0.02] border border-white/10 p-12 rounded-[4rem] backdrop-blur-3xl shadow-xl">
              <h3 className="text-xl font-black uppercase italic mb-10 flex items-center gap-4 text-white/90">
                <MapPin className="text-cyan-400" size={24}/> Delivery Coordinate
              </h3>
              <input disabled value={userEmail || "GUEST_USER"} className="w-full bg-black/40 border border-white/10 rounded-3xl px-8 py-5 text-sm font-bold text-cyan-400 cursor-not-allowed" />
            </div>
            <div className="bg-white/[0.02] border border-white/10 p-12 rounded-[4rem] backdrop-blur-3xl shadow-xl">
              <h3 className="text-xl font-black uppercase italic mb-10 flex items-center gap-4 text-white/90">
                <CreditCard className="text-cyan-400" size={24}/> Encryption Method
              </h3>
              <div className="p-8 border-2 border-cyan-400/20 bg-cyan-400/5 rounded-[2.5rem] flex justify-between items-center group">
                <span className="text-xs font-black uppercase tracking-[0.3em] text-cyan-400">RAZORPAY SECURE NETWORK</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white/[0.03] border border-white/10 p-12 rounded-[5rem] backdrop-blur-3xl sticky top-10 shadow-2xl">
              <h3 className="text-xl font-black uppercase italic mb-10 pb-6 border-b border-white/5 flex items-center gap-4 text-white/90">
                <ShoppingCart className="text-cyan-400" size={24}/> Payload Review
              </h3>
              <div className="space-y-6 mb-12 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
                {cart.map((item, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-white/70 uppercase italic">{item.name}</span>
                      <p className="text-[9px] font-black text-white/10 uppercase tracking-widest mt-1">Qty: {item.qty}</p>
                    </div>
                    <span className="text-sm font-black text-white">₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-end pt-10 border-t border-white/5">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30">Total Credits</span>
                <span className="text-6xl font-black text-cyan-400 tracking-tighter italic">₹{total}</span>
              </div>
              <button onClick={handlePayment} disabled={loading} className="w-full mt-10 py-7 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-[2.5rem] font-black text-xs uppercase tracking-[0.3em] shadow-[0_20px_50px_rgba(0,242,255,0.25)] hover:scale-[1.03] transition transform active:scale-95 disabled:opacity-20">
                {loading ? "AUTHENTICATING..." : "AUTHORIZE & DOWNLOAD"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
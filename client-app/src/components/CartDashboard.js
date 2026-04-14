import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, Mail, ShieldCheck, Download, CreditCard } from 'lucide-react';
import { placeOrder } from "../services/orderService";

const CartDashboard = ({ setIsOpen, cart, updateQty, removeFromCart, userEmail }) => {
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [deliveryEmail, setDeliveryEmail] = useState(userEmail);
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  // --- THE RAZORPAY GATEWAY ---
  const handleRazorpayPayment = () => {
    if (cart.length === 0) return;

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID, 
      amount: total * 100, // Amount in paisa
      currency: "INR",
      name: "Thouseef Academy",
      description: "Vault Asset Access",
      // 🔥 THIS FORCES UPI & ALL METHODS TO SHOW
      config: {
        display: {
          blocks: {
            methods: {
              name: 'Select Payment Method',
              instruments: [
                { method: 'upi' },
                { method: 'card' },
                { method: 'netbanking' },
                { method: 'wallet' }
              ],
            },
          },
          sequence: ['block.methods'],
          preferences: { show_default_blocks: true },
        },
      },
      handler: async function (response) {
        setLoading(true);
        
        // Save to Database as 'verified' automatically
        const result = await placeOrder(
          deliveryEmail, 
          cart, 
          total, 
          null, // No screenshot needed
          response.razorpay_payment_id // The Digital Proof
        );

        if (result.success) {
          setIsSubmitted(true);
          // Auto-close after 5 seconds
          setTimeout(() => {
            setIsOpen(false);
            setIsSubmitted(false);
          }, 5000);
        }
        setLoading(false);
      },
      prefill: {
        email: deliveryEmail,
      },
      theme: {
        color: "#00f2ff",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] bg-[#050112]/98 backdrop-blur-[100px] flex items-center justify-center p-6 md:p-12"
    >
      {/* Close Button */}
      <button onClick={() => setIsOpen(false)} className="absolute top-8 right-12 text-white/20 hover:text-[#00f2ff] transition-all"><X size={48} /></button>

      <div className="w-full h-full max-w-7xl flex flex-col lg:flex-row gap-12 overflow-hidden">
        
        {/* LEFT: THE VAULT ITEMS */}
        <div className="flex-[2] flex flex-col overflow-hidden">
          <div className="mb-10 text-left">
            <h1 className="text-6xl font-black uppercase italic text-white tracking-tighter leading-tight">
              PENDING <span className="text-[#00f2ff]">ASSETS</span>
            </h1>
            <p className="text-white/20 text-[10px] uppercase font-bold tracking-[0.6em] mt-2">Verify your selection before checkout</p>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-6 space-y-4 no-scrollbar">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-white/10 italic">
                <Download size={80} strokeWidth={1} className="mb-4 opacity-20" />
                <p className="text-2xl font-black uppercase tracking-widest">Your Vault is Empty</p>
              </div>
            ) : (
              cart.map((item) => (
                <motion.div key={item.id} layout className="p-6 bg-white/[0.03] border border-white/5 rounded-[3rem] flex items-center justify-between group hover:bg-white/[0.05] transition-all">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-[#00f2ff]/10 flex items-center justify-center text-[#00f2ff] group-hover:bg-[#00f2ff] group-hover:text-black transition-all">
                      {item.icon || <Download size={20}/>}
                    </div>
                    <div>
                      <h4 className="text-white font-black uppercase text-sm tracking-tight">{item.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[8px] text-white/30 uppercase font-black px-2 py-0.5 border border-white/10 rounded-full">{item.type || "Digital"}</span>
                        <span className="text-cyan-400 font-black text-xs italic">₹{item.price}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="flex items-center gap-4 bg-black/40 p-2.5 rounded-2xl border border-white/5">
                      <button onClick={() => updateQty(item.id, -1)} className="text-white/20 hover:text-white transition-colors"><Minus size={14} /></button>
                      <span className="text-white font-black text-xs w-5 text-center">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="text-white/20 hover:text-white transition-colors"><Plus size={14} /></button>
                    </div>
                    <div className="w-20 text-right">
                      <span className="text-white font-black text-lg">₹{item.price * item.qty}</span>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500/20 hover:text-red-500 transition-colors"><Trash2 size={22} /></button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* RIGHT: CHECKOUT & DELIVERY */}
        <div className="flex-1 flex flex-col gap-6 py-4">
          <div className="p-8 bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 rounded-[3.5rem] relative overflow-hidden text-left">
             <div className="absolute top-0 right-0 p-4 opacity-5"><Mail size={80} /></div>
             <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-black uppercase text-cyan-400 tracking-[0.4em]">Delivery Email</span>
                <button onClick={() => setIsEditingEmail(!isEditingEmail)} className="text-[9px] font-black uppercase text-white/40 hover:text-white transition-colors">
                  {isEditingEmail ? "[ Save ]" : "[ Edit ]"}
                </button>
             </div>
             {isEditingEmail ? (
                <input 
                  type="email" 
                  value={deliveryEmail} 
                  onChange={(e) => setDeliveryEmail(e.target.value)}
                  className="w-full bg-black/40 border border-[#00f2ff]/30 rounded-2xl p-4 text-white text-sm font-bold outline-none"
                />
             ) : (
                <div className="flex items-center gap-4 text-white font-black text-xl italic tracking-tight">
                   {deliveryEmail}
                </div>
             )}
          </div>

          <div className="flex-1 bg-[#00f2ff] rounded-[4rem] p-10 flex flex-col justify-between shadow-[0_0_80px_rgba(0,242,255,0.2)] text-left">
             <div>
                <span className="text-black/40 font-black uppercase text-[10px] tracking-[0.3em]">Grand Total</span>
                <div className="text-black font-black text-6xl italic tracking-tighter mt-2">₹{total}</div>
             </div>
             
             <button 
                disabled={cart.length === 0 || loading}
                onClick={handleRazorpayPayment}
                className="w-full py-8 bg-black text-[#00f2ff] font-black uppercase text-sm tracking-[0.3em] rounded-3xl hover:scale-[1.02] active:scale-95 transition-all shadow-2xl disabled:opacity-30 flex items-center justify-center gap-3"
             >
                {loading ? "PROCESSING..." : (
                  <>
                    <CreditCard size={20} />
                    INITIALIZE PAYMENT
                  </>
                )}
             </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isSubmitted && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[400] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6">
             <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="bg-[#120129] border border-[#00f2ff]/30 p-12 rounded-[5rem] max-w-lg w-full text-center shadow-[0_0_150px_rgba(0,242,255,0.2)]">
                <div className="flex justify-center mb-6"><ShieldCheck size={80} className="text-[#00f2ff]" /></div>
                <h2 className="text-3xl font-black uppercase italic text-white mb-4">Payment <span className="text-[#00f2ff]">Verified</span></h2>
                <p className="text-xs text-white/50 uppercase font-black tracking-widest leading-relaxed">
                  Your transaction was successful.<br/><br/>
                  Check your inbox at:<br/>
                  <span className="text-cyan-400 font-bold">{deliveryEmail}</span><br/><br/>
                  Links will arrive in <span className="text-white">5-10 minutes</span>.
                </p>
                <div className="mt-8 text-[9px] text-white/20 font-black uppercase tracking-[0.5em] animate-pulse">Syncing Vault...</div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CartDashboard;
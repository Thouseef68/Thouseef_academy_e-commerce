import React from "react";
import { CreditCard, MapPin, ShoppingCart, ChevronLeft, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const Checkout = ({ cart }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* HEADER SECTION */}
      <div className="flex items-center justify-between mb-10 border-b border-gray-200 pb-6">
        <div>
          <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition mb-2">
            <ChevronLeft size={18}/>
            <span className="text-xs font-bold uppercase tracking-widest">Continue Shopping</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-800">Checkout</h2>
        </div>
        <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-full border border-green-100">
          <ShieldCheck size={18} />
          <span className="text-xs font-bold uppercase tracking-widest">Secure Payment</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT: SHIPPING & PAYMENT (8 Columns) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-3">
              <MapPin className="text-blue-600" size={20}/> Shipping Address
            </h3>
            <div className="space-y-4">
              <input 
                placeholder="Full Name" 
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-blue-500 outline-none transition"
              />
              <textarea 
                placeholder="Detailed Shipping Address" 
                rows="3"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-blue-500 outline-none transition"
              />
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-3">
              <CreditCard className="text-blue-600" size={20}/> Payment Method
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center justify-between p-4 border-2 border-blue-600 bg-blue-50 rounded-xl cursor-pointer">
                <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">Credit Card</span>
                <div className="w-4 h-4 rounded-full border-4 border-blue-600 bg-white"></div>
              </label>
              <label className="flex items-center justify-between p-4 border border-gray-200 hover:border-gray-300 rounded-xl cursor-pointer">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">PayPal</span>
                <div className="w-4 h-4 rounded-full border border-gray-200"></div>
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT: ORDER SUMMARY (4 Columns) */}
        <div className="lg:col-span-4">
          <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-lg sticky top-28">
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
              <ShoppingCart className="text-blue-600" size={20}/> Summary
            </h3>
            
            <div className="space-y-4 mb-8">
              {cart.map((item, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">{item.name} <span className="text-[10px] ml-1 font-bold">x{item.qty}</span></span>
                  <span className="text-gray-800 font-bold">₹{item.price * item.qty}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-gray-100 text-sm">
              <div className="flex justify-between text-gray-400 font-medium">
                <span>Subtotal</span>
                <span>₹{total}</span>
              </div>
              <div className="flex justify-between text-gray-400 font-medium">
                <span>Shipping Fee</span>
                <span className="text-green-600 font-bold uppercase text-[10px]">Free</span>
              </div>
              <div className="flex justify-between items-end pt-4">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-800">Grand Total</span>
                <span className="text-3xl font-bold text-blue-600 tracking-tighter">₹{total}</span>
              </div>
            </div>

            <button className="w-full mt-10 py-4 bg-blue-600 text-white rounded-lg font-bold text-sm uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition transform active:scale-95">
              Confirm Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
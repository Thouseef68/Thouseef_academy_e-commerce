import React, { useState } from "react";
import { CreditCard, MapPin, ShoppingCart, ChevronLeft, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { placeOrder } from "../services/orderService"; // Import the service you shared

const Checkout = ({ cart }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // 1. Logic to handle the Payment
  const handlePayment = async () => {
    // Get user email from localStorage (saved during login)
    const userEmail = localStorage.getItem("userEmail") || "guest@example.com";

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setLoading(true);

    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // Replace with your actual Key ID from Razorpay Dashboard
      amount: total * 100, // Amount in paise (e.g., ₹500 = 50000)
      currency: "INR",
      name: "Thouseef Academy",
      description: "Course Purchase",
      handler: async function (response) {
        // This runs AFTER payment success
        try {
          const result = await placeOrder(
            userEmail,
            cart,
            total,
            null, // No screenshot needed for Razorpay
            response.razorpay_payment_id // This verifies it in your Firebase
          );

          if (result.success) {
            alert("Payment Successful! Order Placed.");
            navigate("/orders"); // Send them to their tracking page
          } else {
            alert("Error saving order: " + result.error);
          }
        } catch (error) {
          console.error("Order error:", error);
        } finally {
          setLoading(false);
        }
      },
      prefill: {
        email: userEmail,
      },
      theme: {
        color: "#2563eb", // Blue-600 to match your UI
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

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
        
        {/* LEFT: SHIPPING & PAYMENT */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-3">
              <MapPin className="text-blue-600" size={20}/> Shipping Details
            </h3>
            <div className="space-y-4">
              <p className="text-sm text-gray-500 italic">Courses will be delivered to your registered email.</p>
              <input 
                disabled
                value={localStorage.getItem("userEmail") || ""}
                placeholder="Email Address" 
                className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none transition cursor-not-allowed"
              />
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-3">
              <CreditCard className="text-blue-600" size={20}/> Payment Method
            </h3>
            <div className="p-4 border-2 border-blue-600 bg-blue-50 rounded-xl">
              <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">Razorpay Secure (UPI, Cards, NetBanking)</span>
            </div>
          </div>
        </div>

        {/* RIGHT: ORDER SUMMARY */}
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
              <div className="flex justify-between items-end pt-4">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-800">Grand Total</span>
                <span className="text-3xl font-bold text-blue-600 tracking-tighter">₹{total}</span>
              </div>
            </div>

            {/* UPDATED BUTTON */}
            <button 
              onClick={handlePayment}
              disabled={loading}
              className="w-full mt-10 py-4 bg-blue-600 text-white rounded-lg font-bold text-sm uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition transform active:scale-95 disabled:bg-gray-400"
            >
              {loading ? "Processing..." : "Pay Now & Get Access"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
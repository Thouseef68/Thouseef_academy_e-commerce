import React, { useState } from "react";
import { CreditCard, MapPin, ShoppingCart, ChevronLeft, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { placeOrder } from "../services/orderService";
import emailjs from "@emailjs/browser";

// ✅ IMPORTANT: INIT EMAILJS
emailjs.init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY);

const Checkout = ({ cart }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const userEmail = localStorage.getItem("userEmail");
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        console.log("✅ Razorpay loaded");
        resolve(true);
      };
      script.onerror = () => {
        console.log("❌ Razorpay failed to load");
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  const handlePayment = async () => {
    if (!userEmail) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    setLoading(true);

    // 🔥 LOAD RAZORPAY FIRST
    const isLoaded = await loadRazorpay();

    if (!isLoaded) {
      alert("Razorpay SDK failed to load");
      setLoading(false);
      return;
    }

    console.log("🚀 Razorpay ready");

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: total * 100,
      currency: "INR",
      name: "Thouseef Academy",

      handler: async function (response) {
        console.log("💳 PAYMENT SUCCESS:", response);

        try {
          const allLinks = cart
            .map(
              (item) =>
                `• ${item.name}\nLink: ${item.courseLink || "Check profile"}`
            )
            .join("\n\n");

          console.log("🚀 BEFORE placeOrder");

          const result = await placeOrder(
            userEmail,
            cart,
            total,
            response.razorpay_payment_id
          );

          console.log("RESULT:", result);

          if (result.success) {
            console.log("🔥 ENTERING EMAIL BLOCK");

            const emailParams = {
              to_email: userEmail,
              customer_name: userEmail.split("@")[0],
              course_links: allLinks,
              order_id: response.razorpay_payment_id,
              total_paid: `₹${total}`,
            };

            console.log("📧 EMAIL PARAMS:", emailParams);

            await emailjs.send(
              process.env.REACT_APP_EMAILJS_SERVICE_ID,
              process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
              emailParams,
              process.env.REACT_APP_EMAILJS_PUBLIC_KEY
            );

            console.log("✅ EMAIL SENT");

            alert("Payment success + email sent!");

            localStorage.removeItem("cart");
            window.location.href = "/orders";
          }
        } catch (err) {
          console.error("🔥 FINAL ERROR:", err);
        }

        setLoading(false);
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function (response) {
      console.log("❌ PAYMENT FAILED:", response);
    });

    rzp.open();
  };

  return (
    <div>
      <button onClick={handlePayment}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export default Checkout;
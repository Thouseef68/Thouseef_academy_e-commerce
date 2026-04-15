import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Components
import ShopHeader from "./components/ShopHeader";
import Footer from "./components/Footer";
import SupportBot from "./components/SupportBot"; // ✅ AI Chat Integrated

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/Orders"; 
import AdminDashboard from './pages/AdminDashboard'; 
import AdminAnalytics from './pages/AdminAnalytics'; // ✅ Founder Analytics Integrated

// Legal Pages
import Refund from './pages/legal/Refund';
import Privacy from './pages/legal/Privacy';
import Terms from './pages/legal/Terms';
import Contact from './pages/legal/Contact';

// Services
import { getUserProfile } from "./services/userService";

function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]); // ✅ Global Wishlist State
  const user = localStorage.getItem("userEmail");

  // ✅ PERSISTENCE: Load Cloud Data from Firebase on App Startup
  useEffect(() => {
    const loadCloudData = async () => {
      if (user) {
        const profile = await getUserProfile(user);
        if (profile) {
          if (profile.wishlist) setWishlist(profile.wishlist);
          // If you want to sync cloud cart in the future, add it here
        }
      }
    };
    loadCloudData();
  }, [user]);

  return (
    <Router>
      <div className="min-h-screen relative font-sans bg-[#050112]">
        
        {/* GLOBAL HEADER: Floating Glass UI */}
        <ShopHeader cartCount={cart.length} />
        
        <main className="pt-32 min-h-screen bg-transparent">
          <Routes>
            {/* MAIN HUB */}
            <Route 
              path="/" 
              element={
                user ? (
                  <Home 
                    cart={cart} 
                    setCart={setCart} 
                    wishlist={wishlist} 
                    setWishlist={setWishlist} 
                  />
                ) : (
                  <Navigate to="/login" />
                )
              } 
            />

            {/* AUTH & CHECKOUT */}
            <Route path="/login" element={<Login />} />
            <Route path="/checkout" element={<Checkout cart={cart} />} />
            
            {/* USER PORTALS */}
            <Route 
              path="/orders" 
              element={user ? <MyOrders /> : <Navigate to="/login" />} 
            />

            {/* ADMIN SECTOR: Command & Control */}
            <Route path="/admin-vault-007" element={<AdminDashboard />} />
            <Route path="/admin-analytics" element={<AdminAnalytics />} />

            {/* LEGAL SECTOR: Compliance Shields */}
            <Route path="/refund" element={<Refund />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* FALLBACK: Redirect to Home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        {/* GLOBAL FOOTER */}
        <Footer /> 

        {/* ✅ NEURAL SUPPORT: Global Floating AI Chat */}
        <SupportBot />
        
      </div>
    </Router>
  );
}

export default App;
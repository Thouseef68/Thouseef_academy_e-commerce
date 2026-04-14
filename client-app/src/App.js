import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/Orders"; 
import ShopHeader from "./components/ShopHeader";
import Footer from "./components/Footer";
import AdminDashboard from './pages/AdminDashboard'; 
import Refund from './pages/legal/Refund';
import Privacy from './pages/legal/Privacy';
import Terms from './pages/legal/Terms';
import Contact from './pages/legal/Contact';

// ✅ Import the cloud service we built
import { getUserProfile } from "./services/userService";

function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]); // ✅ Global Wishlist State
  const user = localStorage.getItem("userEmail");

  // ✅ PERSISTENCE: Load wishlist from Firebase on Startup
  useEffect(() => {
    const loadCloudData = async () => {
      if (user) {
        const profile = await getUserProfile(user);
        if (profile && profile.wishlist) {
          setWishlist(profile.wishlist);
        }
      }
    };
    loadCloudData();
  }, [user]);

  return (
    <Router>
      <div className="min-h-screen relative font-sans">
        <ShopHeader cartCount={cart.length} />
        
        <main className="pt-32 min-h-screen bg-transparent">
          <Routes>
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
            <Route path="/login" element={<Login />} />
            <Route path="/checkout" element={<Checkout cart={cart} />} />
            <Route 
              path="/orders" 
              element={user ? <MyOrders /> : <Navigate to="/login" />} 
            />
            <Route path="/admin-vault-007" element={<AdminDashboard />} />
            <Route path="/refund" element={<Refund />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer /> 
      </div>
    </Router>
  );
}

export default App;
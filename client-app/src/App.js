import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import ShopHeader from "./components/ShopHeader";
import Footer from "./components/Footer"; // 1. IMPORT FOOTER HERE
import AdminDashboard from './pages/AdminDashboard'; 
import Refund from './pages/legal/Refund';
import Privacy from './pages/legal/Privacy';
import Terms from './pages/legal/Terms';
import Contact from './pages/legal/Contact';
// 1. Import your Orders page at the top
import MyOrders from "./pages/Orders"; 


function App() {
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <div className="min-h-screen relative font-sans">
        <ShopHeader cartCount={cart.length} />
        
        <main className="pt-32 min-h-screen bg-transparent">
          <Routes>
            <Route path="/" element={<Home cart={cart} setCart={setCart} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/checkout" element={<Checkout cart={cart} />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/admin-vault-007" element={<AdminDashboard />} />
            <Route path="/refund" element={<Refund />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/contact" element={<Contact />} />
            
          </Routes>
        </main>

        {/* 2. PLACE FOOTER HERE (Outside Routes, inside Router) */}
        <Footer /> 
      </div>
    </Router>
  );
}

export default App;
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Eye, EyeOff } from "lucide-react";


const Login = () => {
  
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    console.log("🚀 HANDLE SUBMIT STARTED");

    setLoading(true);

    const urlPath = isLogin ? "/login" : "/register";
    const apiEndpoint = `https://thouseef-academy-e-commerce.onrender.com/api/auth${urlPath}`;

    try {
      console.log("🌐 Calling API:", apiEndpoint);

      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      console.log("📡 RESPONSE STATUS:", res.status);

      const data = await res.json();
      console.log("📦 RESPONSE DATA:", data);

      if (res.ok) {
        // 1. Identify the user email correctly
        const userEmail = data.user ? data.user.email : form.email;
        
        // 2. Save to localStorage (The Backpack)
        localStorage.setItem("userEmail", userEmail);
        localStorage.setItem("activeUser", JSON.stringify({
          name: form.name || userEmail.split('@')[0],
          email: userEmail
        }));

        console.log("✅ SUCCESS - User saved to storage");
        
        // 3. Show a quick confirmation alert
        alert(isLogin ? "Login Successful!" : "Account Created!");

        // 4. THE FIX: Force a redirect and refresh to clear the "sticky" page
        window.location.href = "/"; 
      } else {
        console.log("❌ SERVER ERROR:", data);
        alert(data.msg || "Authentication failed. Check your credentials.");
      }
    } catch (err) {
      console.error("❌ FETCH ERROR:", err);
      alert("Cannot reach the server. Please check your internet or Render logs.");
    } finally {
      setLoading(false);
    }
  };

  const floatAnim = (delay = 0) => ({
    y: [0, -10, 0],
    transition: {
      duration: 3.5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay
    },
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f172a] font-sans overflow-hidden p-4 relative text-white">
      
      {/* BACKGROUND ELEMENTS (GLOWS) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-15%] left-[-10%] w-[60%] h-[70%] bg-purple-600/15 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[60%] h-[70%] bg-blue-600/15 blur-[140px] rounded-full animate-pulse" />
      </div>

      {/* MAIN LOGIN CARD */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="w-full max-w-[1050px] h-auto min-h-[650px] bg-[#1e1b4b]/30 backdrop-blur-3xl border border-white/10 rounded-[3rem] shadow-[0_35px_100px_-15px_rgba(0,0,0,0.6)] flex flex-col md:flex-row overflow-hidden relative z-10"
      >
        
        {/* LEFT PANEL: LOGIN FORM */}
        <div className="w-full md:w-[42%] p-14 flex flex-col justify-center items-center bg-black/40 relative z-20 border-r border-white/5">
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="mb-10 p-6 bg-gradient-to-tr from-white/10 to-transparent rounded-full border border-white/10 shadow-inner"
          >
            <User size={50} className="text-white opacity-90" />
          </motion.div>

          <h2 className="text-4xl font-black text-white mb-10 tracking-tight text-center uppercase italic">
            {isLogin ? "Authorized Entry" : "New Operative"}
          </h2>

          <form onSubmit={handleSubmit} className="w-full space-y-5">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.input
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-7 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-cyan-500 focus:bg-white/10 outline-none transition-all placeholder:text-gray-500 text-sm"
                />
              )}
            </AnimatePresence>

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full px-7 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-cyan-500 focus:bg-white/10 outline-none transition-all placeholder:text-gray-500 text-sm"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
                value={form.password}
                onChange={handleChange}
                className="w-full px-7 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-cyan-500 focus:bg-white/10 outline-none transition-all placeholder:text-gray-500 text-sm"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 top-[18px] text-gray-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={22}/> : <Eye size={22}/>}
              </button>
            </div>

            <motion.button
              type="submit" // 🚀 Pattern Fix: Using standard submit type
              animate={floatAnim(0.5)}
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                boxShadow: "0px 20px 40px rgba(0, 242, 255, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-black py-5 rounded-2xl shadow-xl transition-all mt-8 tracking-[0.2em] text-xs uppercase italic"
            >
              {loading ? "VERIFYING..." : isLogin ? "INITIATE LOGIN" : "CREATE VAULT"}
            </motion.button>
          </form>

          <p className="text-gray-500 text-[10px] mt-10 uppercase tracking-widest font-bold">
            {isLogin ? "No Access ID?" : "Already Authorized?"}
            <span
              onClick={() => setIsLogin(!isLogin)}
              className="text-cyan-400 cursor-pointer ml-3 hover:text-cyan-300 transition-colors border-b border-cyan-400/30"
            >
              {isLogin ? "SIGN UP" : "LOG IN"}
            </span>
          </p>
        </div>

        {/* RIGHT PANEL: VISUAL HERO */}
        <div className="hidden md:flex w-[58%] relative flex-col items-center justify-center p-20 overflow-hidden">
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="relative z-10 text-left w-full"
          >
            <h1 className="text-[6rem] font-black text-white leading-[0.85] tracking-tighter mb-6 uppercase italic">
              Future <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                Ready.
              </span>
            </h1>
            <p className="text-xl text-white/40 max-w-sm leading-relaxed font-medium uppercase tracking-tight">
              Unlock the next generation of e-commerce education.
            </p>
          </motion.div>

          {/* ANIMATED SVG PATH */}
          <div className="absolute inset-0 opacity-20 pointer-events-none scale-150 rotate-12">
            <svg className="w-full h-full" viewBox="0 0 500 500">
              <motion.path 
                d={isLogin ? "M0,250 Q125,100 250,250 T500,250" : "M0,250 Q125,400 250,250 T500,250"} 
                animate={{ 
                  d: [
                    "M0,250 Q125,100 250,250 T500,250",
                    "M0,250 Q125,400 250,250 T500,250",
                    "M0,250 Q125,100 250,250 T500,250"
                  ] 
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                fill="none" 
                stroke="url(#liquid-grad)" 
                strokeWidth="100"
              />
              <defs>
                <linearGradient id="liquid-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: "#00f2ff" }} />
                  <stop offset="50%" style={{ stopColor: "#3b82f6" }} />
                  <stop offset="100%" style={{ stopColor: "#8b5cf6" }} />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
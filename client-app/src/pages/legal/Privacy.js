import React from 'react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-[#050112] text-white p-20 font-sans">
      <h1 className="text-4xl font-black uppercase italic text-cyan-400 mb-10">Privacy Policy</h1>
      <div className="max-w-3xl text-white/70 leading-relaxed space-y-6 text-sm">
        <p><strong>Effective Date:</strong> April 2024</p>
        <p>Thouseef Academy ("we", "our", or "us") respects your privacy. This policy outlines how we handle your data.</p>
        <p><strong>1. Data Collection:</strong> We collect your name and email address during checkout to deliver digital assets and send transaction updates.</p>
        <p><strong>2. Cookies:</strong> We use cookies to enhance your browsing experience and analyze site traffic. You can disable cookies in your browser settings, though some features may not function correctly.</p>
        <p><strong>3. Security:</strong> All payments are processed through Razorpay. We do not store financial data (credit cards/UPI IDs) on our servers.</p>
        <p><strong>4. User Rights:</strong> You have the right to request the deletion of your account data by contacting our support email.</p>
        <p>For questions, contact: <span className="text-cyan-400">thouseefthouseef1234@gmail.com</span></p>
      </div>
    </div>
  );
};

export default Privacy;
import React from 'react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-[#050112] text-white p-20 font-sans">
      <h1 className="text-4xl font-black uppercase italic text-cyan-400 mb-10">Privacy Policy</h1>
      <div className="max-w-3xl text-white/70 leading-relaxed space-y-6 text-sm">
        <p>Thouseef Academy ("we", "our", or "us") is committed to protecting your privacy.</p>
        <p><strong>Data Collection:</strong> We collect your name and email address during checkout solely to deliver your digital assets and send transaction updates.</p>
        <p><strong>Security:</strong> Your payment information is processed securely by Razorpay. We do not store your credit card or bank details on our servers.</p>
        <p><strong>Third Parties:</strong> We do not sell or trade your personal information to outside parties. Data is only shared with essential services like EmailJS for sending your course links.</p>
        <p>For questions, contact: <span className="text-cyan-400">thouseefthouseef1234@gmail.com</span></p>
      </div>
    </div>
  );
};

export default Privacy;
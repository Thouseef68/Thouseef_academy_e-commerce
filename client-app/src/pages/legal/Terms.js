import React from 'react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-[#050112] text-white p-20 font-sans">
      <h1 className="text-4xl font-black uppercase italic text-cyan-400 mb-10">Terms of Service</h1>
      <div className="max-w-3xl text-white/70 leading-relaxed space-y-6 text-sm">
        <p>By accessing Thouseef Academy, you agree to the following protocols:</p>
        <p><strong>1. Digital License:</strong> All roadmaps and courses are the intellectual property of Thouseef Academy. You are granted a non-transferable, single-user license.</p>
        <p><strong>2. Prohibited Use:</strong> Reselling, sharing access links, or redistribution of vault materials is strictly prohibited and will result in a permanent ban without refund.</p>
        <p><strong>3. Digital Delivery:</strong> All assets are delivered electronically. Our liability ends once the link is transmitted to your registered email address.</p>
        <p><strong>4. Governing Law:</strong> These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in <strong>Bengaluru, Karnataka</strong>.</p>
        <p><strong>5. Payments:</strong> Prices are subject to change without notice. All transactions are processed in INR.</p>
      </div>
    </div>
  );
};

export default Terms;
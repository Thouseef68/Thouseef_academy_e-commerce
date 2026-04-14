import React from 'react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-[#050112] text-white p-20 font-sans">
      <h1 className="text-4xl font-black uppercase italic text-cyan-400 mb-10">Terms of Service</h1>
      <div className="max-w-3xl text-white/70 leading-relaxed space-y-6 text-sm">
        <p>By accessing Thouseef Academy, you agree to the following terms:</p>
        <p><strong>1. Digital Assets:</strong> All roadmaps and courses are intellectual property of Thouseef Academy. You are granted a single-user license for personal use only.</p>
        <p><strong>2. Usage:</strong> Redistribution, reselling, or sharing of access links is strictly prohibited and may result in access being revoked without refund.</p>
        <p><strong>3. Accuracy:</strong> We strive for accuracy in our roadmaps, but they are provided "as-is" for educational purposes.</p>
        <p><strong>4. Payments:</strong> All transactions are handled in INR through Razorpay.</p>
      </div>
    </div>
  );
};

export default Terms;
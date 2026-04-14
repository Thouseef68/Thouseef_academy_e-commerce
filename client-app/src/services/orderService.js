import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const placeOrder = async (email, cart, total, paymentId = "RAZORPAY") => {
  try {
    console.log("📡 [MISSION LOG] Initiating save for:", email);
    
    // Safety check: Don't save if cart is empty
    if (!cart || cart.length === 0) throw new Error("Cart is empty");

    const orderData = {
      customerEmail: email,
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        courseLink: item.courseLink || "No Link"
      })),
      totalAmount: total,
      status: "paid",
      paymentId: paymentId,
      createdAt: serverTimestamp(),
    };

    // 🚀 THE SAVE COMMAND
    const docRef = await addDoc(collection(db, "orders"), orderData);
    
    console.log("✅ [MISSION LOG] Success! Order ID:", docRef.id);
    return { success: true, id: docRef.id };

  } catch (error) {
    console.error("❌ [MISSION LOG] Firebase Write Failed:", error);
    // This alert will tell you exactly what is wrong (e.g., Permission Denied)
    alert("CRITICAL: Database sync failed! " + error.message);
    return { success: false, error: error.message };
  }
};
import { db, storage } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const placeOrder = async (email, cart, total, screenshotFile, paymentId = null) => {
  try {
    let proofUrl = "";

    // If manual (screenshot), upload file. If gateway, we use the paymentId.
    if (screenshotFile) {
      const storageRef = ref(storage, `screenshots/${Date.now()}`);
      await uploadBytes(storageRef, screenshotFile);
      proofUrl = await getDownloadURL(storageRef);
    }

    const orderData = {
      customerEmail: email,
      items: cart.map(item => ({ name: item.name, url: item.url, price: item.price })),
      totalAmount: total,
      screenshotUrl: proofUrl, 
      razorpayId: paymentId, // Save the ID here
      // 🔥 MAGIC LINE: If there's a paymentId, it's auto-verified!
      status: paymentId ? "verified" : "pending", 
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "orders"), orderData);
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
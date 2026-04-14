import { db } from "../firebase";
import { 
  collection, 
  getDocs, 
  doc, 
  updateDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp 
} from "firebase/firestore";

/**
 * 1. Fetch Active Orders
 * This retrieves BOTH 'pending' and 'verified' statuses so you can 
 * see them on your dashboard until they are finally 'delivered'.
 */

export const getActiveOrders = async () => {
  try {
    const ordersRef = collection(db, "orders");
    // ✅ FIX: Remove the 'where' filter so Admin sees ALL orders (Paid & Pending)
    const q = query(ordersRef, orderBy("createdAt", "desc"));
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Admin Data Sync Error:", error);
    throw error;
  }
};


/**
 * 2. Approve Order
 * Changes status to 'verified'. The order stays on your dashboard
 * but moves to the "Ready to Email" section.
 */
export const approveOrder = async (orderId) => {
  try {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, {
      status: "verified",
      verifiedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error("Approval Error:", error);
    return { success: false };
  }
};

/**
 * 3. Decline Order
 * Changes status to 'failed'. The student will see this in their profile.
 */
export const declineOrder = async (orderId) => {
  try {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, { 
      status: "failed",
      declinedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) { 
    return { success: false }; 
  }
};

/**
 * 4. Mark as Delivered
 * This is the final step. Once you send the email, click this.
 * The order will then disappear from the Admin Dashboard and 
 * show as 'Delivered' in the Student Profile.
 */
export const markAsDelivered = async (orderId) => {
  try {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, { 
      status: "delivered",
      deliveredAt: serverTimestamp() 
    });
    return { success: true };
  } catch (error) {
    console.error("Delivery Error:", error);
    return { success: false };
  }
};
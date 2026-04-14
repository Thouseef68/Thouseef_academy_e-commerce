import { db } from "../firebase";
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

/**
 * ✅ SAVE OR UPDATE PROFILE
 * userId is the user's email
 */
export const saveUserProfile = async (userId, data) => {
  if (!userId) {
    console.error("❌ ERROR: userId (email) is missing!");
    return { success: false, error: "Missing User ID" };
  }

  try {
    const userRef = doc(db, "users", userId);
    
    // merge: true ensures we don't overwrite the wishlist or cart
    await setDoc(userRef, {
      ...data,
      updatedAt: new Date()
    }, { merge: true });

    console.log(`✅ Profile for ${userId} synced to Cloud Vault!`);
    return { success: true };
  } catch (error) {
    console.error("❌ Firebase Profile Error:", error);
    return { success: false, error };
  }
};

/**
 * ✅ FETCH USER PROFILE
 */
export const getUserProfile = async (userId) => {
  if (!userId) return null;

  try {
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.warn(`⚠️ No profile found for ${userId}. Initializing new operative.`);
      return null;
    }
  } catch (error) {
    console.error("❌ Error fetching profile:", error);
    return null;
  }
};

/**
 * ✅ CLOUD WISHLIST SYNC
 */
export const syncWishlistToCloud = async (userId, product, action = "add") => {
  if (!userId) return;
  const userRef = doc(db, "users", userId);

  try {
    if (action === "add") {
      await setDoc(userRef, {
        wishlist: arrayUnion(product)
      }, { merge: true });
    } else {
      await updateDoc(userRef, {
        wishlist: arrayRemove(product)
      });
    }
  } catch (error) {
    console.error("Wishlist Sync Error:", error);
  }
};

/**
 * ✅ CLOUD CART SYNC (Persistence Protocol)
 * Ensures the payload stays with the user across all devices
 */
export const syncCartToCloud = async (userId, cartItems) => {
  if (!userId) return;
  const userRef = doc(db, "users", userId);

  try {
    await setDoc(userRef, {
      activeCart: cartItems, // Saves the entire current cart array
      lastCartUpdate: new Date()
    }, { merge: true });
  } catch (error) {
    console.error("Cart Sync Error:", error);
  }
};
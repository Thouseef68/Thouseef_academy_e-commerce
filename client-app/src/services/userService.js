// src/services/userService.js
import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

// Save or Update User Profile
export const saveUserProfile = async (userId, data) => {
  try {
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, data, { merge: true });
    console.log("Profile Saved Successfully!");
    return { success: true };
  } catch (error) {
    console.error("Error saving profile:", error);
    return { success: false, error };
  }
};

// Fetch User Profile
export const getUserProfile = async (userId) => {
  const userRef = doc(db, "users", userId);
  const docSnap = await getDoc(userRef);
  
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};
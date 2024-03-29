// firebaseService.js
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { auth } from '../firebase/firebaseconfig'; // Import your Firebase Auth instance

// Get a Firestore instance
const db = getFirestore();

// Function to store user profile data in Firestore
export const storeUserProfile = async (uid, userData) => {
  try {
    const userRef = doc(db, 'users', uid); // 'users' collection
    await setDoc(userRef, userData, { merge: true }); // Merge with existing data if any
    console.log('User profile stored successfully');
  } catch (error) {
    console.error('Error storing user profile:', error);
  }
};

// Example usage: Call this function when creating/updating user profiles
auth.onAuthStateChanged((user) => {
  if (user) {
    const uid = user.uid;
    const userData = {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      // Other profile data
    };
    storeUserProfile(uid, userData);
  }
});

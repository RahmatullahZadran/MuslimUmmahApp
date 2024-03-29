// UserManager.js
import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebaseconfig';

const updateUserProfile = async (userId, userData) => {
  const userRef = doc(firestore, 'users', userId); // Reference to the user's document
  try {
    await updateDoc(userRef, userData); // Update the document with the provided data
    console.log('User profile updated successfully');
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export { updateUserProfile };

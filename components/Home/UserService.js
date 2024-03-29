// UserService.js
import { doc, updateDoc, getDoc, getFirestore } from 'firebase/firestore';
import { firebaseApp } from '../firebase/firebaseconfig'; // Assuming firebaseApp is your Firebase app instance

const firestore = getFirestore(firebaseApp); // Initialize Firestore

const updateUserProfileInFirestore = async (userId, userData) => {
  const userDocRef = doc(firestore, 'users', userId);
  const docSnapshot = await getDoc(userDocRef);

  if (docSnapshot.exists()) {
    try {
      await updateDoc(userDocRef, userData);
      console.log('User profile updated successfully in Firestore');
    } catch (error) {
      console.error('Error updating user profile in Firestore:', error);
      throw error;
    }
  } else {
    console.error('Document does not exist:', userDocRef.path);
    throw new Error('Document does not exist');
  }
};

export { updateUserProfileInFirestore };

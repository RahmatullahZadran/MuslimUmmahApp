import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyACjuUnbTk-uUgBXkt0wFYUr-VdZMY9lCk",
    authDomain: "muslimummahapp.firebaseapp.com",
    databaseURL: "https://muslimummahapp-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "muslimummahapp",
    storageBucket: "muslimummahapp.appspot.com",
    messagingSenderId: "981979564801",
    appId: "1:981979564801:web:5d24b187adec3407572900",
    measurementId: "G-99QCLJLN9J"
};


const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage for persistence
const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Function to handle user sign-in
const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      // Navigate to home screen or any other screen
      // Example: navigation.navigate('Home');
    })
    .catch(error => {
      console.error("Error signing in:", error.message);
      throw error; // Rethrow error for handling in components
    });
};

// Function to handle user sign-up
const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      // Navigate to additional setup screen or home screen
    })
    .catch(error => {
      console.error("Error signing up:", error.message);
      throw error;
    });
};

// Function to handle user sign-out
const signOutUser = () => {
  return signOut(auth)
    .then(() => {
      // Navigate to sign-in screen or any other screen
    })
    .catch(error => {
      console.error("Error signing out:", error.message);
      throw error;
    });
};

export { auth, firebaseApp, signIn, signUp, signOutUser };
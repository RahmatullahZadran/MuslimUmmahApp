import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

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

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage for persistence
const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firebase Firestore
const firestore = getFirestore(firebaseApp);

// Function to handle user sign-in
const signIn = (email, password) => {
  // Validate email and password
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  return signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      // Navigate to home screen or any other screen
    })
    .catch(error => {
      console.error("Error signing in:", error.message);
      throw error;
    });
};


// Function to handle user sign-up
const signUp = (email, password) => {
  // Validate email and password
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

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

// Function to upload message to Firestore
const uploadMessage = async (message) => {
  try {
    const messagesRef = collection(firestore, 'messages');
    await addDoc(messagesRef, message);
    console.log('Message uploaded to Firestore successfully.');
  } catch (error) {
    console.error('Error uploading message to Firestore:', error);
    throw error;
  }
};

// Function to create a new chat document
const createChat = async (userId1, userId2) => {
  try {
    const participants = [userId1, userId2].sort();
    const participantsKey = participants.join('-'); // Create a unique key for the participants
    
    const chatDocRef = await addDoc(collection(firestore, 'chats'), {
      participants,
      participantsKey, // Save the unique key
      createdAt: new Date(),
      messages: []
    });

    console.log('Chat created successfully with ID:', chatDocRef.id);
    return chatDocRef.id;
  } catch (error) {
    console.error('Error creating chat:', error);
    throw error;
  }
};

export { auth, firebaseApp, signIn, signUp, signOutUser, uploadMessage, createChat };
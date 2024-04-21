
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore'; 


import AsyncStorage from '@react-native-async-storage/async-storage';

const auth = getAuth();
const db = getFirestore(); // Initialize Firestore

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const checkUsernameAvailability = async (username) => {
    try {
      // Check if the username exists in the 'usernames' collection
      const usernameDoc = await getDoc(doc(db, 'usernames', username));
      if (usernameDoc.exists()) {
        return false; // Username already exists
      }
  
      // Check if the username exists in the 'users' collection
      const usersQuery = query(collection(db, 'users'), where('username', '==', username));
      const userSnapshot = await getDocs(usersQuery);
      if (!userSnapshot.empty) {
        return false; // Username already exists
      }
  
      return true; // Username is available
    } catch (error) {
      console.error('Error checking username availability:', error);
      return false; // Assume username is unavailable in case of error
    }
  };
  
  
  const handleSignUp = async () => {
    if (!username || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const isUsernameAvailable = await checkUsernameAvailability(username);
    if (!isUsernameAvailable) {
      setError('Username is not available');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        // Update user profile with displayName
        await updateProfile(auth.currentUser, {
          displayName: username,
        });

        // Create user profile document in Firestore
        const userProfileRef = doc(db, 'users', user.uid);
        await setDoc(userProfileRef, {
          username: username,
          email: email,
          Quote: 'Quote',
          // Add other profile information here if needed
        });

        // Registration and profile creation successful, navigate to SignInScreen
        navigation.navigate('ProfileScreen', { user: user });

        // Remove any stored credentials if user signs up (optional)
        AsyncStorage.removeItem('userCredentials');
      })
      .catch(error => {
        setError(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SignUpScreen;
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase/firebaseconfig';

const ProfileScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Check if user is signed in when component mounts
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) {
        // User is not signed in, navigate to sign-in screen
        navigation.navigate('SignInScreen');
      }
    });

    // Clean up listener when component unmounts
    return unsubscribe;
  }, []);

  const handleProfileEdit = () => {
    // Navigate to profile edit screen
    navigation.navigate('EditProfileScreen');
  };

  const handleLogout = () => {
    // Sign out the user
    auth.signOut().then(() => {
      // Navigate to sign-in screen after successful logout
      navigation.navigate('SignInScreen');
    }).catch(error => {
      console.error("Error signing out: ", error);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Profile</Text>
      <Button title="Edit Profile" onPress={handleProfileEdit} />
      <Button title="Logout" onPress={handleLogout} />
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
});

export default ProfileScreen;

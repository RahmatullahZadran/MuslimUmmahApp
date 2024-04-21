import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase/firebaseconfig';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null); // State to hold user information
  
  useEffect(() => {
    // Fetch user information when component mounts
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        // User is signed in, update user state
        setUser(currentUser);
      } else {
        // User is not signed in, navigate to sign-in screen
        navigation.navigate('SignInScreen');
      }
    });

    // Clean up listener when component unmounts
    return unsubscribe;
  }, []);

  const handleProfileEdit = () => {
    // Navigate to profile edit screen
    navigation.navigate('EditProfileScreen', { user });
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
      {user && (
        <>
          <View style={styles.profileHeader}>
            <Image
              source={{ uri: user.photoURL }} // Use user's profile image
              style={styles.profileImage}
            />
            <Text style={styles.username}>{user.displayName}</Text>
            <Text style={styles.email}>{user.email}</Text>
            {/* Display hashtag and quote if available */}
            {user.hashtag && <Text>#{user.hashtag}</Text>}
            {user.quote && <Text>"{user.quote}"</Text>}
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Edit Profile" onPress={handleProfileEdit} />
            <Button title="Logout" onPress={handleLogout} />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  buttonContainer: {
    width: '100%',
  },
});

export default ProfileScreen;


import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { updateUserProfileInFirestore } from '../Home/UserService';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params;

  const [displayName, setDisplayName] = useState(user.displayName || '');
  const [email, setEmail] = useState(user.email || '');
  const [selectedImage, setSelectedImage] = useState(null);
  const [hashtag, setHashtag] = useState(user.hashtag || '');
  const [quote, setQuote] = useState(user.quote || '');
  const [postTimestamp, setPostTimestamp] = useState(null); // State to hold post timestamp

  const handleSaveProfile = () => {
    // Capture the timestamp when the profile is saved
    const timestamp = new Date().toISOString();
    setPostTimestamp(timestamp);

    // Here you can proceed with saving the profile data to Firestore
    // updateUserProfileInFirestore({ displayName, email, selectedImage, hashtag, quote });

    // For demo purposes, log the data
    console.log("Profile saved at:", timestamp);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Profile</Text>
      <View style={styles.imageSection}>
        <Text>Select Profile Image:</Text>
        {selectedImage ? (
          <Image source={{ uri: selectedImage.uri }} style={styles.selectedImage} />
        ) : (
          <Text>No image selected</Text>
        )}
        <Button title="Select Image" onPress={() => handleImageSelection(/* Pass selected image */)} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Hashtag"
        value={hashtag}
        onChangeText={setHashtag}
      />
      <TextInput
        style={styles.input}
        placeholder="Display Name"
        value={displayName}
        onChangeText={setDisplayName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Quote"
        value={quote}
        onChangeText={setQuote}
        multiline
      />
      <Button title="Save Profile" onPress={handleSaveProfile} />
      {postTimestamp && <Text style={styles.timestamp}>Profile saved at: {postTimestamp}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
  imageSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  timestamp: {
    marginTop: 10,
    fontStyle: 'italic',
  },
});

export default EditProfileScreen;

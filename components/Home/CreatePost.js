// AddPostScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, FlatList } from 'react-native';
import { getFirestore, collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { firebaseApp } from '../firebase/firebaseconfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const db = getFirestore(firebaseApp);
const auth = getAuth(); // Get the Firebase Auth instance

const AddPostScreen = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null); // State to track selected category
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState(''); // State to hold username
  const [isPosting, setIsPosting] = useState(false); // State to track post submission

  useEffect(() => {
    // Subscribe to the authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setDisplayName(user.displayName);
        setUsername(user.displayName); // Set username
      } else {
        // No user is signed in
        setDisplayName('');
        setUsername(''); // Set username
      }
    });

    // Clean-up subscription on unmount
    return () => unsubscribe();
  }, []); // Run only once on component mount

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
  };

  const handleSubmit = async () => {
    setIsPosting(true); // Set isPosting to true while posting
  
    try {
      const currentUser = auth.currentUser; // Get the current authenticated user
      const userId = currentUser ? currentUser.uid : ''; // Get the UID of the current user
  
      // Add the post data to Firestore collection with a timestamp
      await addDoc(collection(db, 'posts'), {
        title: title,
        content: content,
        url: url,
        category: selectedCategory,
        timestamp: serverTimestamp(), // Include server-side timestamp
        displayName: displayName, // Set the displayName (username)
        username: username, // Set the username
        userId: userId, // Add userId field
        status: 'pending', // Set status to pending
        // You can add more fields as needed
      });
  
      // Reset the input fields after submission
      setTitle('');
      setContent('');
      setUrl('');
      setSelectedCategory(null);
      
      Alert.alert('Success', 'Post added successfully! It will appear after approval.'); // Display success message
    } catch (error) {
      console.error('Error adding post: ', error);
      Alert.alert('Error', 'Error adding post. Please try again.'); // Display error message
    } finally {
      setIsPosting(false); // Reset isPosting after posting
    }
  };

  // Array of categories
  const categories = [
    { id: '2', title: 'Marriage' },
    { id: '4', title: 'General' },
    { id: '5', title: 'Potential' },
    { id: '6', title: 'Advice' },
    { id: '7', title: 'Pre Nikah' },
    // Add more categories as needed
  ];

  return (
    <View style={styles.containers}>
      <FlatList
        horizontal
        data={categories}
        renderItem={({ item }) => (
          <CategoryButton
            title={item.title}
            onPress={() => handleCategorySelection(item.title === 'Category' ? null : item.title)}
            isSelected={selectedCategory === item.title}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.categoryContainer}
      />
      <Text style={styles.title}>Add New Post</Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Content"
        multiline
        numberOfLines={4}
        value={content}
        onChangeText={setContent}
      />
      <TextInput
        style={styles.input}
        placeholder="URL"
        value={url}
        onChangeText={setUrl}
      />
      <Button
        title="Submit"
        onPress={handleSubmit}
        disabled={!title || !content || !selectedCategory || isPosting} // Disable button if title, content, or category is empty or posting
      />
    </View>
  );
};

const CategoryButton = ({ title, onPress, isSelected }) => (
  <Button title={title} onPress={onPress} color={isSelected ? '#007AFF' : '#333'} />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  categoryContainer: {
    minHeight: 40, // Adjust the height as needed
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  multilineInput: {
    height: 120, // Adjust height for multiline input
  },
});

export default AddPostScreen;

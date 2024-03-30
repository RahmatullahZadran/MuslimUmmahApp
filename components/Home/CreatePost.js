import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
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

  useEffect(() => {
    // Subscribe to the authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setDisplayName(user.displayName);
      } else {
        // No user is signed in
        setDisplayName('');
      }
    });

    // Clean-up subscription on unmount
    return () => unsubscribe();
  }, []); // Run only once on component mount

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
  };

  const handleSubmit = async () => {
    try {
      // Add the post data to Firestore collection with a timestamp
      const docRef = await addDoc(collection(db, 'posts'), {
        title: title,
        content: content,
        url: url,
        category: selectedCategory,
        timestamp: serverTimestamp(), // Include server-side timestamp
        displayName: displayName, // Set the displayName (username)
        // You can add more fields as needed
      });
      console.log('Post added with ID: ', docRef.id);

      // Reset the input fields after submission
      setTitle('');
      setContent('');
      setUrl('');
      setSelectedCategory(null); // Reset selected category
    } catch (error) {
      console.error('Error adding post: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        <CategoryButton
          title="Category"
          onPress={() => handleCategorySelection(null)}
          isSelected={selectedCategory === null}
        />
        <CategoryButton
          title="Marriage"
          onPress={() => handleCategorySelection('marriage')}
          isSelected={selectedCategory === 'marriage'}
        />
        <CategoryButton
          title="Meme"
          onPress={() => handleCategorySelection('meme')}
          isSelected={selectedCategory === 'meme'}
        />
        <CategoryButton
          title="General"
          onPress={() => handleCategorySelection('general')}
          isSelected={selectedCategory === 'general'}
        />
        <CategoryButton
          title="Potential"
          onPress={() => handleCategorySelection('potential')}
          isSelected={selectedCategory === 'potential'}
        />
      </View>
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
        disabled={!title || !content || !selectedCategory} // Disable button if title, content, or category is empty
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
    flexDirection: 'row',
    justifyContent: 'space-between',
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

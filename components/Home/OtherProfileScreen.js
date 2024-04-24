import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, query, collection, where, getDocs } from 'firebase/firestore';
import { auth } from '../firebase/firebaseconfig';
import { createChat } from '../firebase/firebaseconfig'; 


const db = getFirestore();

const OtherProfileScreen = ({ route }) => {
  const { userProfile } = route.params;
  const navigation = useNavigation();
  const [userPosts, setUserPosts] = useState([]); // State to hold the user's posts

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const fetchUserPosts = async () => {
    try {
      const postsQuery = query(
        collection(db, 'posts'),
        where('userId', '==', userProfile.userId)
      );
      const postsSnapshot = await getDocs(postsQuery);
      const postsData = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUserPosts(postsData);
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('PostDetailsScreen', { postId: item.id })}>
      <View style={styles.postContainer}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.caption}>{item.content}</Text>
        {/* Render other post details like likes, dislikes, etc. */}
      </View>
    </TouchableOpacity>
  );
  
  const handleMessagePress = async () => {
    try {
      const { userId, username } = userProfile;

      if (!userId || !auth.currentUser.uid) {
        throw new Error('User ID is missing.');
      }

      const chatId = await getOrCreateChatId(auth.currentUser.uid, userId);

      // Navigate to the ChatScreen with the chat's ID and username
      navigation.navigate('ChatScreen', { chatId, username });
    } catch (error) {
      console.error('Error navigating to chat:', error);
      alert('Error starting chat. Please try again.');
    }
  };

  const getOrCreateChatId = async (userId1, userId2) => {
    const participants = [userId1, userId2].sort().join('-'); // Create a unique key for the participants
    
    const existingChatQuery = query(
      collection(db, 'chats'),
      where('participantsKey', '==', participants)
    );
    
    const existingChatSnapshot = await getDocs(existingChatQuery);
    
    if (!existingChatSnapshot.empty) {
      return existingChatSnapshot.docs[0].id;
    }
    
    const chatId = await createChat(userId1, userId2);
    return chatId;
  };

  return (
    <View style={styles.container}>
      <Text>Username: {userProfile.username}</Text>
      <Text>Email: {userProfile.email}</Text>
      <Text>Hashtag: {userProfile.hashtag}</Text>
      <Text>Quote: {userProfile.quote}</Text>
      
      {/* Button to trigger handleMessagePress */}
      <Button title="Message" onPress={handleMessagePress} />

      {/* Display user's posts */}
      <FlatList
        data={userPosts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  postContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 5,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  postContent: {
    fontSize: 16,
  },
});

export default OtherProfileScreen;

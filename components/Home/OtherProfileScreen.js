import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, query, collection, where, getDocs } from 'firebase/firestore';
import { createChat } from '../firebase/firebaseconfig';
import { auth } from '../firebase/firebaseconfig';

const db = getFirestore();

const OtherProfileScreen = ({ route }) => {
  const { userProfile } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    // Cleanup function
    return () => {
      // Here, you can unsubscribe from any active Firestore subscriptions
      // For example, if you have a subscription to listen for new messages, unsubscribe here
      // If you are using `onSnapshot` or `getDocs` with `getDocsListener`, you can call `unsubscribe()` on those
    };
  }, []);

  // Function to create or get chat ID between two users
  const getOrCreateChatId = async (userId1, userId2) => {
    const participants = [userId1, userId2].sort().join('-'); // Create a unique key for the participants
    
    // Check for an existing chat where both users are participants
    const existingChatQuery = query(
      collection(db, 'chats'),
      where('participantsKey', '==', participants)
    );
    
    const existingChatSnapshot = await getDocs(existingChatQuery);
    
    if (!existingChatSnapshot.empty) {
      // If an existing chat is found, return the existing chat's ID
      return existingChatSnapshot.docs[0].id;
    }
    
    // If no existing chat is found, create a new chat between the two users
    const chatId = await createChat(userId1, userId2);
    return chatId;
  };
  

  // Updated handleMessagePress function
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

  return (
    <View style={styles.container}>
      <Text>Username: {userProfile.username}</Text>
      <Text>Email: {userProfile.email}</Text>
      <Text>Hashtag: {userProfile.hashtag}</Text>
      <Text>Quote: {userProfile.quote}</Text>
      
      {/* Button to trigger handleMessagePress */}
      <Button title="Message" onPress={handleMessagePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default OtherProfileScreen;

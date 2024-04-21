import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, query, collection, where, getDocs } from 'firebase/firestore';
import { createChat } from '../firebase/firebaseconfig';
import { auth } from '../firebase/firebaseconfig';

const db = getFirestore();

const OtherProfileScreen = ({ route }) => {
  const { userProfile } = route.params;
  const navigation = useNavigation();

  const handleMessagePress = async () => {
    try {
      const { userId, username } = userProfile;
  
      if (!userId || !auth.currentUser.uid) {
        throw new Error('User ID is missing.');
      }
  
      const participants = [auth.currentUser.uid, userId].sort(); // Sort participant IDs
  
      // Check for an existing chat where both users are participants
      const existingChatQuery = query(
        collection(db, 'chats'),
        where('participants', '==', participants)
      );
  
      const existingChatSnapshot = await getDocs(existingChatQuery);
  
      if (!existingChatSnapshot.empty) {
        // If an existing chat is found, navigate to the ChatScreen with the existing chat's ID and username
        const existingChat = existingChatSnapshot.docs[0];
        navigation.navigate('ChatScreen', { chatId: existingChat.id, username });
        return;
      }
  
      // If no existing chat is found, create a new chat between the current user and the selected user
      const chatId = await createChat(auth.currentUser.uid, userId);
  
      // Navigate to the ChatScreen with the new chat's ID and username
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

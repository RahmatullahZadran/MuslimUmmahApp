import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, query, where, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { firebaseApp } from '../firebase/firebaseconfig';
import { getAuth } from 'firebase/auth';

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

const MessageScreen = () => {
  const navigation = useNavigation();
  const [chats, setChats] = useState([]);
  const [lastSeenTimestamp, setLastSeenTimestamp] = useState(null);

  useEffect(() => {
    console.log('Fetching chats for user:', auth.currentUser.uid);
  
    const unsubscribe = onSnapshot(
      query(collection(db, 'chats'), where('participants', 'array-contains', auth.currentUser.uid)),
      async (querySnapshot) => {
        const fetchedChats = [];
  
        for (const docRef of querySnapshot.docs) {
          const chatData = docRef.data();
          const otherUserId = chatData.participants.find(uid => uid !== auth.currentUser.uid);
  
          if (otherUserId) {
            const userDoc = await getDoc(doc(db, 'users', otherUserId));
            const userData = userDoc.data();
            fetchedChats.push({
              id: docRef.id,
              username: userData.username,
              lastMessage: chatData.lastMessage,
              unreadCount: chatData.unreadCount || 0,
            });
          }
        }
  
        // Sort chats based on unreadCount in descending order
        fetchedChats.sort((a, b) => b.unreadCount - a.unreadCount);
  
        setChats(fetchedChats);
      },
      (error) => {
        console.error('Error fetching chats:', error);
      }
    );
  
    return () => {
      console.log('Cleaning up chats subscription');
      unsubscribe();
    };
  }, []);
  
  

  useEffect(() => {
    console.log('Fetching user data for UID:', auth.currentUser.uid);

    const unsubscribe = onSnapshot(doc(db, 'users', auth.currentUser.uid), (doc) => {
      if (doc.exists()) {
        console.log('User data fetched:', doc.data());
        setLastSeenTimestamp(doc.data().lastSeen ? doc.data().lastSeen.toDate() : null);
      } else {
        console.log('User document does not exist');
      }
    }, (error) => {
      console.error('Error fetching user data:', error);
    });

    return () => {
      console.log('Cleaning up user data subscription');
      unsubscribe();
    };
  }, [auth.currentUser.uid]);

  const renderItem = ({ item }) => {
    const lastMessageTimestamp = item.lastMessage?.timestamp?.toDate();
    const lastSeenTimestamp = auth.currentUser.lastSeen?.toDate(); // Assuming lastSeen is a field in the user document
  
    console.log('Last Message Timestamp:', lastMessageTimestamp);
    console.log('Last Seen Timestamp:', lastSeenTimestamp);
  
    const isUpToDate = lastMessageTimestamp && lastSeenTimestamp ? lastMessageTimestamp <= lastSeenTimestamp : false;
  
    console.log('Is Up To Date:', isUpToDate);
  
    return (
      <TouchableOpacity 
        style={[
          styles.chatItem, 
          { backgroundColor: isUpToDate ? '#4caf50' : '#ff5252' }
        ]} 
        onPress={() => navigation.navigate('ChatScreen', { chatId: item.id, username: item.username })}
      >
        <Text style={styles.chatUsername}>{item.username}</Text>
        {item.unreadCount > 0 && (
          <View style={styles.unreadIndicator}>
            <Text style={styles.unreadText}>{item.unreadCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };
  
  
  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.chatsContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  chatsContainer: {
    flexGrow: 1,
  },
  chatItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chatUsername: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  unreadIndicator: {
    backgroundColor: 'red',
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  unreadText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MessageScreen;

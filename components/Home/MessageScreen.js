import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, query, where, onSnapshot, doc, getDoc, getDocs } from 'firebase/firestore';
import { firebaseApp } from '../firebase/firebaseconfig';
import { getAuth } from 'firebase/auth';

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

const MessageScreen = () => {
  const navigation = useNavigation();
  const [chats, setChats] = useState([]);
  const [lastSeenTimestamp, setLastSeenTimestamp] = useState(null);

  useEffect(() => {
    const fetchChatsAndMessages = async (docs) => {
      const newChats = [];

      await Promise.all(docs.map(async (docRef) => {
        const chatData = docRef.data();

        const otherUserId = chatData.participants.find(uid => uid !== auth.currentUser.uid);

        if (otherUserId) {
          const userDoc = await getDoc(doc(db, 'users', otherUserId));
          const userData = userDoc.data();

          // Fetch messages for the current chat
          const messagesQuery = query(collection(db, 'chats', docRef.id, 'messages'));
          const messagesSnapshot = await getDocs(messagesQuery);
          const messagesData = messagesSnapshot.docs.map(doc => doc.data());

          // Find the latest message based on timestamp
          const latestMessage = messagesData.reduce((prev, current) => (
            prev.timestamp?.toDate() > current.timestamp?.toDate() ? prev : current
          ), {});

          newChats.push({
            id: docRef.id,
            username: userData.username,
            lastMessage: latestMessage,
            unreadCount: chatData.unreadCount || 0,
          });
        }
      }));

      // Filter down the chats if needed
      const filteredChats = newChats.filter(chat => chat.lastMessage && chat.lastMessage.timestamp);

      // Merge new chats with existing chats (local data)
      setChats(prevChats => [...filteredChats, ...prevChats]);

      // Sort chats based on the latest message timestamp in descending order
      setChats(prevChats => prevChats.sort((a, b) => {
        const aTimestamp = a.lastMessage?.timestamp?.toDate() || new Date(0);
        const bTimestamp = b.lastMessage?.timestamp?.toDate() || new Date(0);
        return bTimestamp - aTimestamp;
      }));
    };

    const unsubscribe = onSnapshot(
      query(collection(db, 'chats'), where('participants', 'array-contains', auth.currentUser.uid)),
      (querySnapshot) => {
        fetchChatsAndMessages(querySnapshot.docs);
      },
      (error) => {
        console.error('Error fetching chats:', error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'users', auth.currentUser.uid), (doc) => {
      if (doc.exists()) {
        setLastSeenTimestamp(doc.data().lastSeen ? doc.data().lastSeen.toDate() : null);
      }
    }, (error) => {
      console.error('Error fetching user data:', error);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const renderItem = ({ item }) => {
    const lastMessageTimestamp = item.lastMessage?.timestamp?.toDate();
    const lastSeenTimestampValue = lastSeenTimestamp?.toDate();
    const isUpToDate = lastMessageTimestamp && lastSeenTimestampValue ? lastMessageTimestamp <= lastSeenTimestampValue : false;

    return (
      <TouchableOpacity 
        style={[
          styles.chatItem, 
          { backgroundColor: isUpToDate ? '#4caf50' : item.unreadCount > 0 ? '#ff5252' : '#fff' }
        ]} 
        onPress={() => navigation.navigate('ChatScreen', { chatId: item.id, username: item.username })}
      >
        <Text style={styles.chatUsername}>{item.username}</Text>
        {item.unreadCount > 0 && (
          <View style={styles.unreadIndicator}>
            <Text style={styles.unreadText}>{item.unreadCount}</Text>
          </View>
        )}
        <Text>{item.lastMessage ? item.lastMessage.content : 'No messages'}</Text>
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

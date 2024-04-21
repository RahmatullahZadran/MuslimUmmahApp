import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Button, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getFirestore, doc, collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, updateDoc } from 'firebase/firestore';
import { firebaseApp } from '../firebase/firebaseconfig';
import { getAuth } from 'firebase/auth';

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

const ChatScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { chatId, username: receivingUsername } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');
  const [userIds, setUserIds] = useState([]);
  const flatListRef = useRef(null);

  useEffect(() => {
    console.log('Fetching messages for chat:', chatId);

    const unsubscribe = onSnapshot(
      query(collection(db, 'chats', chatId, 'messages'), orderBy('timestamp')),
      (querySnapshot) => {
        const fetchedMessages = [];
        querySnapshot.forEach((doc) => {
          fetchedMessages.push({ id: doc.id, ...doc.data() });
        });
        setMessages(fetchedMessages);
        scrollToBottom();
      },
      (error) => {
        console.error('Error fetching messages:', error);
      }
    );

    return () => {
      console.log('Cleaning up messages subscription');
      unsubscribe();
    };
  }, [chatId]);

  useEffect(() => {
    console.log('Fetching user data for UID:', auth.currentUser.uid);

    const unsubscribe = onSnapshot(doc(db, 'users', auth.currentUser.uid), (doc) => {
      if (doc.exists()) {
        console.log('User data fetched:', doc.data());
        setUsername(doc.data().username);
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

  useEffect(() => {
    console.log('Fetching all user IDs');

    const unsubscribe = onSnapshot(collection(db, 'users'), (querySnapshot) => {
      const fetchedUserIds = [];
      querySnapshot.forEach((doc) => {
        fetchedUserIds.push(doc.id);
      });
      setUserIds(fetchedUserIds);
    }, (error) => {
      console.error('Error fetching user IDs:', error);
    });

    return () => {
      console.log('Cleaning up user IDs subscription');
      unsubscribe();
    };
  }, []);

  const scrollToBottom = () => {
    flatListRef.current.scrollToEnd({ animated: true });
  };

  const handleSend = async () => {
    if (!newMessage.trim()) {
      return;
    }

    try {
      await addDoc(collection(db, 'chats', chatId, 'messages'), {
        content: newMessage,
        senderId: auth.currentUser.uid,
        timestamp: serverTimestamp(),
        unread: true,
      });
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={[styles.messageContainer, { alignSelf: item.senderId === auth.currentUser.uid ? 'flex-end' : 'flex-start' }]}>
      <Text style={[styles.messageText, { backgroundColor: item.senderId === auth.currentUser.uid ? '#e0e0e0' : '#4caf50' }]}>
        {item.content}
      </Text>
      {index === messages.length - 1 && item.unread && (
        <Text style={styles.unreadIndicator}>Unread</Text>
      )}
      <Text style={styles.timestamp}>
        {item.timestamp?.toDate().toLocaleTimeString()}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>{receivingUsername}</Text>
      </View>
      
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.messagesContainer}
        onContentSizeChange={scrollToBottom}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <Button title="Send" onPress={handleSend} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  messagesContainer: {
    flexGrow: 1,
    padding: 10,
  },
  messageContainer: {
    maxWidth: '80%',
    marginVertical: 5,
  },
  messageText: {
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
  },
  unreadIndicator: {
    fontSize: 12,
    color: 'red',
    marginTop: 5,
  },
  timestamp: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
  },
});

export default ChatScreen;

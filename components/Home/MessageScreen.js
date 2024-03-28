import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MessageScreen = () => {
  const navigation = useNavigation();

  const navigateToChat = (threadId) => {
    navigation.navigate('Chat', { threadId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Messenger Threads</Text>
      <TouchableOpacity style={styles.thread} onPress={() => navigateToChat(1)}>
        <Text>Thread 1</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.thread} onPress={() => navigateToChat(2)}>
        <Text>Thread 2</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.thread} onPress={() => navigateToChat(3)}>
        <Text>Thread 3</Text>
      </TouchableOpacity>
      {/* Add more threads as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  thread: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default MessageScreen;

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, getDocs, where, query, addDoc } from 'firebase/firestore';
import { auth } from '../firebase/firebaseconfig';


const db = getFirestore();

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null); 
  const [userPosts, setUserPosts] = useState([]); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        setUser(currentUser);
        fetchUserPosts(currentUser.uid);
      } else {
        navigation.navigate('SignInScreen');
      }
    });

    return unsubscribe;
  }, []);

  const fetchUserPosts = async (userId) => {
    setLoading(true);
    try {
      console.log('Fetching posts for userId:', userId); // Debug log
      const q = query(collection(db, 'posts'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        console.log('No matching documents for userId:', userId); // Debug log
        setLoading(false);
        return;
      }
      const fetchedUserPosts = [];
      querySnapshot.forEach(doc => {
        const data = doc.data();
        const timestamp = data.timestamp ? data.timestamp.toDate() : null;
        fetchedUserPosts.push({ id: doc.id, ...data, timestamp });
      });
      fetchedUserPosts.sort((a, b) => b.timestamp - a.timestamp);
      setUserPosts(fetchedUserPosts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user posts: ', error);
      setLoading(false);
    }
  };
  

  const addPost = async (title, content, category) => {
    try {
      const currentUser = auth.currentUser;
      const post = {
        title,
        content,
        category,
        timestamp: new Date(),
        userId: currentUser.uid,
        // Add other fields like comments, likes, etc.
      };
      const docRef = await addDoc(collection(db, 'posts'), post);
      console.log("Post added with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding post: ", error);
    }
  };

  const handleProfileEdit = () => {
    navigation.navigate('EditProfileScreen', { user });
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigation.navigate('SignInScreen');
    }).catch(error => {
      console.error("Error signing out: ", error);
    });
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
  

  if (!user) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      {user && (
        <>
          <View style={styles.profileHeader}>
            <Image
              source={{ uri: user.photoURL }}
              style={styles.profileImage}
            />
            <Text style={styles.username}>{user.displayName}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>
          <FlatList
            data={userPosts}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ flexGrow: 1, paddingTop: 20 }}
            ListFooterComponent={loading && <ActivityIndicator />}
          />
          <View style={styles.buttonContainer}>
            <Button title="Edit Profile" onPress={handleProfileEdit} />
            <Button title="Logout" onPress={handleLogout} />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  buttonContainer: {
    marginTop: 20,
  },
  postContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 12,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  caption: {
    fontSize: 15,
  },
});

export default ProfileScreen;

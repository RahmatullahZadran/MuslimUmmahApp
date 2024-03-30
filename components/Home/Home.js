  import React, { useState, useEffect } from 'react';
  import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
  import { Ionicons } from '@expo/vector-icons';
  import { useNavigation } from '@react-navigation/native';
  import { getFirestore, collection, getDocs, query, limit } from 'firebase/firestore'; // Corrected imports
  import { firebaseApp } from '../firebase/firebaseconfig';

  const db = getFirestore(firebaseApp);

  const Home = () => {
    const navigation = useNavigation();
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1); // Track current page
    const [loading, setLoading] = useState(false); // Track loading state

    useEffect(() => {
      const fetchPosts = async () => {
        setLoading(true);
        try {
          const q = query(collection(db, 'posts'), limit(page * 15)); // Corrected query construction
          const querySnapshot = await getDocs(q);
          const fetchedPosts = [];
          querySnapshot.forEach(doc => {
            const data = doc.data();
            const timestamp = data.timestamp ? data.timestamp.toDate() : null;
            fetchedPosts.push({ id: doc.id, ...data, timestamp });
          });
          fetchedPosts.sort((a, b) => b.timestamp - a.timestamp);
          setPosts(fetchedPosts);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching posts: ', error);
          setLoading(false);
        }
      };
      fetchPosts();
    }, [page]);

    const handleEndReached = () => {
      setPage(page => page + 1); // Load more when end is reached
    };

    const renderItem = ({ item }) => (
      <TouchableOpacity onPress={() => navigation.navigate('CommentScreen', { postId: item.id })}>
        <View style={styles.postContainer}>
          <View style={styles.postHeader}>
            <Ionicons name="person-circle-outline" size={24} color="black" style={styles.avatar} />
            <Text style={styles.username}>{item.displayName}</Text>
          </View>
          <Text style={styles.postTitle}>{item.title}</Text>
          <Text style={styles.caption}>{item.content}</Text>
          <Text style={styles.likes}>{item.likes} Likes</Text>
          {item.imageUrl && (
            <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
          )}
        </View>
      </TouchableOpacity>
    );

    return (
      <View style={styles.container}>
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5} // Load more when 50% of the content is scrolled
          ListFooterComponent={loading && <ActivityIndicator />} // Optionally show loading indicator
        />
        <View style={styles.header}>
          <Text style={styles.logo}>MuslimUmmah</Text>
          <View style={styles.iconsContainer}>
            <Ionicons
              name="person-outline"
              size={24}
              color="black"
              style={styles.icon}
              onPress={() => navigation.navigate('ProfileScreen')}
            />
            <Ionicons
              name="add-circle-outline"
              size={24}
              color="black"
              style={styles.icon}
              onPress={() => navigation.navigate('CreatePostScreen')}
            />
            <Ionicons
              name="chatbubble-outline"
              size={24}
              color="black"
              style={styles.icon}
              onPress={() => navigation.navigate('MessageScreen')}
            />
          </View>
        </View>
      </View>
    );
  };





  const styles = StyleSheet.create({
    container: {
      flex: 0,
      backgroundColor: '#fff',
      width: 381,
      height: 700,
      marginTop: 370,
    },
    header: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: '#f3f6fa',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      alignItems: 'center',
      zIndex: 1,
    },
    logo: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'left',
      marginLeft: -200,
      marginBottom: -25,
    },
    iconsContainer: {
      flexDirection: 'row',
      alignItems: 'end',
      marginLeft: 250,
      marginBottom: 5,
      marginTop: -5,
    },
    icon: {
      marginHorizontal: 10,
    },
    scrollContent: {
      paddingTop: 80,
    },
    postContainer: {
      backgroundColor: '#fff',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 12,
      marginBottom: 12,
    },
    postHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    avatar: {
      width: 30,
      height: 30,
      borderRadius: 15,
      marginRight: 8,
    },
    username: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    postImage: {
      width: '100%',
      height: 200,
      marginBottom: 8,
    },
    likes: {
      fontWeight: 'bold',
      marginBottom: 4,
    },
    caption: {},
  });

  export default Home;

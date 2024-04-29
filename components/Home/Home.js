import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, getDocs, query, where, limit } from 'firebase/firestore'; // Corrected imports
import { firebaseApp } from '../firebase/firebaseconfig';

const db = getFirestore(firebaseApp);

const renderLikesAndDislikes = (item) => {
  return (
    <View style={styles.likesContainer}>
      <View style={styles.likesCountContainer}>
        <Ionicons name="thumbs-up-outline" size={18} color="blue" style={styles.icon} />
        <Text style={styles.likes}>{item.likes}</Text>
      </View>
      <View style={styles.likesCountContainer}>
        <Ionicons name="thumbs-down-outline" size={18} color="red" style={styles.icon} />
        <Text style={styles.likes}>{item.dislikes}</Text>
      </View>
    </View>
  );
};

const Home = () => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1); // Track current page
  const [loading, setLoading] = useState(false); // Track loading state

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, 'posts'), where('status', '==', 'approved'), limit(page * 15)); // Filter approved posts
        const querySnapshot = await getDocs(q);
        const fetchedPosts = [];
        querySnapshot.forEach(doc => {
          const data = doc.data();
          const timestamp = data.timestamp ? data.timestamp.toDate() : null;
          fetchedPosts.push({ id: doc.id, ...data, timestamp, truncatedContent: truncateContent(data.content) });
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

  const truncateContent = (content) => {
    // Split content into sentences
    const sentences = content.split(/[.!?]/);
    // Take first 5 sentences and join them back
    const truncatedContent = sentences.slice(0, 5).join('. ') + '.';
    return truncatedContent;
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => navigation.navigate('PostDetailsScreen', { postId: item.id })}>
      <View style={[styles.postContainer, index !== 0 && styles.postContainerMarginTop]}>
        <View style={styles.postHeader}>
          <Ionicons name="person-circle-outline" size={24} color="black" style={styles.avatar} />
          <Text style={styles.username}>{item.displayName}</Text>
          <Text style={styles.category}>{item.category}</Text>
        </View>
        <Text style={styles.postTitle}>{item.title}</Text>
        <View style={styles.contentContainer}>
          <Text style={styles.caption}>{item.truncatedContent}</Text>
          <TouchableOpacity style={styles.expandButton} onPress={() => navigation.navigate('PostDetailsScreen', { postId: item.id })}>
            {/* <Text style={styles.expandText}>Read More</Text> */}
          </TouchableOpacity>
        </View>
        {renderLikesAndDislikes(item)}

        <Text style={styles.timestamp}>{item.timestamp ? item.timestamp.toLocaleDateString() : ''}</Text>

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
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading && <ActivityIndicator />}
        contentContainerStyle={{ paddingBottom: 50 }} // Adjust the padding to ensure the last item is not hidden behind the navigation bar
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
    flex: 1,
    backgroundColor: '#fff',
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
  postContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 12,
    marginHorizontal: 10,
    marginTop:60,
  },
  postContainerMarginTop: {
    marginTop: 0,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    marginTop: -10,
  },
  category: {
    fontSize: 19,
    color: '#999',
    marginLeft: 35,
    backgroundColor: 'blue',
    color: 'white',
    padding: 5,
    borderRadius: 5,
  },
  avatar: {
    width: 40,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  username: {
    fontSize: 17,
    fontWeight: 'bold',
    width: 170,
  
    // backgroundColor: 'blue',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
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
  caption: {
    fontSize: 15,
    width: 300,
    marginLeft: 20,
  },
  likesContainer: {
    flexDirection: 'row',
    marginLeft: 250,
    marginTop: 25,
    marginBottom: -25,
  },
  contentContainer: {
    height: 60, // Set the fixed height for the content
  },
  expandButton: {
    marginTop: 8,
  },
  expandText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default Home;

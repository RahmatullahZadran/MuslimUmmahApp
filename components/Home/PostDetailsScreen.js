import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getFirestore, doc, getDoc, collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { firebaseApp } from '../firebase/firebaseconfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Import Firebase authentication modules

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp); // Initialize Firebase authentication

const PostDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { postId } = route.params;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [username, setUsername] = useState(''); // State to hold the username
  const [repliedCommentId, setRepliedCommentId] = useState(null); // State to track replied comment id
  const [commenting, setCommenting] = useState(false); // State to track commenting status

  const handleReplyToComment = (commentId) => {
    // Toggle repliedCommentId
    setRepliedCommentId(commentId === repliedCommentId ? null : commentId);
  };
  
  
  useEffect(() => {
    // Fetch current user's information when component mounts
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, get the username
        setUsername(user.displayName);
      } else {
        // User is not signed in
        setUsername('Anonymous'); // Set default username if user is not signed in
      }
    });

    // Fetch post details and comments
    fetchPostDetails();
    fetchComments();

    return unsubscribe; // Cleanup listener
  }, [postId]);

  const fetchPostDetails = async () => {
    try {
      const postDoc = await getDoc(doc(db, 'posts', postId));
      if (postDoc.exists()) {
        const postData = postDoc.data();
        setPost(postData);
      } else {
        console.log('Post not found');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching post details:', error);
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const commentsCollection = collection(db, `posts/${postId}/comments`);
      const snapshot = await getDocs(commentsCollection);
      const commentsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setComments(commentsData);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleAddComment = async () => {
    try {
      const commentsCollectionRef = collection(db, `posts/${postId}/comments`);
      await addDoc(commentsCollectionRef, {
        text: newComment,
        userId: auth.currentUser.uid, // Include the user's ID
        username: username,
        timestamp: serverTimestamp(),
        repliedCommentId: repliedCommentId,
      });
      setNewComment('');
      setRepliedCommentId(null);
      fetchComments();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const navigateToUserProfile = async (clickedUsername) => {
    try {
      const userQuerySnapshot = await getDocs(collection(db, 'users'));
      userQuerySnapshot.forEach(doc => {
        const userData = doc.data();
        if (userData.username === clickedUsername) {
          // Ensure the userProfile object contains the userId
          const userProfile = {
            userId: doc.id,
            ...userData
          };
          navigation.navigate('OtherProfileScreen', { userProfile });
          return; // Stop iteration once user is found and navigated
        }
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.postContainer}>
        <TouchableOpacity onPress={() => navigateToUserProfile(post.username)}>
          <Text style={[styles.username, commenting && styles.smallText]}>{post.displayName}</Text>
        </TouchableOpacity>
        <Text style={[styles.title, commenting && styles.smallText]}>{post.title}</Text>
        <Text style={[styles.content, commenting && styles.smallText]}>{post.content}</Text>
      </ScrollView>
  
      <FlatList
  data={comments.filter(comment => !comment.repliedCommentId)} // Filter out replies
  keyExtractor={(item, index) => item.id}
  renderItem={({ item }) => (
    <TouchableOpacity onPress={() => handleReplyToComment(item.id)}> 
      <View style={[styles.commentContainer, repliedCommentId === item.id && styles.repliedCommentContainer]}>
        {/* Username at the top in bold */}
        <TouchableOpacity onPress={() => navigateToUserProfile(item.username)}>
          <Text style={[styles.commentUsername, styles.boldText]}>{item.username}</Text>
        </TouchableOpacity>
        <Text>{item.text}</Text>
        {item.timestamp && (
          <Text style={styles.commentTimestamp}>
            {item.timestamp.toDate().toString()}
          </Text>
        )}
        {/* Show number of replies */}
        {comments.filter(reply => reply.repliedCommentId === item.id).length > 0 && (
          <Text style={styles.repliesCount}>
            {comments.filter(reply => reply.repliedCommentId === item.id).length} replies
          </Text>
        )}
      </View>
      {/* Display replies */}
      {repliedCommentId === item.id && (
        <View style={[styles.commentContainer, styles.repliedCommentContainer]}>
          <Text style={styles.repliedCommentText}>Replies:</Text>
          {/* Map through replies and display them */}
          {comments.map((reply) => {
            if (reply.repliedCommentId === item.id) {
              return (
                <View style={styles.replyContainer} key={reply.id}>
                  {/* Username at the top in bold */}
                  <TouchableOpacity onPress={() => navigateToUserProfile(reply.username)}>
                    <Text style={[styles.commentUsername, styles.boldText]}>{reply.username}</Text>
                  </TouchableOpacity>
                  <Text>{reply.text}</Text>
                  {reply.timestamp && (
                    <Text style={styles.commentTimestamp}>
                      {reply.timestamp.toDate().toString()}
                    </Text>
                  )}
                </View>
              );
            }
          })}
        </View>
      )}
    </TouchableOpacity>
  )}
/>



  
      <View style={styles.commentFormContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment..."
          value={newComment}
          onChangeText={setNewComment}
          onFocus={() => setCommenting(true)}
          onBlur={() => setCommenting(false)}
        />
        <Button title="Comment" onPress={handleAddComment} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    fontWeight: 'bold',
    
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 1,
    textAlign: 'center',
  },
  content: {
    fontSize: 16,
    marginBottom: 20,
  },
  postContainer: {
    flexGrow: 1,
    paddingBottom: 20, // Adjust as needed
  },
  commentContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 5,
  },
  commentFormContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  commentInput: {
    flex: 1,
    marginRight: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  repliedCommentContainer: {
    backgroundColor: '#f9f9f9',
    padding: 5,
    marginLeft: 20, // Indent replied comment
  },
  repliedCommentText: {
    fontStyle: 'italic',
    color: '#777',
  },
  smallText: {
    fontSize: 14,
  },
});

export default PostDetailsScreen;

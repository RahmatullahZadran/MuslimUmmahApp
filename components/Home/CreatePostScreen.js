// import { getAuth } from 'firebase/auth'; // Import getAuth to access the authentication state

// const auth = getAuth(); // Initialize Firebase Auth

// const CreatePostScreen = () => {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleCreatePost = async () => {
//     try {
//       setLoading(true);
//       setError('');

//       const user = auth.currentUser;
//       if (user) {
//         const userId = user.uid; // Get the Firebase user ID
//         await addPostToFirestore(title, content, userId); // Pass the user ID to addPostToFirestore
//         setTitle('');
//         setContent('');
//       } else {
//         throw new Error('User not authenticated');
//       }
//     } catch (error) {
//       console.error('Error creating post: ', error);
//       setError('Failed to create post');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View>
//       <TextInput
//         placeholder="Enter title"
//         value={title}
//         onChangeText={setTitle}
//       />
//       <TextInput
//         placeholder="Enter content"
//         value={content}
//         onChangeText={setContent}
//       />
//       <Button
//         title="Create Post"
//         onPress={handleCreatePost}
//         disabled={loading || !title || !content}
//       />
//       {error ? <Text>{error}</Text> : null}
//     </View>
//   );
// };

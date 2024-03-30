import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { firebaseApp } from '../firebase/firebaseconfig';

const db = getFirestore(firebaseApp);

const addPostToFirestore = async (title, content, userId) => {
  try {
    const docRef = await addDoc(collection(db, 'posts'), {
      title,
      content,
      userId,
      createdAt: new Date(),
    });
    console.log('Post added with ID: ', docRef.id);
    return docRef.id; // Return the ID of the newly created post
  } catch (error) {
    console.error('Error adding post: ', error);
    throw error;
  }
};

export { addPostToFirestore };

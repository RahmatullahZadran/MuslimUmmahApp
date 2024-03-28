import React from 'react';
import { StyleSheet, View, ScrollView, Image, Text, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


    
  


const postsData = [
  {
    id: '1',
    username: 'Username1',
    likes: 100,
    caption: 'Caption goes here 1',
    imageUrl: 'https://via.placeholder.com/400',
  },
  {
    id: '2',
    username: 'Username2',
    likes: 150,
    caption: 'Caption goes here 2',
    imageUrl: 'https://via.placeholder.com/400',
  },
  {
    id: '3',
    username: 'Username3',
    likes: 100,
    caption: 'Caption goes here 1',
    imageUrl: 'https://via.placeholder.com/400',
  },
  {
    id: '4',
    username: 'Username4',
    likes: 150,
    Title: 'Caption goes here 2',
    Content : 'Caption goes here 2',
    
  },
  // Add more post data as needed
];



const Home = () => {
    const navigation = useNavigation();
  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
    <View style={styles.contentContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content}>{item.content}</Text>
      {item.imageUrl && (
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.postImage}
        />
      )}
    </View>
  </View>
);

  
    return (
        <View style={styles.container}>
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
          <FlatList
            data={postsData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.scrollContent}
          />
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
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'end',

  },
  icon: {
    marginHorizontal: 10,
    marginRight: 0,
   
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
    marginRight: 15,
   
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
    //align to the start
    textAlign: 'left',
    marginLeft: -200,
    marginBottom: -25,
   
  },
  scrollContent: {
    paddingTop: 80, 
  },
  postContainer: {
    marginBottom: 20,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
  },
  postImage: {
    height: 400,
    resizeMode: 'cover',
  },
  postFooter: {
    paddingHorizontal: 10,
  },
  likes: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  caption: {
    marginBottom: 5,
  },
  postContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  contentContainer: {
    marginBottom: 8,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
  postFooter: {},
  likes: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  caption: {},
});

export default Home;

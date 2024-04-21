import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import Homescreen from './components/navbar/homescreen'; 
import FajrScreen from './components/navbar/FajrScreen';
import DhuhrScreen from './components/navbar/DhuhrScreen';
import AsrScreen from './components/navbar/AsrScreen';
import MaghribScreen from './components/navbar/MaghribScreen';
import IshaScreen from './components/navbar/IshaScreen';
import SurahDetailScreen from './components/Quran/SurahDetailScreen';
import CreatePostScreen from './components/Home/CreatePost';
import ProfileScreen from './components/Home/ProfileScreen';
import MessageScreen from './components/Home/MessageScreen';
import SignInScreen from './components/Home/SignInScreen'; 
import SignUpScreen from './components/Home/SignUpScreen';
import EditProfileScreen from './components/Home/EditProfileScreen';
import PostDetailsScreen from './components/Home/PostDetailsScreen';
import OtherProfileScreen from './components/Home/OtherProfileScreen';
import ChatScreen from './components/Home/ChatScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Homescreen" component={Homescreen} options={{ headerShown: false }} />
        <Stack.Screen name="FajrScreen" component={FajrScreen} options={{ title: 'Fajr Screen' }} />
        <Stack.Screen name="DhuhrScreen" component={DhuhrScreen} options={{ title: 'Dhuhr Screen' }} />
        <Stack.Screen name="AsrScreen" component={AsrScreen} options={{ title: 'Asr Screen' }} />
        <Stack.Screen name="MaghribScreen" component={MaghribScreen} options={{ title: 'Maghrib Screen' }} />
        <Stack.Screen name="IshaScreen" component={IshaScreen} options={{ title: 'Isha Screen' }} />
        <Stack.Screen name="home" component={IshaScreen} options={{ title: 'Isha Screen' }} />
        <Stack.Screen name="PostDetailsScreen" component={PostDetailsScreen} options={{ title: 'Post Details' }} />
        <Stack.Screen name="OtherProfileScreen" component={OtherProfileScreen} />

        <Stack.Screen 
          name="ChatScreen" 
          component={ChatScreen} 
          options={({ route }) => ({ title: route.params.username || 'Chat' })}
        />

        <Stack.Screen name="CreatePostScreen" component={CreatePostScreen} options={{ title: 'Create Post' }} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'Profile' }} />
        <Stack.Screen name="MessageScreen" component={MessageScreen} options={{ title: 'Messages' }} />
        <Stack.Screen name="SignInScreen" component={SignInScreen} options={{ title: 'Messages' }} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ title: 'Messages' }} />
        <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{ title: 'Edit Profile' }} />

        <Stack.Screen
          name="SurahDetailScreen"
          component={SurahDetailScreen}
          options={{
            title: 'Surah Details',
            headerTintColor: 'blue',
            headerTitleStyle: {
              fontSize: 30,
            },
            headerLeftContainerStyle: {
              paddingLeft: 20,
              backgroundColor: 'red',
            },
            headerBackImage: () => (
              <AntDesign name="leftcircleo" size={30} color="black" />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

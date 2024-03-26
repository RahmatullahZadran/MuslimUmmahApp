import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Homescreen from './components/navbar/homescreen'; 
import FajrScreen from './components/navbar/FajrScreen';
import DhuhrScreen from './components/navbar/DhuhrScreen';
import AsrScreen from './components/navbar/AsrScreen';
import MaghribScreen from './components/navbar/MaghribScreen';
import IshaScreen from './components/navbar/IshaScreen';
import SurahDetailScreen from './components/Quran/SurahDetailScreen';
import { AntDesign } from '@expo/vector-icons';

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
        <Stack.Screen
          name="SurahDetailScreen"
          component={SurahDetailScreen}
          options={{
            title: 'Surah Details', // Change the header title
            headerTintColor: 'blue', 
            
            headerTitleStyle: {
              fontSize: 30, // Customize the font size of the header title
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

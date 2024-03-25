import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Homescreen from './components/navbar/homescreen'; 
import FajrScreen from './components/navbar/FajrScreen';
import DhuhrScreen from './components/navbar/DhuhrScreen';
import AsrScreen from './components/navbar/AsrScreen';
import MaghribScreen from './components/navbar/MaghribScreen';
import IshaScreen from './components/navbar/IshaScreen';



const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer independent = {true}>

      <Stack.Navigator >
        <Stack.Screen name="Homescreen" component={Homescreen} options={{ headerShown: false }} />
        <Stack.Screen name="FajrScreen" component={FajrScreen} />

        
        <Stack.Screen name="DhuhrScreen" component={DhuhrScreen} />
        <Stack.Screen name="AsrScreen" component={AsrScreen} />
        <Stack.Screen name="MaghribScreen" component={MaghribScreen} />
        <Stack.Screen name="IshaScreen" component={IshaScreen} />
      </Stack.Navigator>
    
    </NavigationContainer>
  );
};

export default App;

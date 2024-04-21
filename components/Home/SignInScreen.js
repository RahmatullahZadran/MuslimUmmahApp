import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage from the correct package

const auth = getAuth();

const SignInScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false); // New state for "Keep Me Logged In"

  useEffect(() => {
    AsyncStorage.getItem('userCredentials').then((credentials) => {
      if (credentials) {
        const { email, password, keepLoggedIn } = JSON.parse(credentials);
        setEmail(email);
        setPassword(password);
        setRememberMe(true);
        setKeepLoggedIn(keepLoggedIn); // Set the state of "Keep Me Logged In" from AsyncStorage
      }
    });
  }, []);

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.navigate('ProfileScreen');
        if (rememberMe && keepLoggedIn) { // Store credentials if both "Remember Me" and "Keep Me Logged In" are enabled
          AsyncStorage.setItem('userCredentials', JSON.stringify({ email, password, keepLoggedIn }));
        } else {
          AsyncStorage.removeItem('userCredentials');
        }
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const handleSignUp = () => {
    navigation.navigate('SignUpScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign In</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.checkboxContainer}>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={rememberMe ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={setRememberMe}
          value={rememberMe}
        />
        <Text style={styles.label}>Remember Me</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={keepLoggedIn ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={setKeepLoggedIn}
          value={keepLoggedIn}
        />
        <Text style={styles.label}>Keep Me Logged In</Text>
      </View>
      <View style={styles.buttonContainer}>
      <Button style={styles.button} title="Sign In" onPress={handleSignIn} />
 
      <Button style={styles.button} title="Sign Up" onPress={handleSignUp} />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,

    
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 40,
    
    
  },
 
  header: {
    fontSize: 29,
    fontWeight: 'bold',
    marginBottom: 20,

  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    
    backgroundColor: '#fff',
    
  },
  error: {
    color: 'red',
    marginBottom: 10,

  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    
   
    paddingHorizontal: 10,
    justifyContent: 'space-between',

  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 5,
    margin: 8,

  },
});

export default SignInScreen;

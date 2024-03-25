// Button.js
import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleClick}>
      <Text style={styles.text}>
        {clicked ? 'Clicked!' : 'Click me!'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default Button;

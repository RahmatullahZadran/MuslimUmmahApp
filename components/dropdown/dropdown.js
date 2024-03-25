import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const options = ['Option 1', 'Option 2', 'Option 3'];   

const DropdownMenu = ({ options, onSelect }) => {
  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <TouchableOpacity key={index} onPress={() => onSelect(option)}>
          <Text style={styles.option}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60, // Adjust this value based on your navbar height
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    zIndex: 1,
  },
  option: {
    fontSize: 16,
    paddingVertical: 5,
  },
});

export default DropdownMenu;

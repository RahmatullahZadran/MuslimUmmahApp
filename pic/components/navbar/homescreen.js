import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ImageBackground, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Homescreen = () => {
  const navigation = useNavigation();

  const handleNavigation = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <>
      <Text style={styles.headerText}>Muslim Ummah App</Text>
      
      <ImageBackground
        source={require('../../pic/khaba.jpg')} 
        style={styles.container}
      >
        <TouchableOpacity style={styles.option} onPress={() => handleNavigation('FajrScreen')}>
          <Text style={styles.optionText}>Fajr/Morning</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => handleNavigation('DhuhrScreen')}>
          <Text style={styles.optionText}>Dhuhr/Afternoon</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => handleNavigation('AsrScreen')}>
          <Text style={styles.optionText}>Asr/Evening</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => handleNavigation('MaghribScreen')}>
          <Text style={styles.optionText}>Maghrib/Sunset Prayer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => handleNavigation('IshaScreen')}>
          <Text style={styles.optionText}>Isha/Night</Text>
        </TouchableOpacity>
      </ImageBackground>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerOption} onPress={() => handleNavigation('Option1Screen')}>
          <Text style={styles.footerOptionText}>Prayer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerOption} onPress={() => handleNavigation('Option2Screen')}>
          <Text style={styles.footerOptionText}>Progress</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerOption} onPress={() => handleNavigation('Option3Screen')}>
          <Text style={styles.footerOptionText}>Progress</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerOption} onPress={() => handleNavigation('Option4Screen')}>
          <Text style={styles.footerOptionText}>Progress</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover', 
  },
  option: {
    padding: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 10,
    width: 360,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  optionText: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    backgroundColor: 'black',
    color: 'white',
    padding: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'black',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  footerOption: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontStyle: 'normal',
  
  },
  footerOptionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    
  },
});

export default Homescreen;

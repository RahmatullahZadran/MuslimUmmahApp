import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, ImageBackground, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import Qibla from '../qibla/Qibla';
import Quran from '../Quran/quran';
import Home from '../Home/Home';


const Homescreen = () => {
  const [selectedTab, setSelectedTab] = useState('Home'); // Default tab is 'Prayer'
  const navigation = useNavigation();

  const handleNavigation = (screenName) => {
    navigation.navigate(screenName);
  };

  

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Muslim Ummah App</Text>

      {/* Content section */}
      <View style={styles.contentContainer}>
        {/* Prayer section */}
        {selectedTab === 'Prayer' && (
          <ImageBackground
            // source={require('../../pic/prayer_bg.jpg')}
            style={styles.backgroundImage}
            resizeMode="cover"
          >
            <View style={styles.section}>
              <Text style={styles.sectionText}>Prayer Section</Text>
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
            </View>
          </ImageBackground>
        )}

{selectedTab === 'Home' && (
          <ImageBackground
            // source={require('../../pic/quran_bg.jpg')}
            style={styles.backgroundImage}
            resizeMode="cover"
          >
            <View style={styles.section}>
             
              <Home />
              
            </View>
          </ImageBackground>
        )}



        {/* Qibla section */}
        {selectedTab === 'Quran' && (
          <ImageBackground
            // source={require('../../pic/components/navbar/')}
            style={styles.backgroundImage}
            resizeMode="cover"
          >
            <View style={styles.section}>
              <Text style={styles.sectionText}>Surahs</Text>
              <Quran />
              
            </View>
          </ImageBackground>
        )}

   
        


            {selectedTab === 'Home' && (
          <ImageBackground
            // source={require('../../pic/quran_bg.jpg')}
            style={styles.backgroundImage}
            resizeMode="cover"
          >
            <View style={styles.section}>
              <Text style={styles.sectionText}></Text>
              
            </View>
          </ImageBackground>
        )}
      </View>

      {/* Tab bar */}
      <View style={styles.tabBar}>

      <TouchableOpacity
          style={[styles.tab, selectedTab === 'Home' && styles.selectedTab]}
          onPress={() => setSelectedTab('Home')}
        >
          <Text style={styles.tabText}> Home</Text>
        </TouchableOpacity>
        {/* Prayer tab */}
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Prayer' && styles.selectedTab]}
          onPress={() => setSelectedTab('Prayer')}
        >
          <Text style={styles.tabText}>Prayer</Text>
        </TouchableOpacity>

        {/* Qibla tab */}
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Quran' && styles.selectedTab]}
          onPress={() => setSelectedTab('Quran')}
        >
          <Text style={styles.tabText}>Quran</Text>
        </TouchableOpacity>

        {/* Quran tab */}
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Qibla' && styles.selectedTab]}
          onPress={() => setSelectedTab('Qibla')}
        >
          <Text style={styles.tabText}>Qibla</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 0,
    backgroundColor: 'black',
    color: 'white',
    padding: 10,
  },
  contentContainer: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1, 
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
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
  section: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 25,
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
  },
});

export default Homescreen;

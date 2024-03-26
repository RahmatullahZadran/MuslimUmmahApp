import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Quran = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [surahs, setSurahs] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await fetch('https://api.alquran.cloud/v1/surah');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSurahs(data.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchSurahs();

    return () => {
      // Cleanup function
    };
  }, []);

  const handleSurahPress = async (surah) => {
    try {
      const response = await fetch(`https://api.alquran.cloud/v1/surah/${surah.number}/ar.alafasy`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      navigation.navigate('SurahDetailScreen', { surah: data.data });
    } catch (error) {
      console.error('Error fetching Surah details:', error);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text style={styles.text}>Loading...</Text>
      ) : error ? (
        <Text style={styles.text}>Error: {error.message}</Text>
      ) : (
        <>
          <Text style={styles.header}>List of Surahs </Text>
          <ScrollView style={styles.scrollView}>
            <View style={styles.surahsContainer}>
              {surahs.map((surah) => (
                <TouchableOpacity key={surah.number} onPress={() => handleSurahPress(surah)}>
                  <View key={surah.number} style={styles.surahContainer}>
                    <Text style={styles.surahNumber}>{surah.number}</Text>
                    <View style={styles.surahDetails}>
                      <Text style={styles.surahName2}>{surah.englishName}</Text>
                      <Text style={styles.surahName}>{surah.name}</Text>
                      <Text style={styles.translation}>{surah.englishNameTranslation}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 20,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    width: '300',
  },
  surahsContainer: {
    paddingHorizontal: 10,
    width: 350,
  },
  surahContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  surahNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  surahDetails: {
    flex: 1,
    flexDirection: 'column',
  },
  surahName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  surahName2: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: -25,
  },
  translation: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: -14,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Quran;

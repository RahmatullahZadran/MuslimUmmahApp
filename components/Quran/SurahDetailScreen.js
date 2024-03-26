import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Button } from 'react-native';
import { Audio } from 'expo-av';

const SurahDetailScreen = ({ route }) => {
  const { surah } = route.params;
  const [ayahs, setAyahs] = useState([]);
  const [translation, setTranslation] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sound, setSound] = useState(null);
  const [soundIndex, setSoundIndex] = useState(0);

  useEffect(() => {
    const fetchSurahDetails = async () => {
      try {
        // Fetch Ayahs data
        const response = await fetch(`https://api.alquran.cloud/v1/surah/${surah.number}/ar.alafasy`);
        if (!response.ok) {
          throw new Error('Failed to fetch Ayahs');
        }
        const data = await response.json();
        setAyahs(data.data.ayahs);

        // Fetch English translation
        const translationResponse = await fetch(`https://api.alquran.cloud/v1/surah/${surah.number}/en.asad`);
        if (!translationResponse.ok) {
          throw new Error('Failed to fetch translation');
        }
        const translationData = await translationResponse.json();
        setTranslation(translationData.data.ayahs);

        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchSurahDetails();
  }, [surah]);

  useEffect(() => {
    return sound ? () => { sound.unloadAsync(); } : undefined;
  }, [sound]);

  useEffect(() => {
    if (sound) {
      sound.setOnPlaybackStatusUpdate(status => {
        if (status.didJustFinish && !status.isLooping) {
          playNextAyah();
        }
      });
    }
  }, [sound]);

  const playSound = async (audioUrl, index) => {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
      setSound(sound);
      setSoundIndex(index);
      await sound.playAsync();
    } catch (error) {
      console.error('Failed to load sound', error);
    }
  };

  const pauseSound = async () => {
    if (sound) {
      await sound.pauseAsync();
    }
  };

  const playNextAyah = () => {
    if (soundIndex < ayahs.length - 1) {
      setSoundIndex(prevIndex => prevIndex + 1);
      playSound(ayahs[soundIndex + 1].audio, soundIndex + 1);
    }
  };

  const playPreviousAyah = () => {
    if (soundIndex > 0) {
      setSoundIndex(prevIndex => prevIndex - 1);
      playSound(ayahs[soundIndex - 1].audio, soundIndex - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.surahName}>{surah.englishName}</Text>

      <Text style={styles.translation}>{surah.englishNameTranslation}</Text>
      {isLoading ? (
        <Text style={styles.loading}>Loading...</Text>
      ) : error ? (
        <Text style={styles.error}>Error: {error.message}</Text>
      ) : (
        <>
          <ScrollView style={styles.scrollView}>
            {ayahs.map((ayah, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.ayahContainer,
                  index === soundIndex && { backgroundColor: 'lightblue' },
                ]}
                onPress={() => playSound(ayah.audio, index)}
              >
                <Text style={styles.ayahNumber}>{ayah.numberInSurah}</Text>
                <Text style={styles.ayahText}>{ayah.text}</Text>
                <Text style={styles.translationText}>{translation[index].text}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.controls}>
            <Button title="Pause" onPress={pauseSound} />
            <Button title="Previous" onPress={playPreviousAyah} disabled={soundIndex === 0} />
            <Button title="Next" onPress={playNextAyah} disabled={soundIndex === ayahs.length - 1} />
          </View>
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
  surahName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  translation: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  ayahContainer: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  ayahText: {
    fontSize: 18,
  },
  translationText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: 'gray',
  },
  loading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    width: '100%',
  },
});

export default SurahDetailScreen;

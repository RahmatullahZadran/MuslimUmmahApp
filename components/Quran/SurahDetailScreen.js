import React from 'react';
import { View, Text } from 'react-native';

const SurahDetailScreen = ({ route }) => {
  const { surah } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{`Surah Number: ${surah.number}`}</Text>
      <Text>{`Surah Name: ${surah.name}`}</Text>
      <Text>{`English Name: ${surah.englishName}`}</Text>
      {/* Add more details as needed */}
    </View>
  );
};

export default SurahDetailScreen;

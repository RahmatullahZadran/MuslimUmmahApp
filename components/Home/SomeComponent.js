// SomeComponent.js
import React from 'react';
import { View, Button } from 'react-native';
import { updateUserProfile } from '../Home/UserManager';

const SomeComponent = () => {
  const handleUpdateProfile = () => {
    const userId = 'S2qStwQfLYfk1zx5jsX0';
    const profileData = {
      displayName: 'New Display Name',
      hashtag: '#newhashtag',
      photoURL: 'https://example.com/new-photo.jpg',
      quote: 'New quote here'
    };
    updateUserProfile(userId, profileData);
  };

  return (
    <View>
      <Button title="Update Profile" onPress={handleUpdateProfile} />
    </View>
  );
};

export default SomeComponent;

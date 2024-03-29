// ProfileEditingScreen.js

import React, { useState } from 'react';
import { updateUserProfileInFirestore } from '../Home/UserService';

const ProfileEditingScreen = () => {
  const [displayName, setDisplayName] = useState('');

  const handleSaveChanges = () => {
    // Prepare updated user data
    const updatedData = {
      displayName: displayName,
    };

    // Call the function to update user profile in Firestore
    updateUserProfileInFirestore('S2qStwQfLYfk1zx5jsX0', updatedData)
      .then(() => {
        console.log('User profile updated successfully.');
        // Optionally, navigate to another screen or perform other actions upon successful update
      })
      .catch((error) => {
        console.error('Error updating user profile:', error);
        // Handle error (e.g., show error message to the user)
      });
  };

  return (
    <div>
      <input
        type="text"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <button onClick={handleSaveChanges}>Save Changes</button>
    </div>
  );
};

export default ProfileEditingScreen;

// import React, { useState, useEffect } from 'react';
// import { Text, StyleSheet, View, Button, Alert } from 'react-native';
// import * as Location from 'expo-location';
// import * as Permissions from 'expo-permissions';

// const Qibla = () => {
//   const [qiblaDirection, setQiblaDirection] = useState(null);
//   const [locationPermission, setLocationPermission] = useState(false);

//   useEffect(() => {
//     checkLocationPermission();
//   }, []);

//   const checkLocationPermission = async () => {
//     const { status } = await Permissions.askAsync(Permissions.LOCATION);
//     setLocationPermission(status === 'granted');
//   };

//   const calculateQiblaDirection = async () => {
//     try {
//       const location = await Location.getCurrentPositionAsync({});
//       const userLat = location.coords.latitude;
//       const userLon = location.coords.longitude;
//       const kaabaLat = 21.4225; // Latitude of the Kaaba in Mecca
//       const kaabaLon = 39.8262; // Longitude of the Kaaba in Mecca

//       // Calculation logic here...

//       setQiblaDirection(/* calculated direction */);
//     } catch (error) {
//       Alert.alert('Error', 'Failed to calculate Qibla direction. Please make sure location services are enabled.');
//     }
//   };

//   const handlePermissionRequest = async () => {
//     const { status } = await Permissions.askAsync(Permissions.LOCATION);
//     setLocationPermission(status === 'granted');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.headerText}>Qibla Direction</Text>
//       {!locationPermission && (
//         <Button title="Grant Location Permission" onPress={handlePermissionRequest} />
//       )}
//       {locationPermission && (
//         <Text style={styles.qiblaDirectionText}>
//           {qiblaDirection !== null ? `Qibla Direction: ${qiblaDirection.toFixed(2)}°` : 'Calculating...'}
//         </Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'white', // Set the background color to white to cover the entire screen
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   qiblaDirectionText: {
//     fontSize: 20,
//   },
// });

// export default Qibla;

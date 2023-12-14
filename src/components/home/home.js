import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Image, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import * as Location from "expo-location";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from '@react-navigation/native';

import { Dimensions } from 'react-native';

export const Home = ({ route, nav }) => {
  const { headerText, headerIcon } = route.params || {};
  const navigation = useNavigation();

  const { width, height } = Dimensions.get('window');


  const [currentLocation, setCurrentLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [isScannerVisible, setScannerVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  // For  Searchbar
  const [searchText, setSearchText] = useState('');

  // Restaurant data to be added.
  const [restaurantData, setRestaurantData] = useState([
    { id: 1, 
      name: 'Lee Restaurent',
      imageUri: 'https://cdn.pixabay.com/photo/2018/07/14/15/27/cafe-3537801_1280.jpg',
    },
    { id: 2, 
      name: 'Bose Restaurant ',
      imageUri: 'https://cdn.pixabay.com/photo/2019/02/21/19/00/restaurant-4011989_1280.jpg',
    },
    { id: 3, 
      name: 'R.K Restaurant',
      imageUri: 'https://cdn.pixabay.com/photo/2014/07/15/13/36/coffee-shop-393954_1280.jpg',
    },
  ]);

  // Adding Location, QR Code, Notification and Profile.
  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={handleLocationPress}>
            <Ionicons name="location" size={24} color="gold" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleIconPress('Manually selecting Location')}>
            <AntDesign name="caretdown" size={9} color="black" style={{marginTop: 11}}/>
          </TouchableOpacity>
        </View>
        
      ),
      headerRight: () => (
        <View style={styles.headerRightContainer}>
          <View style={styles.headerRightContainer}>
            <TouchableOpacity onPress={() => handleIconPress('QR Code')}>
              <Ionicons name="qr-code" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.headerRightContainer}>
            <TouchableOpacity onPress={() => handleIconPress('Notification')}>
              <Ionicons name="notifications" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.headerRightContainer}>
            <TouchableOpacity onPress={() => handleIconPress('Profile')}>
              <Ionicons name="person-circle-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      ),
    });
  }, [nav, headerText, currentLocation]);

  //useEffect hook to request camera permissions
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  // function to handle barcode scanning
  const handleBarCodeScanned = ({ type, data }) => {
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
    // Handle the scanned data as needed, e.g., navigate to a different screen
    setScannerVisible(false);
  };


  const handleIconPress = (iconName) => {
    if (iconName === "QR Code") {
      setScannerVisible(true);
    } else {
      // Handle other icon presses
      console.log(`Pressed ${iconName}`);
    }
  };
 
  const handleBackArrowPress = () => {
    setScannerVisible(false);
  };

  const handleLocationPress = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
  
      const location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
  
      // Reverse geocoding to get address details
      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
  
      console.log("Address details:", address);
  
      // Set the address state to trigger a re-render
      setAddress({
        city: address[0]?.city,
        country: address[0]?.country,
      });
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const renderRestaurantItem = ({ item }) => (
   <TouchableOpacity onPress={() => navigateToDetails(item)}>
    <View style={styles.restaurantItem}>
      <View style={styles.restaurantHeader}>
        {/* Restaurant Image */}
        
        <Image
          source={{ uri: item.imageUri }}
          style={styles.restaurantImage}
        />
        </View>
        
        <View style={styles.restaurantInfo}>
          {/* Restaurant Name */}
          <Text style={styles.restaurantName}>{item.name}</Text>
          <Text style={styles.timingsText}>Availalble Days : Monday-Sunday </Text>
          {/* Open and Close Timings */}
          <Text style={styles.timingsText}>Timings: 11:00 AM - 11:00 PM </Text>
          
          {/* Rating component here */}
          <Text>Rating: 4.5 <AntDesign name="star" size={15} color="#FFD700"/> </Text>
        </View>
    </View>
    </TouchableOpacity>
  );
  const navigateToDetails = (restaurant) => {
    navigation.navigate('RestaurantDetails', { restaurant });
  };
  
  return (
    
    <View style={styles.container}>
      
          {currentLocation && (
            <View style={styles.currentLocationContainer}>
              {address && (
                <View style={styles.addressContainer}>
                  <Text>{address.city}, {address.country}</Text>
                </View>
              )}
            </View>
          )}

      <View style={styles.searchContainer}>  
        {/* search icon */}
        <FontAwesome name="search" size={20} color="#FFD94A" style={styles.searchIcon} />
        
        {/* search box */}
        <TextInput
          
          style={styles.searchInput}
          placeholder='Find What You Want....'
          value={searchText}
          onChangeText={(text) => setSearchText(text)}  
        />
      </View>
      

     {/* Rendering List of Restaurants */}
      <FlatList
        data={restaurantData}
        keyExtractor={(item) => item.id.toString()} 
        renderItem={renderRestaurantItem}
      />

      {isScannerVisible && hasPermission && (
        <View style={styles.scannerContainer}>
          <TouchableOpacity onPress={handleBackArrowPress} style={styles.backArrowContainer}>
          <Ionicons name="arrow-back-circle" size={40} color="gold" />
          </TouchableOpacity>
          <BarCodeScanner
            style={{ ...StyleSheet.absoluteFillObject, backgroundColor: '#FFF8F1' }} // Adjust the size of the scanner
            onBarCodeScanned={handleBarCodeScanned}
          />
        </View>
      )}
    </View>
  );
};

// Style Sheet.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRightContainer: {
    flexDirection: 'row',
    marginRight: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  searchInput: {
    margin: 5,
    paddingVertical: 5,
    paddingHorizontal: 40,
    borderWidth: 1,
    borderRadius: 13,
    borderColor:"#FFD94A",
    backgroundColor:"white",
    flex: 1,
  },
  searchIcon: {
    marginLeft: 5, // Adjust the spacing as needed
    position: 'absolute',
  left: 10, // Adjust the left position as needed
  zIndex: 1,

  },
  restaurantItem: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#FFF" ,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: {
     width: 0,
     height: 2,
    },
   shadowOpacity: 0.43,
   shadowRadius: 9.51,
   elevation: 7,
  },
  // restaurantHeader: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  restaurantImage: {
    width: 350, // Adjust the width as needed
    height: 210, // Adjust the height as needed
    borderRadius: 20, // Adjust the border radius to make it circular
    margin: 0,
  },
  // restaurantInfo: {
  //   flex: 1,
  //   padding:1,
  //   color: "red",
  // },
  restaurantName: {
    fontWeight: 'bold',
    fontSize: 16,
    margin: 5,
  },
  // timingsContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   marginTop: 5,
  // },
  timingsText: {
    color: 'black',
    paddingBottom: 3,
  },
  ratingContainer: {
    marginTop: 5,
  },
  // currentLocationContainer: {
  //   marginTop: 10,
  //   padding: 10,
  //   borderRadius: 10,
  //   backgroundColor: "#f0f0f0",
  // },
  addressContainer: {
    // marginTop: 10,
    padding: 5,
    backgroundColor: "#FFF8F1",

  },
  scannerContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  backArrowContainer: {
    position: 'absolute',
    top: 5,
    left: 20,
    zIndex: 2,
  },
});

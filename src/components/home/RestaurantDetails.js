import React, { useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import ButtonGroup from './ButtonGroup';

export const RestaurantDetails = ({ route }) => {
  const { restaurant } = route.params || {};
  const [selectedButton, setSelectedButton] = useState(null);
  
  const handleButtonPress = (button) => {
    setSelectedButton(button);
  };

  const buttonHeaderInfo = {
    Overview: 'About Us',
    Info: 'Contact',
    Menu: '',
    Ratings: 'Rating',
  };
  const buttonInfo = {
    Overview: 'At our restaurant, we invite you to embark on a culinary journey like no other. Established in 2001, our passion for exquisite flavors, exceptional service, and a warm ambiance has made us a beloved destination for food enthusiasts. Our culinary team, led by Vamsi, is dedicated to crafting dishes that tantalize your taste buds and leave a lasting impression. Every ingredient is carefully selected to ensure freshness and authenticity, bringing you a dining experience that is both memorable and delightful',
    Info: 'Info Info',
    Menu: 'Menu Info',
    Ratings: 'Ratings Info',
  };

  return (
    <View >
    <Image
      source={{ uri: restaurant.imageUri }}
      style={{ width: 'auto', height: 250, borderRadius: 15, margin: 7 }}
    />

    <ButtonGroup selectedButton={selectedButton} onButtonPress={handleButtonPress} />
    
    <TouchableOpacity style={styles.Resbutton}>
      <Text style={styles.buttonText}>Reserve a Table</Text>
    </TouchableOpacity>
    
    {selectedButton && (
      <View style={styles.infoContainer}>
        <Text style={styles.infoHeader}>{buttonHeaderInfo[selectedButton]}</Text>
        <Text style={styles.infoText}>{buttonInfo[selectedButton]}</Text>
      </View>
    )}

    </View>
  );
  }

  const styles = StyleSheet.create({
    
    infoContainer: {
      padding: 5,
      // marginTop: 20,
      // backgroundColor: 'gold',
      // borderRadius: 5,
    },
    infoHeader: {
      color: '#FFD94A',
      fontSize: 20,
      padding: 5,
      fontWeight: "bold"
    },
    infoText: {
      color: 'black',
      fontSize: 14,
      paddingLeft:10,
      paddingRight: 5,
      paddingTop:5,
      paddingBottom:5,
      textAlign: 'justify',
    },
    Resbutton: {
      backgroundColor: '#FFD94A',
      borderRadius: 30,
      padding: 10,
      alignItems: 'center',
      width: 150,
      alignSelf: "center",
      shadowColor: "#000",
      shadowOffset: {
	     width: 0,
	     height: 7,
      },
      shadowOpacity: 0.41,
      shadowRadius: 9.11,
      elevation: 9,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    }
  });

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const ButtonGroup = ({ selectedButton, onButtonPress }) => {
  const buttons = ['Overview', 'Info', 'Menu', 'Ratings'];

  return (
    <View style={styles.buttonContainer}>
      {buttons.map((button, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.button,
            selectedButton === button && styles.selectedButton,
          ]}
          onPress={() => onButtonPress(button)}
        >
          <Text style={styles.buttonText}>{button}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  button: {
    flex: 1,
    margin: 5,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 9,
    shadowColor: "#000",
    shadowOffset: {
	 width: 0,
	 height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectedButton: {
    backgroundColor: '#FFD94A',
  },
  buttonText: {
    color: 'black',
  },
});

export default ButtonGroup;

import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const Reservation = ()=>{
	return(
		<View style={styles.container}>
			<Text>
				This is Reservation Page
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
})
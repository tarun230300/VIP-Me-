import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const Rewards = ()=>{
	return(
		<View style={styles.container}>
			<Text>
			Welcome to Rewards Page
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
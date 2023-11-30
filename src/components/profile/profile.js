import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const Profile = ()=>{
	return(
		<View style={styles.container}>
			<Text>
				This is Profile Page
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
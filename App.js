import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

import {Home} from './src/components/home/home'
import { Reservation } from './src/components/reservations/reservation';
import { Media } from './src/components/media/media';
import { Events } from './src/components/events/events';
import { Rewards } from './src/components/rewards/rewards';
import { Profile } from './src/components/profile/profile';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="home" size={24} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Reservations"
          component={Reservation}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-settings" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Media"
          component={Media}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="perm-media" size={24} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Events"
          component={Events}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-settings" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Rewards"
          component={Rewards}
          options={{
            tabBarIcon: ({ color, size }) => (
              // <Ionicons name="ios-settings" size={size} color={color} />
              <AntDesign name="Trophy" size={24} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-settings" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

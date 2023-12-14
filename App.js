import * as React from 'react';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {Home} from './src/components/home/home'
import { Reservation } from './src/components/reservations/reservation';
import { Media } from './src/components/media/media';
import { Events } from './src/components/events/events';
import { Rewards } from './src/components/rewards/rewards';
import { Profile } from './src/components/profile/profile';
import { RestaurantDetails } from './src/components/home/RestaurantDetails';


const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeScreen"
      component={Home}
      // options={{
      //   headerShown: false,
      // }}
     

    />
    <Stack.Screen
      name= "RestaurantDetails"
      component={RestaurantDetails}
      // options={{
      //   headerShown: false, // You can customize header options here if needed
      // }}
    />
  </Stack.Navigator>
);


const getTabBarIcon = (route, focused, iconName) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  const color = focused ? 'gold' : 'black';

  switch (iconName) {
    case 'home':
      return <FontAwesome name="home" size={24} color={color} />;
    case 'table-chair':
      return <MaterialCommunityIcons name="table-chair" size={24} color={color} />;
    case 'photo':
      return <FontAwesome name="photo" size={24} color={color} />;
    case 'event-seat':
      return <MaterialIcons name="event-seat" size={24} color={color} />;
    case 'emoji-events':
      return <MaterialIcons name="emoji-events" size={24} color={color} />;
    case 'people-sharp':
      return <Ionicons name="people-sharp" size={24} color={color} />;
    default:
      return null;
  }
};
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={({ route }) => ({
       tabBarStyle:
       {
        display: 'flex',
       },
       tabBarLabelStyle: {
            color: route.state?.index === route.key ? 'gold' : 'black',
          },

    })}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={({ route }) => ({
            tabBarIcon: ({ focused }) => getTabBarIcon(route, focused, 'home'),
            tabBarLabelStyle: {
              color: 'gold',

            },
          })}
        />
        <Tab.Screen
          name="Reservations"
          component={Reservation}
          options={({ route }) => ({
            tabBarIcon: ({ focused }) => getTabBarIcon(route, focused, 'table-chair'),
            // tabBarLabelStyle: {
            //  color: route.state?.index === 0 ? 'gold' : 'black',
            // },
          })}
        />
        <Tab.Screen
          name="Media"
          component={Media}
          options={({ route }) => ({
            tabBarIcon: ({ focused }) => getTabBarIcon(route, focused, 'photo'),
            // tabBarLabelStyle: {
            //   color: route.state?.index === 0 ? 'gold' : 'black',
            // },
          })}
        />
        <Tab.Screen
          name="Events"
          component={Events}
          options={({ route }) => ({
            tabBarIcon: ({ focused }) => getTabBarIcon(route, focused, 'event-seat'),
            // tabBarLabelStyle: {
            //   color: route.state?.index === 0 ? 'gold' : 'black',
            // },
          })}
        />
        <Tab.Screen
          name="Rewards"
          component={Rewards}
          options={({ route }) => ({
            tabBarIcon: ({ focused }) => getTabBarIcon(route, focused, 'emoji-events'),
            // tabBarLabelStyle: {
            //   color: route.state?.index === 0 ? 'gold' : 'black',
            // },
          })}
        />
        <Tab.Screen
          name="Membership"
          component={Profile}
          options={({ route }) => ({
            tabBarIcon: ({ focused }) => getTabBarIcon(route, focused, 'people-sharp'),
            // tabBarLabelStyle: {
            //   color: route.state?.index === 0 ? 'gold' : 'black',
            // },
          })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};


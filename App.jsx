import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
//screens
import Risk from './risk';
import Forumaster from './forum/forummaster';
import Homepage from './home';
import WeatherForecast from './WeatherForcast';

  import { LogBox } from 'react-native';

  LogBox.ignoreLogs(['Warning: ...']); //Hide warnings

  LogBox.ignoreAllLogs();//Hide all warning notifications on front-end
const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Tab.Navigator
  initialRouteName="Home">
        <Tab.Screen
        name="Home"
        component={Homepage}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
        <Tab.Screen
        name="Risk"
        component={Risk}
        options={{
          tabBarLabel: 'Risk',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="hazard-lights" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="WeatherForecast"
        component={WeatherForecast}
        options={{
          tabBarLabel: 'Detect',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="weather-cloudy-alert" color={color} size={26} />
          ),
        }}
      />

      
      <Tab.Screen
        name="Forum"
        component={Forumaster}
        options={{
          tabBarLabel: 'Forum',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="forum" color={color} size={26} />
          ),
        }}
      />

        

      </Tab.Navigator>
    </NavigationContainer>
  );
}
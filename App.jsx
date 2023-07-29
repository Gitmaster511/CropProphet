import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
//screens
import Risk from './risk';
import CameraScreen from './camera';
import ForumScreen from './forum';
import Forumaster from './forummaster';
import CreatePostScreen from './CreatePostScreen';
import Homepage from './home';

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

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
        name="Detect"
        component={CameraScreen}
        options={{
          tabBarLabel: 'Detect',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="camera-outline" color={color} size={26} />
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
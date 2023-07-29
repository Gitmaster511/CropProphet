// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreatePostScreen from './CreatePostScreen';

import FullPostScreen from './FullPostScreen';
import ForumScreen from './forum';
const Stack = createStackNavigator();

const Forumaster = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Forum" component={ForumScreen} />
        <Stack.Screen name="CreatePostScreen" component={CreatePostScreen} />
        <Stack.Screen name="FullPostScreen" component={FullPostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Forumaster;

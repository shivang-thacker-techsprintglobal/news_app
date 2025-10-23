/**
 * RootNavigator Component
 * 
 * Main navigation structure for the app using React Navigation
 * Implements a Stack Navigator with:
 * - Home Screen
 * - Article Detail Screen
 * 
 * @module navigation/RootNavigator
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen, ArticleDetailScreen } from '../screens';

const Stack = createNativeStackNavigator();

/**
 * RootNavigator Component
 * 
 * @returns {JSX.Element} Stack Navigator
 */
const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'NYT News Feed',
        }}
      />
      <Stack.Screen
        name="ArticleDetail"
        component={ArticleDetailScreen}
        options={{
          title: 'Article',
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;


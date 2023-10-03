import {View, Text, Alert} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import HomeScreen from '../screens/home/HomeScreen';
import BottomNavigation from './BottomNavigation';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          options={{headerShown: false}}
          component={Login}
        />
        <Stack.Screen
          name="Register"
          options={{headerShown: true}}
          component={Register}
        />
        <Stack.Screen
          name="HomeScreen"
          options={{headerShown: false}}
          component={HomeScreen}
        />
        <Stack.Screen
          name="BottomNavigation"
          options={{headerShown: false}}
          component={BottomNavigation}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import React, {useState, useEffect} from 'react';
import {View, Text, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';

import BottomNavigation from './BottomNavigation';
import ForgotPassword from '../screens/auth/ForgotPassword';
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen';
import QueryScreen from '../screens/QueryScreen';
import AppLaunch from '../screens/AppLaunch';
import ResetPassword from '../screens/auth/ResetPasswod';
import ProfileUpdate from '../screens/ProfileUpdate';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const [initialRoute, setInitialRoute] = useState('Login');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if the token exists in AsyncStorage when the component mounts
    AsyncStorage.getItem('token')
      .then(token => {
        if (token) {
          // If the token exists, set the initialRoute to 'AppLaunch'
          setInitialRoute('AppLaunch');
        } else {
          // If no token found, set the initialRoute to 'Login'
          setInitialRoute('Login');
        }
      })
      .catch(error => {
        // Handle any errors that occur while retrieving the token
        console.error('Error retrieving token:', error);
        // Set the initial route to the Login screen in case of an error
        setInitialRoute('Login');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="QueryHelp"
          component={QueryScreen}
          options={{headerShown: true, headerTitle: 'Contact Admin'}}
        />
        <Stack.Screen
          name="ResetPasswordScreen"
          component={ResetPasswordScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AppLaunch"
          options={{
            headerShown: true,
            headerTitle: 'Swasthyam The Ai Wellness',
          }}
          component={AppLaunch}
        />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen
          name="BottomNavigation"
          component={BottomNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProfileUpdate"
          component={ProfileUpdate}
          options={{headerShown: true, headerTitle: 'Profile Update'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import {View, Text} from 'react-native';
import React from 'react';
import {Appbar} from 'react-native-paper';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RequestBloodScreen from '../screens/RequestBloodScreen';
import Profile from '../screens/Profile';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../screens/home/HomeScreen';
const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="BloodRequest"
        options={{
          tabBarBackgroundColor: '#fff',
          headerShown: true,
          elevation: 10,
          
          tabBarLabel: 'Blood Request',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="blood-bag"
              color={color}
              size={size}
            />
          ),
        }}
        component={RequestBloodScreen}
      />
      <Tab.Screen
        name="Profile"
        options={{
          headerShown: true,
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;

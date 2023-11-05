import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/home/HomeScreen';
import RequestBloodScreen from '../screens/RequestBloodScreen';
import Fontisto from 'react-native-vector-icons/Fontisto';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Profile from '../screens/Profile';
import {View, Text} from 'react-native';
import {Appbar} from 'react-native-paper';
import NotificationScreen from '../screens/NotificationScreen';
import AdminHome from '../screens/admin/AdminHome';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  const [isAdmin, setIsAdmin] = React.useState(true);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#f2f2f2',
          paddingBottom: 5,
          elevation: 12,
          borderTopWidth: 1,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: '#E8290B',
        tabBarInactiveTintColor: '#000',
        backgroundColor: '#f2f2f2',
      }}>
      <Tab.Screen
        name="Home"
        options={{
          headerShown: true,
          tabBarActiveTintColor: '#E8290B',
          tabBarLabel: 'Blood Request',

          tabBarIcon: ({color, size}) => (
            <Fontisto name="blood" color={color} size={size} />
          ),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="RequestBlood"
        component={RequestBloodScreen}
        options={{
          headerShown: false,
          tabBarActiveTintColor: '#E8290B',
          tabBarLabel: 'Outgoing Messages',
          tabBarIcon: ({color, size}) => (
            <Entypo name="drop" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          headerShown: true,
          // show count

          tabBarActiveTintColor: '#E8290B',
          tabBarLabel: 'Notifications',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="notifications" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        options={{
          headerShown: false,
          tabBarActiveTintColor: '#E8290B',
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
        component={Profile}
      />
      {/* {isAdmin && (
        <Tab.Screen
          name="Admin"
          options={{
            headerShown: true,
            tabBarActiveTintColor: '#E8290B',
            tabBarLabel: 'Admin',
            tabBarIcon: ({color, size}) => (
              <MaterialIcons
                name="admin-panel-settings"
                color={color}
                size={size}
              />
            ),
          }}
          component={AdminHome}
        />
      )} */}
    </Tab.Navigator>
  );
};

export default BottomNavigation;

import {View, Text} from 'react-native';
import React,{useState} from 'react';
import Navigation from './src/navigtion/Navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [firstLaunch, setFirstLaunch] = React.useState(null);
  async function setData(){
    try {
      await AsyncStorage.setItem('firstLaunch', 'false');
    } catch (error) {
      console.log(error);
    }
  }
  return (
    
    <Navigation></Navigation>
  );
}

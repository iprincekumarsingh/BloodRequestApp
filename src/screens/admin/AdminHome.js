import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';

const AdminHome = () => {
  return <ScrollView contentContainerStyle={styles.container}></ScrollView>;
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    margin: 10,
  },
});

export default AdminHome;

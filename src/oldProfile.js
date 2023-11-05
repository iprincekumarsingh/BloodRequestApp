import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Image, StyleSheet, Alert} from 'react-native';
import {Button} from 'react-native-paper';
import {Appbar, List} from 'react-native-paper';
import {Platform} from 'react-native';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
const Profile = ({navigation}) => {
  const [userData, setUserData] = useState(null);

  const _goBack = () => console.log('Went back');

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');
  // Function to handle logout action
  const handleLogout = async () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to log out?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            // Handle the "Yes" action here (e.g., clear user data and navigate to the login screen)
            AsyncStorage.clear();
            navigation.navigate('Login'); // Navigate to the login screen
          },
        },
      ],
      {
        titleStyle: {
          fontSize: 24,
          fontWeight: 'bold',
        },
        messageStyle: {
          fontSize: 18,
        },
        // You can add more styling options here
      },
    );
  };

  // Load user data from AsyncStorage
  const loadUserData = async () => {
    try {
      const userString = await AsyncStorage.getItem('user');

      const user = JSON.parse(userString);
      setUserData(user);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Title" subtitle={'Subtitle'} />
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action
          icon={MORE_ICON}
          onPress={() => {
            <Appbar.Content title="Title" subtitle={'Subtitle'} />
          }}
        />
      </Appbar.Header>
      {userData && (
        <View style={styles.profileHeader}>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{userData.name}</Text>
            <Text style={styles.bloodGroup}>
              Blood Group: {userData.bloodGroup}
            </Text>
            <Button
              mode="outlined"
              style={styles.editButton}
              labelStyle={styles.editButtonText}>
              Edit Profile
            </Button>
          </View>
          <Image
            source={require('../../assets/image/profile.jpeg')}
            style={styles.profileImage}
          />
        </View>
      )}

      {userData && (
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Address:</Text>
            <Text style={styles.detailText}>{userData.address}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Contact:</Text>
            <Text style={styles.detailText}>{userData.phone}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Email:</Text>
            <Text style={styles.detailText}>{userData.email}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Pincode:</Text>
            <Text style={styles.detailText}>{userData.pincode}</Text>
          </View>
        </View>
      )}

      <Button
        mode="contained"
        style={styles.logoutButton}
        labelStyle={styles.logoutButtonText}
        onPress={handleLogout}>
        Logout
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 50,
  },
  profileInfo: {
    marginLeft: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bloodGroup: {
    fontSize: 18,
    color: 'gray',
  },
  editButton: {
    marginTop: 10,
    borderColor: '#007bff',
  },
  editButtonText: {
    color: '#007bff',
  },
  detailsContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailText: {
    flex: 3,
    fontSize: 16,
    color: 'gray',
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#ff6347',
  },
  logoutButtonText: {
    color: 'white',
  },
});

export default Profile;

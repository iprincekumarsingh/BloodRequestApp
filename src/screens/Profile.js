import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { Button, IconButton } from 'react-native-paper';

const Profile = () => {
  // Function to handle logout action
  const handleLogout = () => {
    // Implement your logout logic here
    // For example, you can clear user credentials and navigate to the login screen
    // Example:
    // navigation.navigate('Login'); // Assuming you're using React Navigation
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={require('../../assets/image/profile.jpeg')}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>Prince Kumar Singh</Text>
          <Text style={styles.bloodGroup}>Blood Group: O+ve</Text>
          <Button
            mode="outlined"
            style={styles.editButton}
            labelStyle={styles.editButtonText}>
            Edit Profile
          </Button>
        </View>
      </View>

      <View 
      
      style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Address:</Text>
          <Text style={styles.detailText}>123, ABC, XYZ, 123456</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Contact:</Text>
          <Text style={styles.detailText}>1234567890</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Email:</Text>
          <Text style={styles.detailText}>prince@gmail.com</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Pincode:</Text>
          <Text style={styles.detailText}>754021</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>UID:</Text>
          <Text style={styles.detailText}>1234567890</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>DOB:</Text>
          <Text style={styles.detailText}>12/12/1999</Text>
        </View>
      </View>

      {/* Logout Button */}
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
    padding: 10,
  },
  profileHeader: {
    margin:10,
    flexDirection: 'row',
    alignItems: 'center',
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
    backgroundColor: '#fff',
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

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ToastAndroid,
  Platform,
} from 'react-native';
import {Button, Card, Paragraph} from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DocumentPicker from 'react-native-document-picker';
import notifee from '@notifee/react-native';
const HomeScreen = ({navigation}) => {
  const bloodGroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const cityList = [
    'Bhubaneswar',
    'Cuttack',
    'Rourkela',
    'Brahmapur',
    'Sambalpur',
    'Puri',
    'Balasore',
    'Bhadrak',
    'Baripada',
    'Jharsuguda',
    'Jeypore',
    'Bargarh',
    'Rayagada',
    'Bhawanipatna',
    'Dhenkanal',
    'Barbil',
    'Kendujhar',
    'Sunabeda',
    'Paradip',
  ];

  const [bloodgroup, setBloodgroup] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [token, setToken] = useState('');
  const [selectedFile, setSelectedFile] = useState([]);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const value = await AsyncStorage.getItem('token');
        if (value !== null) {
          setToken(value.slice(1, -1));
        }
      } catch (error) {
        console.error('Error retrieving token:', error);
      }
    };
    fetchToken();
  }, []);

  const handleSubmit = async () => {
    try {
      if (!bloodgroup) {
        ToastAndroid.show('Please select blood group', ToastAndroid.SHORT);
        return;
      }

      if (!selectedCity) {
        ToastAndroid.show('Please enter pincode', ToastAndroid.SHORT);
        return;
      }

      if (!token) {
        ToastAndroid.show('Please login to continue', ToastAndroid.SHORT);
        return;
      }

      // Make the fetch request
      try {
        if (!token) {
          throw new Error('Token is undefined or null');
        }

        const formData = new FormData();
        formData.append('city', selectedCity);
        formData.append('bloodGroup', bloodgroup);
        formData.append('file', selectedFile); // Add your file here

        const response = await fetch(
          'https://purple-earthworm-sock.cyclic.app/api/v1/blood/request',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          },
        );

        const data = await response.json();
        if (data.error) {
          ToastAndroid.show(data.error, ToastAndroid.SHORT);
          return;
        }
        if (data.success === true) {
          ToastAndroid.show('Request sent successfully', ToastAndroid.SHORT);
        }

        console.log(data.data);
      } catch (error) {
        // Handle the error here
        console.error('Error in fetch request:', error.message);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Someone needs your help!',
      body: 'Prince needs A+ blood urgently. Please help him!',
      android: {
        channelId,

        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }
  const pickDocument = async () => {
    Alert.alert(
      'Upload Prescription',
      'Please upload your prescription to get verified',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },

        {text: 'OK', onPress: () => chooseFile()},
      ],
      {cancelable: false},
    );
  };
  const chooseFile = async () => {
    try {
      const doc = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      // console.log(doc);
      setSelectedFile(doc);
      // console.log(doc);
      console.log(selectedFile);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log(
          'User cancelled the picker, exit any dialogs or menus and move on',
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title
          title="Request Blood"
          titleStyle={[
            styles.title,
            {
              color: 'black',

              textDecorationColor: 'black',
            },
          ]}
        />
        <Card.Content>
          <View style={styles.dropdownContainer}>
            <SelectDropdown
              defaultButtonText="Select City?"
              search
              buttonStyle={{
                backgroundColor: '#fff',
                borderWidth: 1,

                borderColor: 'black',
                borderRadius: 5,
                width: '100%',
              }}
              buttonTextStyle={{
                color: '#595959',
                fontSize: 16,
                fontWeight: 'medium',
                textAlign: 'left',
              }}
              dropdownIconPosition={{
                top: 10,
                right: 10,
              }}
              rowStyle={{
                justifyContent: 'center',
                backgroundColor: 'rgba(250, 250, 250, 0)',
                borderBottomWidth: 1,
              }}
              dropdownStyle={{
                justifyContent: 'center', // Center the dropdown content horizontally
              }}
              data={cityList}
              onSelect={(selectedItem, index) => {
                setSelectedCity(selectedItem);
              }}
            />
          </View>
          <View style={styles.dropdownContainer}>
            <SelectDropdown
              defaultButtonText="Which blood group ?"
              buttonStyle={{
                backgroundColor: '#fff',
                borderWidth: 1,

                borderColor: 'black',
                borderRadius: 5,
                width: '100%',
              }}
              buttonTextStyle={{
                color: '#595959',
                fontSize: 16,
                fontWeight: 'medium',
                textAlign: 'left',
              }}
              dropdownIconPosition={{
                top: 10,
                right: 10,
              }}
              rowStyle={{
                justifyContent: 'center',
                backgroundColor: 'rgba(250, 250, 250, 0)',
                borderBottomWidth: 1,
              }}
              dropdownStyle={{
                justifyContent: 'center', // Center the dropdown content horizontally
              }}
              data={bloodGroup}
              onSelect={(selectedItem, index) => {
                setBloodgroup(selectedItem);
              }}
            />
          </View>
          <Text
            mode="outlined"
            style={[
              styles.uploadButton,
              {
                width: '100%',
                borderWidth: 1,
                padding: 12,
                backgroundColor: '#fff',
                textAlign: 'center',
                fontWeight: 500,
                marginTop: 10,
                fontSize: 16,
                marginBottom: 10,
                textDecorationColor: 'black',
                color: 'black', // Set text color to black
              },
            ]}
            onPress={pickDocument}>
            Add Prescription proof
          </Text>
        </Card.Content>
        {selectedFile && (
          <Card.Actions>
            <Paragraph>Selected File: {selectedFile.name}</Paragraph>
          </Card.Actions>
        )}
        <Card.Actions>
          <Button
            mode="contained"
            onPress={onDisplayNotification}
            style={[
              styles.button,
              {backgroundColor: '#E8290B'},

              {color: 'white'},
              {marginTop: 10},
              {marginBottom: 10},
            ]}>
            Send Request
          </Button>
        </Card.Actions>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}>
          <Text
            onPress={() => {
              navigation.navigate('QueryHelp');
            }}
            style={{
              color: 'black',
              fontWeight: 'bold',
              textDecorationColor: 'black',
              borderColor: 'black',
              borderBottomWidth: 1,
            }}>
            Contact Admin{' '}
          </Text>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffff',
    height: '100%',
    position: 'relative',

    padding: 16,
  },
  card: {
    backgroundColor: '#EAF0F1',
    padding: 16,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    color: '#777E8B',
    borderBottomColor: '#777E8B',
    borderBottomWidth: 1,
    fontFamily: 'Montserrat',
    width: '70%',
  },
  input: {
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  dropdownContainer: {
    marginVertical: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  dropdown: {
    width: 400, // Customize the width if needed
    backgroundColor: 'rgba(250, 250, 250, 0)',
    textAlign: 'start',
  },
  uploadButton: {
    marginVertical: 10,
    borderRadius: 8,
  },
  button: {
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#ff',
    paddingVertical: 8,
    fontSize: 20,
  },
});

export default HomeScreen;

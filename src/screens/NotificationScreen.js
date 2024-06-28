import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
  Button,
  Alert,
  ToastAndroid,
} from 'react-native';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';
import Modal from 'react-native-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

const BASE_URL = 'http://192.168.1.4:5000/api/v1';

async function makeRequest(selectedCity, bloodgroup, authToken) {
  try {
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      ToastAndroid.show('No internet connection', ToastAndroid.SHORT);
      return;
    }

    const response = await fetch(`${BASE_URL}/blood/notification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        city: selectedCity,
        bloodGroup: bloodgroup,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('An error occurred while processing the request', error);
    throw error;
  }
}

const NotificationScreen = () => {
  const isFocused = useIsFocused();
  const [bloodRequests, setBloodRequests] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [userbloodgroup, setUserbloodgroup] = useState('');
  const [usercity, setUsercity] = useState('');
  const [authToken, setAuthToken] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const parsedToken = token.slice(1, -1);
          setAuthToken(parsedToken);

          const user = await AsyncStorage.getItem('user');
          if (user) {
            const parsedUser = JSON.parse(user);
            setUserbloodgroup(parsedUser.bloodGroup);
            setUsercity(parsedUser.city);

            const response = await fetch(`${BASE_URL}/blood/notification`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${parsedToken}`,
              },
              body: JSON.stringify({
                city: parsedUser.city,
                bloodGroup: parsedUser.bloodGroup,
              }),
            });

            const data = await response.json();
            console.log(data.error);

            if(data.error){
              // ToastAndroid.show(data.error, ToastAndroid.SHORT);
              ToastAndroid.show('No Notification', ToastAndroid.SHORT);
              setNotificationCount(0);
              return;
            }
            else{
              setBloodRequests(data.data);
              setNotificationCount(data.data.length);
            }

          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  const openDialog = item => {
    setSelectedItem(item);
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setDialogVisible(false);
    setSelectedItem(null);
  };

  const colors = ['#FEF6FF', '#FEFEDF', '#FFECFD'];

  let colorIndex = 0;

  const renderItem = ({item}) => {
    const currentColor = colors[colorIndex % colors.length];
    colorIndex++;

    return (
      <TouchableOpacity onPress={() => openDialog(item)}>
        <View
          key={item}
          style={[styles.requestItem, {backgroundColor: currentColor}]}>
          <View style={styles.requestDetails}>
            <Text style={[styles.name, {letterSpacing: 0, marginBottom: 7}]}>
              {item.name}
            </Text>
            <Text style={styles.bloodGroup}>
              Request Blood: {item.bloodGroup}
            </Text>
            <Text style={styles.pincode}>City: {item.city}</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              gap: 22,
            }}>
            <EvilIcons name="bell" size={30} color="black" />
            <Text style={{fontSize: 11}}>{formatDate(item.date)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const formatDate = dateString => {
    const originalDate = new Date(dateString);
    const formattedTime = originalDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    return `${originalDate.toLocaleDateString()} ${formattedTime} `;
  };

  const callNumber = phoneNumber => {
    if (phoneNumber) {
      const url = `tel:${phoneNumber}`;
      Linking.openURL(url);
    }
  };

  return (
    <View style={styles.container}>
   
      {notificationCount===0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
            }}>
            No Blood Requests Found
          </Text>
        </View>
      ) : (
        <FlatList
          data={bloodRequests}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
        />
      )}


   
      <Modal isVisible={isDialogVisible}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['#E1A2B8', '#FFFFFF']}
          style={styles.dialogContainer}>
          <View style={styles.dialogContainer}>
            <Text style={styles.dialogTitle}>Details</Text>
            <Text style={{fontSize: 18, fontWeight: '700'}}>
              Name:{' '}
              <Text style={{fontWeight: '500'}}>{selectedItem?.name}</Text>
            </Text>
            <Text style={{fontSize: 18, fontWeight: '700'}}>
              Blood Group:{' '}
              <Text style={{fontWeight: '500'}}>
                {selectedItem?.bloodGroup}
              </Text>
            </Text>
            <Text style={{fontSize: 18, fontWeight: '700'}}>
              Address:{' '}
              <Text style={{fontWeight: '500'}}>{selectedItem?.address}</Text>
            </Text>
            <Text style={{fontSize: 18, fontWeight: '700'}}>
              City:{' '}
              <Text style={{fontWeight: '500'}}>{selectedItem?.city}</Text>
            </Text>

            <TouchableOpacity onPress={() => callNumber(selectedItem?.phone)}>
              <View
                style={{
                  justifyContent: 'start',
                  alignContent: 'center',
                  gap: 10,
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text style={{fontSize: 18, fontWeight: '700'}}>
                  Mobile number:{' '}
                  <Text style={{fontWeight: '500'}}>{selectedItem?.phone}</Text>
                </Text>
                <MaterialIcons name="call" size={24} />
              </View>
            </TouchableOpacity>

            <Button

            
              style={{marginTop: 30}}
              title="Close"
              onPress={closeDialog}
            />
          </View>
        </LinearGradient>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  requestItem: {
    borderWidth: 0,
    margin: 6,
    padding: 8,
    gap: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
  },
  requestDetails: {
    flex: 1,
    gap: -7,
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  bloodGroup: {
    fontSize: 16,
    color: 'black',
    marginTop: 5,
  },
  pincode: {
    fontSize: 16,
    color: 'black',
    marginTop: 5,
  },
  dialogContainer: {
    padding: 12,
    borderRadius: 4,
    gap: 10,
  },
  dialogTitle: {
    borderBottomWidth: 1,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default NotificationScreen;

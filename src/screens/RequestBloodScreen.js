import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
  Button,
  Alert,
} from 'react-native';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';
import Modal from 'react-native-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import NetInfo from '@react-native-community/netinfo';

const RequestBloodScreen = () => {
  const isFocused = useIsFocused();
  const [bloodRequests, setBloodRequests] = useState([]);
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [authToken, setAuthToken] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
       

        const token = await AsyncStorage.getItem('token');
        const formattedToken = token.slice(1, -1);
        setAuthToken(formattedToken);

        const response = await fetch(
          'https://purple-earthworm-sock.cyclic.app/api/v1/blood/bloodLogUser',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${formattedToken}`,
            },
          },
        );

       

        const data = await response.json();
        setBloodRequests(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [isFocused]);

  const openDialog = item => {
    setSelectedItem(item);
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setDialogVisible(false);
    setSelectedItem(null);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => openDialog(item)}>
      <View style={styles.requestItem}>
        <View style={styles.requestDetails}>
          {/* <Text style={[styles.name, {letterSpacing: 0}, {marginBottom: 7}]}>
            {item.userId.name}
          </Text> */}
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
          }}>
          <Image
            style={styles.userImage}
            source={require('../../assets/logo.png')}
          />
          <Text
            style={{
              marginTop: 10,
              fontSize: 11,
            }}>
            {formatDate(item.date)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const formatDate = dateString => {
    const originalDate = new Date(dateString);
    const day = originalDate.getDate();
    const month = originalDate.getMonth() + 1; // Months are zero-based, so add 1
    const year = originalDate.getFullYear().toString().slice(-2); // Get the last two digits of the year
    const formattedTime = originalDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    return `${day}/${month}/${year} ${formattedTime} `;
  };
  const callNumber = phoneNumber => {
    if (phoneNumber) {
      const url = `tel:${phoneNumber}`;
      Linking.openURL(url);
    }
  };
  return (
    <View style={styles.container}>
      {/* check data is empty or not */}
      {bloodRequests.length === 0 && (
        <View
          style={{
            flex: 1,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            No data found
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
            }}>
            Please request for blood
          </Text>
        </View>
      )}
      <FlatList
        data={bloodRequests}
        keyExtractor={item => item._id}
        renderItem={renderItem}
      />

      <Modal isVisible={isDialogVisible}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['#F7D6E0', '#EFF7F6']}
          style={styles.dialogContainer}>
          <View style={styles.dialogContainer}>
            <Text style={styles.dialogTitle}>Details</Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 700,
              }}>
              Name:{' '}
              <Text
                style={{
                  fontWeight: 500,
                }}>
                {selectedItem?.userId.name}
              </Text>
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 700,
              }}>
              Blood Group:
              <Text
                style={{
                  fontWeight: 500,
                }}>
                {selectedItem?.bloodGroup}
              </Text>
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 700,
              }}>
              Address:
              <Text
                style={{
                  fontWeight: 500,
                }}>
                {selectedItem?.userId.address}
              </Text>
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 700,
              }}>
              Pincode:
              <Text
                style={{
                  fontWeight: 500,
                }}>
                {selectedItem?.pincode}
              </Text>
            </Text>

            <TouchableOpacity
              onPress={() => callNumber(selectedItem?.userId.phone)}>
              <View
                style={{
                  justifyContent: 'start',
                  alignContent: 'center',
                  gap: 10,
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '700', // '700' should be a string
                  }}>
                  Mobile number:
                  <Text
                    style={{
                      fontWeight: '500', // '500' should be a string
                    }}>
                    {selectedItem?.userId.phone}
                  </Text>
                </Text>
                <MaterialIcons name="call" size={24} />
              </View>
            </TouchableOpacity>

            <Button
              style={{
                marginTop: 100,
                backgroundColor: 'black', // Changing the background color to black
              }}
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
    borderWidth: 1,

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
  valueText: {
    fontWeight: 500,
  },
  bloodGroup: {
    fontSize: 16,
    color: 'black',
    // marginTop: 5,
  },
  pincode: {
    fontSize: 16,
    color: 'black',
    marginTop: 5,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
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

export default RequestBloodScreen;

import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TouchableOpacityBase,
  Pressable,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, TextInput} from 'react-native-paper';
import Modal from 'react-native-modal';
import DocumentPicker from 'react-native-document-picker';
const dataHero = [
  {
    id: 1,
    bloodGroup: 'B+',
    value: 'Edit Profile',
  },
];

const Profile = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState([]);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [token, setToken] = useState('');
  useEffect(() => {
    loadUserData();
  }, []);

  // Load user data from AsyncStorage
  const loadUserData = async () => {
    try {
    
      await AsyncStorage.getItem('user').then(user => {
        setUserData(JSON.parse(user));
      });
      console.log('user data', userData);
     
    } catch (error) {
      console.error(error);
    }
  };
  const closeDialog = () => {
    setDialogVisible(false);
  };

  useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      setToken(token.slice(1, -1));
    });
    loadUserData();
  }, []);

  const handleDocumentUpload = async () => {
    try {
      const doc = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      // console.log(doc);
      setSelectedFile(doc);
      
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log(
          'User cancelled the picker, exit any dialogs or menus and move on',
        );
      }
    }
  };
  const handleSubmit = async () => {
   

    try {
      if(address==="" || phone===""){
        ToastAndroid.show("Please fill all the fields",ToastAndroid.SHORT);
        return;
      }
      if(selectedFile.length===0){
        ToastAndroid.show("Please upload a profile picture",ToastAndroid.SHORT);
        return;
      }
      const formData = new FormData();

      formData.append('address', address);
      formData.append('phone', phone);
      formData.append('file', selectedFile); // Add your file here

      const response = await fetch(
        'http://192.168.1.4:5000/api/v1/user/update-profile',
        {
          method: 'put',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      const data = await response.json();
     
      // check for error response
      if (!response.ok) {
        // get error message from body or default to response status
        const error = (data && data.message) || response.status;
        ToastAndroid.show(error,ToastAndroid.SHORT);
        return Promise.reject(error);
      }
      else{
        ToastAndroid.show("Profile updated successfully",ToastAndroid.SHORT);
        AsyncStorage.setItem('user', JSON.stringify(data.data));
        setDialogVisible(false);
        loadUserData();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#DAE0E2',
        height: '100%',
        color: '#212122',
      }}>
      <Modal
        isVisible={isDialogVisible}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['#E1A2B8', '#FFFFFF']}
          style={styles.dialogContainer}>
          <Text style={styles.dialogTitle}>Edit Profile</Text>
          <Pressable onPress={handleDocumentUpload}>
            <Text
              style={[
                styles.input,
                {
                  textAlign: 'center',
                },
                {
                  padding: 18,
                },
              ]}>
              Upload Profile Picture
            </Text>
          </Pressable>
          <TextInput
            placeholder="Address"
            secureTextEntry={false}
            value={address}
            style={[styles.input]}
            onChangeText={text => setAddress(text)}
          />
          <TextInput
            placeholder="Phone number"
            secureTextEntry={false}
            value={phone}
            style={[styles.input]}
            onChangeText={text => setPhone(text)}
          />
          <TouchableOpacity
            style={{
              backgroundColor: '#0ABDE3',
              padding: 10,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
            }}
            onPress={handleSubmit}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              Update Profile
            </Text>
          </TouchableOpacity>
          <Pressable
            style={{
              backgroundColor: '#0ABDE3',
              padding: 10,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
            }}
            onPress={closeDialog}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              Back
            </Text>
          </Pressable>
        </LinearGradient>
      </Modal>
      <View>
        <HeroSectionProfile
          name={userData && userData.name}
          bloodGroup={userData && userData.bloodGroup}
          userPic={userData && userData.profile_pic}
          onpressKey={() => {
            AsyncStorage.removeItem('user');
            AsyncStorage.removeItem('token');
            // clear all the stack and redirect to login screen
            navigation.reset({
              index: 0,
              routes: [{name: 'Login'}],
            });
          }}
          onEditProfile={() => {
            setDialogVisible(true);
          }}></HeroSectionProfile>
        <View
          style={{
            position: 'relative',
            top: 110,
            marginHorizontal: 15,
          }}>
          <View style={styles.container}>
            <View>
              <Text
                style={[
                  styles.text,
                  {
                    borderBottomWidth: 1 / 2,
                    width: '30%',
                  },
                ]}>
                Address
              </Text>
              <Text style={[styles.text, styles.newText]}>
                {userData && userData.address}
              </Text>
            </View>
            <View>
              <Text
                style={[
                  styles.text,
                  {
                    borderBottomWidth: 1 / 2,
                    width: '30%',
                  },
                ]}>
                City
              </Text>
              <Text style={[styles.text, styles.newText]}>
                {userData && userData.city}
              </Text>
            </View>
            <View>
              <Text
                style={[
                  styles.text,
                  {
                    borderBottomWidth: 1 / 2,
                    width: '30%',
                  },
                ]}>
                Email
              </Text>
              <Text style={[styles.text, styles.newText]}>
                {userData && userData.email}
              </Text>
            </View>
            <View>
              <Text
                style={[
                  styles.text,
                  {
                    borderBottomWidth: 1 / 2,
                    width: '30%',
                  },
                ]}>
                Phone
              </Text>
              <Text style={[styles.text, styles.newText]}>
                {userData && userData.phone}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const HeroSectionProfile = ({
  name,
  bloodGroup,
  onpressKey,
  onEditProfile,
  userPic,
}) => {
  return (
    <View
      style={{
        height: 200,
      }}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={['#DD83AD', '#C3E1FC']}
        style={{
          position: 'absolute',

          fontWeight: 'bold',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
      />
      <TouchableOpacity onPress={onpressKey}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 20,
            right: 20,
          }}>
          <MaterialCommunityIcons
            name="logout"
            size={30}
            color="black"
            style={{}}
          />
        </View>
      </TouchableOpacity>
      <View
        style={{
          position: 'relative',
          top: 70,
          backgroundColor: 'white',
          borderRadius: 8,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 1.5,
          shadowRadius: 3.84,
          elevation: 5,
          height: 200,
          margin: 30,
          width: 300,
          alignSelf: 'center',
          justifyContent: 'center',
        }}>
        {userPic ? (
          <Image
            source={{uri: userPic}} // Use the user's image if available
            style={{
              width: 100,
              height: 100,
              alignContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
              position: 'absolute',
              top: -45,
              left: 100,
            }}
          />
        ) : (
          <Image
            source={require('../../assets/image/profile.jpeg')} // Use the default image if user image is not available
            style={{
              width: 100,
              height: 100,
              alignContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
              position: 'absolute',
              top: -45,
              left: 100,
            }}
          />
        )}

        <Text
          style={{
            fontSize: 24,
            color: 'black',
            fontWeight: 700,
            fontFamily: 'Montserrat',
            textAlign: 'center',
            width: '100%',
            position: 'absolute',
            top: 60,
          }}>
          {name}
        </Text>
        {dataHero.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: '100%',
                position: 'absolute',
                top: 91,
                gap: 15,
                fontSize: 16,
              }}>
              <Text
                style={{
                  fontWeight: 900,
                  fontFamily: 'Montserrat',
                  fontSize: 17,
                  color: '#212122',
                }}>
                Blood group : {bloodGroup}
              </Text>
              <TouchableOpacity
                onPress={onEditProfile}
                style={{
                  borderWidth: 1,
                  paddingHorizontal: 15,
                  marginTop: 8,
                  borderColor: '#0ABDE3',
                  paddingVertical: 5,
                  borderRadius: 40,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 10,
                  }}>
                  <Text
                    style={{fontSize: 16, fontWeight: 700, color: '#0ABDE3'}}>
                    {item.value}
                  </Text>
                  <Feather name="edit" size={20} color="#0ABDE3" />
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    gap: 12,
    padding: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 20,

    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    marginBottom: 10,
    color: '#212122',
  },
  newText: {
    fontWeight: 'medium',
    fontFamily: 'Montserrat',
    fontSize: 18,
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
  input: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'black',
    width: 300,
    borderRadius: 8,
    paddingHorizontal: 20,
    color: 'black',
    backgroundColor: '#F1EFEF',
  },
});

export default Profile;

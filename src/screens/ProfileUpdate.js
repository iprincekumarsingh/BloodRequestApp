import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditProfile({navigation}) {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [user, setUser] = useState([]);
  const [token, setToken] = useState('');

  const [selectedFile, setSelectedFile] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      setUser(JSON.parse(user));
    });
    AsyncStorage.getItem('token').then(token => {
      setToken(token.slice(1, -1));
    });
    console.log(user);
  }, []);

  const handleDocumentUpload = async () => {
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

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

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
      console.log(data.data); // handle the response data as needed
      AsyncStorage.setItem('user', JSON.stringify(data.data));
      Alert.alert('Profile Updated');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder=""
            value={input1}
            onChangeText={setInput1}
          />
        </View>

        <TouchableOpacity onPress={handleDocumentUpload}>
          <Text style={styles.uploadButton}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSubmit}>
          <Text
            style={[
              styles.uploadButton,
              {
                backgroundColor: 'blue',
              },
            ]}>
            Update Profke
          </Text>
        </TouchableOpacity>
      </ScrollView>
      {/* <Text onPress={handleSubmit} style={styles.uploadButton}>Update Profke</Text> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: 20,
    width: '80%',
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
  },
  uploadButton: {
    width: 300,
    padding: 14,
    marginTop: 10,
    backgroundColor: '#5B0888',
    color: 'white',
    textAlign: 'center',
    borderRadius: 8,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  documentImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

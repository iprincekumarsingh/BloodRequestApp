import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import { getBaseURL } from '../../api/Axios';


const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');

  const handleLogin = async () => {
    if (!email) {
      ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT);
      return;
    }

    axios
      .post(`${getBaseURL()}auth/forgot-password`, {email})
      .then(response => {
        // saving the email in async storage
        console.log(response.data);
        AsyncStorage.setItem('email', email);

        navigation.navigate('ResetPassword');
      })
      .catch(error => {
        console.error(error);
        let errorMessage = 'An error occurred';
        if (error.response) {
          errorMessage = error.response.data.message; // Assuming the error response has a 'message' field
        } else if (error.message) {
          errorMessage = error.message;
        }
        Alert.alert('Error', errorMessage);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Forgot Password</Text>
        <TextInput
          placeholder="Enter registered email"
          secureTextEntry={false}
          selectTextOnFocus={true}
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
          placeholderTextColor="#a9a9a9" // Set your desired color here
        />

        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.signInButton}>Send Reset Code</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  input: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'black',
    width: 320,
    borderRadius: 8,
    paddingHorizontal: 20,
    color: 'black',
    backgroundColor: '#F1EFEF',
  },

  signInButton: {
    marginTop: 10,
    width: 320,
    padding: 14,
    backgroundColor: '#5B0888',
    color: 'white',
    textAlign: 'center',
    borderRadius: 8,
  },
});

export default ForgotPassword;

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

const ResetPassword = ({navigation}) => {
  const [code, setCode] = useState('');

  const handleLogin = async () => {
    // get email from async storage
    const storedEmail = await AsyncStorage.getItem('email');

    axios
      .post(`${getBaseURL()}auth/reset-password/${code}`, {
        email: storedEmail,
      })
      .then(response => {
        if (response.data.status) {
          navigation.navigate('ResetPasswordScreen');
        }

        AsyncStorage.setItem('email', storedEmail);
      })
      .catch(error => {
        // log the error
        console.error(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>OTP </Text>
        <Text
          style={[
            styles.title,
            {
              color: 'gray',
              fontSize: 12,
              width: 320,

              textDecorationColor: 'black',
            },
          ]}>
          A 4 digit OTP has been sent to your email. Please enter the OTP to
          reset your password
        </Text>
        <TextInput
          placeholder="Enter OTP"
          secureTextEntry={false}
          selectTextOnFocus={true}
          value={code}
          onChangeText={text => setCode(text)}
          style={styles.input}
          placeholderTextColor="#a9a9a9" // Set your desired color here
        />

        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.signInButton}>Reset Password</Text>
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

export default ResetPassword;

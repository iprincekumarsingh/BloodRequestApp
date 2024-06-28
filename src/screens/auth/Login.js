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
import CheckBox from '@react-native-community/checkbox';
import { getBaseURL } from '../../api/Axios';

// const API_ENDPOINT = 'http://10.0.2.2:5000/api/v1/auth/login';
const API_ENDPOINT =
  `${getBaseURL()}auth/login`;
// 'http://192.168.1.4:5000//api/v1/auth/login';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false); // State for checkbox

  const handleLogin = async () => {
    if (!email || !password) {
      ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT);
      return;
    }

    if (!termsAccepted) {
      ToastAndroid.show(
        'Please accept terms and conditions',
        ToastAndroid.SHORT,
      );
      return;
    }

    try {
      fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      })
        .then(response => {
          if (!response.ok) {
            console.log(response);

            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          const {token} = data;
          AsyncStorage.setItem('token', JSON.stringify(token));
          // console.log(token);
          AsyncStorage.getItem('token').then(token => {
            console.log(token.slice(1, -1));
          });

          AsyncStorage.setItem('user', JSON.stringify(data.user));
          navigation.reset({
            index: 0,
            routes: [{name: 'AppLaunch'}],
          });
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Sign In</Text>
        <TextInput
          placeholder="Email"
          secureTextEntry={false}
          selectTextOnFocus={true}
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
          placeholderTextColor="#a9a9a9"
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          selectTextOnFocus={true}
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          placeholderTextColor="#a9a9a9" // Set your desired color here
        />

        <Text
          onPress={() => {
            navigation.navigate('ForgotPassword');
          }}
          style={styles.forgotPasswordText}>
          Forgot Password? <Text style={styles.resetText}>Reset</Text>
        </Text>

        <View style={styles.checkboxContainer}>
          <CheckBox
            tintColors="black"
            value={termsAccepted}
            onValueChange={setTermsAccepted}
          />
          <Text
            style={{
              color: '#212122',
            }}>
            I accept the terms and conditions
          </Text>
        </View>

        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.signInButton}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don't have an account? </Text>
          <Text
            onPress={() => navigation.navigate('Register')}
            style={styles.signUpLink}>
            Sign Up
          </Text>
        </View>
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
    color: '#212122',
    backgroundColor: '#F1EFEF',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  forgotPasswordText: {
    marginTop: 10,
    color: 'black',
  },
  resetText: {
    color: '#713ABE',
    fontWeight: 'bold',
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
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  signUpText: {
    marginTop: 1,
    color: 'black',
  },
  signUpLink: {
    color: '#713ABE',
    fontWeight: 'bold',
  },
});

export default Login;

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

const ResetPasswordScreen = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [cnfPassword, setCnfPassword] = useState('');

  const handleLogin = async () => {
    // get email from async storage
    const email = await AsyncStorage.getItem('email');
    console.log(email);
    console.log(password);

    if (password !== cnfPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    axios
      .post(`${getBaseURL()}auth/reset-password`, {
        email,
        password,
      })
      .then(response => {
        const {token} = response.data;
        ToastAndroid.show('Password reset successfully', ToastAndroid.SHORT);
        // set timeout to allow the toast to show
        // clear the async storage
        AsyncStorage.clear();
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'Login'}],
          });
        }, 2000);
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Error', error.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Reset Password</Text>
        {/* res */}
        <Text>Reset your password here</Text>
        <TextInput
          placeholder="Password"
          secureTextEntry={false}
          selectTextOnFocus={true}
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          placeholderTextColor="#a9a9a9" // Set your desired color here
        />
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry={false}
          selectTextOnFocus={true}
          value={cnfPassword}
          onChangeText={text => setCnfPassword(text)}
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

export default ResetPasswordScreen;

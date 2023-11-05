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

const API_ENDPOINT =
  'https://purple-earthworm-sock.cyclic.app/api/v1/query/querySave';

const QueryHelp = ({navigation}) => {
  const [query, setQuery] = useState('');
  const [token, setAuthToken] = useState('');

  const handleLogin = async () => {
    if (!query) {
      ToastAndroid.show('Please enter your query', ToastAndroid.SHORT);
      return;
    }

    AsyncStorage.getItem('token').then(token => {
      setAuthToken(token.slice(1, -1));
    });
    console.log(token);

    const url =
      'https://purple-earthworm-sock.cyclic.app/api/v1/query/querySave';
    const data = {query: query};
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        // clear the state
        setQuery('');
        ToastAndroid.show('Query sent successfully', ToastAndroid.SHORT);
      })
      .catch(error => {
        console.error('Error sending query:', error);
        ToastAndroid.show('Error sending query', ToastAndroid.SHORT);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Write your Query</Text>
        <TextInput
          placeholder="Write your Query"
          secureTextEntry={false}
          selectTextOnFocus={true}
          value={query}
          onChangeText={text => setQuery(text)}
          style={styles.input}
          placeholderTextColor="#a9a9a9"
        />

        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.signInButton}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'normal',
    color: 'black',
    marginBottom: 10,
    marginTop: 10,
  },
  input: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'black',
    width: 350,
    textAlignVertical: 'top',

    height: 200, // Adjust the height according to your requirements
    borderRadius: 8,
    paddingHorizontal: 20,
    color: 'black',
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
    width: 350,
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

export default QueryHelp;

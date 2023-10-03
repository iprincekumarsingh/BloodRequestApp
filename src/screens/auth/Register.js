import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function Register({navigation}) {
  return (
    <SafeAreaView style={[styles.container]}>
      <View>
        <Text style={[styles.title]}>Sign up! </Text>
        <TextInput
          placeholder="Name"
          secureTextEntry={true}
          selectTextOnFocus={true}
          style={[styles.input]}
        />
        <TextInput
          placeholder="Addhar Number"
          secureTextEntry={false}
          autoFocus={true}
          keyboardAppearance='dark'
          returnKeyLabel='next'
          style={[styles.input]}
        />
        <TextInput
          placeholder="Mobile Number"
          secureTextEntry={true}
          autoFocus={true}
          keyboardType='numeric'
          style={[styles.input]}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={[styles.input]}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={[styles.input]}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={[styles.input]}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={[styles.input]}
        />

        <TouchableOpacity>
          <Text
            style={{
              marginTop: 10,
              width: 300,
              padding: 14,
              backgroundColor: '#5B0888',
              color: 'white',
              textAlign: 'center',
              borderRadius: 8,
            }}>
            Register
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            marginTop: 10,
          }}>
          <Text
            style={{
              marginTop: 1,
              color: 'black',
            }}>
            Don't have an account?{' '}
            <Text
              onPress={() => {
                navigation.navigate('Login');
              }}
              style={{color: '#713ABE', fontWeight: 'bold'}}>
              Login
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

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
    width: 300,
    borderRadius: 8,
    paddingHorizontal: 20,
    color: 'black',
    backgroundColor: '#F1EFEF',
  },
});

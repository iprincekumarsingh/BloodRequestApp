import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CommonActions} from '@react-navigation/native';

export default function Login({navigation}) {
  return (
    <SafeAreaView style={[styles.container]}>
      <View>
        <Text style={[styles.title]}>Sign In </Text>
        <TextInput
          placeholder="Email"
          secureTextEntry={true}
          selectTextOnFocus={true}
          style={[styles.input]}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={[styles.input]}
        />
        <Text style={{marginTop: 10, color: 'black'}}>
          Forgot Password?{' '}
          <Text style={{color: '#713ABE', fontWeight: 'bold'}}>Reset</Text>
        </Text>
        <TouchableOpacity
          onPress={() => {
           navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'BottomNavigation'}],
              }),
            );
          }}>
          <Text
            style={{
              marginTop: 10,
              width: 320,
              padding: 14,
              backgroundColor: '#5B0888',
              color: 'white',
              textAlign: 'center',
              borderRadius: 8,
            }}>
            Sign In
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
                navigation.navigate('Register');
              }}
              style={{color: '#713ABE', fontWeight: 'bold'}}>
              Sign Up
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
    width: 320,
    borderRadius: 8,
    paddingHorizontal: 20,
    color: 'black',
    backgroundColor: '#F1EFEF',
  },
});

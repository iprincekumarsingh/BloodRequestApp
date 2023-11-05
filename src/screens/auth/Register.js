import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SelectDropdown from 'react-native-select-dropdown';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios'; // Import Axios for making HTTP requests

export default function Register({navigation}) {
  const bloodGroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [addhar, setAddhar] = useState('');
  const [mobile, setMobile] = useState('');
  const [pincode, setPincode] = useState('');
  const [userBloodGroup, setUserBloodGroup] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false); // State for checkbox
  const [selectedCity, setSelectedCity] = useState(''); // State for dropdown
  const cities = [
    'Bhubaneswar',
    'Cuttack',
    'Rourkela',
    'Brahmapur',
    'Sambalpur',
    'Puri',
    'Balasore',
    'Bhadrak',
    'Baripada',
    'Jharsuguda',
    'Jeypore',
    'Bargarh',
    'Rayagada',
    'Bhawanipatna',
    'Dhenkanal',
    'Barbil',
    'Kendujhar',
    'Sunabeda',
    'Paradip',
  ];

  const handleRegister = async () => {
    // Check if all fields are filled in

    if (!termsAccepted) {
      // Check if terms and conditions are accepted
      console.warn('Please accept the terms and conditions');
      return;
    }

    console.log(
      name,
      email,
      addhar,
      mobile,
      selectedCity,
      userBloodGroup,
      password,
      address,
    );

    // https://purple-earthworm-sock.cyclic.app/api/v1/auth/signup

    await axios
      .post('https://purple-earthworm-sock.cyclic.app/api/v1/auth/signup', {
        // .post('http://10.0.2.2:5000/api/v1/auth/signup', {
        name,
        email,
        aadharcard: addhar,
        phone: mobile,
        city: selectedCity,
        bloodGroup: userBloodGroup,
        password,
        address,
        tnc: true,
      })
      .then(response => {
        console.log(response.data);
        navigation.navigate('Login');
      })
      .catch(error => {
        ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
      });
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={[styles.title]}>Sign up!</Text>
        <TextInput
          placeholder="Name"
          selectTextOnFocus={true}
          style={[styles.input]}
          value={name}
          onChangeText={text => setName(text)}
          placeholderTextColor="#a9a9a9" // Set your desired color here
        />
        <TextInput
          placeholder="Email"
          selectTextOnFocus={true}
          style={[styles.input]}
          value={email}
          onChangeText={text => setEmail(text)}
          placeholderTextColor="#a9a9a9"
        />
        {/* <TextInput
          placeholder="Addhar Number"
          secureTextEntry={false}
          autoFocus={true}
          keyboardAppearance="dark"
          returnKeyLabel="next"
          style={[styles.input]}
          value={addhar}
          onChangeText={text => setAddhar(text)}
        /> */}
        <TextInput
          placeholder="Mobile Number"
          secureTextEntry={false}
          autoFocus={true}
          keyboardType="numeric"
          style={[styles.input]}
          value={mobile}
          onChangeText={text => setMobile(text)}
          placeholderTextColor="#a9a9a9"
        />
        <View style={styles.dropdownContainer}>
          <SelectDropdown
            defaultButtonText="Select City"
            style={styles.dropdown}
            data={cities}
            search
            onSelect={(selectedItem, index) => {
              setSelectedCity(selectedItem);
            
            }}
          />
        </View>
        <TextInput
          placeholder="Address"
          secureTextEntry={false}
          style={[styles.input]}
          value={address}
          onChangeText={text => setAddress(text)}
          placeholderTextColor="#a9a9a9"
        />
        <View style={styles.dropdownContainer}>
          <SelectDropdown
            defaultButtonText="Select Blood Group"
            style={styles.dropdown}
            data={bloodGroup}
            onSelect={(selectedItem, index) => {
              setUserBloodGroup(selectedItem);
            }}
          />
        </View>
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={[styles.input]}
          value={password}
          onChangeText={text => setPassword(text)}
          placeholderTextColor="#a9a9a9"
        />

        <View style={styles.checkboxContainer}>
          <CheckBox tintColors='black' value={termsAccepted} onValueChange={setTermsAccepted} />
          <Text style={{
            color: 'black',
          }}>I accept the terms and conditions</Text>
        </View>

        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.registerButton}>Register</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={{marginTop: 1, color: 'black'}}>
            Don't have an account?{' '}
            <Text
              onPress={() => {
                navigation.navigate('Login');
              }}
              style={styles.loginLink}>
              Login
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'start',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
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
  dropdownContainer: {
    marginVertical: 10,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    textAlign: 'start',
    borderWidth: 1,
    borderColor: 'black',
  },
  dropdown: {
    width: 300, // Customize the width if needed
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'start',
    marginTop: 10,
  },
  registerButton: {
    width: 300,
    padding: 14,
    marginTop: 10,
    backgroundColor: '#5B0888',
    color: 'white',
    textAlign: 'center',
    borderRadius: 8,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  loginLink: {
    color: '#713ABE',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

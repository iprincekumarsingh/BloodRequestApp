import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';

const HomeScreen = () => {
  const bloodGroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const [dropdownVisible, setDropdownVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Send Blood Request</Text>

        <TextInput label="Area Pincode" mode="outlined" style={styles.input} />

        <View style={styles.dropdownContainer}>
          <SelectDropdown
            defaultButtonText="Select Blood Group"
            style={styles.dropdown}
            data={bloodGroup}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
              setDropdownVisible(false); // Close the dropdown after selection
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            overlayStyle={
              dropdownVisible ? styles.overlayVisible : styles.overlayHidden
            }
            onDropdownShow={() => setDropdownVisible(true)}
            onDropdownClose={() => setDropdownVisible(false)}
          />
        </View>

        <TextInput 
        s
        label="Upload Prescription" mode="outlined" style={styles.input} />

        <Button mode="contained" style={styles.button}>
          Send Request
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  card: {
    width: 330,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginTop: 10,
    width: '100%',
    backgroundColor: '#ffffff',
  },
  dropdownContainer: {
    marginTop: 10,
    width: '100%',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  dropdown: {
    backgroundColor: '#ffffff',
    borderWidth: 0,
  },
  overlayVisible: {
    width: '100%', // Centered width
    alignSelf: 'center',
  },
  overlayHidden: {
    width: 0, // Hidden width
    alignSelf: 'center',
  },
  button: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#ff6347',
  },
});

export default HomeScreen;

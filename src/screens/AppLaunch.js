import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import React from 'react';

const AppLaunch = ({navigation}) => {
  return (
    <View
      style={{
        height: 'auto',
        flex: 1,
        flexDirection: 'row',
        gap: 20,
      }}>
      <TouchableOpacity onPress={() => navigation.navigate('BottomNavigation')}>
        <View
          style={{
            marginLeft: 10,
            marginTop: 20,
            alignContent: 'center',
            justifyContent: 'center',
            marginTop: 10,
            borderColor: 'black',
            borderStyle: 'solid',
            borderRadius: 40,
            gap: 10,
            width: 80,
          }}>
          <Image
            style={{width: 60, height: 60, marginTop: 10}}
            source={require('../../assets/blood.png')}
          />
          <Text style={{fontWeight: 'bold', fontSize: 15,color:'#212122'}}>Blood Bank</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          Alert.alert(
            'Coming Soon',
            'This feature is not available yet',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
            ],
            {cancelable: false},
          )
        }>
        <View
          style={{
            marginLeft: 10,
            alignContent: 'center',
            justifyContent: 'center',
            marginTop: 10,
            borderColor: 'black',
            borderStyle: 'solid',
            borderRadius: 40,
            width: 200,
            height: 90,
          }}>
          <Image
            style={{width: 75, height: 75, marginTop: 10}}
            source={require('../../assets/comingsoon.png')}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AppLaunch;

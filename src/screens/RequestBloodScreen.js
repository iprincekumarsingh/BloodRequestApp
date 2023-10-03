import {View, Text, ScrollView, Image} from 'react-native';
import React from 'react';

const RequestBloodScreen = () => {
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'start',
          alignItems: 'start',
          backgroundColor: '#fff',
        }}>
        <View
          style={{
            borderWidth: 1,
            margin: 10,
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderRadius: 10,
          }}>
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'medium',
                color: 'black',
              }}>
              Prince Kumar Singh
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'medium',
                color: 'black',
                marginTop: 10,
              }}>
              Request Blood : A+
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'medium',
                color: 'black',
                marginTop: 10,
              }}>
              Pincode : 754021
            </Text>
          </View>
          <Image
            style={{
              width: 40,
              height: 40,
              borderRadius: 100,
              marginTop: 10,
            }}
            source={require('../../assets/logo.png')}
          />
        </View>
        <View
          style={{
            borderWidth: 1,
            margin: 10,
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderRadius: 10,
          }}>
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'medium',
                color: 'black',
              }}>
              Prince Kumar Singh
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'medium',
                color: 'black',
                marginTop: 10,
              }}>
              Request Blood : A+
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'medium',
                color: 'black',
                marginTop: 10,
              }}>
              Pincode : 754021
            </Text>
          </View>
          <Image
            style={{
              width: 40,
              height: 40,
              borderRadius: 100,
              marginTop: 10,
            }}
            source={require('../../assets/logo.png')}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default RequestBloodScreen;

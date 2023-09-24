import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

const CitiesScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        contentInsetAdjustmentBehavior="automatic"
        style={[{height: '100%'}]}>
        <View
          style={[
            {
              paddingVertical: 20,
              paddingHorizontal: 20,
              flex: 1,
            },
          ]}>
          <Text style={{color: '#FFBD61', fontSize: 24, fontWeight: 'bold'}}>
            {' '}
            <Image
              source={require('../assets/img/icon-saved-location.png')}
            />{' '}
            Favorite location
          </Text>
          <View
            style={{
              backgroundColor: '#E3EFEF',
              padding: 30,
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <Text style={{color: '#333', fontSize: 14}}>
              No favorite location
            </Text>
          </View>
          <Text style={{color: '#FFBD61', fontSize: 24, fontWeight: 'bold'}}>
            {' '}
            <Image
              source={require('../assets/img/icon-saved-location.png')}
            />{' '}
            Saved location
          </Text>
          <View
            style={{
              backgroundColor: '#E3EFEF',
              padding: 30,
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <Text style={{color: '#333', fontSize: 14}}>No saved location</Text>
          </View>
        </View>
        <View style={styles.navigationBar}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image source={require('../assets/img/navbar/icon-home.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Cities')}>
            <Image
              source={require('../assets/img/navbar/icon-location-active.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Maps')}>
            <Image source={require('../assets/img/navbar/icon-map.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Image source={require('../assets/img/navbar/icon-settings.png')} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  navigationBar: {
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    left: 0,
    right: 0,
    backgroundColor: '#78D5D7',
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default CitiesScreen;

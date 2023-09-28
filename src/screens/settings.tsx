import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

const SettingsScreen = ({navigation}) => {
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
          ]}></View>
        <View style={styles.navigationBar}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image source={require('../assets/img/navbar/icon-home.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Cities')}>
            <Image source={require('../assets/img/navbar/icon-location.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Maps')}>
            <Image source={require('../assets/img/navbar/icon-map.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Image
              source={require('../assets/img/navbar/icon-settings-active.png')}
            />
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

export default SettingsScreen;

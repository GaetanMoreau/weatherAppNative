import React from 'react';
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
          <View style={styles.sectionTitleContainer}>
            <Image source={require('../assets/img/icon-saved-location.png')} />
            <Text style={styles.sectionTitle}>Favorite location</Text>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionEmptyText}>No favorite location</Text>
          </View>
          <View style={styles.sectionTitleContainer}>
            <Image source={require('../assets/img/icon-saved-location.png')} />
            <Text style={styles.sectionTitle}>Saved location</Text>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionEmptyText}>No saved location</Text>
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
  sectionTitleContainer:{
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  },
  sectionTitle: {
    color: '#FFBD61',
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionContainer: {
    backgroundColor: '#E3EFEF',
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  sectionEmptyText: {
    color: '#333',
    fontSize: 14,
  },
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

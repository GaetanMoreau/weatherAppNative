import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  Pressable,
} from 'react-native';
import {TemperatureUnitContext} from '../components/TemperatureUnitContext';

const SettingsScreen = ({navigation}: any) => {
  const {unit, setUnit} = useContext(TemperatureUnitContext);

  const getButtonStyle = (buttonUnit: string) => {
    return [
      styles.settingsButton,
      unit === buttonUnit ? styles.selectedButton : {},
    ];
  };
  const getTextStyle = (buttonUnit: string) => {
    return [styles.buttonText, unit === buttonUnit ? styles.selectedText : {}];
  };

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
          <View style={styles.settingsContainer}>
            <Text style={styles.settingsTitle}>Weather settings</Text>
            <View style={styles.settingsItem}>
              <Text>Temperature units</Text>
              <View style={styles.settingsButtonsContainer}>
                <Pressable
                  style={getButtonStyle('metric')}
                  onPress={() => setUnit('metric')}>
                  <Text style={getTextStyle('metric')}>°C</Text>
                </Pressable>
                <Pressable
                  style={getButtonStyle('imperial')}
                  onPress={() => setUnit('imperial')}>
                  <Text style={getTextStyle('imperial')}>°F</Text>
                </Pressable>
                <Pressable
                  style={getButtonStyle('standard')}
                  onPress={() => setUnit('standard')}>
                  <Text style={getTextStyle('standard')}>°K</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
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
  settingsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  settingsTitle: {
    color: '#FFBD61',
    fontSize: 18,
    fontWeight: 'bold',
  },
  settingsItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
  },
  settingsButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
  },
  settingsButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderWidth: 3,
    borderColor: '#FFBD61',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: '#FFBD61',
  },
  selectedButton: {
    backgroundColor: '#FFBD61',
    borderColor: '#FFBD61',
  },
  selectedText: {
    color: '#fff',
  },
});

export default SettingsScreen;

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React,  { useState } from 'react';
import HomeScreen from './screens/home';
import CitiesScreen from './screens/cities';
import MapsScreen from './screens/maps';
import SettingsScreen from './screens/settings';
import WeatherScreen from './screens/weather'
import CustomHeader from './components/customHeader';
import { Image, View, Text, TextInput, StyleSheet} from 'react-native';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const [searchText, setSearchText] = useState('');
    const handleSearch = () => {
      alert(`Recherche : ${searchText}`);
    };
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            header: () => <CustomHeader />,
          }}
        />

        <Stack.Screen name="Cities" component={CitiesScreen}
                  options={{
                    headerBackground: () => (
                      <View style={{ backgroundColor: '#78D5D7', height: 100 }} />
                    ),
                    headerTitle: () => (
                    <View style={{ flexDirection: 'column'}}>
                       <Text style={{color: "#fff", fontSize: 18}}>My locations</Text>
                     </View>
                    )
                  }}
        />
        <Stack.Screen
                  name="Maps"
                  component={MapsScreen}
                  options={{
                    headerBackground: () => (
                      <View style={{ backgroundColor: '#78D5D7', height: 100 }} />
                    ),
                    headerTitle: () => (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                       <Text style={{color: "#fff", fontSize: 18}}>Weather map</Text>
                     </View>
                    )
                  }}
                />
                <Stack.Screen
                          name="Settings"
                          component={SettingsScreen}
                          options={{
                            headerBackground: () => (
                              <View style={{ backgroundColor: '#78D5D7', height: 100 }} />
                            ),
                            headerTitle: () => (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                               <Text style={{color: "#fff", fontSize: 18}}>My settings</Text>
                             </View>
                            )
                          }}
                        />
                                        <Stack.Screen
                                                  name="Weather"
                                                  component={WeatherScreen}
                                                  options={{
                                                    headerBackground: () => (
                                                      <View style={{ backgroundColor: '#78D5D7', height: 100 }} />
                                                    ),
                                                    headerTitle: () => (
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                       <Text style={{color: "#fff", fontSize: 18}}>My results</Text>
                                                     </View>
                                                    )
                                                  }}
                                                />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
    searchInput: {
      borderRadius: 20,
      backgroundColor: "#FFCE69",
      color: "#fff",
      padding: 8,
      width: '100%',
    },
});

export default Navigation;

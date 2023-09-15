import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React,  { useState } from 'react';
import HomeScreen from './screens/home';
import CitiesScreen from './screens/cities';
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
            headerBackground: () => (
              <View style={{ backgroundColor: '#78D5D7', height: 100 }} />
            ),
            headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={require('./assets/img/weather-logo.png')}
                style={{ width: 220, height: 50 }}
              />
             </View>
            )
          }}
        />
        <Stack.Screen name="Cities" component={CitiesScreen}
                  options={{
                    headerBackground: () => (
                      <View style={{ backgroundColor: '#78D5D7', height: 100 }} />
                    ),
                    headerTitle: () => (
                    <View style={{ flexDirection: 'column'}}>
                       <Text>My locations</Text>
                                   <TextInput
                                      style={styles.searchInput}
                                   placeholder="Search for a city..."
                                   onChangeText={(text) => setSearchText(text)}
                                   value={searchText}
                                   />
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

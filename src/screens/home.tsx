import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';

const HomeScreen = ({navigation}) => {
  const apitest = 'http://api.openweathermap.org/geo/1.0/direct?q=';
  const apiparameters = '&limit=5&appid=e9dc99afbc546d6cc751364d2fe638e6';
  const apikey = 'e9dc99afbc546d6cc751364d2fe638e6';

  const [searchText, setSearchText] = useState('');
  const [searchUrl, setSearchUrl] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleSearch = () => {
    const encodedSearchText = encodeURIComponent(searchText);
    const search = apitest + encodedSearchText + apiparameters;
    setSearchUrl(search);

    fetch(search)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.length > 0) {
          const firstCity = data[0];
          const {lat, lon} = firstCity;

          const weatherApiUrl =
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=` +
            apikey;
          fetch(weatherApiUrl)
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(weatherData => {
              setWeatherData(weatherData);
              navigation.navigate('Weather', {weatherData});
            })
            .catch(error => {
              console.error('Weather Fetch Error:', error);
            });
        }
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
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
              paddingVertical: 40,
              paddingHorizontal: 20,
              flex: 1,
            },
          ]}>
          <Text style={[styles.homeDescription]}>
            Welcome to MyWeather ! You don't have any cities in your favorites,
            you can search for the weather of the desired city by using the
            search bar.
          </Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for a city..."
            onChangeText={text => setSearchText(text)}
            value={searchText}
          />
          <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
            <Text style={styles.searchText}>Submit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.navigationBar}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image
              source={require('../assets/img/navbar/icon-home-active.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Cities')}>
            <Image source={require('../assets/img/navbar/icon-location.png')} />
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
  homeDescription: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    textAlign: 'center',
  },
  searchInput: {
    borderRadius: 20,
    backgroundColor: '#FFCE69',
    color: '#fff',
    padding: 8,
    width: '100%',
    marginBottom: 32,
    marginTop: 32,
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
  searchButton: {
    backgroundColor: '#78D5D7',
    padding: 10,
    borderRadius: 5,
  },
  searchText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default HomeScreen;

import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {TemperatureUnitContext} from '../components/TemperatureUnitContext';

const HomeScreen = ({navigation}: any) => {
  const apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=';
  const apiParameters = '&limit=5&appid=e9dc99afbc546d6cc751364d2fe638e6';
  const apiKey = 'e9dc99afbc546d6cc751364d2fe638e6';

  const [searchText, setSearchText] = useState('');
  const [searchUrl, setSearchUrl] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  const {unit} = useContext(TemperatureUnitContext);

  interface Commune {
    nom: string;
    departement: {
      code: string;
    };
  }

  const communes: Commune[] = [];

  const allCommunes: string[] = [];
  const urlCommunes =
    'https://geo.api.gouv.fr/communes?&fields=departement&boost=population';

  function getJson(url: string) {
    return fetch(url).then(resp => resp.json());
  }

  function getData() {
    const communesP = getJson(urlCommunes).catch(() => null);

    return Promise.all([communesP])
      .then(([communes]) => {
        communes.forEach(function (data: Commune) {
          const communesName = data.nom;
          const communesCode = data.departement.code;
          allCommunes.push(communesName + ' - ' + communesCode);
        });
      })
      .catch(e => {
        console.error('An error occured...', e);
      });
  }

  getData();

  const handleInputChange = (text: string) => {
    const filteredData = allCommunes.filter(item =>
      item.toLowerCase().startsWith(text.toLowerCase()),
    );
    setFilteredData(filteredData);
  };

  const handleSearch = (searchText: string) => {
    searchText = searchText.split(' - ')[0];
    const encodedSearchText = encodeURIComponent(searchText);
    const search = apiUrl + encodedSearchText + apiParameters;
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
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=` +
            apiKey;
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
      <View
        style={[
          {
            paddingVertical: 40,
            paddingHorizontal: 20,
          },
        ]}>
        <Text style={[styles.homeDescription]}>
          Welcome to MyWeather ! You don't have any cities in your favorites,
          you can search for the weather of the desired city by using the search
          bar.
        </Text>
        <TextInput
          style={styles.searchInputText}
          onChangeText={handleInputChange}
          value={this.inputText}
          placeholder="Search for a city (France only)"
        />
        {filteredData.length > 0 && (
          <FlatList
            style={styles.suggestionsList}
            data={filteredData}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => handleSearch(item)}>
                <Text style={styles.suggestionsItem}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item}
          />
        )}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  homeDescription: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    textAlign: 'center',
    paddingBottom: 20,
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
  searchText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
  },
  suggestionsList: {
    borderWidth: 1,
    borderTopWidth: 0,
  },
  suggestionsItem: {
    padding: 8,
    paddingVertical: 10,
    color: '#000',
    borderBottomWidth: 1,
    borderColor: 'rgba(222, 220, 220, 0.60)',
  },
  searchInputText: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    color: 'black',
  },
});

export default HomeScreen;

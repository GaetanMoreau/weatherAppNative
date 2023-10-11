import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {WeatherApiContext} from '../components/WeatherApiContext';
import {TemperatureUnitContext} from '../components/TemperatureUnitContext';

const CitiesScreen = ({navigation}: any) => {
  interface IWeatherData {
    city: {
      name: string;
      country: string;
    };
    list: {
      main: {
        temp: number;
      };
      weather: {
        icon: string;
      }[];
    }[];
  }

  const {weatherApiUrls} = useContext(WeatherApiContext);
  const {unit} = useContext(TemperatureUnitContext);

  const [weatherDataList, setWeatherDataList] = useState<IWeatherData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const adjustedUrls = weatherApiUrls.map(url => {
          const hasUnits = url.includes('units=');

          if (hasUnits) {
            return url.replace(/(units=)[^\&]+/, `$1${unit}`);
          } else {
            const separator = url.includes('?') ? '&' : '?';
            return `${url}${separator}units=${unit}`;
          }
        });

        const promises = adjustedUrls.map(url =>
          fetch(url).then(response => response.json()),
        );

        const results = await Promise.all(promises);

        setWeatherDataList(results);
        setLoading(false);
      } catch (err) {
        console.error('Error during the fetch', err);
        setLoading(false);
      }
    };

    if (weatherApiUrls.length > 0) {
      fetchWeatherData();
    } else {
      setLoading(false);
    }
  }, [weatherApiUrls, unit]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const handlePressCity = (weatherData: any, weatherApiUrl: string) => {
    navigation.navigate('Weather', {weatherData, weatherApiUrl});
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
          <View style={styles.sectionTitleContainer}>
            <Image source={require('../assets/img/icon-saved-location.png')} />
            <Text style={styles.sectionTitle}>Favorite location</Text>
          </View>
          {weatherDataList.length === 0 ? (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionEmptyText}>No favorite location</Text>
            </View>
          ) : (
            weatherDataList.map((weather, index) => (
              <TouchableOpacity
                key={index}
                style={styles.sectionContainer}
                onPress={() => handlePressCity(weather, weatherApiUrls[index])} // assurez-vous que weatherApiUrls[index] est correct
              >
                <View>
                  <Text style={styles.cityName}>{weather.city.name}</Text>
                  <Text style={styles.countryName}>{weather.city.country}</Text>
                </View>
                <View style={styles.weatherContainer}>
                  <Image
                    style={styles.weatherIcon}
                    source={{
                      uri: `https://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`,
                    }}
                  />
                  <Text style={styles.temperature}>
                    {Math.floor(weather.list[0].main.temp)}°
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          )}
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
  sectionTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#FFBD61',
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionContainer: {
    backgroundColor: '#E3EFEF',
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
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
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  cityName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  countryName: {
    fontSize: 14,
  },
  weatherContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weatherIcon: {
    width: 50,
    height: 50,
  },
  temperature: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default CitiesScreen;

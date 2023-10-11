import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useRoute} from '@react-navigation/native';

const WeatherScreen = ({navigation}:any) => {
  const route = useRoute();
  const {weatherData}:any = route.params;
  const weather = weatherData.list[0];

  const formatDate = (dateString:string) => {
    const date = new Date(dateString);
    const today = new Date();

    const day = date.getDate();
    const month = date.toLocaleString('default', {month: 'short'});

    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return `Today, ${day} ${month}`;
    } else {
      return `${day} ${month}`;
    }
  };

  const formattedDate = formatDate(weather.dt_txt);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        contentInsetAdjustmentBehavior="automatic"
        style={{height: '100%'}}>
        <View style={styles.container}>
          <View style={styles.location}>
            <Text style={styles.locationText}>
              {`${weatherData.city.name}, ${weatherData.city.country}`}
            </Text>
            <Text style={styles.addToLocation}>Add to your location</Text>
          </View>
          <View style={styles.weatherInfo}>
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
              }}
              style={styles.weatherImage}
            />
            <View style={styles.weatherDetails}>
              <Text style={styles.date}>{formattedDate}</Text>
              <Text style={styles.temperature}>{`${Math.floor(
                weather.main.temp,
              )}°`}</Text>
              <Text style={styles.description}>
                {weather.weather[0].description}
              </Text>
            </View>
            <View style={styles.additionalInfo}>
              <View style={styles.additionalInfoItem}>
                <Image
                  style={styles.infoImage}
                  source={require('../assets/img/icon-wind.png')}
                />
                <Text
                  style={styles.infoText}>{`${weather.wind.speed} m/s`}</Text>
              </View>
              <View style={styles.additionalInfoItem}>
                <Image
                  style={styles.infoImage}
                  source={require('../assets/img/icon-humidity.png')}
                />
                <Text
                  style={styles.infoText}>{`${weather.main.humidity}%`}</Text>
              </View>
              <View style={styles.additionalInfoItem}>
                <Image
                  style={styles.infoImage}
                  source={require('../assets/img/icon-thermometer.png')}
                />
                <Text style={styles.infoText}>
                  {`${Math.floor(weather.main.temp_min)}°/${Math.floor(
                    weather.main.temp_max,
                  )}°`}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.weatherInfoList}>
            {weatherData.list.slice(0, 6).map((weatherItem:any, index:number) => {
              const dateTime = new Date(weatherItem.dt_txt);
              const hour = dateTime.getHours();
              const minute = dateTime.getMinutes();

              const formattedTime = `${hour}h${
                minute < 10 ? '0' : ''
              }${minute}`;

              return (
                <View key={index}>
                  <View style={styles.weatherDetailsList}>
                    <Text style={styles.date}>{formattedTime}</Text>
                    <Image
                      source={{
                        uri: `https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png`,
                      }}
                      style={styles.weatherImageList}
                    />
                    <Text style={styles.date}>{`${Math.floor(
                      weatherItem.main.temp,
                    )}°`}</Text>
                  </View>
                </View>
              );
            })}
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
            <Image source={require('../assets/img/navbar/icon-settings.png')} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flex: 1,
  },
  location: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  locationText: {
    textTransform: 'uppercase',
    color: '#000',
    fontSize: 16,
  },
  addToLocation: {
    color: '#FFBD61',
    fontSize: 14,
  },
  infoImage: {
    width: 22,
    height: 22,
  },
  weatherInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weatherInfoList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  weatherIcon: {
    fontSize: 16,
  },
  weatherDetails: {
    flexDirection: 'column',
  },
  weatherDetailsList: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  date: {
    color: '#000',
    fontSize: 18,
  },
  temperature: {
    color: '#000',
    fontSize: 36,
    fontWeight: '700',
  },
  description: {
    color: '#000',
    fontSize: 18,
    textTransform: 'capitalize',
  },
  additionalInfo: {
    flexDirection: 'column',
    gap: 10,
  },
  additionalInfoItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    color: '#000',
    fontSize: 18,
  },
  weatherImage: {
    width: 100,
  },
  weatherImageList: {
    width: 40,
    height: 40,
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

export default WeatherScreen;

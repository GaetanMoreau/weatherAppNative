import React from 'react';
import {WebView} from 'react-native-webview';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

const MapsScreen = ({navigation}:any) => {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Weather Map</title>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        />
        <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
      </head>
      <body>
        <div id="map" style="height: 100vh;"></div>
        <script>
          var map = L.map('map').setView([0, 0], 3);
          L.tileLayer('https://tile.openweathermap.org/map/{layer}/{z}/{x}/{y}.png?appid=e9dc99afbc546d6cc751364d2fe638e6', {
            maxZoom: 19,
            layer: 'temp_new',
          }).addTo(map);
        </script>
      </body>
    </html>
  `;

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        contentInsetAdjustmentBehavior="automatic"
        style={[{height: '100%'}]}>
        <WebView source={{html}} style={{flex: 1}} />
        <View style={styles.navigationBar}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image source={require('../assets/img/navbar/icon-home.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Cities')}>
            <Image source={require('../assets/img/navbar/icon-location.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Maps')}>
            <Image
              source={require('../assets/img/navbar/icon-map-active.png')}
            />
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

export default MapsScreen;

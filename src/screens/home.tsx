import React,  { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, StyleSheet, TextInput, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
    const handleSearch = () => {
      alert(`Recherche : ${searchText}`);
    };
  return (
<SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={[{height: "100%"}]}>
        <View
          style={[
             styles.sectionDescription,
             {
            padding: 40,
            height: 600
          }]}>
          <Text style={{textAlign: 'center',}}>
            Welcome to MyWeather ! You don't have any cities in your favorites, you can search for the weather of the desired city by using the search bar.
          </Text>
            <TextInput
               style={styles.searchInput}
            placeholder="Search for a city..."
            onChangeText={(text) => setSearchText(text)}
            value={searchText}
            />
          <Text style={{textAlign: 'center',}}>
            Or activate your location services to display the nearest city.
          </Text>
            <Button
              title="Go to Cities"
              onPress={() => navigation.navigate('Cities')}
            />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000',
  },
  highlight: {
    fontWeight: '700',
  },
    searchInput: {
      borderRadius: 20,
      backgroundColor: "#FFCE69",
      color: "#fff",
      padding: 8,
      width: '100%',
      marginBottom: 32,
      marginTop: 32,
    },
});

export default HomeScreen;

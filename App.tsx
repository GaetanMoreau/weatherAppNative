/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import Navigation from './src/Navigation';
import {TemperatureUnitContext} from './src/components/TemperatureUnitContext';
import {WeatherApiContext} from './src/components/WeatherApiContext';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): JSX.Element {
  const [unit, setUnit] = useState<'metric' | 'imperial' | 'standard'>(
    'metric',
  );
  const [weatherApiUrls, setWeatherApiUrls] = useState<string[]>([]);

  return (
    <TemperatureUnitContext.Provider value={{unit, setUnit}}>
      <WeatherApiContext.Provider value={{weatherApiUrls, setWeatherApiUrls}}>
        <Navigation />
      </WeatherApiContext.Provider>
    </TemperatureUnitContext.Provider>
  );
}
export default App;

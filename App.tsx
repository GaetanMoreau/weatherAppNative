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

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): JSX.Element {
  const [unit, setUnit] = useState<'metric' | 'imperial' | 'standard'>(
    'metric',
  );
  return (
    <TemperatureUnitContext.Provider value={{unit, setUnit}}>
      <Navigation />
    </TemperatureUnitContext.Provider>
  );
}
export default App;

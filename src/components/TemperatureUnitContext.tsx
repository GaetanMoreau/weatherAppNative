import React from 'react';

interface TemperatureUnitContextProps {
  unit: 'metric' | 'imperial' | 'standard';
  setUnit: (unit: 'metric' | 'imperial' | 'standard') => void;
}

export const TemperatureUnitContext = React.createContext<TemperatureUnitContextProps>({
  unit: 'metric',
  setUnit: unit => {},
});

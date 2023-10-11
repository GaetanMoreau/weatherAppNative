import React from 'react';

interface WeatherApiContextType {
  weatherApiUrls: string[];
  setWeatherApiUrls: React.Dispatch<React.SetStateAction<string[]>>;
}

export const WeatherApiContext = React.createContext<WeatherApiContextType>({
  weatherApiUrls: [],
  setWeatherApiUrls: () => {},
});

import MainRouter from './navigation/mainRouter';
import './App.css';
import { useEffect } from 'react';
// import { weatherService } from '@services/weatherService';
// import { geoDecodingService } from '@services/geoDecodingService';

function App() {
  useEffect(() => {
    // weatherService.getWeatherByCityName('Madrid').then(console.log);
    // geoDecodingService.getLocationByCityName('Madrid').then(console.log);
  }, []);
  return <MainRouter />;
}

export default App;

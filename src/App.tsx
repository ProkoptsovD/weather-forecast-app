import MainRouter from './navigation/mainRouter';
import './App.css';
import { useEffect } from 'react';
import { weatherService } from '@services/weatherService';
import { useSelector } from 'react-redux';
import { getMyLocation } from '@store/myGeolocationSlice/myGeolocationSelectors';
// import { weatherService } from '@services/weatherService';
// import { geoDecodingService } from '@services/geoDecodingService';

function App() {
  // const { data, error, isLoading } = weatherService.useGetWeatherInSingleCityQuery('Rome');
  // const result = weatherService.useGetWeatherInMultipleCitiesQuery(['Milan', 'Napoli', 'Palermo']);
  // console.log('{ data, error, isLoading } -->', { data, error, isLoading });
  // console.log('result -->', result);
  const sd = useSelector(getMyLocation);
  console.log('sd -->', sd);

  useEffect(() => {
    // weatherService.getWeatherByCityName('Madrid').then(console.log);
    // geoDecodingService.getLocationByCityName('Madrid').then(console.log);
  }, []);
  return <MainRouter />;
}

export default App;

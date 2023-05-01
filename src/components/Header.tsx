/** LIBS */
import { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import { useDispatch, useSelector } from 'react-redux';

/** COMPONENTS */
import { Search } from '@components/Search';
import { MyLocation } from '@components/MyLocation';

/** RTK Slices */
import { Coordinates, myGeolocationSlice } from '@store/myGeolocationSlice';
import { searchCitySlice } from '@store/searchCitySlice';
import { PinnedCity, pinnedCitiesSlice } from '@store/pinnedCitiesSlice';

/** RTK Selectors */
import * as myGeolocationSelectors from '@store/myGeolocationSlice/myGeolocationSelectors';
import * as searchCitySelectors from '@store/searchCitySlice/searchCitySelectors';

/** Services */
import { weatherService } from '@services/weatherService';
import { Button } from '@mui/material';
import { ROUTER_KEYS } from '@constants/appKeys';

function Header() {
  const dispatch = useDispatch();
  const isGettingLocation = useSelector(myGeolocationSelectors.getIsGettingLocation);
  const city = useSelector(searchCitySelectors.getCity);
  const cities = weatherService.useFindCityByNameQuery(city, { skip: !city });

  const myLocation = useSelector(myGeolocationSelectors.getCurrentLocation);
  const myCity = weatherService.useGetWeatherByCityCoordsQuery(myLocation as Coordinates, {
    skip: !myLocation.latitude || !myLocation.longitude
  });

  useEffect(() => {
    if (myCity.isSuccess && myCity.data) {
      const pinnedCity: PinnedCity = {
        id: myCity.data.id,
        coord: {
          latitude: myCity.data.coord.lat,
          longitude: myCity.data.coord.lon
        }
      };
      dispatch(pinnedCitiesSlice.actions.addCityToPinned({ pinnedCity }));
    }
  }, [myCity.isSuccess, myCity.data, dispatch]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button
            href={ROUTER_KEYS.HOME}
            sx={{
              outline: 'none !important',
              minWidth: '2rem',
              minHeight: '2rem',
              aspectRatio: '1/1',
              marginRight: '0.5rem'
            }}
          >
            <HomeIcon sx={{ color: '#ffffff' }} />
          </Button>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Best weather app ever
          </Typography>
          <Search
            isLoading={cities.isLoading}
            onCitySelect={(city) => dispatch(searchCitySlice.actions.setCity({ city }))}
            cityList={cities?.data?.list}
            onAddCityToPinned={(pinnedCity) =>
              dispatch(pinnedCitiesSlice.actions.addCityToPinned({ pinnedCity }))
            }
          />
          <MyLocation
            onGeolocationSuccess={(coords) =>
              dispatch(myGeolocationSlice.actions.setMyGeolocation(coords))
            }
            onGeolocationFailure={(err) =>
              dispatch(myGeolocationSlice.actions.setMyGeolocationError(err))
            }
            onGeolocationStart={() => dispatch(myGeolocationSlice.actions.startGettingLocation())}
            onGeolocationEnd={() => dispatch(myGeolocationSlice.actions.endGettingLocation())}
            isGettingLocation={isGettingLocation}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;

/** LIBS */
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
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

function Header() {
  const dispatch = useDispatch();
  const isGettingLocation = useSelector(myGeolocationSelectors.getIsGettingLocation);
  const city = useSelector(searchCitySelectors.getCity);
  const cities = weatherService.useFindCityByNameQuery(city, { skip: !city });

  const myLocation = useSelector(myGeolocationSelectors.getCurrentLocation);
  const myCity = weatherService.useGetWeatherByCityCoordsQuery(myLocation as Coordinates, {
    skip: !myLocation.latitude || !myLocation.longitude
  });

  React.useEffect(() => {
    if (myCity.isSuccess && myCity.data) {
      const pinnedCity: PinnedCity = {
        id: myCity.data.id,
        coord: {
          latitude: myCity.data.coord.lat,
          longitude: myCity.data.coord.lon
        },
        myGeolocation: true
      };
      dispatch(pinnedCitiesSlice.actions.addCityToPinned({ pinnedCity }));
    }
  }, [myCity.isSuccess, myCity.data, dispatch]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
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

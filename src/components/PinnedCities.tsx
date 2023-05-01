import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { WeatherCardBrief, WeatherCardBriefProps } from '@components/WeatherCardBrief';
import { PinnedCity } from '@store/pinnedCitiesSlice';
import { weatherService } from '@services/weatherService';
import { ROUTER_KEYS } from '@constants/appKeys';

export default function PinnedCities({ list, onItemDelete }: PinnedCitiesProps) {
  return (
    <Box sx={{ flexGrow: 1 }} padding="1rem 0 0 0">
      <Grid container component="ul" spacing={2}>
        {list.map(({ id, coord }) => {
          return (
            <Grid item key={id} component="li" xs={4}>
              <WeatherCardBrief
                cityId={id}
                to={ROUTER_KEYS.CITY + `?lat=${coord.latitude}&lon=${coord.longitude}`}
                coord={{ lat: coord.latitude, lon: coord.longitude }}
                fetchDataFn={weatherService.useGetWeatherByCityCoordsQuery}
                onItemDelete={onItemDelete}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export type PinnedCitiesProps = {
  list: PinnedCity[];
  onItemDelete: WeatherCardBriefProps['onItemDelete'];
};

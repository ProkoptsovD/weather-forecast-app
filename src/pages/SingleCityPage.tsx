/** LIBS */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { format, differenceInHours } from 'date-fns';
import { useLocation } from 'react-router-dom';

/** ICONS */
import NavigationIcon from '@mui/icons-material/Navigation';
import ShowChartIcon from '@mui/icons-material/ShowChart';

/** constants, types, services */
import { WEATHER_API_KEYS } from '@constants/appKeys';
import { weatherService } from '@services/weatherService';
import type { City } from '@services/service';

/** COMPONENTS */
import { Loader } from '@components/Loader';
import { TemperatureChart } from '@components/TemperatureChart';

/** UTILS */
import { getDirectionByAngle } from '@utils/getDirectionByAngle';
import { appendZeros } from '@utils/appendZeros';

function SingleCityPage() {
  const { search } = useLocation();

  /** parsing query params from browser's URL */
  const qParams = new URLSearchParams(search);
  const latitude = qParams.get('lat');
  const longitude = qParams.get('lon');

  /** normalizing coords obj for requests */
  const normalizedCoords = {
    latitude: Number(latitude),
    longitude: Number(longitude)
  };

  /** getting weather in city */
  const cityWeather = weatherService.useGetWeatherByCityCoordsQuery(normalizedCoords, {
    skip: !longitude || !latitude
  });

  /** getting hourly forecast */
  const hourly = weatherService.useGetHourlyForecastByCoordinatesQuery(normalizedCoords, {
    skip: !longitude || !latitude
  });
  /** capitalizing first letter in description */
  const [weather] = cityWeather.data?.weather ?? [];
  const description = weather?.description[0]?.toUpperCase() + weather?.description?.slice(1);

  let normalizedForecast;

  /** normalizing forecast data for chart */
  if (hourly.data?.list) {
    /**
     * first we filter forecast
     * by hours differece picking up
     * only ones which belong to current date
     */
    const filtered = (hourly.data.list as City[])
      .filter(
        ({ dt }) =>
          differenceInHours(
            new Date((dt as number) * 1000),
            new Date(cityWeather.data.dt * 1000)
          ) <= 14
      )
      /** then we sort by the smallest hour */
      .sort((a: City, b: City) => (a.dt as number) - (b.dt as number));

    /**
     * sorted array we transform for chart needs
     * - setting data field with temperatures in string type to be points of chart
     * - setting labels field with hours to be on x axis
     * - y axis will be generated automatically
     */
    normalizedForecast = filtered.reduce(
      (forecast, { main, dt }) => ({
        ...forecast,
        data: [
          ...forecast.data,
          main.temp > 0
            ? `+${appendZeros(main.temp)}`
            : main.temp < 0
            ? `-${appendZeros(main.temp)}`
            : String(appendZeros(main.temp))
        ],
        labels: [...forecast.labels, format(new Date((dt as number) * 1000), 'HH:mm')]
      }),
      { data: [], labels: [] } as { data: string[]; labels: string[] }
    );
  }

  return cityWeather.isLoading ? (
    <Loader />
  ) : (
    <Box component="section" paddingTop={2}>
      <Typography variant="h1" fontSize={48} fontWeight={700} color="text.secondary">
        <Typography color="orangered">
          {format(new Date(cityWeather.data.dt * 1000), 'PPpp')}
        </Typography>
        {cityWeather.data.name} {cityWeather.data.sys.country}
      </Typography>
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <img
          src={`${WEATHER_API_KEYS.WEATHER_ICON_URL}/${cityWeather.data.weather[0].icon}.png`}
          alt={`${cityWeather.data.name}`}
        />
        <Typography sx={{ fontWeight: 700 }}>{cityWeather.data.main.temp}&#8451;</Typography>
      </Stack>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 700,
          display: 'WebkitBox',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: '1',
          overflow: 'hidden',
          marginBottom: '1.5rem'
        }}
      >
        Feels like: {cityWeather.data.main.feels_like}&#8451;. {description}
      </Typography>
      <Grid container spacing={2} width="50%">
        <Grid item xs={5} display="flex" alignItems="center" gap="0.5rem">
          <NavigationIcon sx={{ transform: 'rotate(190deg)' }} />
          <Typography>{`${cityWeather.data.wind.speed}m/s`}</Typography>
          <Typography>{getDirectionByAngle(cityWeather.data.wind.deg)}</Typography>
        </Grid>
        <Grid item xs={5} display="flex" alignItems="center" gap="0.5rem">
          <ShowChartIcon />
          <Typography>{cityWeather.data.main.pressure}hPa</Typography>
        </Grid>
        <Grid item xs={5} display="flex" alignItems="center" gap="0.5rem">
          <Typography>Humidity:</Typography>
          <Typography>{`${cityWeather.data.main.humidity}%`}</Typography>
        </Grid>
        <Grid item xs={5} display="flex" alignItems="center" gap="0.5rem">
          <Typography>Visibility:</Typography>
          <Typography>
            {cityWeather.data.visibility / 1000}
            {cityWeather.data.visibility / 1000 >= 1 ? 'km' : 'm'}
          </Typography>
        </Grid>
      </Grid>
      {normalizedForecast ? (
        <TemperatureChart data={normalizedForecast.data} labels={normalizedForecast.labels} />
      ) : null}
    </Box>
  );
}

export default SingleCityPage;

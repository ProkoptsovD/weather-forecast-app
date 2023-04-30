import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import StarIcon from '@mui/icons-material/Star';
import { useSelector } from 'react-redux';

import type { City } from '@services/service';
import * as myGeolocationSelectors from '@store/myGeolocationSlice/myGeolocationSelectors';
import { weatherService } from '@services/weatherService';
import { Stack } from '@mui/material';
import { WEATHER_API_KEYS } from '@constants/appKeys';

export function WeatherCardBrief({
  cityId,
  to,
  coord,
  fetchDataFn = weatherService.useGetWeatherByCityCoordsQuery,
  onItemDelete
}: WeatherCardBriefProps) {
  const { data, isLoading, refetch } = fetchDataFn({ latitude: coord.lat, longitude: coord.lon });
  const { latitude, longitude } = useSelector(myGeolocationSelectors.getCurrentLocation);
  const [weather] = data?.weather ?? [];

  /** capitalize first letter */
  const descr = weather?.description[0]?.toUpperCase() + weather?.description?.slice(1);
  const isMyLocationCity =
    Math.ceil(latitude as number) === Math.ceil(coord.lat as number) &&
    Math.ceil(longitude as number) === Math.ceil(coord.lon as number);

  function handleItemDelete() {
    onItemDelete(cityId);
  }

  return !isLoading && data ? (
    <Card sx={{ minWidth: 275, position: 'relative' }}>
      {isMyLocationCity ? (
        <StarIcon sx={{ position: 'absolute', right: '1rem', top: '0.5rem', color: 'gold' }} />
      ) : null}

      <CardContent>
        <Typography
          variant="h2"
          sx={{ fontSize: 14, fontWeight: 700 }}
          color="text.secondary"
          gutterBottom
        >
          {data.name}, {data.sys.country}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <img
            src={`${WEATHER_API_KEYS.WEATHER_ICON_URL}/${data.weather[0].icon}.png`}
            alt="weather icon"
          />
          <Typography sx={{ fontWeight: 700 }}>{data.main.temp}&#8451;</Typography>
        </Stack>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 700,
            display: 'WebkitBox',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: '1',
            overflow: 'hidden'
          }}
        >
          Feels like: {data.main.feels_like}&#8451;. {descr}
        </Typography>
      </CardContent>
      <CardActions sx={{ padding: '0 0.5rem 0.5rem 0.5rem' }}>
        <Button
          href={to}
          size="small"
          sx={{ textTransform: 'capitalize', outline: 'none !important' }}
        >
          More
        </Button>
        <Button
          onClick={refetch}
          size="small"
          color="success"
          sx={{ textTransform: 'capitalize', outline: 'none !important' }}
        >
          Update
          <AutorenewIcon sx={{ width: '1rem', marginLeft: '0.5rem' }} />
        </Button>
        <Button
          onClick={handleItemDelete}
          size="small"
          color="error"
          sx={{ textTransform: 'capitalize', outline: 'none !important' }}
        >
          Delete
          <DeleteForeverIcon sx={{ width: '1.125rem', marginLeft: '0.5rem' }} />
        </Button>
      </CardActions>
    </Card>
  ) : (
    <Skeleton variant="rectangular" width={210} height={118} />
  );
}

export type WeatherCardBriefProps = Pick<City, 'coord'> & {
  cityId: City['id'];
  to: string;
  fetchDataFn: typeof weatherService.useGetWeatherByCityCoordsQuery;
  onItemDelete: (id: WeatherCardBriefProps['cityId']) => void;
};

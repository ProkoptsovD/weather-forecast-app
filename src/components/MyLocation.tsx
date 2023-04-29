import MyLocationIcon from '@mui/icons-material/MyLocation';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import type { Coordinates } from '@store/myGeolocationSlice';

export function MyLocation({
  onClick,
  onGeolocationSuccess,
  onGeolocationFailure,
  onGeolocationStart,
  onGeolocationEnd,
  isGettingLocation
}: MyLocationProps) {
  function getMyLocation() {
    if ('geolocation' in navigator) {
      onGeolocationStart();
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          onGeolocationSuccess({ latitude, longitude });
          onGeolocationEnd();
        },
        ({ message }) => {
          onGeolocationFailure({ error: message });
          onGeolocationEnd();
        }
      );
    } else {
      onGeolocationFailure({ error: 'Sorry, but your browser does not support geo location' });
    }

    if (onClick) onClick();
  }

  return (
    <Button
      type="button"
      aria-label="get my curent location"
      sx={{
        minWidth: '2.5rem',
        height: '2.5rem',
        aspectRatio: '1/1',
        outline: 'none !important',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onClick={getMyLocation}
      disabled={isGettingLocation}
    >
      {!isGettingLocation ? (
        <MyLocationIcon sx={{ color: '#ffffff' }} />
      ) : (
        <CircularProgress sx={{ color: '#ffffff' }} size="1.5rem" />
      )}
    </Button>
  );
}

export type MyLocationProps = {
  onClick?: () => void;
  onGeolocationSuccess: ({ latitude, longitude }: Coordinates) => void;
  onGeolocationFailure: ({ error }: { error: string }) => void;
  onGeolocationStart: () => void;
  onGeolocationEnd: () => void;
  isGettingLocation: boolean;
};

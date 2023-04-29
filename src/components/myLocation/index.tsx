import MyLocationIcon from '@mui/icons-material/MyLocation';
import Button from '@mui/material/Button';

export function MyLocation() {
  return (
    <Button
      type="button"
      aria-label="get my curent location"
      sx={{ minWidth: '2.5rem', height: '2.5rem', aspectRatio: '1/1', outline: 'none !important' }}
    >
      <MyLocationIcon sx={{ color: '#ffffff' }} />
    </Button>
  );
}

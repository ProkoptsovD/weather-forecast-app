import { Box, CircularProgress } from '@mui/material';

export function Loader() {
  return (
    <Box
      title="loader"
      sx={{
        display: 'flex',
        position: 'fixed',
        inset: '0',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <CircularProgress />
    </Box>
  );
}

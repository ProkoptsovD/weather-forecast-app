import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Page404() {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100dvh' }}
    >
      <Typography fontSize={32} sx={{ marginRight: '0.5rem' }}>
        404
      </Typography>
      <Typography>Page not found</Typography>
    </Box>
  );
}

export default Page404;

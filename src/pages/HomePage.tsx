import { useSelector, useDispatch } from 'react-redux';
import PinnedCities from '@components/PinnedCities';
import { Box, Typography } from '@mui/material';

import * as pinnedCitiesSelectors from '@store/pinnedCitiesSlice/pinnedCitiesSelectors';
import { pinnedCitiesSlice } from '@store/pinnedCitiesSlice';

function HomePage() {
  const pinnedCities = useSelector(pinnedCitiesSelectors.getPinnedCities);
  const dispatch = useDispatch();

  return (
    <Box component="section">
      {pinnedCities.length ? (
        <PinnedCities
          list={pinnedCities}
          onItemDelete={(cityId) =>
            dispatch(pinnedCitiesSlice.actions.removeCityFromPinned({ cityId }))
          }
        />
      ) : (
        <Typography
          sx={{ fontSize: 24, textAlign: 'center', paddingTop: '4rem' }}
          color="text.secondary"
        >
          Any city has not been added yet...
        </Typography>
      )}
    </Box>
  );
}

export default HomePage;

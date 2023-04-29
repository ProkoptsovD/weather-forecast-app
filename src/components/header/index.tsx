import { useDispatch, useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { Search } from '@components/search';
import { MyLocation } from '@components/myLocation';
import { myGeolocationSlice } from '@store/myGeolocationSlice/myGeolocationSlice';
import * as myGeolocationSelectors from '@store/myGeolocationSlice/myGeolocationSelectors';

function Header() {
  const dispatch = useDispatch();
  const isGettingLocation = useSelector(myGeolocationSelectors.getIsGettingLocation);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Best weather app ever
          </Typography>
          <Search />
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

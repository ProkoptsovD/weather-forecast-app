import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';

export const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto'
  }
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch'
    }
  }
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  color: '#ffffff',
  backgroundColor: '#cccccc',
  height: '100%',
  position: 'relative',
  top: '-1.5px',
  '&:hover': {
    backgroundColor: '#a19f9f'
  },
  '& .MuiButtonBase-root': {
    padding: theme.spacing(1, 1, 1, 0),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  }
}));

export const Dropdown = styled('ul')`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  top: 110%;
  border-radius: 4px;
  background-color: #ffffff;
  color: #757373;
`;

export const DropdownItem = styled('li')(({ theme }) => ({
  padding: '0.5rem',
  transition: theme.transitions.create('background-color'),

  '&:hover': {
    backgroundColor: '#ecebeb',
    cursor: 'pointer'
  }
}));
export const CityBriefInfoCard = styled('article')`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
export const CityName = styled('span')``;
export const CountryIcon = styled('img')``;
export const Temperature = styled('strong')``;
export const WeatherIcon = styled('img')``;

export const Error = styled('strong')`
  position: absolute;
  width: 100%;
  top: 95%;
  color: #cacaca;
  left: 0.25rem;
  font-size: 0.65rem;
`;

/** LIBS */
import { ChangeEvent, useEffect, useState, KeyboardEvent } from 'react';
/** MUI Icons */
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
/** SELECTORS */
/** CONSTANTS */
import { KEYBOARD_KEYS, WEATHER_API_KEYS } from '@constants/appKeys';
/** SERVICES */
import { City } from '@services/service';
/** TYPES */
import type { PinnedCity } from '@store/pinnedCitiesSlice';
import * as Styled from './Search.styled';

export function Search({ onCitySelect, cityList, isLoading, onAddCityToPinned }: SearchProps) {
  const [city, setCity] = useState<string>('');
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  useEffect(() => {
    if (cityList?.length) setOpenDropdown(true);
  }, [cityList]);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setCity(event.currentTarget.value);

    if (city === '') setOpenDropdown(false);
  }

  function onEnterKeyUp(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== KEYBOARD_KEYS.ENTER) return;
    if (city.trim() === '') return;

    setCity(city);
    onCitySelect(city);
  }
  function handleSearchButtonClick() {
    if (city.trim() === '' || (city.trim() === '' && openDropdown)) return setOpenDropdown(false);

    setCity(city);
    onCitySelect(city);
  }

  function handlePinnButtonClick(city: PinnedCity) {
    setOpenDropdown(false);
    onAddCityToPinned(city);
    setCity('');
  }

  return (
    <Styled.Search>
      <Styled.SearchIconWrapper>
        <SearchIcon />
      </Styled.SearchIconWrapper>
      <Styled.StyledInputBase
        placeholder="Search city..."
        onChange={handleInputChange}
        value={city}
        onKeyUp={onEnterKeyUp}
      />
      <Styled.StyledButton
        onClick={handleSearchButtonClick}
        disabled={isLoading}
        sx={{ outline: 'none !important' }}
      >
        Search
      </Styled.StyledButton>

      {openDropdown ? (
        <Styled.Dropdown>
          {cityList?.map(({ name, id, sys, main, weather, coord }) => {
            return (
              <Styled.DropdownItem key={id as number}>
                <Styled.CityBriefInfoCard>
                  <Styled.CityName>{name as string}</Styled.CityName>
                  <Styled.CountryIcon
                    src={WEATHER_API_KEYS.FLAG_ICON_URL + sys.country.toLowerCase() + '.png'}
                    alt={`${name} country flag`}
                  />
                  <Styled.Temperature>{main.temp}&#8451;</Styled.Temperature>
                  <Styled.WeatherIcon
                    src={WEATHER_API_KEYS.WEATHER_ICON_URL + weather[0].icon + '.png'}
                    alt={`${weather[0].main} icon`}
                  />
                  <Styled.StyledButton
                    role="button"
                    aria-label="add to pinned"
                    sx={{
                      minWidth: '1rem',
                      backgroundColor: 'rgba(255 255 255 / 0.75)',
                      outline: 'none !important'
                    }}
                    onClick={() =>
                      handlePinnButtonClick({
                        coord: {
                          latitude: coord.lat,
                          longitude: coord.lon
                        },
                        id
                      })
                    }
                  >
                    <AddIcon sx={{ color: '#46b24c' }} />
                  </Styled.StyledButton>
                </Styled.CityBriefInfoCard>
              </Styled.DropdownItem>
            );
          })}
        </Styled.Dropdown>
      ) : null}

      {cityList !== undefined && cityList.length === 0 ? (
        <Styled.Error>City not found</Styled.Error>
      ) : null}
    </Styled.Search>
  );
}

export type SearchProps = {
  onCitySelect: (city: string) => void;
  cityList: City[] | undefined;
  onAddCityToPinned: (city: PinnedCity) => void;
  isLoading: boolean;
};

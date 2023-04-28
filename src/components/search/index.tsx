import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import * as Styled from './Search.styled';

export function Search() {
  const [openDropdown, setOpenDropdown] = React.useState<boolean>(false);

  return (
    <Styled.Search>
      <Styled.SearchIconWrapper>
        <SearchIcon />
      </Styled.SearchIconWrapper>
      <Styled.StyledInputBase
        placeholder="Search city..."
        onChange={({ currentTarget }) => {
          setOpenDropdown(currentTarget.value.includes('a'));
        }}
      />
    </Styled.Search>
  );
}

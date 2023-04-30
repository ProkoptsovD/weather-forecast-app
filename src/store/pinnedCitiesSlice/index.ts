import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { Coordinates } from '@store/myGeolocationSlice';

export type PinnedCity = {
  id: number;
  coord: Coordinates;
};

export interface PinnedCitiesState {
  list: PinnedCity[];
}

const initialState: PinnedCitiesState = {
  list: []
};

export const pinnedCitiesSlice = createSlice({
  name: 'pinnedCities',
  initialState,
  reducers: {
    addCityToPinned: (state, action: PayloadAction<{ pinnedCity: PinnedCity }>) => {
      const hasCity = state.list.some(({ id }) => id === action.payload.pinnedCity.id);

      if (hasCity) return state;

      state.list.unshift(action.payload.pinnedCity);
    },
    removeCityFromPinned: (state, action: PayloadAction<{ cityId: number }>) => {
      state.list = state.list.filter(({ id }) => id !== action.payload.cityId);
    }
  }
});

export default pinnedCitiesSlice.reducer;

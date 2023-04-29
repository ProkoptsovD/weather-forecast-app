import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SearchCityState {
  city: string;
}

const initialState: SearchCityState = {
  city: ''
};

export const searchCitySlice = createSlice({
  name: 'searchCity',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<{ city: string }>) => {
      state.city = action.payload.city;
    }
  }
});

export default searchCitySlice.reducer;

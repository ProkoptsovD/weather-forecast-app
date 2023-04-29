import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type Geolocation = {
  latitude: number;
  longitude: number;
};

export interface MyGeoLocationState {
  latitude: Geolocation['latitude'] | null;
  longitude: Geolocation['longitude'] | null;
  error: string | null;
  isGettingLocation: boolean;
}

const initialState: MyGeoLocationState = {
  latitude: null,
  longitude: null,
  error: null,
  isGettingLocation: false
};

export const myGeolocationSlice = createSlice({
  name: 'myGeolocation',
  initialState,
  reducers: {
    setMyGeolocation: (state, action: PayloadAction<{ latitude: number; longitude: number }>) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      state.isGettingLocation = false;
    },
    resetMyGeolocation: (state) => {
      state.latitude = null;
      state.longitude = null;
      state.error = null;
    },
    setMyGeolocationError: (state, action: PayloadAction<{ error: string }>) => {
      state.error = action.payload.error;
    },
    startGettingLocation: (state) => {
      state.isGettingLocation = true;
    },
    endGettingLocation: (state) => {
      state.isGettingLocation = false;
    }
  }
});

export default myGeolocationSlice.reducer;

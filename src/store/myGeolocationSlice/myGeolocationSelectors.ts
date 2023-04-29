import { RootState } from '@store/store';
import { createSelector } from 'reselect';

const myGeolocationState = (state: RootState) => state.myGeolocation;

export const getMyLocation = createSelector(myGeolocationState, (state) => ({
  latitude: state.latitude,
  longitude: state.longitude
}));

export const getIsGettingLocation = createSelector(
  myGeolocationState,
  (state) => state.isGettingLocation
);

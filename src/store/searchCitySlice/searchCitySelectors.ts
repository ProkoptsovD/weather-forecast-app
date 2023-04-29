import { RootState } from '@store/store';
import { createSelector } from 'reselect';

const searchCityState = (state: RootState) => state.city;

export const getCity = createSelector(searchCityState, (state) => state.city);

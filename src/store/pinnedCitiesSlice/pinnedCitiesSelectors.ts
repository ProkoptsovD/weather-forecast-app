import { RootState } from '@store/store';
import { createSelector } from 'reselect';

const pinnedCitiesState = (state: RootState) => state.pinnedCities;

export const getPinnedCities = createSelector(pinnedCitiesState, (state) => state.list);

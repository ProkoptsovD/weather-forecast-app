import { configureStore } from '@reduxjs/toolkit';
import myGeolocationReducer from '@store/myGeolocationSlice';
import searchCityReducer from '@store/searchCitySlice';
import pinnedCitiesReducer from '@store/pinnedCitiesSlice';
import { weatherService } from '@services/weatherService';

export const store = configureStore({
  reducer: {
    [weatherService.reducerPath]: weatherService.reducer,
    myGeolocation: myGeolocationReducer,
    city: searchCityReducer,
    pinnedCities: pinnedCitiesReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(weatherService.middleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

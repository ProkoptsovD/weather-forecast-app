/** LIBS */
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

/** REDUCERS */
import myGeolocationReducer from '@store/myGeolocationSlice';
import searchCityReducer from '@store/searchCitySlice';
import pinnedCitiesReducer from '@store/pinnedCitiesSlice';

/** SERVICES */
import { weatherService } from '@services/weatherService';
import { LOCALSTORAGE_KEYS } from '@constants/appKeys';

/** Persist store */
const persistPinnedCitiesConfig = {
  key: LOCALSTORAGE_KEYS.CITY_LIST,
  storage
};
const persisMyGeolocationConfig = {
  key: LOCALSTORAGE_KEYS.GEOLOCATION,
  storage
};

const persistedPinnedCitiesReducer = persistReducer(persistPinnedCitiesConfig, pinnedCitiesReducer);
const persistedmyGeolocationReducer = persistReducer(
  persisMyGeolocationConfig,
  myGeolocationReducer
);

export const store = configureStore({
  reducer: {
    [weatherService.reducerPath]: weatherService.reducer,
    myGeolocation: persistedmyGeolocationReducer,
    city: searchCityReducer,
    pinnedCities: persistedPinnedCitiesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(weatherService.middleware)
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

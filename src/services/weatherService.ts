import { WEATHER_API_KEYS } from '@constants/appKeys';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Coordinates } from '@store/myGeolocationSlice';
import type { PinnedCity } from '@store/pinnedCitiesSlice';

export const weatherService = createApi({
  reducerPath: 'weatherService',
  baseQuery: fetchBaseQuery({ baseUrl: WEATHER_API_KEYS.URL }),
  endpoints: (builder) => ({
    getWeatherInCityByCoords: builder.query({
      query: ({ latitude, longitude }: Coordinates) =>
        `/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${WEATHER_API_KEYS.APP_ID}`
    }),
    findCityByName: builder.query({
      query: (city: string) => `/find?q=${city}&units=metric&APPID=${WEATHER_API_KEYS.APP_ID}`
    }),
    getWeatherInMultipleCities: builder.query({
      queryFn: async (cities: PinnedCity[], _, __, baseQuery) => {
        const results = await Promise.all(
          cities.map(({ coord }) =>
            baseQuery(
              `weather?lat=${coord.latitude}&lon=${coord.longitude}&units=metric&APPID=${WEATHER_API_KEYS.APP_ID}`
            )
          )
        );

        const merged = results.map((result) => result.data);
        const errors = results
          .filter((result) => Boolean(result?.error))
          .map((result) => result.error);

        if (errors.length > 0) return Promise.reject({ error: errors });

        return Promise.resolve({ data: merged });
      }
    })
  })
});

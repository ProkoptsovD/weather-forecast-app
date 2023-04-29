import { WEATHER_API_KEYS } from '@constants/appKeys';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const weatherService = createApi({
  reducerPath: 'weatherService',
  baseQuery: fetchBaseQuery({ baseUrl: WEATHER_API_KEYS.FORECAST_URL }),
  endpoints: (builder) => ({
    getWeatherInSingleCity: builder.query({
      query: (city: string) => `?q=${city}&APPID=${WEATHER_API_KEYS.APP_ID}`
    }),
    getWeatherInMultipleCities: builder.query({
      queryFn: async (cities: string[], _, __, baseQuery) => {
        const results = await Promise.all(
          cities.map((city) => baseQuery(`?q=${city}&APPID=${WEATHER_API_KEYS.APP_ID}`))
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

export const { useGetWeatherInSingleCityQuery, useGetWeatherInMultipleCitiesQuery } =
  weatherService;

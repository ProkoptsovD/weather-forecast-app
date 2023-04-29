import { WEATHER_API_KEYS } from '@constants/appKeys';
import { HttpClient } from '@services/httpClient';
import { BaseService } from '@services/baseService';
import type { ServiceConfig, HttpClientClass, TryCatchError } from '@services/service';

class WeatherService extends BaseService {
  constructor(private httpClient: HttpClientClass, config: ServiceConfig) {
    super(config);
  }

  public async getWeatherByCityName(city: string) {
    const urlWithParams = this.mapQueryParamsToURL(`q=${city}`);
    const urlWithParamsAndApiKey = this.appendApiKey(urlWithParams);

    return await this.httpClient.get<unknown, unknown, TryCatchError>(urlWithParamsAndApiKey);
  }
}

export const weatherService = new WeatherService(new HttpClient(), {
  baseUrl: WEATHER_API_KEYS.FORECAST_URL,
  apiKey: WEATHER_API_KEYS.APP_ID
});

import { WEATHER_API_KEYS } from '@constants/appKeys';
import { HttpClient } from '@services/httpClient';
import { BaseService } from '@services/baseService';
import type { HttpClientClass, ServiceConfig, TryCatchError } from '@services/service';

class GeoDecodingService extends BaseService {
  constructor(private httpClient: HttpClientClass, config: ServiceConfig) {
    super(config);
  }
  public async getLocationByCityName(city: string) {
    const urlWithParams = this.mapQueryParamsToURL(`q=${city}`);
    const urlWithParamsAndApiKey = this.appendApiKey(urlWithParams);

    return await this.httpClient.get<unknown, unknown, TryCatchError>(urlWithParamsAndApiKey);
  }
}

export const geoDecodingService = new GeoDecodingService(new HttpClient(), {
  baseUrl: WEATHER_API_KEYS.GEO_CODING_URL,
  apiKey: WEATHER_API_KEYS.APP_ID
});

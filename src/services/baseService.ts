import { ServiceConfig } from './service';

export class BaseService {
  private baseUrl: string;
  private apiKey: string;

  constructor({ baseUrl, apiKey }: ServiceConfig) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  public mapQueryParamsToURL(params?: string): string {
    return `${this.baseUrl}?${params ?? ''}`;
  }

  public appendApiKey(url: string): string {
    return url + `&APPID=${this.apiKey}`;
  }
}

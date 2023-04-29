import type { Response, HttpClientClass } from './service';

export class HttpClient implements HttpClientClass {
  public async get<Success, Failure, Error>(url: string): Response<Success, Failure, Error> {
    try {
      const response = await fetch(url);
      const parsedData = await response.json();

      return parsedData;
    } catch (error: unknown) {
      return error as Error;
    }
  }
}

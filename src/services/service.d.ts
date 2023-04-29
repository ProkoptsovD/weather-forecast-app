export type ServiceConfig = {
  baseUrl: string;
  apiKey: string;
};

export type Response<Success, Failure, Error> = Promise<Success | Failure | Error>;

export type TryCatchError = {
  message: string;
};

export declare class HttpClientClass {
  public get: <Success, Failure, Error>(url: string) => Response<Success, Failure, Error>;
}

export type City = {
  name: string;
  id: number;
  sys: {
    country: string;
  };
  main: {
    temp: number;
  };
  weather: Array<{
    main: string;
    icon: string;
    description?: string;
  }>;
  coord: {
    lat: number;
    lon: number;
  };
};

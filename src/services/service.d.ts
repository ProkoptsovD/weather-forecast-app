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

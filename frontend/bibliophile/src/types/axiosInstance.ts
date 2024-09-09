import { AxiosRequestConfig, AxiosResponse } from "axios";

interface AxiosInstance {
  (config: AxiosRequestConfig): Promise<AxiosResponse>;
  (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse>;

  defaults: AxiosRequestConfig;
  interceptors: {
    request: {
      use(
        onFulfilled: (
          value: AxiosRequestConfig
        ) => AxiosRequestConfig | Promise<AxiosRequestConfig>,
        onRejected?: (error: any) => any
      ): number;
      eject(id: number): void;
    };
    response: {
      use(
        onFulfilled: (value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>,
        onRejected?: (error: any) => any
      ): number;
      eject(id: number): void;
    };
  };

  get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse>;
  post(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse>;
  put(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse>;
  delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse>;
  patch(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse>;
}

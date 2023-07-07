import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import qs from 'qs';
const defaultConfig: AxiosRequestConfig = {
  baseURL: '',
  timeout: 10000,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  paramsSerializer: (params) => qs.stringify(params, { indices: false }),
};

class Http {
  npOpen: any;
  constructor() {
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }
  private static initConfig = {} as any;

  private static axiosInstance: AxiosInstance = Axios.create(defaultConfig);

  private httpInterceptorsRequest() {
    const instance = Http.axiosInstance;
    instance.interceptors.request.use(
      (config: any) => {
        const _config = config;
        if (typeof config.beforeRequestCallback === 'function') {
          config.beforeRequestCallback(_config);
          return _config;
        }
        if (Http.initConfig.beforeRequestCallback) {
          Http.initConfig.beforeRequestCallback(_config);
          return _config;
        }
        return _config;
        //  config.headers["Authorization"] = "Bearer " + localStorage.getItem("token");
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }
  private httpInterceptorsResponse() {
    const instance = Http.axiosInstance;
    instance.interceptors.response.use(
      (response) => {
        const _config = response.config as any;
        if (typeof _config.beforeResponseCallback === 'function') {
          _config.beforeResponseCallback(response);
          return response.data;
        }
        if (Http.initConfig.beforeResponseCallback) {
          Http.initConfig.beforeResponseCallback(response);
          return response.data;
        }
        return response.data;
      },
      (error) => {
        const _error = error;
        _error.isCancelRequest = Axios.isCancel(_error);
        return Promise.reject(_error);
      },
    );
  }
  public request<T>(
    method: string,
    url: any,
    param?: any,
    axiosConfig?: any,
  ): Promise<T> {
    const config = {
      method,
      url,
      ...param,
      ...axiosConfig,
    };

    return new Promise((resolve, reject) => {
      Http.axiosInstance
        .request(config)
        .then((response) => {
          resolve(response as T);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public post<T>(url: any, param?: any, config?: any): Promise<T> {
    return this.request<T>('post', url, param, config);
  }

  public get<T>(url: any, param?: any, config?: any): Promise<T> {
    return this.request<T>('get', url, param, config);
  }
}
export const http = new Http();

export interface IRequest {
  data: any;
  code: string;
}

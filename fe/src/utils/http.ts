import { message } from 'antd';
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
  private static initConfig: any;
  private static axiosInstance: AxiosInstance;

  constructor(config?: Record<string, any>) {
    const mergedConfig = Object.assign({}, defaultConfig, config);
    Http.axiosInstance = Axios.create(mergedConfig);
    Http.initConfig = mergedConfig;
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }

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
    url: string,
    param?: any,
    axiosConfig?: Record<string, any>,
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
          if (Axios.isCancel(error)) {
            return reject(error);
          }
          if (error.code === 'ECONNABORTED') {
            message.error('请求超时，请稍后重试');
          }
          return reject(error);
        });
    });
  }

  public post<T>(
    url: string,
    _?: any,
    config?: Record<string, any>,
  ): Promise<T> {
    return this.request<T>(
      'post',
      url,
      {
        ..._,
      },
      config,
    );
  }

  public get<T>(
    url: string,
    params?: any,
    config?: Record<string, any>,
  ): Promise<T> {
    return this.request<T>('get', url, { params }, config);
  }

  public put<T>(
    url: string,
    param?: any,
    config?: Record<string, any>,
  ): Promise<T> {
    return this.request<T>('put', url, param, config);
  }

  public delete<T>(
    url: string,
    param?: any,
    config?: Record<string, any>,
  ): Promise<T> {
    return this.request<T>('delete', url, param, config);
  }
}

export interface IRequest {
  data: any;
  code: number;
  message?: string;
}

export const http = new Http();

export const apiHttp = new Http({
  baseURL: 'api',
  beforeRequestCallback(config: Record<string, any>) {
    config.headers['token'] = '' + sessionStorage.getItem('@gitlab-token');
    return config;
  },
  beforeResponseCallback(response: { data: IRequest }) {
    const { data } = response;
    const { code, message: msg } = data;
    if (code !== 200) {
      return message.error(msg || 'error');
    }
  },
});

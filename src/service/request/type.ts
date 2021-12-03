import type { AxiosRequestConfig, AxiosResponse } from 'axios'

interface ZeroRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (err: any) => any
}

interface ZeroRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: ZeroRequestInterceptors<T>
  showLoading?: boolean
}

export { ZeroRequestInterceptors, ZeroRequestConfig }

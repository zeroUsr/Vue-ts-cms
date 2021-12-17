import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { ZeroRequestInterceptors, ZeroRequestConfig } from './type'

import { ElLoading } from 'element-plus'
// import type { ILoadingInstance } from 'element-plus'

const DEFAULT_SHOWLOSDING = true

class ZeroRequest {
  instance: AxiosInstance
  interceptors?: ZeroRequestInterceptors
  // loading?: ILoadingInstance
  loading?: any
  showLoading: boolean
  constructor(config: ZeroRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? DEFAULT_SHOWLOSDING

    // 注册局部拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 注册全局请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          // loading 组件
          this.loading = ElLoading.service({
            lock: true,
            background: 'rgba(0, 0, 0, 0.6)',
            text: '加载中……'
          })
        }
        return config
      },
      (err) => {
        console.log('全局请求失败拦截')
        return err
      }
    )

    // 注册全局响应拦截
    this.instance.interceptors.response.use(
      (config) => {
        this.loading?.close()

        const data = config.data
        // 对响应失败返回数据时的拦截
        if (data.returnCode === '-1001') {
          console.log('请求失败')
        } else {
          return data
        }
      },
      (err) => {
        if (err.resopnse.status === 404) {
          console.log('404错误')
        }
        return err
      }
    )
  }

  // 对单独请求进行拦截
  request<T>(config: ZeroRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        // 1.处理请求信息
        config = config.interceptors.requestInterceptor(config)
      }

      // 2.每次请求是否显示 loading 组件
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1.处理响应信息
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }

          // 2.请求成功后将其复原
          this.showLoading = DEFAULT_SHOWLOSDING

          // 3.将请求的数据返回
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_SHOWLOSDING
          reject(err)
        })
    })
  }

  get<T>(config: ZeroRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: ZeroRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  patch<T>(config: ZeroRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }

  delete<T>(config: ZeroRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
}

export default ZeroRequest

import { BASE_URL, TIME_OUT } from './request/config'

import ZeroRequest from './request'
import localCache from '@/utils/cache'
const zeroRequest = new ZeroRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor(config) {
      // 使每次请求携带 token
      const token = localCache.getCache('token')
      if (token) {
        if (config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }

      return config
    },
    requestInterceptorCatch(err) {
      return err
    },
    responseInterceptor(res) {
      return res
    },
    responseInterceptorCatch(err) {
      console.log('响应失败')
      return err
    }
  }
})

export default zeroRequest

import ZeroRequest from './request'

import { BASE_URL, TIME_OUT } from './request/config'

const zeroRequest = new ZeroRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor(config) {
      // 使每次请求携带 token
      const token = ''
      if (token) {
        if (config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }

      console.log('请求成功')
      return config
    },
    requestInterceptorCatch(err) {
      console.log('请求成功')
      return err
    },
    responseInterceptor(res) {
      console.log('响应成功')
      return res
    },
    responseInterceptorCatch(err) {
      console.log('响应失败')
      return err
    }
  }
})

export default zeroRequest

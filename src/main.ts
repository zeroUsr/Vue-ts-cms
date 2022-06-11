import { createApp } from 'vue'
import 'normalize.css'
import '@/assets/css/index.less'

import App from './App.vue'
import router from './router'
import { setupStore } from './store'
import store from './store'
// import zeroRequest from './service'

import { globalRegister } from './global'

const app = createApp(App)

// 注册 element-plus
app.use(globalRegister)
app.use(store)
// 注册动态路由
setupStore()
app.use(router)
app.mount('#app')

// zeroRequest.request({
//   url: '/home/multidata',
//   method: 'GET',
//   interceptors: {
//     requestInterceptor(config) {
//       console.log('单独请求成功拦截')
//       return config
//     },
//     requestInterceptorCatch(err) {
//       console.log('单独请求失败拦截')
//       return err
//     },
//     responseInterceptor(config) {
//       console.log('单独响应成功拦截')
//       return config
//     },
//     responseInterceptorCatch(err) {
//       console.log('单独响应失败拦截')
//       return err
//     }
//   }
// })

// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }

// zeroRequest
//   .get<DataType>({
//     url: '/home/multidata'
//     // method: 'GET'
//     // showLoading: false
//   })
//   .then((res) => {
//     console.log(res.data)
//     console.log(res.returnCode)
//     console.log(res.success)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

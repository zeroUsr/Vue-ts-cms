import { createRouter, createWebHashHistory } from 'vue-router'
// 声明导入的变量为类型(可不加)
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: 'login' },
  { path: '/login', component: () => import('@/views/login/login.vue') },
  { path: '/main', component: () => import('@/views/main/main.vue') }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router

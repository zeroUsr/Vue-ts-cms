import { createRouter, createWebHashHistory } from 'vue-router'
// 声明导入的变量为类型(可不加)
import type { RouteRecordRaw } from 'vue-router'

import store from '@/store'
import localCache from '@/utils/cache'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: 'main' },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/not-found/not-found.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

// 若未授权则跳转登录页面
router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token')

    if (!token) {
      return '/login'
    }
  }
})

// 初始化 store 的值
export function setupStore(): void {
  store.dispatch('login/loadLocalLogin')
}

export default router

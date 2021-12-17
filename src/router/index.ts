import { createRouter, createWebHashHistory } from 'vue-router'
// 声明导入的变量为类型(可不加)
import type { RouteRecordRaw } from 'vue-router'

import store from '@/store'
import localCache from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'

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

router.beforeEach((to) => {
  // 若未授权则跳转登录页面
  if (to.path !== '/login') {
    const token = localCache.getCache('token')

    if (!token) {
      return '/login'
    }
  }

  // 当跳转为 /main 时使其跳转到第一个用户菜单
  if (to.path === '/main') return firstMenu.url
})

// 初始化 store 的值
export function setupStore(): void {
  store.dispatch('login/loadLocalLogin')
}

export default router

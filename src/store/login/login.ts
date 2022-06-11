import { Module } from 'vuex'
import router from '@/router'

import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusById
} from '@/service/login/login'
import localCache from '@/utils/cache'
import { ILoginState } from './types'
import { IRootState } from '../types'
import { mapMenusToRoutes, mapMenusToPermission } from '@/utils/map-menus'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permission: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      // 加载菜单路由
      const routes = mapMenusToRoutes(userMenus)
      // 将组件添加到 main 中
      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      // 加载用户权限
      const permission = mapMenusToPermission(userMenus)
      state.permission = permission
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: any) {
      // 1.实现登录逻辑
      let accountResult = null
      accountLoginRequest(payload)
        .then(async (res) => {
          accountResult = res
          const { id, token } = accountResult.data
          commit('changeToken', token)
          localCache.setCache('token', token)

          // 2.请求用户信息
          const userInfoResult = await requestUserInfoById(id)
          const userInfo = userInfoResult.data
          commit('changeUserInfo', userInfo)
          localCache.setCache('userInfo', userInfo)

          // 3.请求用户菜单信息
          const userMenusResult = await requestUserMenusById(userInfo.role.id)
          const userMenus = userMenusResult.data
          commit('changeUserMenus', userMenus)
          localCache.setCache('userMenus', userMenus)

          // 请求部门/用户信息
          dispatch('getInitialDataAction', null, { root: true })

          // 4.跳转首页
          router.push('/main')
        })
        .catch(() => {
          alert('用户名或密码错误')
          return
        })
    },
    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }

      dispatch('getInitialDataAction', null, { root: true })

      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }

      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    },
    phoneLoginAction(context, payload: any) {
      console.log('phoneLoginAction', payload)
    }
  }
}

export default loginModule

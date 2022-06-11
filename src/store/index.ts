import { createStore, Store, useStore as useVuexStore } from 'vuex'

import { IRootState, IStore } from './types'

import loginModule from './login/login'
import systemModule from './main/system/ststem'
import dashboardModule from './main/analysis/dashboard'
import { requestDataList } from '@/service/main/system/system'

const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'zero',
      age: 18,
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  getters: {},
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      const departmentResult = await requestDataList('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data

      const roleResult = await requestDataList('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data

      const menuResult = await requestDataList('/menu/list', {})
      const { list: menuList } = menuResult.data

      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
      commit('changeEntireMenu', menuList)
    }
  },
  modules: {
    login: loginModule,
    system: systemModule,
    dashboard: dashboardModule
  }
})

export function useStore(): Store<IStore> {
  return useVuexStore()
}

// 初始化 store 的值
export function setupStore(): void {
  store.dispatch('login/loadLocalLogin')
}

export default store

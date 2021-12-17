import { createStore, Store, useStore as useVuexStore } from 'vuex'

import { IRootState, IStore } from './types'

import loginModule from './login/login'
import systemModule from './main/system/ststem'

const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'zero',
      age: 18
    }
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: { login: loginModule, system: systemModule }
})

export function useStore(): Store<IStore> {
  return useVuexStore()
}

export default store

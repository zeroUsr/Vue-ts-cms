import { Module } from 'vuex'

import { IDashboardType } from './types'
import { IRootState } from '../../types'

import {
  getCategoryGoodsCount,
  getAddressGoodsSale,
  getCategoryGoodsSale,
  getCategoryGoodsFavor
} from '@/service/main/analysis/dashboard'

const dashboard: Module<IDashboardType, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: []
    }
  },
  mutations: {
    changeCategoryCount(state, payload) {
      state.categoryGoodsCount = payload
    },
    changeCategorySale(state, payload) {
      state.categoryGoodsSale = payload
    },
    changeCategoryFavor(state, payload) {
      state.categoryGoodsFavor = payload
    },
    changeAddressSale(state, payload) {
      state.addressGoodsSale = payload
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const categoryCountResult = await getCategoryGoodsCount()
      commit('changeCategoryCount', categoryCountResult.data)

      const categorySaleResult = await getCategoryGoodsSale()
      commit('changeCategorySale', categorySaleResult.data)

      const categoryFavorResult = await getCategoryGoodsFavor()
      commit('changeCategoryFavor', categoryFavorResult.data)

      const addressSaleResult = await getAddressGoodsSale()
      commit('changeAddressSale', addressSaleResult.data)
    }
  }
}

export default dashboard

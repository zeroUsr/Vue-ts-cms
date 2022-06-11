import { Module } from 'vuex'

import { IRootState } from '../../types'
import { ISyestemType } from './types'
import {
  requestDataList,
  deleteDataById,
  createData,
  editData
} from '@/service/main/system/system'

const systemModule: Module<ISyestemType, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  mutations: {
    changeUsersList(state, userList: any) {
      state.usersList = userList
    },
    changeUsersCount(state, totalCount: number) {
      state.usersCount = totalCount
    },
    changeRoleList(state, roleList: any) {
      state.roleList = roleList
    },
    changeRoleCount(state, totalCount: number) {
      state.roleCount = totalCount
    },
    changeGoodsList(state, goodsList: any) {
      state.goodsList = goodsList
    },
    changeGoodsCount(state, totalCount: number) {
      state.goodsCount = totalCount
    },
    changeMenuList(state, menuList: any) {
      state.menuList = menuList
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
        /* switch (pageName) {
          case 'users':
            return state.userList
          case 'role':
            return state.roleList
        } */
      }
    },
    pageListCount(state) {
      return function (pageName: string) {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      const pageName = payload.pageName

      // const pageUrl = (pageName as string).split(0, 1) + pageName.split(1)
      const pageUrl = `/${pageName}/list`
      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)

      const userResult = await requestDataList(pageUrl, payload.queryInfo)
      const { list, totalCount } = userResult.data
      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)

      /* let pageUrl = ''
      switch (pageName) {
        case 'users': {
          pageUrl = '/users/list'
          const userResult = await requestUserInfoList(
            pageUrl,
            payload.queryInfo
          )
          const { list, totalCount } = userResult.data
          commit('changeUserList', list)
          commit('changeUserCount', totalCount)
          break
        }
        case 'role': {
          pageUrl = '/role/list'
          const userResult = await requestUserInfoList(
            pageUrl,
            payload.queryInfo
          )
          const { list, totalCount } = userResult.data
          commit('changeRoleList', list)
          commit('changeRoleCount', totalCount)
          break
        }
      } */
    },
    // 删除用户
    async deleteDataAction({ dispatch }, payload) {
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await deleteDataById(pageUrl)
      dispatch('getPageListAction', {
        pageName: pageName,
        queryInfo: {
          offset: 0,
          size: 100
        }
      })
    },
    // 新建用户
    async createDataAction({ dispatch }, payload) {
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      await createData(pageUrl, newData)

      dispatch('getPageListAction', {
        pageName: pageName,
        queryInfo: {
          offset: 0,
          size: 100
        }
      })
    },
    // 编辑用户
    async editDataAction({ dispatch }, payload) {
      const { pageName, newData, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await editData(pageUrl, newData)

      dispatch('getPageListAction', {
        pageName: pageName,
        queryInfo: {
          offset: 0,
          size: 100
        }
      })
    }
  }
}

export default systemModule

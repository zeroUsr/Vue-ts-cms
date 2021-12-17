import { Module } from 'vuex'

import { IRootState } from '../../types'
import { ISyestemType } from './types'
import { requestUserInfoList } from '@/service/main/system/system'

const systemModule: Module<ISyestemType, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0
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
    pageCountList(state) {
      return function (pageName: string) {
        return (state as any)[`${pageName}Count`]
        /* switch (pageName) {
          case 'users':
            return state.userCount
          case 'role':
            return state.roleCount
        } */
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      const pageName = payload.pageName

      // const pageUrl = (pageName as string).split(0, 1) + pageName.split(1)
      const pageUrl = `${pageName}/list`
      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)

      const userResult = await requestUserInfoList(pageUrl, payload.queryInfo)

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
    }
  }
}

export default systemModule

import ZeroRequest from '../index'

import type { IAccount, IDataType, ILoginResult } from './types'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/'
}

function accountLoginRequest(
  account: IAccount
): Promise<IDataType<ILoginResult>> {
  return ZeroRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

function requestUserInfoById(id: number): Promise<IDataType> {
  return ZeroRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

function requestUserMenusById(id: number): Promise<IDataType> {
  return ZeroRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}

export { accountLoginRequest, requestUserInfoById, requestUserMenusById }

import { IDataType } from '../types'

interface IAccount {
  name: string
  password: string
}

interface ILoginResult {
  id: number
  name: string
  token: string
}

export { IAccount, IDataType, ILoginResult }

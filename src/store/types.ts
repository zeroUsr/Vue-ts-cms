import { ILoginState } from './login/types'
import { ISyestemType } from './main/system/types'
import { IDashboardType } from './main/analysis/types'

interface IRootState {
  name: string
  age: number
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}

interface IRootWithMoude {
  login: ILoginState
  system: ISyestemType
  dashboard: IDashboardType
}

type IStore = IRootState & IRootWithMoude

export { IRootState, IStore }

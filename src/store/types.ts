import { ILoginState } from './login/types'
import { ISyestemType } from './main/system/types'

interface IRootState {
  name: string
  age: number
}

interface IRootWithMoude {
  login: ILoginState
  system: ISyestemType
}

type IStore = IRootState & IRootWithMoude

export { IRootState, IStore }

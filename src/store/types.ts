import { ILoginState } from './login/types'

interface IRootState {
  name: string
  age: number
}

interface IRootWithMoude {
  login: ILoginState
}

type IStore = IRootState & IRootWithMoude

export { IRootState, IStore }

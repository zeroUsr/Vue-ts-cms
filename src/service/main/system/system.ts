import zeroRequest from '@/service'

import { IDataType } from '../../types'

function requestUserInfoList(url: string, queryInfo: any) {
  return zeroRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}

export { requestUserInfoList }

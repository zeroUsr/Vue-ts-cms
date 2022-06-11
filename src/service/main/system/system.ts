import zeroRequest from '@/service'

import { IDataType } from '../../types'

function requestDataList(url: string, queryInfo: any) {
  return zeroRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}

// url: users/id
function deleteDataById(url: string) {
  return zeroRequest.delete<IDataType>({
    url: url
  })
}

function createData(url: string, newData: string) {
  return zeroRequest.post<IDataType>({
    url: url,
    data: newData
  })
}

function editData(url: string, editData: string) {
  return zeroRequest.patch<IDataType>({
    url: url,
    data: editData
  })
}

export { requestDataList, deleteDataById, createData, editData }

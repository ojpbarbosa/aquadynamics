import { type Device, type Log } from '@core/entities'

export type TFindLogsRepositoryParameters = {
  id?: Log['id']
  deviceId?: Device['id']
  data?: Log['data']

  orderBy?: 'id' | 'data' | 'timestamp' | 'registeredAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  page?: number
  perPage?: number
}

export interface IFindLogsRepository {
  find: (parameters: TFindLogsRepositoryParameters) => Promise<Log[] | Log>
}

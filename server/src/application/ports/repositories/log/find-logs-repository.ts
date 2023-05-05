import { type Device, type Log } from '@core/entities'

export type TFindLogsRepositoryParameters = {
  id?: Log['id']
  deviceId?: Device['id']
  data?: Log['data']

  devices?: boolean

  orderBy?: 'id' | 'data' | 'timestamp' | 'registeredAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  page?: number
  perPage?: number
}

export interface IFindLogsRepository {
  find: (parameters: TFindLogsRepositoryParameters) => Promise<Log[] | Log>
}

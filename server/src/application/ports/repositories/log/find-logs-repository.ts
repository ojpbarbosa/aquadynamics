import { type Controller, type Log } from '@core/entities'

export type TFindLogsRepositoryParameters = {
  id?: Log['id']
  controllerId?: Controller['id']
  data?: Log['data']

  controllers?: boolean

  orderBy?: 'id' | 'data' | 'timestamp' | 'registeredAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  page?: number
  perPage?: number
}

export interface IFindLogsRepository {
  find: (parameters: TFindLogsRepositoryParameters) => Promise<Log[] | Log>
}

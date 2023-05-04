import { type Log } from '@core/entities'

export type TGetLogsDTO = {
  orderBy?: 'id' | 'data' | 'timestamp' | 'registeredAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  page?: number
  perPage?: number

  devices?: boolean

  id?: Log['id']
  deviceId?: Log['deviceId']
}

export interface IGetLogsUseCase {
  get: (data: TGetLogsDTO) => Promise<Log[] | Log>
}

import { type Log } from '@core/entities'

export type TGetLogsDTO = {
  orderBy?: 'id' | 'data' | 'timestamp' | 'registeredAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  page?: number
  perPage?: number

  controllers?: boolean

  id?: Log['id']
  controllerId?: Log['controllerId']
}

export interface IGetLogsUseCase {
  get: (data: TGetLogsDTO) => Promise<Log[] | Log>
}

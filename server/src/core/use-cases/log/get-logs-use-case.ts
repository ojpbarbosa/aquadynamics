import { type Log } from '@core/entities'

export type TGetLogsDTO = {
  orderBy?: 'id' | 'data' | 'type' | 'timestamp' | 'registeredAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  page?: number
  perPage?: number

  controllers?: boolean

  id?: Log['id']
  controllerId?: Log['controllerId']
  type?: Log['type']
}

export interface IGetLogsUseCase {
  get: (data: TGetLogsDTO) => Promise<Log[] | Log>
}

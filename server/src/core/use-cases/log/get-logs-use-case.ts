import { type Log } from '@core/entities'

export type TGetLogsDTO = {
  order?: 'asc' | 'desc'
  page?: number
  perPage?: number

  id?: Log['id']
  deviceId?: Log['deviceId']
}

export interface IGetLogsUseCase {
  get: (data: TGetLogsDTO) => Promise<Log[] | Log>
}


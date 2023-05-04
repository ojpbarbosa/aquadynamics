import { type Device, type Log } from '@core/entities'

export type TCreateLogRepositoryDTO = {
  address: Device['address']
  data: Log['data']
}

export interface ICreateLogRepository {
  create: (data: TCreateLogRepositoryDTO) => Promise<Log>
}

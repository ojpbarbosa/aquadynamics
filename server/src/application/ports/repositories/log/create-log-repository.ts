import { type Device, type Log } from '@core/entities'

export type TCreateLogRepositoryDTO = {
  id: Log['id']
  deviceId: Device['id']
  data: Log['data']
  timestamp: Log['timestamp']
}

export interface ICreateLogRepository {
  create: (data: TCreateLogRepositoryDTO) => Promise<Log>
}

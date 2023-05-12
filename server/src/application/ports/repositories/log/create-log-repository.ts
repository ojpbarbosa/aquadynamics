import { type Controller, type Log } from '@core/entities'

export type TCreateLogRepositoryDTO = {
  id: Log['id']
  controllerId: Controller['id']
  type: Log['type']
  data?: Log['data']
  reading?: Log['reading']
  timestamp: Log['timestamp']
}

export interface ICreateLogRepository {
  create: (data: TCreateLogRepositoryDTO) => Promise<Log>
}

import { type Controller, type Log } from '@core/entities'

export type TCreateLogRepositoryDTO = {
  id: Log['id']
  controllerId: Controller['id']
  data: Log['data']
  timestamp: Log['timestamp']
}

export interface ICreateLogRepository {
  create: (data: TCreateLogRepositoryDTO) => Promise<Log>
}

import { type Aquarium, type Controller, type Log } from '@core/entities'

export type TCreateLogRepositoryDTO = {
  id: Log['id']
  aquariumId: Aquarium['id']
  controllerId: Controller['id']
  temperature: Log['temperature']
  pH: Log['pH']
  lightning: Log['lightning']
  timestamp: Log['timestamp']
}

export interface ICreateLogRepository {
  create: (data: TCreateLogRepositoryDTO) => Promise<Log>
}

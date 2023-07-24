import { type Aquarium, type Controller, type Log } from '@core/entities'

export type TLogDTO = {
  aquariumId: Aquarium['id']
  controllerId: Controller['id']
  temperature: Log['temperature']
  ph: Log['ph']
  lightning: Log['lightning']
  timestamp: Log['timestamp']
}

export interface ILogUseCase {
  log: (data: TLogDTO) => Promise<Log>
}

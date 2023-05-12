import { type Log } from '@core/entities'

export type TLogDTO = {
  controllerId: Log['controllerId']
  data: Log['data']
}

export interface ILogUseCase {
  log: (data: TLogDTO) => Promise<Log>
}

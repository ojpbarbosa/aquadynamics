import { type Log } from '@core/entities'

export type TLogDTO = {
  deviceId: Log['deviceId']
  data: Log['data']
}

export interface ILogUseCase {
  log: (data: TLogDTO) => Promise<Log>
}

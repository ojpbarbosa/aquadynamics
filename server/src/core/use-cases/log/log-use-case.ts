import { type Device, type Log } from '@core/entities'

export type TLogDTO = {
  address: Device['address']
  data: Log['data']
}

export interface ILogUseCase {
  log: (data: TLogDTO) => Promise<Log>
}

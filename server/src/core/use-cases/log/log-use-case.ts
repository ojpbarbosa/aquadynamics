import { type Log } from '@core/entities'

export type TLogDTO = {
  controllerId: Log['controllerId']
  type: Log['type']
  data?: Log['data']
  reading?: Log['reading']
}

export interface ILogUseCase {
  log: (data: TLogDTO) => Promise<Log>
}

import { type Log } from './log'

export enum ControllerStatus {
  Booting = 'booting',
  Crashed = 'crashed',
  Idling = 'idling',
  Loading = 'loading',
  Logging = 'logging',
  Offline = 'offline',
  Restarting = 'restarting',
  Stopping = 'stopping',
  Unreachable = 'unreachable',
  Unknown = 'unknown',
  Updating = 'updating'
}

export interface Controller {
  id: string
  address: string
  aquarium: string
  status: ControllerStatus
  registeredAt: Date
  updatedAt: Date

  logs?: Log[]
}

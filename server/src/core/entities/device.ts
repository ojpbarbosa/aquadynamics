import { type Log } from './log'

export interface Device {
  id: string
  name: string
  address: string
  state: 'connected' | 'disconnected'
  registeredAt: Date
  updatedAt: Date

  logs?: Log[]
}

import { type Log } from './log'

export interface Device {
  id: string
  name: string
  address: string
  status: 'connected' | 'disconnected'
  registeredAt: Date
  updatedAt: Date

  logs?: Log[]
}

import { type Aquarium, type Log } from '.'

export type ControllerStatus =
  | 'unknown'
  | 'booting'
  | 'idling'
  | 'logging'
  | 'restarting'
  | 'crashed'

export interface Controller {
  id: string
  address: string
  aquariumId: string
  status: ControllerStatus
  registeredAt: Date
  updatedAt: Date

  logs?: Log[]
  aquarium: Aquarium
}

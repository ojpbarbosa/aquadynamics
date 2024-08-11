import { type Aquarium, type Log } from '.'

export const controllerStatuses = [
  'unknown',
  'booting',
  'idling',
  'logging',
  'restarting',
  'crashed'
] as const

export type ControllerStatus = (typeof controllerStatuses)[number]

export interface Controller {
  id: string
  aquariumId: Aquarium['id']
  status: ControllerStatus
  registeredAt: Date
  updatedAt: Date

  logs?: Log[]
  aquarium?: Aquarium
}

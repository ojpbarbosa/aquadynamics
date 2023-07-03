import { type Log, type Controller } from '.'

export interface Aquarium {
  id: string
  name: string
  registeredAt: Date

  logs?: Log[]
  controllers?: Controller[]
}

import { type Controller, type Log } from '.'

export type Aquarium = {
  id: string
  name: string
  registeredAt: Date

  logs?: Log[]
  controller?: Controller
}

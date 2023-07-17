import { type Log, type Camera, type Controller } from '.'

export interface Aquarium {
  id: string
  name: string
  registeredAt: Date

  logs?: Log[]
  camera?: Camera
  controller?: Controller
}

import { type Aquarium, type Controller } from '.'

export type Log = {
  id: string
  aquariumId: Aquarium['id']
  controllerId: Controller['id']
  temperature: number
  pH: number
  lightning: boolean
  timestamp: Date

  aquarium?: Aquarium
  controller?: Controller
}

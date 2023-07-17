import { type Aquarium } from '.'

export interface Camera {
  id: string
  address: string
  aquariumId: Aquarium['id']
  registeredAt: Date
  updatedAt: Date

  aquarium?: Aquarium
}

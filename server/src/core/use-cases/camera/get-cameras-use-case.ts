import { type Aquarium, type Camera } from '@core/entities'

export type TGetCamerasDTO = {
  orderBy?: 'registeredAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  page?: number
  perPage?: number

  aquariums?: Camera['aquarium']

  id?: Camera['id']
  address?: Camera['address']
  aquariumId?: Aquarium['id']
}

export interface IGetCamerasUseCase {
  get: (data: TGetCamerasDTO) => Promise<Camera[] | Camera>
}

import { type Aquarium, type Camera } from '@core/entities'

export type TFindCamerasRepositoryParameters = {
  orderBy?: 'registeredAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  page?: number
  perPage?: number

  aquariums?: Camera['aquarium']

  id?: Camera['id']
  address?: Camera['address']
  aquariumId?: Aquarium['id']
}

export interface IFindCamerasRepository {
  find: (parameters?: TFindCamerasRepositoryParameters) => Promise<Camera[] | Camera>
}

import { type Aquarium, type Controller } from '@core/entities'

export type TFindControllersRepositoryParameters = {
  orderBy?: 'registeredAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  page?: number
  perPage?: number

  aquariums?: Controller['aquarium']
  logs?: boolean

  id?: Controller['id']
  address?: Controller['address']
  aquariumId?: Aquarium['id']
  status?: Controller['status']
}

export interface IFindControllersRepository {
  find: (parameters?: TFindControllersRepositoryParameters) => Promise<Controller[] | Controller>
}

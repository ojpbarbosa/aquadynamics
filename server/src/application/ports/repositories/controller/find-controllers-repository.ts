import { type Controller } from '@core/entities'

export type TFindControllersRepositoryParameters = {
  id?: Controller['id']
  address?: Controller['address']
  aquarium?: Controller['aquarium']
  status?: Controller['status']

  logs?: boolean

  orderBy?: 'id' | 'address' | 'aquarium' | 'status' | 'registeredAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  page?: number
  perPage?: number
}

export interface IFindControllersRepository {
  find: (parameters?: TFindControllersRepositoryParameters) => Promise<Controller[] | Controller>
}

import { type Controller } from '@core/entities'

export type TFindControllersRepositoryParameters = {
  id?: Controller['id']
  type?: Controller['type']
  status?: Controller['status']

  logs?: boolean

  orderBy?: 'id' | 'type' | 'status' | 'registeredAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  page?: number
  perPage?: number
}

export interface IFindControllersRepository {
  find: (parameters?: TFindControllersRepositoryParameters) => Promise<Controller[] | Controller>
}

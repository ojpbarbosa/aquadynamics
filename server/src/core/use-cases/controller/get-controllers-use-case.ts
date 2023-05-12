import { type Controller } from '@core/entities'

export type TGetControllersDTO = {
  orderBy?: 'id' | 'type' | 'status' | 'registeredAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  page?: number
  perPage?: number

  logs?: boolean

  id?: Controller['id']
  type?: Controller['type']
  address?: Controller['address']
  status?: Controller['status']
}

export interface IGetControllersUseCase {
  get: (data: TGetControllersDTO) => Promise<Controller[] | Controller>
}

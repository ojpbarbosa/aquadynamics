import { type Controller } from '@core/entities'

export type TGetControllersDTO = {
  orderBy?: 'id' | 'aquarium' | 'status' | 'registeredAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  page?: number
  perPage?: number

  logs?: boolean

  id?: Controller['id']
  address?: Controller['address']
  aquarium?: Controller['aquarium']
  status?: Controller['status']
}

export interface IGetControllersUseCase {
  get: (data: TGetControllersDTO) => Promise<Controller[] | Controller>
}

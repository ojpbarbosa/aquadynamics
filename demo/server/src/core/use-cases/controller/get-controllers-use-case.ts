import { type Aquarium, type Controller } from '@core/entities'

export type TGetControllersDTO = {
  orderBy?: 'registeredAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  page?: number
  perPage?: number

  aquariums?: Controller['aquarium']
  logs?: boolean

  id?: Controller['id']
  aquariumId?: Aquarium['id']
  status?: Controller['status']
}

export interface IGetControllersUseCase {
  get: (data: TGetControllersDTO) => Promise<Controller[] | Controller>
}

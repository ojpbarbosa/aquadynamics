import { type Aquarium } from '@core/entities'

export type TGetAquariumsDTO = {
  orderBy?: 'name' | 'registeredAt'
  order?: 'asc' | 'desc'
  page?: number
  perPage?: number

  logs?: boolean
  controllers?: boolean

  id?: Aquarium['id']
  name?: Aquarium['name']
}

export interface IGetAquariumsUseCase {
  get: (data: TGetAquariumsDTO) => Promise<Aquarium[] | Aquarium>
}

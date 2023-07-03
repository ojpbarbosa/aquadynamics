import { type Aquarium } from '@core/entities'

export type TFindAquariumsRepositoryParameters = {
  orderBy?: 'name' | 'registeredAt'
  order?: 'asc' | 'desc'
  page?: number
  perPage?: number

  logs?: boolean
  controllers?: boolean

  id?: Aquarium['id']
  name?: Aquarium['name']
}

export interface IFindAquariumsRepository {
  find: (parameters: TFindAquariumsRepositoryParameters) => Promise<Aquarium[] | Aquarium>
}

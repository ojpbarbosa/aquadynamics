import { type Aquarium, type Controller } from '@core/entities'

export type TCreateControllerRepositoryDTO = {
  id: Controller['id']
  address: Controller['address']
  aquariumId: Aquarium['id']
}

export interface ICreateControllerRepository {
  create: (data: TCreateControllerRepositoryDTO) => Promise<Controller>
}

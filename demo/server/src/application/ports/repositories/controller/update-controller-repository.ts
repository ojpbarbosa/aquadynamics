import { type Aquarium, type Controller } from '@core/entities'

export type TUpdateControllerRepositoryDTO = {
  id: Controller['id']
  address?: Controller['address']
  aquariumId?: Aquarium['id']
  status?: Controller['status']
}

export interface IUpdateControllerRepository {
  update: (data: TUpdateControllerRepositoryDTO) => Promise<Controller>
}

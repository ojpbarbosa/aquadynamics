import { type Controller } from '@core/entities'

export type TCreateControllerRepositoryDTO = {
  id: Controller['id']
  address: Controller['address']
  aquarium: Controller['aquarium']
}

export interface ICreateControllerRepository {
  create: (data: TCreateControllerRepositoryDTO) => Promise<Controller>
}

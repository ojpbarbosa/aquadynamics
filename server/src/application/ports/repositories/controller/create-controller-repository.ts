import { type Controller } from '@core/entities'

export type TCreateControllerRepositoryDTO = {
  id: Controller['id']
  type: Controller['type']
  address: Controller['address']
  status?: Controller['status']
}

export interface ICreateControllerRepository {
  create: (data: TCreateControllerRepositoryDTO) => Promise<Controller>
}

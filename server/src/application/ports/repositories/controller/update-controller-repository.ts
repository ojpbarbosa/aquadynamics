import { type Controller } from '@core/entities'

export type TUpdateControllerRepositoryDTO = {
  id: Controller['id']
  address?: Controller['address']
  aquarium?: Controller['aquarium']
  status?: Controller['status']
}

export interface IUpdateControllerRepository {
  update: (data: TUpdateControllerRepositoryDTO) => Promise<Controller>
}

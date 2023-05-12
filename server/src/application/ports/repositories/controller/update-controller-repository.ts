import { type Controller } from '@core/entities'
import { type TCreateControllerRepositoryDTO } from '.'

export type TUpdateControllerRepositoryDTO = { id: Controller['id'] } & Partial<
  Omit<TCreateControllerRepositoryDTO, 'id'>
>

export interface IUpdateControllerRepository {
  update: (data: TUpdateControllerRepositoryDTO) => Promise<Controller>
}

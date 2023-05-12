import { type Controller } from '@core/entities'

export type TRegisterControllerDTO = {
  address: Controller['address']
  aquarium: Controller['aquarium']
}

export interface IRegisterControllerUseCase {
  register: (data: TRegisterControllerDTO) => Promise<Controller>
}

import { type Controller } from '@core/entities'

export type TRegisterControllerDTO = {
  type: Controller['type']
  address: Controller['address']
}

export interface IRegisterControllerUseCase {
  register: (data: TRegisterControllerDTO) => Promise<Controller>
}

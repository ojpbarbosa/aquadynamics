import { type Aquarium, type Controller } from '@core/entities'

export type TRegisterControllerDTO = {
  address: Controller['address']
  aquariumId: Aquarium['id']
}

export interface IRegisterControllerUseCase {
  register: (data: TRegisterControllerDTO) => Promise<Controller>
}

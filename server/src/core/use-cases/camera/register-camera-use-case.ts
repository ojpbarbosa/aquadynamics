import { type Aquarium, type Camera } from '@core/entities'

export type TRegisterCameraDTO = {
  address: Camera['address']
  aquariumId: Aquarium['id']
}

export interface IRegisterCameraUseCase {
  register: (data: TRegisterCameraDTO) => Promise<Camera>
}

import { type Aquarium, type Camera } from '@core/entities'

export type TCreateCameraRepositoryDTO = {
  id: Camera['id']
  address: Camera['address']
  aquariumId: Aquarium['id']
}

export interface ICreateCameraRepository {
  create: (data: TCreateCameraRepositoryDTO) => Promise<Camera>
}

import { type Controller } from '@core/entities'

export type TSetControllerStatusDTO = {
  id: Controller['id']
  status: Controller['status']
}

export interface ISetControllerStatusUseCase {
  setStatus: (data: TSetControllerStatusDTO) => Promise<Controller>
}

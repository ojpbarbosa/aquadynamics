import { type Device } from '@core/entities'

export type TSetDeviceStatusDTO = {
  id: Device['id']
  status: Device['status']
}

export interface ISetDeviceStatusUseCase {
  setStatus: (data: TSetDeviceStatusDTO) => Promise<Device>
}

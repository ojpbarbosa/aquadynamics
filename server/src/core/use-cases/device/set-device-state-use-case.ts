import { type Device } from '@core/entities'

export type TSetDeviceStateDTO = {
  id: Device['id']
  state: Device['state']
}

export interface ISetDeviceStateUseCase {
  setState: (data: TSetDeviceStateDTO) => Promise<Device>
}

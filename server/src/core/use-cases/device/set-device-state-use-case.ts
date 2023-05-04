import { type Device } from '@core/entities'

export type TSetDeviceStateDTO = {
  address: Device['address']
  state: Device['state']
}

export interface ISetDeviceStateUseCase {
  setState: (data: TSetDeviceStateDTO) => Promise<Device>
}

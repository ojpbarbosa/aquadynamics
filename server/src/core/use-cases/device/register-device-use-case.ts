import { type Device } from '@core/entities'

export type TRegisterDeviceDTO = {
  name: Device['name']
  address: Device['address']
}

export interface IRegisterDeviceUseCase {
  register: (data: TRegisterDeviceDTO) => Promise<Device>
}

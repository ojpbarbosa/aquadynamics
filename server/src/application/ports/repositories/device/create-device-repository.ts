import { type Device } from '@core/entities'

export type TCreateDeviceRepositoryDTO = {
  name: Device['name']
  address: Device['address']
  state?: Device['state']
}

export interface ICreateDeviceRepository {
  create: (data: TCreateDeviceRepositoryDTO) => Promise<Device>
}

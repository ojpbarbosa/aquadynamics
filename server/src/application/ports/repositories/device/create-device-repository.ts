import { type Device } from '@core/entities'

export type TCreateDeviceRepositoryDTO = {
  id: Device['id']
  name: Device['name']
  address: Device['address']
  status?: Device['status']
}

export interface ICreateDeviceRepository {
  create: (data: TCreateDeviceRepositoryDTO) => Promise<Device>
}

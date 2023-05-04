import { type Device } from '@core/entities'

export type TGetDevicesDTO = {
  orderBy?: 'id' | 'name' | 'state' | 'registeredAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  page?: number
  perPage?: number

  logs?: boolean

  id?: Device['id']
  name?: Device['name']
  address?: Device['address']
  state?: Device['state']
}

export interface IGetDevicesUseCase {
  get: (data: TGetDevicesDTO) => Promise<Device[] | Device>
}

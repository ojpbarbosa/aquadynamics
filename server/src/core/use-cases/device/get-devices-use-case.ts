import { type Device } from '@core/entities'

export type TGetDevicesDTO = {
  orderBy?: 'id' | 'name' | 'status' | 'registeredAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  page?: number
  perPage?: number

  logs?: boolean

  id?: Device['id']
  name?: Device['name']
  address?: Device['address']
  status?: Device['status']
}

export interface IGetDevicesUseCase {
  get: (data: TGetDevicesDTO) => Promise<Device[] | Device>
}

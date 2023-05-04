import { type Device } from '@core/entities'

export type TFindDevicesRepositoryParameters = {
  id?: Device['id']
  name?: Device['name']
  state?: Device['state']

  logs?: boolean

  orderBy?: 'id' | 'name' | 'state' | 'registeredAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  page?: number
  perPage?: number
}

export interface IFindDevicesRepository {
  find: (parameters?: TFindDevicesRepositoryParameters) => Promise<Device[] | Device>
}

import { type Device } from '@core/entities'
import { type TCreateDeviceRepositoryDTO } from '.'

export type TUpdateDeviceRepositoryDTO = { id: Device['id'] } & Partial<
  Omit<TCreateDeviceRepositoryDTO, 'id'>
>

export interface IUpdateDeviceRepository {
  update: (data: TUpdateDeviceRepositoryDTO) => Promise<Device>
}

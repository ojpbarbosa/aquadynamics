import { type Device } from '@core/entities'
import {
  type TFindDevicesRepositoryParameters,
  type IDeviceRepositories,
  type TCreateDeviceRepositoryDTO,
  type TUpdateDeviceRepositoryDTO
} from '@application/ports/repositories'
import { PrismaClient } from '@prisma/client'

export class DeviceSQLiteRepositories implements IDeviceRepositories {
  private readonly prisma = new PrismaClient()

  create: (data: TCreateDeviceRepositoryDTO) => Promise<Device>
  find: (parameters: TFindDevicesRepositoryParameters) => Promise<Device | Device[]>
  update: (data: TUpdateDeviceRepositoryDTO) => Promise<Device>
}

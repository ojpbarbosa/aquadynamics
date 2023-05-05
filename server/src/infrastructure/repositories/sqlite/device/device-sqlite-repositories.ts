import {
  type IDeviceRepositories,
  type TCreateDeviceRepositoryDTO,
  type TFindDevicesRepositoryParameters,
  type TUpdateDeviceRepositoryDTO
} from '@application/ports/repositories'
import { PrismaClient } from '@prisma/client'
import { type Device } from '@core/entities'

export class DeviceSQLiteRepositories implements IDeviceRepositories {
  private readonly prisma = new PrismaClient()

  async create(data: TCreateDeviceRepositoryDTO): Promise<Device> {
    return (await this.prisma.device.create({
      data,
      select: {
        id: true,
        name: true,
        state: true,
        registeredAt: true,
        updatedAt: true
      }
    })) as Device
  }

  async find(parameters: TFindDevicesRepositoryParameters): Promise<Device[] | Device> {
    const { id, name, state, logs, orderBy, order, page, perPage } = parameters

    const relationOptions = {
      include: logs
        ? {
            logs: true
          }
        : {}
    }

    let orderOptions = {}
    if (orderBy && order) {
      orderOptions = {
        orderBy: [
          {
            [orderBy as string]: order
          }
        ]
      }
    }

    let pageOptions = {}
    if (page && perPage) {
      pageOptions = {
        skip: (page - 1) * perPage,
        take: perPage
      }
    }

    const options = {
      ...relationOptions,
      ...orderOptions,
      ...pageOptions
    }

    return (await this.prisma.device.findMany({
      where: { id, name, state },
      ...options
    })) as Device[]
  }

  async update(data: TUpdateDeviceRepositoryDTO): Promise<Device> {
    const { id, name, address, state } = data

    return (await this.prisma.device.update({
      where: { id },
      data: { name, address, state }
    })) as Device
  }
}

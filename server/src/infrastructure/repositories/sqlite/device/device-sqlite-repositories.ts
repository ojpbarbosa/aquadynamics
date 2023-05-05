import {
  type IDeviceRepositories,
  type TCreateDeviceRepositoryDTO,
  type TFindDevicesRepositoryParameters,
  type TUpdateDeviceRepositoryDTO
} from '@application/ports/repositories'
import { PrismaClient } from '@prisma/client'
import { type Device } from '@core/entities'

export class DeviceSqliteRepositories implements IDeviceRepositories {
  private readonly prisma = new PrismaClient()

  async create(data: TCreateDeviceRepositoryDTO): Promise<Device> {
    return (await this.prisma.device.create({
      data,
      select: {
        id: true,
        name: true,
        status: true,
        registeredAt: true,
        updatedAt: true
      }
    })) as Device
  }

  async find(parameters: TFindDevicesRepositoryParameters): Promise<Device[] | Device> {
    if (parameters) {
      const { id, name, status, logs, orderBy, order, page, perPage } = parameters

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
          skip: (Number(page) - 1) * Number(perPage),
          take: Number(perPage)
        }
      }

      const options = {
        ...orderOptions,
        ...pageOptions
      }

      if (logs)
        Object.assign(options, {
          include: {
            logs: true
          }
        })

      return (await this.prisma.device.findMany({
        where: { id, name, status },
        ...options
      })) as Device[]
    }

    return (await this.prisma.device.findMany()) as Device[]
  }

  async update(data: TUpdateDeviceRepositoryDTO): Promise<Device> {
    const { id, name, address, status } = data

    return (await this.prisma.device.update({
      where: { id },
      data: { name, address, status }
    })) as Device
  }
}

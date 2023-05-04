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
      data
    })) as Device
  }

  async find(parameters: TFindDevicesRepositoryParameters): Promise<Device[] | Device> {
    const { id, name, state, orderBy, order, page, perPage } = parameters

    if (id) {
      return (await this.prisma.device.findUnique({
        where: { id }
      })) as Device
    }

    let orderByParameters = {}
    if (orderBy && order) {
      orderByParameters = {
        orderBy: [
          {
            [orderBy as string]: order
          }
        ]
      }
    }

    let paginationParameters = {}
    if (page && perPage) {
      paginationParameters = {
        skip: ((page - 1) * perPage) as number,
        take: perPage as number
      }
    }

    if (name) {
      return (await this.prisma.device.findMany({
        where: { name },
        ...orderByParameters,
        ...paginationParameters
      })) as Device[]
    }

    if (state) {
      return (await this.prisma.device.findFirst({
        where: { state },
        ...orderByParameters,
        ...paginationParameters
      })) as Device
    }

    return (await this.prisma.device.findMany({
      ...orderByParameters,
      ...paginationParameters
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

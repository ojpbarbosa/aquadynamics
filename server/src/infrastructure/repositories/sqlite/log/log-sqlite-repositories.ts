import {
  type ILogRepositories,
  type TCreateLogRepositoryDTO,
  type TFindLogsRepositoryParameters
} from '@application/ports/repositories'
import { PrismaClient } from '@prisma/client'
import { type Log } from '@core/entities'

export class LogSqliteRepositories implements ILogRepositories {
  private readonly prisma = new PrismaClient()

  async create(data: TCreateLogRepositoryDTO): Promise<Log> {
    return (await this.prisma.log.create({
      data
    })) as Log
  }

  async find(parameters: TFindLogsRepositoryParameters): Promise<Log[] | Log> {
    const { id, deviceId, data, device, orderBy, order, page, perPage } = parameters

    const relationOptions = {
      include: device
        ? {
            device: true
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

    return (await this.prisma.log.findMany({
      where: { id, deviceId, data },
      ...options
    })) as Log[]
  }
}

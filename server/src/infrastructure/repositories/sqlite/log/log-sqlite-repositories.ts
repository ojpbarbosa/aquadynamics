import {
  type ILogRepositories,
  type TCreateLogRepositoryDTO,
  type TFindLogsRepositoryParameters
} from '@application/ports/repositories'
import { PrismaClient } from '@prisma/client'
import { type Log } from '@core/entities'

export class LogSQLiteRepositories implements ILogRepositories {
  private readonly prisma = new PrismaClient()

  async create(data: TCreateLogRepositoryDTO): Promise<Log> {
    return (await this.prisma.log.create({
      data
    })) as Log
  }

  async find(parameters: TFindLogsRepositoryParameters): Promise<Log[] | Log> {
    const { id, deviceId, data, orderBy, order, page, perPage } = parameters

    if (id) {
      return (await this.prisma.log.findUnique({
        where: { id }
      })) as Log
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

    if (deviceId && data) {
      return (await this.prisma.log.findMany({
        where: { deviceId, data },
        ...orderByParameters,
        ...paginationParameters
      })) as Log[]
    }

    if (deviceId) {
      return (await this.prisma.log.findMany({
        where: { deviceId },
        ...orderByParameters,
        ...paginationParameters
      })) as Log[]
    }

    if (data) {
      return (await this.prisma.log.findMany({
        where: { data },
        ...orderByParameters,
        ...paginationParameters
      })) as Log[]
    }

    return (await this.prisma.log.findMany({
      ...orderByParameters,
      ...paginationParameters
    })) as Log[]
  }
}

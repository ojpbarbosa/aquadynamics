import {
  type ILogRepositories,
  type TCreateLogRepositoryDTO,
  type TFindLogsRepositoryParameters
} from '@application/ports/repositories'
import { PrismaClient } from '@prisma/client'
import { type Log } from '@core/entities'

export class LogMysqlRepositories implements ILogRepositories {
  private readonly prisma = new PrismaClient()

  async create(data: TCreateLogRepositoryDTO): Promise<Log> {
    return (await this.prisma.log.create({
      data
    })) as Log
  }

  async find(parameters: TFindLogsRepositoryParameters): Promise<Log[] | Log> {
    if (parameters) {
      const { id, deviceId, data, devices, orderBy, order, page, perPage } = parameters

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

      if (devices)
        Object.assign(options, {
          include: {
            device: true
          }
        })

      return (await this.prisma.log.findMany({
        where: { id, deviceId, data },
        ...options
      })) as Log[]
    }

    return (await this.prisma.log.findMany()) as Log[]
  }
}
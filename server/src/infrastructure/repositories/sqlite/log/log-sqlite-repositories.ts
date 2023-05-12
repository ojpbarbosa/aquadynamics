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
    if (parameters) {
      const { id, controllerId, data, controllers, orderBy, order, page, perPage } = parameters

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

      if (controllers)
        Object.assign(options, {
          include: {
            controller: true
          }
        })

      return (await this.prisma.log.findMany({
        where: { id, controllerId, data },
        ...options
      })) as Log[]
    }

    return (await this.prisma.log.findMany()) as Log[]
  }
}

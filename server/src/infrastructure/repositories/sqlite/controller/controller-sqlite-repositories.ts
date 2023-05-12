import {
  type IControllerRepositories,
  type TCreateControllerRepositoryDTO,
  type TFindControllersRepositoryParameters,
  type TUpdateControllerRepositoryDTO
} from '@application/ports/repositories'
import { PrismaClient } from '@prisma/client'
import { type Controller } from '@core/entities'

export class ControllerSqliteRepositories implements IControllerRepositories {
  private readonly prisma = new PrismaClient()

  async create(data: TCreateControllerRepositoryDTO): Promise<Controller> {
    return (await this.prisma.controller.create({
      data
    })) as Controller
  }

  async find(parameters: TFindControllersRepositoryParameters): Promise<Controller[] | Controller> {
    if (parameters) {
      const { id, aquarium, status, logs, orderBy, order, page, perPage } = parameters

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

      return (await this.prisma.controller.findMany({
        where: { id, aquarium, status },
        ...options
      })) as Controller[]
    }

    return (await this.prisma.controller.findMany()) as Controller[]
  }

  async update(data: TUpdateControllerRepositoryDTO): Promise<Controller> {
    const { id, aquarium, address, status } = data

    return (await this.prisma.controller.update({
      where: { id },
      data: { aquarium, address, status }
    })) as Controller
  }
}

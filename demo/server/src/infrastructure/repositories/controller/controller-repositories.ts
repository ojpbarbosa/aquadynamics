import {
  type IControllerRepositories,
  type TCreateControllerRepositoryDTO,
  type TFindControllersRepositoryParameters,
  type TUpdateControllerRepositoryDTO
} from '@application/ports/repositories'
import { PrismaClient } from '@prisma/client'
import { type Controller } from '@core/entities'

export class ControllerRepositories implements IControllerRepositories {
  private readonly prisma = new PrismaClient()

  async create(data: TCreateControllerRepositoryDTO): Promise<Controller> {
    return (await this.prisma.controller.create({
      data
    })) as Controller
  }

  async find(parameters: TFindControllersRepositoryParameters): Promise<Controller[] | Controller> {
    if (parameters) {
      const { id, aquariumId, status, aquariums, logs, orderBy, order, page, perPage } = parameters

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

      if (aquariums || logs) {
        Object.assign(options, {
          include: {
            aquarium: aquariums || false,
            logs: logs || false
          }
        })
      }

      return (await this.prisma.controller.findMany({
        where: { id, aquariumId, status },
        ...options
      })) as Controller[]
    }

    return (await this.prisma.controller.findMany()) as Controller[]
  }

  async update(data: TUpdateControllerRepositoryDTO): Promise<Controller> {
    const { id, aquariumId, address, status } = data

    return (await this.prisma.controller.update({
      where: { id },
      data: { aquariumId, address, status }
    })) as Controller
  }
}

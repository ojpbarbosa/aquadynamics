import {
  type IAquariumRepositories,
  type TFindAquariumsRepositoryParameters
} from '@application/ports/repositories'
import { PrismaClient } from '@prisma/client'
import { type Aquarium } from '@core/entities'

export class AquariumMysqlRepositories implements IAquariumRepositories {
  private readonly prisma = new PrismaClient()

  async find(parameters: TFindAquariumsRepositoryParameters): Promise<Aquarium[] | Aquarium> {
    if (parameters) {
      const { id, name, controllers, logs, orderBy, order, page, perPage } = parameters

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

      // todo: verify if assignment is correct
      if (controllers)
        Object.assign(options, {
          include: {
            controller: true
          }
        })

      if (logs)
        Object.assign(options, {
          include: {
            logs: true
          }
        })

      return (await this.prisma.aquarium.findMany({
        where: { id, name },
        ...options
      })) as Aquarium[]
    }

    return (await this.prisma.aquarium.findMany()) as Aquarium[]
  }
}

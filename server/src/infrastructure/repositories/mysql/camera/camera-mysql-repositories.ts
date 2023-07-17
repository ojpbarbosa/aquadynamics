import {
  type ICameraRepositories,
  type TCreateCameraRepositoryDTO,
  type TFindCamerasRepositoryParameters
} from '@application/ports/repositories'
import { PrismaClient } from '@prisma/client'
import { type Camera } from '@core/entities'

export class CameraMysqlRepositories implements ICameraRepositories {
  private readonly prisma = new PrismaClient()

  async create(data: TCreateCameraRepositoryDTO): Promise<Camera> {
    return (await this.prisma.camera.create({
      data
    })) as Camera
  }

  async find(parameters: TFindCamerasRepositoryParameters): Promise<Camera[] | Camera> {
    if (parameters) {
      const { id, aquariumId, aquariums, orderBy, order, page, perPage } = parameters

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

      if (aquariums) {
        Object.assign(options, {
          include: {
            aquarium: aquariums || false
          }
        })
      }

      return (await this.prisma.camera.findMany({
        where: { id, aquariumId },
        ...options
      })) as Camera[]
    }

    return (await this.prisma.camera.findMany()) as Camera[]
  }
}

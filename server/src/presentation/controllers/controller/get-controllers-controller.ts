import {
  type IValidator,
  type IController,
  type IRequest,
  type IResponse
} from '@application/ports/presentation'
import { type IGetControllersUseCase } from '@core/use-cases'
import { type Controller } from '@core/entities'
import { errorResponse, okResponse } from '@presentation/responses'

export class GetControllersController implements IController {
  constructor(
    private readonly validator: IValidator,
    private readonly getControllersUseCase: IGetControllersUseCase
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const { id } = request.parameters
      const { aquarium, address, status, orderBy, order, page, perPage } = request.query
      let { logs } = request.query

      if (status) {
        const error = this.validator.validate({ status })

        if (error) return errorResponse(error)
      }

      logs = logs === 'true' || logs === 'false' ? JSON.parse(logs) : undefined

      const controllers = (await this.getControllersUseCase.get({
        id,
        aquarium,
        address,
        status,
        logs,
        orderBy,
        order,
        page,
        perPage
      })) as Controller[]

      return okResponse(
        controllers.map((controller) => {
          const data = {
            id: controller.id,
            aquarium: controller.aquarium,
            status: controller.status,
            registeredAt: controller.registeredAt,
            updatedAt: controller.updatedAt
          }

          if (logs && controller.logs)
            Object.assign(data, {
              logs: controller.logs.map((log) => ({
                id: log.id,
                type: log.type,
                data: log.data,
                reading: log.reading,
                timestamp: log.timestamp
              }))
            })

          return data
        })
      )
    } catch (error) {
      console.error('ControllerError: ', error)
      return errorResponse(error)
    }
  }
}
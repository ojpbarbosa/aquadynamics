import { type IController, type IRequest, type IResponse } from '@application/ports/presentation'
import { type IGetControllersUseCase } from '@core/use-cases'
import { type Controller } from '@core/entities'
import { errorResponse, okResponse } from '@presentation/responses'

export class GetControllersController implements IController {
  constructor(private readonly getControllersUseCase: IGetControllersUseCase) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const { id } = request.parameters
      const { type, address, status, logs, orderBy, order, page, perPage } = request.query

      const controllers = (await this.getControllersUseCase.get({
        id,
        type,
        address,
        status,
        logs: logs === 'true' || logs === 'false' ? JSON.parse(logs) : undefined,
        orderBy,
        order,
        page,
        perPage
      })) as Controller[]

      return okResponse(
        controllers.map((controller) => {
          const data = {
            id: controller.id,
            type: controller.type,
            status: controller.status,
            registeredAt: controller.registeredAt,
            updatedAt: controller.updatedAt
          }

          if (logs && controller.logs)
            Object.assign(data, {
              logs: controller.logs.map((log) => ({
                id: log.id,
                data: log.data,
                timestamp: log.timestamp
              }))
            })

          return data
        })
      )
    } catch (error) {
      console.error('ControllerError: ' + error)
      return errorResponse(error)
    }
  }
}

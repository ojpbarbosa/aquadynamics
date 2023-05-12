import { type IController, type IRequest, type IResponse } from '@application/ports/presentation'
import { type IGetLogsUseCase } from '@core/use-cases'
import { type Log } from '@core/entities'
import { errorResponse, okResponse } from '@presentation/responses'

export class GetLogsController implements IController {
  constructor(private readonly getLogsUseCase: IGetLogsUseCase) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const { id, controllerId } = request.parameters
      const { orderBy, order, page, perPage } = request.query
      let { controllers } = request.query

      controllers =
        controllers === 'true' || controllers === 'false' ? JSON.parse(controllers) : undefined

      const logs = (await this.getLogsUseCase.get({
        id,
        controllerId,
        controllers,
        orderBy,
        order,
        page,
        perPage
      })) as Log[]

      return okResponse(
        logs.map((log) => {
          const data = {
            id: log.id,
            controllerId: log.controllerId,
            data: log.data,
            timestamp: log.timestamp
          }

          if (controllers && log.controller)
            Object.assign(data, {
              controller: {
                type: log.controller.type,
                status: log.controller.status,
                registeredAt: log.controller.registeredAt,
                updatedAt: log.controller.updatedAt
              }
            })

          return data
        })
      )
    } catch (error) {
      console.error(error)
      return errorResponse(error)
    }
  }
}

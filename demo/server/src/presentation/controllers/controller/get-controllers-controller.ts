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
      const { aquariumId, status, orderBy, order, page, perPage } = request.query
      let { aquariums, logs } = request.query

      if (status) {
        const error = this.validator.validate({ status })

        if (error) return errorResponse(error)
      }

      aquariums = aquariums === 'true' || aquariums === 'false' ? JSON.parse(aquariums) : undefined
      logs = logs === 'true' || logs === 'false' ? JSON.parse(logs) : undefined

      let controllers = (await this.getControllersUseCase.get({
        id,
        aquariumId,
        status,
        aquariums,
        logs,
        orderBy,
        order,
        page,
        perPage
      })) as Controller[]

      controllers = controllers.map((controller: Partial<Controller>) => {
        if (logs && controller.logs)
          Object.assign(controller, {
            logs: controller.logs.map((log) => {
              delete log.controller

              return log
            })
          })

        const { aquarium } = controller
        if (aquariums && aquarium) {
          delete aquarium.controller

          Object.assign(controller, {
            aquarium
          })
        }

        return controller
      }) as Controller[]

      return okResponse(id ? (controllers.length === 1 ? controllers[0] : {}) : controllers)
    } catch (error) {
      console.error('ControllerError: ', error)
      return errorResponse(error)
    }
  }
}

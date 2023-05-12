import { type IController, type IRequest, type IResponse } from '@application/ports/presentation'
import { type ILogUseCase } from '@core/use-cases'
import { createdResponse, errorResponse, unauthorizedResponse } from '@presentation/responses'

export class LogController implements IController {
  constructor(private readonly logUseCase: ILogUseCase) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const { controller } = request

      if (!controller) return unauthorizedResponse('Unregistered controller')

      const { id: controllerId } = controller
      const { type, data, reading } = request.body

      const { id, timestamp } = await this.logUseCase.log({
        controllerId,
        type,
        data,
        reading
      })

      return createdResponse({
        id,
        timestamp
      })
    } catch (error) {
      console.error('ControllerError: ', error)
      return errorResponse(error)
    }
  }
}

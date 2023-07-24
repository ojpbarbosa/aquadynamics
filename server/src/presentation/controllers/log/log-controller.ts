import { type IController, type IRequest, type IResponse } from '@application/ports/presentation'
import { type ILogUseCase } from '@core/use-cases'
import { createdResponse, errorResponse, unauthorizedResponse } from '@presentation/responses'

export class LogController implements IController {
  constructor(private readonly logUseCase: ILogUseCase) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const { controller } = request

      if (!controller) return unauthorizedResponse('Unregistered controller')

      const { id: controllerId, aquariumId } = controller
      const { temperature, ph, lightning, timestamp } = request.body

      const log = await this.logUseCase.log({
        aquariumId,
        controllerId,
        temperature,
        ph,
        lightning,
        timestamp: new Date(timestamp)
      })

      delete log.aquarium
      delete log.controller

      return createdResponse(log)
    } catch (error) {
      console.error('ControllerError: ', error)
      return errorResponse(error)
    }
  }
}

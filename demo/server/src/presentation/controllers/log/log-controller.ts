import {
  IValidator,
  type IController,
  type IRequest,
  type IResponse
} from '@application/ports/presentation'
import { type ILogUseCase } from '@core/use-cases'
import { createdResponse, errorResponse, unauthorizedResponse } from '@presentation/responses'

export class LogController implements IController {
  constructor(private readonly validation: IValidator, private readonly logUseCase: ILogUseCase) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const { temperature, ph, lightning, controllerId, aquariumId } = request.body

      const error = this.validation.validate({ temperature, ph, lightning })

      if (error) return errorResponse(error)

      const log = await this.logUseCase.log({
        aquariumId,
        controllerId,
        temperature,
        ph,
        lightning,
        timestamp: new Date()
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

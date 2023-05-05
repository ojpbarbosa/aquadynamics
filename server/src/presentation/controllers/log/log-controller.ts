import {
  type IController,
  type IRequest,
  type IResponse,
  type IValidator
} from '@application/ports/presentation'
import { type ILogUseCase } from '@core/use-cases'
import { createdResponse, errorResponse, unauthorizedResponse } from '@presentation/responses'

export class LogController implements IController {
  constructor(private readonly validation: IValidator, private readonly logUseCase: ILogUseCase) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const { device } = request

      if (!device) return unauthorizedResponse('Unregistered device')

      const error = this.validation.validate(request.body)

      if (error) return errorResponse(error)

      const { id: deviceId } = device
      const { data } = request.body

      const { id, timestamp } = await this.logUseCase.log({
        data,
        deviceId
      })

      return createdResponse({
        id,
        timestamp
      })
    } catch (error) {
      return errorResponse(error)
    }
  }
}

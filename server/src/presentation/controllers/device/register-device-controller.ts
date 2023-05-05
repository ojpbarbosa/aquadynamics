import {
  type IController,
  type IRequest,
  type IResponse,
  type IValidator
} from '@application/ports/presentation'
import { createdResponse, errorResponse } from '@presentation/responses'
import { type IRegisterDeviceUseCase } from '@core/use-cases'

export class RegisterDeviceController implements IController {
  constructor(
    private readonly validation: IValidator,
    private readonly registerDeviceUseCase: IRegisterDeviceUseCase
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const { address } = request.headers
      const { name } = request.body

      const error = this.validation.validate({
        name,
        address
      })

      if (error) return errorResponse(error)

      const { id, status, registeredAt } = await this.registerDeviceUseCase.register({
        name,
        address
      })

      return createdResponse({
        id,
        status,
        registeredAt
      })
    } catch (error) {
      return errorResponse(error)
    }
  }
}

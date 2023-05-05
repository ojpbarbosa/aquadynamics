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
    const error = this.validation.validate(request.body)

    if (error) return errorResponse(error)

    const { name, address } = request.body

    const { id, state, registeredAt } = await this.registerDeviceUseCase.register({
      name,
      address
    })

    return createdResponse({
      id,
      state,
      registeredAt
    })
  }
}

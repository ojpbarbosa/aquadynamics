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
    let address = ''

    if (request.headers.address || request.headers.address.split(' ').length === 2)
      address = request.headers.address.split(' ')[1]

    const { name } = request.body

    const error = this.validation.validate({
      name,
      address
    })

    if (error) return errorResponse(error)

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

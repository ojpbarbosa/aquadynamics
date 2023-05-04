import { IController, IRequest, IResponse, IValidator } from '@application/ports/presentation'
import { createdResponse, errorResponse } from '@presentation/responses'
import { IRegisterDeviceUseCase } from '@core/use-cases'

export class RegisterDeviceController implements IController {
  constructor(
    private readonly validation: IValidator,
    private readonly registerDeviceUseCase: IRegisterDeviceUseCase
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    const error = this.validation.validate(request.body)

    if (error) return errorResponse(error)

    return createdResponse(await this.registerDeviceUseCase.register(request.body))
  }
}

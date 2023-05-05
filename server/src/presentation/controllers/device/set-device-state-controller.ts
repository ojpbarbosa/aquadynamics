import {
  type IController,
  type IRequest,
  type IResponse,
  type IValidator
} from '@application/ports/presentation'
import { type ISetDeviceStateUseCase } from '@core/use-cases'
import {
  errorResponse,
  notModifiedResponse,
  okResponse,
  unauthorizedResponse
} from '@presentation/responses'

export class SetDeviceStateController implements IController {
  constructor(
    private readonly validator: IValidator,
    private readonly setStateDeviceUseCase: ISetDeviceStateUseCase
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    let { device } = request

    if (!device) return unauthorizedResponse('Unregistered device')

    const { id } = device
    const { state } = request.parameters

    const error = this.validator.validate({
      id,
      state
    })

    if (error) return errorResponse(error)

    device = await this.setStateDeviceUseCase.setState({
      id,
      state
    })

    return device.state === state ? okResponse(device) : notModifiedResponse()
  }
}

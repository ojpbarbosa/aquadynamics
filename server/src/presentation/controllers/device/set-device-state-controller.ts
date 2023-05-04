import { IController, IRequest, IResponse, IValidator } from '@application/ports/presentation'
import { ISetDeviceStateUseCase } from '@core/use-cases'
import { errorResponse, okResponse, unauthorizedResponse } from '@presentation/responses'

export class SetDeviceStateController implements IController {
  constructor(
    private readonly validator: IValidator,
    private readonly setStateDeviceUseCase: ISetDeviceStateUseCase
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    const { device } = request

    if (!device)
      return unauthorizedResponse('An existing device is required in order to perform this action')

    const error = this.validator.validate({
      id: device.id,
      state: request.body.state
    })

    if (error) return errorResponse(error)

    return okResponse(
      await this.setStateDeviceUseCase.setState({
        id: device.id,
        state: request.body.state
      })
    )
  }
}

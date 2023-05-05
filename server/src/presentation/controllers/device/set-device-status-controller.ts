import {
  type IController,
  type IRequest,
  type IResponse,
  type IValidator
} from '@application/ports/presentation'
import { type ISetDeviceStatusUseCase } from '@core/use-cases'
import {
  errorResponse,
  notModifiedResponse,
  okResponse,
  unauthorizedResponse
} from '@presentation/responses'

export class SetDeviceStatusController implements IController {
  constructor(
    private readonly validator: IValidator,
    private readonly setStatusDeviceUseCase: ISetDeviceStatusUseCase
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      let { device } = request

      if (!device) return unauthorizedResponse('Unregistered device')

      const { id } = device
      const { status } = request.query

      const error = this.validator.validate({
        id,
        status
      })

      if (error) return errorResponse(error)

      if (device.status === status) return notModifiedResponse()

      device = await this.setStatusDeviceUseCase.setStatus({
        id,
        status
      })

      return device.status === status
        ? okResponse({
            id,
            status: device.status,
            updatedAt: device.updatedAt
          })
        : notModifiedResponse()
    } catch (error) {
      return errorResponse(error)
    }
  }
}

import {
  type IController,
  type IRequest,
  type IResponse,
  type IValidator
} from '@application/ports/presentation'
import { type ISetControllerStatusUseCase } from '@core/use-cases'
import {
  errorResponse,
  notModifiedResponse,
  okResponse,
  unauthorizedResponse
} from '@presentation/responses'

export class SetControllerStatusController implements IController {
  constructor(
    private readonly validator: IValidator,
    private readonly setStatusControllerUseCase: ISetControllerStatusUseCase
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const { id } = request.parameters
      const { status } = request.body

      const error = this.validator.validate({
        id,
        status
      })

      if (error) return errorResponse(error)

      const controller = await this.setStatusControllerUseCase.setStatus({
        id,
        status
      })

      return controller.status === status
        ? okResponse({
            id,
            aquariumId: controller.aquariumId,
            status: controller.status,
            updatedAt: controller.updatedAt
          })
        : notModifiedResponse()
    } catch (error) {
      console.error('ControllerError: ', error)
      return errorResponse(error)
    }
  }
}

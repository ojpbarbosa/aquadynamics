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
      let { controller } = request

      if (!controller) return unauthorizedResponse('Unregistered controller')

      const { id } = controller
      const { status } = request.query

      const error = this.validator.validate({
        id,
        status
      })

      if (error) return errorResponse(error)

      if (controller.status === status) return notModifiedResponse()

      controller = await this.setStatusControllerUseCase.setStatus({
        id,
        status
      })

      return controller.status === status
        ? okResponse({
            id,
            status: controller.status,
            updatedAt: controller.updatedAt
          })
        : notModifiedResponse()
    } catch (error) {
      console.error(error)
      return errorResponse(error)
    }
  }
}

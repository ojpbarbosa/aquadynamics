import {
  type IController,
  type IRequest,
  type IResponse,
  type IValidator
} from '@application/ports/presentation'
import { createdResponse, errorResponse } from '@presentation/responses'
import { type IRegisterControllerUseCase } from '@core/use-cases'

export class RegisterControllerController implements IController {
  constructor(
    private readonly validation: IValidator,
    private readonly registerControllerUseCase: IRegisterControllerUseCase
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const { address } = request.headers
      const { type } = request.body

      const error = this.validation.validate({
        type,
        address
      })

      if (error) return errorResponse(error)

      const { id, status, registeredAt } = await this.registerControllerUseCase.register({
        type,
        address
      })

      return createdResponse({
        id,
        status,
        registeredAt
      })
    } catch (error) {
      console.error('ControllerError: ' + error)
      return errorResponse(error)
    }
  }
}

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
      let { address }: { address: string } = request.headers
      const { aquariumId } = request.body

      const error = this.validation.validate({
        address,
        aquariumId
      })

      if (error) return errorResponse(error)

      address = address.toLowerCase().replace(':', '')

      const { id, status, registeredAt, updatedAt, aquarium, logs } =
        await this.registerControllerUseCase.register({
          address,
          aquariumId
        })

      return createdResponse({
        id,
        aquariumId,
        status,
        registeredAt,
        updatedAt,
        aquarium,
        logs
      })
    } catch (error) {
      console.error('ControllerError: ', error)
      return errorResponse(error)
    }
  }
}

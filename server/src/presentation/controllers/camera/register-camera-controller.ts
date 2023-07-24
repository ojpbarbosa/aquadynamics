import {
  type IController,
  type IRequest,
  type IResponse,
  type IValidator
} from '@application/ports/presentation'
import { createdResponse, errorResponse } from '@presentation/responses'
import { type IRegisterCameraUseCase } from '@core/use-cases'

export class RegisterCameraController implements IController {
  constructor(
    private readonly validation: IValidator,
    private readonly registerCameraUseCase: IRegisterCameraUseCase
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

      const { id, registeredAt, updatedAt, aquarium } = await this.registerCameraUseCase.register({
        address,
        aquariumId
      })

      return createdResponse({
        id,
        aquariumId,
        registeredAt,
        updatedAt,
        aquarium
      })
    } catch (error) {
      console.error('ControllerError: ', error)
      return errorResponse(error)
    }
  }
}

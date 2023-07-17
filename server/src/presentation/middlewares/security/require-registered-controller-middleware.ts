import { okResponse, unauthorizedResponse } from '@presentation/responses'
import { type IMiddleware, type IRequest, type IResponse } from '@application/ports/presentation'
import { type IFindControllersRepository } from '@application/ports/repositories'
import { type ICryptographyProvider } from '@application/ports/providers'
import { CONTROLLER_ADDRESS_ENCRYPTION_KEY } from '@main/configuration'
import { type Controller } from '@core/entities'

export class RequireRegisteredControllerMiddleware implements IMiddleware {
  constructor(
    private readonly findControllersRepository: IFindControllersRepository,
    private readonly cryptographyProvider: ICryptographyProvider
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    const { address } = request.headers

    if (!address) return unauthorizedResponse('Missing address header')

    const controller = ((await this.findControllersRepository.find()) as Controller[]).find(
      (controller) =>
        this.cryptographyProvider.decrypt(
          controller.address,
          CONTROLLER_ADDRESS_ENCRYPTION_KEY as string
        ) === address
    )

    return controller ? okResponse(controller) : unauthorizedResponse('Unregistered controller')
  }
}

import { okResponse, unauthorizedResponse } from '@presentation/responses'
import { type IMiddleware, type IRequest, type IResponse } from '@application/ports/presentation'
import { type IFindDevicesRepository } from '@application/ports/repositories'
import { type ICryptographyProvider } from '@application/ports/providers'
import { ADDRESS_ENCRYPTION_SECRET_KEY } from '@main/configuration'
import { type Device } from '@core/entities'

export class RequireRegisteredDeviceMiddleware implements IMiddleware {
  constructor(
    private readonly findDevicesRepository: IFindDevicesRepository,
    private readonly cryptographyProvider: ICryptographyProvider
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    if (!request.headers.address) return unauthorizedResponse('Missing address header')

    const [, address] = request.headers.split(' ')

    const device = ((await this.findDevicesRepository.find()) as Device[]).find(
      (device) =>
        this.cryptographyProvider.decrypt(
          device.address,
          ADDRESS_ENCRYPTION_SECRET_KEY as string
        ) === address
    )

    return device ? okResponse(device) : unauthorizedResponse('Unregistered device')
  }
}

import { type IRegisterDeviceUseCase, type TRegisterDeviceDTO } from '@core/use-cases'
import {
  type IFindDevicesRepository,
  type ICreateDeviceRepository
} from '@application/ports/repositories'
import { type ICryptographyProvider, type IUniqueIdProvider } from '@application/ports/providers'
import { type Device } from '@core/entities'
import { NotFoundError } from '@application/errors'
import { ADDRESS_ENCRYPTION_SECRET_KEY } from '@main/configuration'

export class RegisterDeviceUseCase implements IRegisterDeviceUseCase {
  constructor(
    private readonly findDevicesRepository: IFindDevicesRepository,
    private readonly cryptographyProvider: ICryptographyProvider,
    private readonly createDeviceRepository: ICreateDeviceRepository,
    private readonly uniqueIdProvider: IUniqueIdProvider
  ) {}

  async register(data: TRegisterDeviceDTO): Promise<Device> {
    if (
      !((await this.findDevicesRepository.find()) as Device[]).find(
        (device) =>
          this.cryptographyProvider.decrypt(
            device.address,
            ADDRESS_ENCRYPTION_SECRET_KEY as string
          ) === data.address
      )
    )
      throw new NotFoundError('Device does not exist')

    return await this.createDeviceRepository.create({
      id: this.uniqueIdProvider.generate(),
      ...data
    })
  }
}

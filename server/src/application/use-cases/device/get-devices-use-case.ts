import { type IGetDevicesUseCase, type TGetDevicesDTO } from '@core/use-cases'
import { type IFindDevicesRepository } from '@application/ports/repositories'
import { type ICryptographyProvider } from '@application/ports/providers'
import { type Device } from '@core/entities'
import { ADDRESS_ENCRYPTION_SECRET_KEY } from '@main/configuration'
import { NotFoundError } from '@application/errors'

export class GetDevicesUseCase implements IGetDevicesUseCase {
  constructor(
    private readonly findDevicesRepository: IFindDevicesRepository,
    private readonly cryptographyProvider: ICryptographyProvider
  ) {}

  async get(data: TGetDevicesDTO): Promise<Device[] | Device> {
    const { address, logs } = data

    if (address) {
      const device = (
        (await this.findDevicesRepository.find({
          logs
        })) as Device[]
      ).find(
        (device) =>
          this.cryptographyProvider.decrypt(
            device.address,
            ADDRESS_ENCRYPTION_SECRET_KEY as string
          ) === address
      )

      if (!device) throw new NotFoundError('Device does not exist')

      return device
    }

    return await this.findDevicesRepository.find(data)
  }
}

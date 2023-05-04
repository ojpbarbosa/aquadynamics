import { type ISetDeviceStateUseCase, type TSetDeviceStateDTO } from '@core/use-cases'
import {
  type IFindDevicesRepository,
  type IUpdateDeviceRepository
} from '@application/ports/repositories'
import { ICryptographyProvider } from '@application/ports/providers'
import { type Device } from '@core/entities'
import { ADDRESS_ENCRYPTION_SECRET_KEY } from '@main/configuration'
import { NotFoundError } from '@application/errors'

export class SetDeviceStateUseCase implements ISetDeviceStateUseCase {
  constructor(
    private readonly findDevicesRepository: IFindDevicesRepository,
    private readonly cryptographyProvider: ICryptographyProvider,
    private readonly updateDeviceRepository: IUpdateDeviceRepository
  ) {}

  async setState(data: TSetDeviceStateDTO): Promise<Device> {
    const device = ((await this.findDevicesRepository.find()) as Device[]).find(
      (device) =>
        this.cryptographyProvider.decrypt(
          device.address,
          ADDRESS_ENCRYPTION_SECRET_KEY as string
        ) === data.address
    )

    if (!device) throw new NotFoundError('Device does not exist')

    return await this.updateDeviceRepository.update({
      id: device.id,
      state: data.state
    })
  }
}

import { type ISetDeviceStateUseCase, type TSetDeviceStateDTO } from '@core/use-cases'
import {
  type IFindDevicesRepository,
  type IUpdateDeviceRepository
} from '@application/ports/repositories'
import { type Device } from '@core/entities'
import { NotFoundError } from '@application/errors'

export class SetDeviceStateUseCase implements ISetDeviceStateUseCase {
  constructor(
    private readonly findDevicesRepository: IFindDevicesRepository,
    private readonly updateDeviceRepository: IUpdateDeviceRepository
  ) {}

  async setState(data: TSetDeviceStateDTO): Promise<Device> {
    const device = (await this.findDevicesRepository.find({ address: data.address })) as Device

    if (!device) throw new NotFoundError('Device does not exist')

    return await this.updateDeviceRepository.update({
      id: device.id,
      state: data.state
    })
  }
}

import { type ISetDeviceStateUseCase, type TSetDeviceStateDTO } from '@core/use-cases'
import { type IUpdateDeviceRepository } from '@application/ports/repositories'
import { type Device } from '@core/entities'

export class SetDeviceStateUseCase implements ISetDeviceStateUseCase {
  constructor(private readonly updateDeviceRepository: IUpdateDeviceRepository) {}

  async setState(data: TSetDeviceStateDTO): Promise<Device> {
    return await this.updateDeviceRepository.update(data)
  }
}

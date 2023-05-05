import { type ISetDeviceStatusUseCase, type TSetDeviceStatusDTO } from '@core/use-cases'
import { type IUpdateDeviceRepository } from '@application/ports/repositories'
import { type Device } from '@core/entities'

export class SetDeviceStatusUseCase implements ISetDeviceStatusUseCase {
  constructor(private readonly updateDeviceRepository: IUpdateDeviceRepository) {}

  async setStatus(data: TSetDeviceStatusDTO): Promise<Device> {
    return await this.updateDeviceRepository.update(data)
  }
}

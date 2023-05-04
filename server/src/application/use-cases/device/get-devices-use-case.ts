import { type IGetDevicesUseCase, type TGetDevicesDTO } from '@core/use-cases'
import { type IFindDevicesRepository } from '@application/ports/repositories'
import { type Device } from '@core/entities'

export class GetDevicesUseCase implements IGetDevicesUseCase {
  constructor(private readonly findDevicesRepository: IFindDevicesRepository) {}

  async get(data: TGetDevicesDTO): Promise<Device[] | Device> {
    return await this.findDevicesRepository.find(data)
  }
}

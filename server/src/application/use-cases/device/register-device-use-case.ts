import { type IRegisterDeviceUseCase, type TRegisterDeviceDTO } from '@core/use-cases'
import {
  type IFindDevicesRepository,
  type ICreateDeviceRepository
} from '@application/ports/repositories'
import { type Device } from '@core/entities'
import { ConflictError } from '@application/errors'

export class RegisterDeviceUseCase implements IRegisterDeviceUseCase {
  constructor(
    private readonly findDevicesRepository: IFindDevicesRepository,
    private readonly createDeviceRepository: ICreateDeviceRepository
  ) {}

  async register(data: TRegisterDeviceDTO): Promise<Device> {
    if (await this.findDevicesRepository.find({ address: data.address }))
      throw new ConflictError('Devices already exists')

    return await this.createDeviceRepository.create(data)
  }
}

import { type ILogUseCase, type TLogDTO } from '@core/use-cases'
import {
  type ICreateLogRepository,
  type IFindDevicesRepository,
  type IFindLogsRepository
} from '@application/ports/repositories'
import { type Device, type Log } from '@core/entities'
import { ConflictError, NotFoundError } from '@application/errors'

export class LogUseCase implements ILogUseCase {
  constructor(
    private readonly findDevicesRepository: IFindDevicesRepository,
    private readonly findLogsRepository: IFindLogsRepository,
    private readonly createLogRepository: ICreateLogRepository
  ) {}

  async log(data: TLogDTO): Promise<Log> {
    const device = (await this.findDevicesRepository.find({ address: data.address })) as Device

    if (!device) throw new NotFoundError('Device does not exists')

    if (await this.findLogsRepository.find({ deviceId: device.id, data: data.data }))
      throw new ConflictError('Log already exists')

    return await this.createLogRepository.create(data)
  }
}

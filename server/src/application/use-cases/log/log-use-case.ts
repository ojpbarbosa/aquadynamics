import { type ILogUseCase, type TLogDTO } from '@core/use-cases'
import {
  type ICreateLogRepository,
  type IFindLogsRepository
} from '@application/ports/repositories'
import { IUniqueIdProvider } from '@application/ports/providers'
import { type Log } from '@core/entities'
import { ConflictError } from '@application/errors'

export class LogUseCase implements ILogUseCase {
  constructor(
    private readonly findLogsRepository: IFindLogsRepository,
    private readonly createLogRepository: ICreateLogRepository,
    private readonly uniqueIdProvider: IUniqueIdProvider
  ) {}

  async log(data: TLogDTO): Promise<Log> {
    if (await this.findLogsRepository.find({ deviceId: data.deviceId, data: data.data }))
      throw new ConflictError('Log already exists')

    return await this.createLogRepository.create({
      id: this.uniqueIdProvider.generate(),
      deviceId: data.deviceId,
      data: data.data,
      timestamp: new Date()
    })
  }
}

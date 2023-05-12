import { type ILogUseCase, type TLogDTO } from '@core/use-cases'
import { type ICreateLogRepository } from '@application/ports/repositories'
import { type IUniqueIdProvider } from '@application/ports/providers'
import { type Log } from '@core/entities'

export class LogUseCase implements ILogUseCase {
  constructor(
    private readonly createLogRepository: ICreateLogRepository,
    private readonly uniqueIdProvider: IUniqueIdProvider
  ) {}

  async log(data: TLogDTO): Promise<Log> {
    return await this.createLogRepository.create({
      id: this.uniqueIdProvider.generate(),
      controllerId: data.controllerId,
      data: data.data,
      timestamp: new Date()
    })
  }
}

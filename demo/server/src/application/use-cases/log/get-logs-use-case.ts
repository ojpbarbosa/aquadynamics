import { type IGetLogsUseCase, type TGetLogsDTO } from '@core/use-cases'
import { type IFindLogsRepository } from '@application/ports/repositories'
import { type Log } from '@core/entities'

export class GetLogsUseCase implements IGetLogsUseCase {
  constructor(private readonly findLogsRepository: IFindLogsRepository) {}

  async get(data: TGetLogsDTO): Promise<Log[] | Log> {
    return await this.findLogsRepository.find(data)
  }
}

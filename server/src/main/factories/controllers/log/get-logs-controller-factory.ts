import { GetLogsController } from '@presentation/controllers'
import { GetLogsUseCase } from '@application/use-cases'
import { findLogsMysqlRepository } from '@infrastructure/repositories'

export const getLogsControllerFactory = (): GetLogsController => {
  return new GetLogsController(new GetLogsUseCase(findLogsMysqlRepository))
}

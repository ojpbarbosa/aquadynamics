import { GetLogsController } from '@presentation/controllers/index'
import { GetLogsUseCase } from '@application/use-cases'
import { findLogsMysqlRepository } from '@infrastructure/repositories'

export const getLogsControllerFactory = (): GetLogsController => {
  return new GetLogsController(new GetLogsUseCase(findLogsMysqlRepository))
}

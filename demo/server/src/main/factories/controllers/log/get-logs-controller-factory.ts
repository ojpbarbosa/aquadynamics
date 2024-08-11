import { GetLogsController } from '@presentation/controllers/index'
import { GetLogsUseCase } from '@application/use-cases'
import { findLogsRepository } from '@infrastructure/repositories'

export const getLogsControllerFactory = (): GetLogsController => {
  return new GetLogsController(new GetLogsUseCase(findLogsRepository))
}

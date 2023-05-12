import { LogController } from '@presentation/controllers'
import { LogUseCase } from '@application/use-cases'
import { createLogMysqlRepository } from '@infrastructure/repositories'
import { uuidUniqueIdProvider } from '@infrastructure/providers'

export const logControllerFactory = (): LogController => {
  return new LogController(new LogUseCase(createLogMysqlRepository, uuidUniqueIdProvider))
}

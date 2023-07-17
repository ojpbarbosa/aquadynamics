import { LogController } from '@presentation/controllers/index'
import { LogUseCase } from '@application/use-cases'
import { createLogMysqlRepository } from '@infrastructure/repositories'
import { nanoIdUniqueIdProvider } from '@infrastructure/providers'

export const logControllerFactory = (): LogController => {
  return new LogController(new LogUseCase(createLogMysqlRepository, nanoIdUniqueIdProvider))
}

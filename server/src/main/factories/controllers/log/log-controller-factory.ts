import { LogController } from '@presentation/controllers'
import { RequiredFieldValidation } from '@presentation/validation'
import { LogUseCase } from '@application/use-cases'
import { createLogSqliteRepository } from '@infrastructure/repositories'
import { uuidUniqueIdProvider } from '@infrastructure/providers'

export const logControllerFactory = (): LogController => {
  return new LogController(
    new RequiredFieldValidation('data'),
    new LogUseCase(createLogSqliteRepository, uuidUniqueIdProvider)
  )
}
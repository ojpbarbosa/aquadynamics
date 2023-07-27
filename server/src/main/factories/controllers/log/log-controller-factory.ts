import { LogController } from '@presentation/controllers/index'
import { LogUseCase } from '@application/use-cases'
import { createLogMysqlRepository } from '@infrastructure/repositories'
import { nanoIdUniqueIdProvider } from '@infrastructure/providers'
import { CompositeValidation, RequiredFieldValidation } from '@presentation/validation'

export const logControllerFactory = (): LogController => {
  return new LogController(
    new CompositeValidation([
      new RequiredFieldValidation('temperature'),
      new RequiredFieldValidation('ph')
    ]),
    new LogUseCase(createLogMysqlRepository, nanoIdUniqueIdProvider)
  )
}

import { RegisterControllerController } from '@presentation/controllers'
import { CompositeValidation, RequiredFieldValidation } from '@presentation/validation'
import { RegisterControllerUseCase } from '@application/use-cases'
import {
  createControllerMysqlRepository,
  findControllersMysqlRepository
} from '@infrastructure/repositories'
import { cryptoJsCryptographyProvider, uuidUniqueIdProvider } from '@infrastructure/providers'

export const registerControllerControllerFactory = (): RegisterControllerController => {
  return new RegisterControllerController(
    new CompositeValidation([
      new RequiredFieldValidation('address'),
      new RequiredFieldValidation('type')
    ]),
    new RegisterControllerUseCase(
      findControllersMysqlRepository,
      cryptoJsCryptographyProvider,
      createControllerMysqlRepository,
      uuidUniqueIdProvider
    )
  )
}

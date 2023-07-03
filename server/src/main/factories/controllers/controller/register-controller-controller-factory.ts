import { RegisterControllerController } from '@presentation/controllers'
import { UniqueIdValidation } from '@presentation/validation'
import { RegisterControllerUseCase } from '@application/use-cases'
import {
  createControllerMysqlRepository,
  findControllersMysqlRepository
} from '@infrastructure/repositories'
import { cryptoJsCryptographyProvider, uuidUniqueIdProvider } from '@infrastructure/providers'

export const registerControllerControllerFactory = (): RegisterControllerController => {
  return new RegisterControllerController(
    new UniqueIdValidation('aquariumId'),
    new RegisterControllerUseCase(
      findControllersMysqlRepository,
      cryptoJsCryptographyProvider,
      createControllerMysqlRepository,
      uuidUniqueIdProvider
    )
  )
}

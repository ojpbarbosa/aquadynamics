import { RegisterControllerController } from '@presentation/controllers/index'
import { UniqueIdValidation } from '@presentation/validation'
import { RegisterControllerUseCase } from '@application/use-cases'
import {
  createControllerMysqlRepository,
  findAquariumsMysqlRepository,
  findControllersMysqlRepository
} from '@infrastructure/repositories'
import { cryptoJsCryptographyProvider, nanoIdUniqueIdProvider } from '@infrastructure/providers'

export const registerControllerControllerFactory = (): RegisterControllerController => {
  return new RegisterControllerController(
    new UniqueIdValidation(nanoIdUniqueIdProvider.isValid, 'aquariumId'),
    new RegisterControllerUseCase(
      findControllersMysqlRepository,
      findAquariumsMysqlRepository,
      cryptoJsCryptographyProvider,
      createControllerMysqlRepository,
      nanoIdUniqueIdProvider
    )
  )
}

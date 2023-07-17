import { RegisterCameraController } from '@presentation/controllers/index'
import { UniqueIdValidation } from '@presentation/validation'
import { RegisterCameraUseCase } from '@application/use-cases'
import {
  createCameraMysqlRepository,
  findAquariumsMysqlRepository,
  findControllersMysqlRepository
} from '@infrastructure/repositories'
import { cryptoJsCryptographyProvider, nanoIdUniqueIdProvider } from '@infrastructure/providers'

export const registerCameraControllerFactory = (): RegisterCameraController => {
  return new RegisterCameraController(
    new UniqueIdValidation(nanoIdUniqueIdProvider.isValid, 'aquariumId'),
    new RegisterCameraUseCase(
      findControllersMysqlRepository,
      findAquariumsMysqlRepository,
      cryptoJsCryptographyProvider,
      createCameraMysqlRepository,
      nanoIdUniqueIdProvider
    )
  )
}

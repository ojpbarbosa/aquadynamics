import { GetCamerasController } from '@presentation/controllers/index'
import { GetCamerasUseCase } from '@application/use-cases'
import { findCamerasMysqlRepository } from '@infrastructure/repositories'
import { cryptoJsCryptographyProvider } from '@infrastructure/providers'

export const getCamerasControllerFactory = (): GetCamerasController => {
  return new GetCamerasController(
    new GetCamerasUseCase(findCamerasMysqlRepository, cryptoJsCryptographyProvider)
  )
}

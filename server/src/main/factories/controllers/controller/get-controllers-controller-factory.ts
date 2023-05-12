import { GetControllersController } from '@presentation/controllers'
import { GetControllersUseCase } from '@application/use-cases'
import { findControllersMysqlRepository } from '@infrastructure/repositories'
import { cryptoJsCryptographyProvider } from '@infrastructure/providers'

export const getControllersControllerFactory = (): GetControllersController => {
  return new GetControllersController(
    new GetControllersUseCase(findControllersMysqlRepository, cryptoJsCryptographyProvider)
  )
}

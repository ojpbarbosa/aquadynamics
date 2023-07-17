import { GetControllersController } from '@presentation/controllers/index'
import { GetControllersUseCase } from '@application/use-cases'
import { findControllersMysqlRepository } from '@infrastructure/repositories'
import { cryptoJsCryptographyProvider } from '@infrastructure/providers'
import { RequiredFieldValidation } from '@presentation/validation'
import { controllerStatuses } from '@core/entities'

export const getControllersControllerFactory = (): GetControllersController => {
  return new GetControllersController(
    new RequiredFieldValidation('status', {
      type: 'string',
      values: controllerStatuses
    }),
    new GetControllersUseCase(findControllersMysqlRepository, cryptoJsCryptographyProvider)
  )
}

import { GetControllersController } from '@presentation/controllers'
import { GetControllersUseCase } from '@application/use-cases'
import { findControllersMysqlRepository } from '@infrastructure/repositories'
import { cryptoJsCryptographyProvider } from '@infrastructure/providers'
import { RequiredFieldValidation } from '@presentation/validation'
import { ControllerStatus } from '@core/entities'

export const getControllersControllerFactory = (): GetControllersController => {
  return new GetControllersController(
    new RequiredFieldValidation('status', {
      type: 'string',
      values: Object.values(ControllerStatus)
    }),
    new GetControllersUseCase(findControllersMysqlRepository, cryptoJsCryptographyProvider)
  )
}

import { RegisterDeviceController } from '@presentation/controllers'
import { CompositeValidation, RequiredFieldValidation } from '@presentation/validation'
import { RegisterDeviceUseCase } from '@application/use-cases'
import {
  createDeviceMysqlRepository,
  findDevicesMysqlRepository
} from '@infrastructure/repositories'
import { cryptoJsCryptographyProvider, uuidUniqueIdProvider } from '@infrastructure/providers'

export const registerDeviceControllerFactory = (): RegisterDeviceController => {
  return new RegisterDeviceController(
    new CompositeValidation([
      new RequiredFieldValidation('address'),
      new RequiredFieldValidation('name')
    ]),
    new RegisterDeviceUseCase(
      findDevicesMysqlRepository,
      cryptoJsCryptographyProvider,
      createDeviceMysqlRepository,
      uuidUniqueIdProvider
    )
  )
}

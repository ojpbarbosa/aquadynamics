import { GetDevicesController } from '@presentation/controllers'
import { GetDevicesUseCase } from '@application/use-cases'
import { findDevicesMysqlRepository } from '@infrastructure/repositories'
import { cryptoJsCryptographyProvider } from '@infrastructure/providers'

export const getDevicesControllerFactory = (): GetDevicesController => {
  return new GetDevicesController(
    new GetDevicesUseCase(findDevicesMysqlRepository, cryptoJsCryptographyProvider)
  )
}

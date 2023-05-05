import { GetDevicesController } from '@presentation/controllers'
import { GetDevicesUseCase } from '@application/use-cases'
import { findDevicesSqliteRepository } from '@infrastructure/repositories'
import { cryptoJsCryptographyProvider } from '@infrastructure/providers'

export const getDevicesControllerFactory = (): GetDevicesController => {
  return new GetDevicesController(
    new GetDevicesUseCase(findDevicesSqliteRepository, cryptoJsCryptographyProvider)
  )
}

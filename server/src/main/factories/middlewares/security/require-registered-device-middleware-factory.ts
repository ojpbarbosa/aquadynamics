import { RequireRegisteredDeviceMiddleware } from '@presentation/middlewares'
import { findDevicesSqliteRepository } from '@infrastructure/repositories'
import { cryptoJsCryptographyProvider } from '@infrastructure/providers'

export const requireRegisteredDeviceMiddlewareFactory = (): RequireRegisteredDeviceMiddleware => {
  return new RequireRegisteredDeviceMiddleware(
    findDevicesSqliteRepository,
    cryptoJsCryptographyProvider
  )
}

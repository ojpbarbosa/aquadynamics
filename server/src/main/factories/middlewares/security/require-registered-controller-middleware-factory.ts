import { RequireRegisteredControllerMiddleware } from '@presentation/middlewares'
import { findControllersSqliteRepository } from '@infrastructure/repositories'
import { cryptoJsCryptographyProvider } from '@infrastructure/providers'

export const requireRegisteredControllerMiddlewareFactory =
  (): RequireRegisteredControllerMiddleware => {
    return new RequireRegisteredControllerMiddleware(
      findControllersSqliteRepository,
      cryptoJsCryptographyProvider
    )
  }

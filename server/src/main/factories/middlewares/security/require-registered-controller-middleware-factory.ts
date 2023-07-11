import { RequireRegisteredControllerMiddleware } from '@presentation/middlewares'
import { findControllersMysqlRepository } from '@infrastructure/repositories'
import { cryptoJsCryptographyProvider } from '@infrastructure/providers'

export const requireRegisteredControllerMiddlewareFactory =
  (): RequireRegisteredControllerMiddleware => {
    return new RequireRegisteredControllerMiddleware(
      findControllersMysqlRepository,
      cryptoJsCryptographyProvider
    )
  }

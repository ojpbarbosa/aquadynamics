import { type Router } from 'express'
import { type IWebSocketServer } from '@application/ports/presentation'
import { adaptController, adaptMiddleware } from '@main/adapters'
import { requireRegisteredControllerMiddlewareFactory } from '@main/factories/middlewares'
import {
  logControllerFactory,
  setControllerStatusControllerFactory
} from '@main/factories/controllers'
import { webSocketEmitEventMiddlewareFactory } from '@main/factories/middlewares'

export const setUpAfterEntityControllerMiddlewareRoutes = (
  router: Router,
  webSocketServer: IWebSocketServer
): void => {
  router.post(
    '/api/logs',
    adaptMiddleware(requireRegisteredControllerMiddlewareFactory()),
    adaptController(
      logControllerFactory(),
      webSocketEmitEventMiddlewareFactory('log', webSocketServer)
    )
  )

  router.patch(
    '/api/controllers',
    adaptMiddleware(requireRegisteredControllerMiddlewareFactory()),
    adaptController(
      setControllerStatusControllerFactory(),
      webSocketEmitEventMiddlewareFactory('controller_status_update', webSocketServer)
    )
  )
}

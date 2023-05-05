import { type Router } from 'express'
import { adaptController, adaptMiddleware } from '@main/adapters'
import { getLogsControllerFactory, logControllerFactory } from '@main/factories/controllers'
import { requireRegisteredDeviceMiddlewareFactory } from '@main/factories/middlewares'

export const setUpLogRoutes = (router: Router): void => {
  router.get('/logs', adaptController(getLogsControllerFactory()))
  router.get('/logs/:id', adaptController(getLogsControllerFactory()))
  router.get('/devices/:deviceId/logs', adaptController(getLogsControllerFactory()))
  router.get('/devices/:deviceId/logs/:id', adaptController(getLogsControllerFactory()))

  router.post(
    '/logs',
    adaptMiddleware(requireRegisteredDeviceMiddlewareFactory()),
    adaptController(logControllerFactory())
  )
}

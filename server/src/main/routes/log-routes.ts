import { type Router } from 'express'
import { adaptController, adaptMiddleware } from '@main/adapters'
import { getLogsControllerFactory, logControllerFactory } from '@main/factories/controllers'
import { requireRegisteredControllerMiddlewareFactory } from '@main/factories/middlewares'

export const setUpLogRoutes = (router: Router) => {
  router.get('/logs', adaptController(getLogsControllerFactory()))
  router.get('/logs/:id', adaptController(getLogsControllerFactory()))
  router.get('/controllers/:controllerId/logs', adaptController(getLogsControllerFactory()))
  router.get('/controllers/:controllerId/logs/:id', adaptController(getLogsControllerFactory()))

  router.post(
    '/logs',
    adaptMiddleware(requireRegisteredControllerMiddlewareFactory()),
    adaptController(logControllerFactory())
  )
}

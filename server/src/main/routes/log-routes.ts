import { type Router } from 'express'
import { adaptController, adaptMiddleware } from '@main/adapters'
import { getLogsControllerFactory, logControllerFactory } from '@main/factories/controllers'
import {
  emitLogViaWebSocketMiddleware,
  requireRegisteredControllerMiddlewareFactory
} from '@main/factories/middlewares'
import { type IWebSocketServer } from '@application/ports/presentation'

export const setUpLogRoutes = (router: Router): void => {
  router.get('/logs', adaptController(getLogsControllerFactory()))
  router.get('/logs/:id', adaptController(getLogsControllerFactory()))
  router.get('/controllers/:controllerId/logs', adaptController(getLogsControllerFactory()))
  router.get('/controllers/:controllerId/logs/:id', adaptController(getLogsControllerFactory()))
}

export const setUpLogPostRoute = (router: Router, webSocketServer: IWebSocketServer): void => {
  router.post(
    '/api/logs',
    adaptMiddleware(requireRegisteredControllerMiddlewareFactory()),
    adaptController(logControllerFactory(), emitLogViaWebSocketMiddleware(webSocketServer))
  )
}
